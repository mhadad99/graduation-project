import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = 5001;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.bodyParser);

// Add custom middleware for simulating authentication
server.use((req, res, next) => {
  // Simulate a delay
  setTimeout(next, 500);
});

// Custom login route
server.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', { email, password });
    
    // Safely access the users collection
    const users = router.db.get('users');
    
    if (!users) {
      console.error('Users collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    const usersArray = users.value() || [];
    console.log('Found users:', usersArray.length);
    
    const user = usersArray.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log('Login successful for user:', user.name);
      res.jsonp({
        token: 'fake-jwt-token',
        user: { ...user, password: undefined }
      });
    } else {
      console.log('Invalid login attempt');
      res.status(400).jsonp({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).jsonp({ message: 'Server error during login' });
  }
});

// Custom register route
server.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log('Registration attempt with:', { name, email, role });
    
    // Safely access the users collection
    const users = router.db.get('users');
    
    if (!users) {
      console.error('Users collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    const usersArray = users.value() || [];
    console.log('Found users:', usersArray.length);
    
    // Check if user already exists
    if (usersArray.find(u => u.email === email)) {
      console.log('User with this email already exists');
      return res.status(400).jsonp({ message: 'User with this email already exists' });
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      joinDate: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      profileImage: 'https://i.imgur.com/JFHjdNZ.jpeg',
      isVerified: false
    };
    
    // Add user to db
    users.push(newUser).write();
    console.log('User registered successfully:', newUser.name);
    
    res.status(201).jsonp({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).jsonp({ message: 'Server error during registration' });
  }
});

// Custom route for updating user profile
server.put('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;
    console.log('Updating user profile for ID:', userId, 'with data:', userData);
    
    // Safely access the users collection
    const users = router.db.get('users');
    
    if (!users) {
      console.error('Users collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    // Find the user to update
    const user = users.find({ id: userId });
    
    if (!user.value()) {
      console.error('User not found with ID:', userId);
      return res.status(404).jsonp({ message: 'User not found' });
    }
    
    // Update the user data
    const updatedUser = { ...user.value(), ...userData };
    user.assign(updatedUser).write();
    
    console.log('User profile updated successfully:', updatedUser);
    res.jsonp(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).jsonp({ message: 'Server error while updating profile' });
  }
});

// Custom route for user ratings
server.post('/api/ratings/user', (req, res) => {
  try {
    const { userId, raterId, rating, comment } = req.body;
    console.log('Adding user rating:', { userId, raterId, rating });
    
    // Create new rating
    const newRating = {
      id: Date.now(),
      userId,
      raterId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    
    // Safely access the userRatings collection
    const userRatingsCollection = router.db.get('userRatings');
    if (!userRatingsCollection) {
      console.error('userRatings collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    // Add rating to db
    userRatingsCollection.push(newRating).write();
    
    // Update user's average rating
    const userRatings = userRatingsCollection
      .filter({ userId: parseInt(userId) })
      .value() || [];
    
    if (userRatings.length > 0) {
      const sum = userRatings.reduce((total, r) => total + r.rating, 0);
      const averageRating = sum / userRatings.length;
      
      // Safely access the users collection
      const usersCollection = router.db.get('users');
      if (usersCollection) {
        const user = usersCollection.find({ id: parseInt(userId) });
        if (user.value()) {
          user.assign({
            averageRating,
            numberOfReviews: userRatings.length
          }).write();
        }
      }
    }
    
    console.log('User rating added successfully');
    res.status(201).jsonp(newRating);
  } catch (error) {
    console.error('Error adding user rating:', error);
    res.status(500).jsonp({ message: 'Server error while adding rating' });
  }
});

// Custom route for service ratings
server.post('/api/ratings/service', (req, res) => {
  try {
    const { serviceId, userId, rating, comment } = req.body;
    console.log('Adding service rating:', { serviceId, userId, rating });
    
    // Create new rating
    const newRating = {
      id: Date.now(),
      serviceId,
      userId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };
    
    // Safely access the serviceRatings collection
    const serviceRatingsCollection = router.db.get('serviceRatings');
    if (!serviceRatingsCollection) {
      console.error('serviceRatings collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    // Add rating to db
    serviceRatingsCollection.push(newRating).write();
    
    // Update service's average rating
    const serviceRatings = serviceRatingsCollection
      .filter({ serviceId: parseInt(serviceId) })
      .value() || [];
    
    if (serviceRatings.length > 0) {
      const sum = serviceRatings.reduce((total, r) => total + r.rating, 0);
      const averageRating = sum / serviceRatings.length;
      
      // Safely access the services collection
      const servicesCollection = router.db.get('services');
      if (servicesCollection) {
        const service = servicesCollection.find({ id: parseInt(serviceId) });
        if (service.value()) {
          service.assign({
            averageRating,
            numberOfReviews: serviceRatings.length
          }).write();
        }
      }
    }
    
    console.log('Service rating added successfully');
    res.status(201).jsonp(newRating);
  } catch (error) {
    console.error('Error adding service rating:', error);
    res.status(500).jsonp({ message: 'Server error while adding rating' });
  }
});

// Custom route for creating conversations
server.post('/api/conversations', (req, res) => {
  const { participants, serviceId, message } = req.body;
  
  // Create new conversation
  const newConversation = {
    id: Date.now(),
    participants,
    serviceId,
    lastMessage: message,
    lastMessageTime: new Date().toISOString(),
    unreadCount: 1
  };
  
  // Add conversation to db
  router.db.get('conversations').push(newConversation).write();
  
  // Create first message
  const newMessage = {
    id: Date.now(),
    conversationId: newConversation.id,
    senderId: participants[0],
    receiverId: participants[1],
    content: message,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  // Add message to db
  router.db.get('messages').push(newMessage).write();
  
  res.status(201).jsonp(newConversation);
});

// Add standard routes for direct access to resources
server.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt with:', { email, password });
    
    // Safely access the users collection
    const users = router.db.get('users');
    
    if (!users) {
      console.error('Users collection not found in database');
      return res.status(500).jsonp({ message: 'Database error' });
    }
    
    const usersArray = users.value() || [];
    console.log('Found users:', usersArray.length);
    
    const user = usersArray.find(u => u.email === email && u.password === password);
    
    if (user) {
      console.log('Login successful for user:', user.name);
      res.jsonp({
        token: 'fake-jwt-token',
        user: { ...user, password: undefined }
      });
    } else {
      console.log('Invalid login attempt');
      res.status(400).jsonp({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).jsonp({ message: 'Server error during login' });
  }
});

// Add categories endpoint
server.get('/categories', (req, res) => {
  try {
    // Return categories from db or a default list
    const categories = [
      { id: 1, name: 'Web Development', icon: 'code-slash' },
      { id: 2, name: 'Mobile App Development', icon: 'phone' },
      { id: 3, name: 'UI/UX Design', icon: 'palette' },
      { id: 4, name: 'Data Science', icon: 'graph-up' },
      { id: 5, name: 'Digital Marketing', icon: 'megaphone' },
      { id: 6, name: 'Content Writing', icon: 'pencil' },
      { id: 7, name: 'Video Editing', icon: 'camera-video' },
      { id: 8, name: 'Graphic Design', icon: 'brush' }
    ];
    
    res.jsonp(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).jsonp({ message: 'Server error while fetching categories' });
  }
});

// Use the router for all other routes
server.use(router);

// Start server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log(`Access the server at http://localhost:${port}`);
});
