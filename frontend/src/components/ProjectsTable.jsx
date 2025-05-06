import { useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import '../styles/tableStyles.css';



const ProjectsTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "E-commerce Website",
      description: "Build a modern shopping platform",
      progress: "In Progress",
      experienceLevel: "Intermediate",
      type: "Web Development",
      budget: "$5000",
      location: "Remote",
      skills: ["React", "Node.js", "MongoDB"],
      hours: "120",
      rate: "$40/hr"
    },
    {
      id: 2,
      name: "Mobile App UI",
      description: "Design UI for a health app",
      progress: "Completed",
      experienceLevel: "Beginner",
      type: "UI/UX Design",
      budget: "$2000",
      location: "Onsite",
      skills: ["Figma", "Adobe XD"],
      hours: "60",
      rate: "$30/hr"
    }
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState({});

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    progress: "",
    experienceLevel: "",
    type: "",
    budget: "",
    location: "",
    skills: "",
    hours: "",
    rate: ""
  });

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The project has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  const handleEditClick = (item) => {
    setEditItem({ ...item, skills: item.skills?.join(", ") || "" });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = () => {
    const updatedItem = {
      ...editItem,
      skills: editItem.skills.split(",").map((s) => s.trim())
    };
    setData((prev) =>
      prev.map((item) => (item.id === editItem.id ? updatedItem : item))
    );
    setShowEditModal(false);
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new project.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
        const newProject = {
          ...newItem,
          id: newId,
          skills: newItem.skills.split(",").map((s) => s.trim())
        };
        setData((prev) => [...prev, newProject]);
        setNewItem({
          name: "",
          description: "",
          progress: "",
          experienceLevel: "",
          type: "",
          budget: "",
          location: "",
          skills: "",
          hours: "",
          rate: ""
        });
        setShowAddModal(false);

        Swal.fire({
          title: "Added!",
          text: "The project has been added successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="projects-container p-3">
      <div className="text-center mb-4">
                <Button
                  style={{ backgroundColor: "#198754", border: "none" }}
                  onClick={() => setShowAddModal(true)}                 >
                  <FaPlus className="me-1" />
                   Add Project
                </Button>
              </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Progress</th>
            <th>Experience Level</th>
            <th>Type</th>
            <th>Budget</th>
            <th>Location</th>
            <th>Skills</th>
            <th>Hours</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.progress}</td>
              <td>{item.experienceLevel}</td>
              <td>{item.type}</td>
              <td>{item.budget}</td>
              <td>{item.location}</td>
              <td>{item.skills?.join(", ")}</td>
              <td>{item.hours}</td>
              <td>{item.rate}</td>
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
                  onClick={() => handleDeleteClick(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(newItem).map((field) => (
              <Form.Group key={field} className="mb-2">
                <Form.Label>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={editItem[field] || ""}
                  onChange={handleEditChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add New Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(newItem).map((field) => (
              <Form.Group key={field} className="mb-2">
                <Form.Label>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={newItem[field]}
                  onChange={handleAddChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSave}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectsTable;
