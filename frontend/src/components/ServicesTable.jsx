import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import '../styles/tableStyles.css';



const ServicesTable = () => {
  const [data, setData] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", details: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const staticData = [
      { id: 1, name: "Logo Design", details: "Custom logo design for brands" },
    { id: 2, name: "Web Development", details: "Responsive websites using React or WordPress" },
    { id: 3, name: "SEO Optimization", details: "Improve website rankings and visibility" },
    { id: 4, name: "Content Writing", details: "Professional blog and article writing services" },
    { id: 5, name: "Social Media Management", details: "Grow and manage social media presence" },
  ];
    setData(staticData);
  }, []);

  const handleDelete = (id) => {
    const item = data.find((i) => i.id === id);
    Swal.fire({
      title: `Delete "${item.name}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "The service has been removed.", "success");
      }
    });
  };

  const handleEditClick = (item) => {
    setFormData(item);
    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleShowAdd = () => {
    setFormData({ id: null, name: "", details: "" });
    setIsEditing(false);
    setShowFormModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const action = isEditing ? "update" : "add";
    Swal.fire({
      title: `Confirm ${action}`,
      text: `Are you sure you want to ${action} this service?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isEditing ? "Yes, update" : "Yes, add",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isEditing) {
          setData((prev) =>
            prev.map((item) => (item.id === formData.id ? formData : item))
          );
          Swal.fire("Updated!", "Service has been updated.", "success");
        } else {
          const newItem = {
            ...formData,
            id: Math.max(...data.map((d) => d.id), 0) + 1,
          };
          setData((prev) => [...prev, newItem]);
          Swal.fire("Added!", "New service has been added.", "success");
        }
        setShowFormModal(false);
      }
    });
  };

  return (
    <div className="p-3">
      <div className="text-center mb-4">
  <Button
    style={{ backgroundColor: "#198754", border: "none" }}
    onClick={handleShowAdd}
  >
    <FaPlus className="me-1" />
    Add Service
  </Button>
</div>


      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Details</th>
            <th style={{ width: "180px" }}>Actions</th>
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
                  onClick={() => handleEditClick(item)}
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

      {/* Form Modal for Add/Edit */}
      <Modal show={showFormModal} onHide={() => setShowFormModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Service" : "Add New Service"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter service name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                name="details"
                required
                rows={3}
                value={formData.details}
                onChange={handleFormChange}
                placeholder="Enter service details"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowFormModal(false)}>
              Cancel
            </Button>
            <Button variant="success" type="submit">
              {isEditing ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ServicesTable;
