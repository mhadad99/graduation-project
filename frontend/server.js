const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'Server', 'db.json'));
const middlewares = jsonServer.defaults();
const port = 5001;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Soft delete & status filter middleware for GET requests
server.use((req, res, next) => {
  if (req.method === 'GET') {
    const url = req.url.split('?')[0];
    const filterCollections = [
      '/users', '/admins', '/freelancers', '/clients', '/projects', '/services', '/portfolio', '/proposals', '/project_proposals', '/conversations', '/messages', '/skills', '/categories'
    ];
    if (filterCollections.some(col => url.startsWith(col))) {
      req.query.isDeleted = 'false';
      req.query.status = 'active';
    }
  }
  next();
});

// PATCH endpoint for status update (admin approve/reject)
server.patch('/:collection/:id/status', (req, res) => {
  const { collection, id } = req.params;
  const { status } = req.body;
  const db = router.db;
  if (!status) return res.status(400).jsonp({ error: 'Missing status' });
  const item = db.get(collection).find({ id: Number(id) }).value();
  if (!item) return res.status(404).jsonp({ error: 'Not found' });
  db.get(collection).find({ id: Number(id) }).assign({ status }).write();
  res.jsonp({ ...item, status });
});

// PATCH endpoint for soft delete
server.patch('/:collection/:id/delete', (req, res) => {
  const { collection, id } = req.params;
  const db = router.db;
  const item = db.get(collection).find({ id: Number(id) }).value();
  if (!item) return res.status(404).jsonp({ error: 'Not found' });
  db.get(collection).find({ id: Number(id) }).assign({ isDeleted: true }).write();
  res.jsonp({ ...item, isDeleted: true });
});

// Allow editing entities
server.put('/:collection/:id', (req, res) => {
  const { collection, id } = req.params;
  const db = router.db;
  const item = db.get(collection).find({ id: Number(id) }).value();
  if (!item) return res.status(404).jsonp({ error: 'Not found' });
  db.get(collection).find({ id: Number(id) }).assign(req.body).write();
  res.jsonp({ ...item, ...req.body });
});

server.use(router);
server.listen(port, () => {
  console.log(`Data server running at http://localhost:${port}`);
});
