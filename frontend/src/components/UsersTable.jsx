import { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaPlus } from "react-icons/fa";
// import axios from "axios"; // Uncomment when using API
import '../styles/tableStyles.css'; // Add this line at the top of your component

const MySwal = withReactContent(Swal);

const UsersTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", details: "" });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const staticData = [
      { id: 1, name: "John Doe", details: "Admin - john@example.com" },
      { id: 2, name: "Jane Smith", details: "Receptionist - jane@example.com" },
      { id: 3, name: "Ali Hassan", details: "Doctor - ali@hospital.com" },
    ];
    setData(staticData);

    // Uncomment for real API
    /*
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching UsersTable:", error);
      }
    };
    fetchData();
    */
  }, []);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "This user will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
        MySwal.fire("Deleted!", "User has been deleted.", "success");

        // Uncomment for real API
        /*
        await axios.delete(`http://localhost:3000/users/${id}`);
        */
      }
    });
  };

  const handleShowAdd = () => {
    setFormData({ id: null, name: "", details: "" });
    setEditMode(false);
    setShowModal(true);
  };

  const handleShowEdit = (user) => {
    setFormData(user);
    setEditMode(true);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.details) {
      MySwal.fire("Error", "Please fill in all fields.", "error");
      return;
    }

    if (editMode) {
      // Update existing
      setData((prev) =>
        prev.map((item) =>
          item.id === formData.id ? { ...formData } : item
        )
      );
      MySwal.fire("Updated!", "User has been updated.", "success");

      // Uncomment for real API
      /*
      await axios.put(`http://localhost:3000/users/${formData.id}`, formData);
      */
    } else {
      // Add new
      const newUser = { ...formData, id: Date.now() };
      setData((prev) => [...prev, newUser]);
      MySwal.fire("Added!", "New user has been added.", "success");

      // Uncomment for real API
      /*
      await axios.post("http://localhost:3000/users", newUser);
      */
    }

    setShowModal(false);
  };

  return (
    <div className="orders-container p-3">
      <div className="text-center mb-4">
          <Button
            style={{ backgroundColor: "#198754", border: "none" }}
            onClick={handleShowAdd}
          >
            <FaPlus className="me-1" />
             Add User
          </Button>
        </div>


      <Table className="orders-table" striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.details}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  className="me-2"
                  onClick={() => handleShowEdit(item)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role or email"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editMode ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsersTable;

