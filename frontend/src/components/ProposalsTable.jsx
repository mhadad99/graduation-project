import { useState, useEffect } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaPlus } from "react-icons/fa";

import '../styles/tableStyles.css';

// import axios from "axios";

const MySwal = withReactContent(Swal);

const ProposalsTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({ name: "", details: "" });

  useEffect(() => {
    const staticData = [
      { id: 1, name: "Logo Design", details: "Modern minimalist logo for tech startup" },
      { id: 2, name: "SEO Optimization", details: "Improve ranking for e-commerce site" },
      { id: 3, name: "Content Writing", details: "10 blog posts on digital marketing" },
    ];
    setData(staticData);

    /*
    // Uncomment and adjust when backend is ready
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/proposals");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
    };
    fetchData();
    */
  }, []);

  const handleDelete = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this proposal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prev) => prev.filter((item) => item.id !== id));

        /*
        // Uncomment when using API
        try {
          await fetch(`http://localhost:3000/proposals/${id}`, {
            method: "DELETE",
          });
        } catch (error) {
          console.error("Delete error:", error);
        }
        */

        MySwal.fire("Deleted!", "The proposal has been deleted.", "success");
      }
    });
  };

  const handleShowAdd = () => {
    setEditingItem(null);
    setForm({ name: "", details: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ name: item.name, details: item.details });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.details) {
      MySwal.fire("Error", "All fields are required.", "error");
      return;
    }

    if (editingItem) {
      const updated = data.map((item) =>
        item.id === editingItem.id ? { ...item, ...form } : item
      );
      setData(updated);

      /*
      // Uncomment when using API
      try {
        await fetch(`http://localhost:3000/proposals/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } catch (error) {
        console.error("Edit error:", error);
      }
      */

      MySwal.fire("Updated!", "Proposal has been updated.", "success");
    } else {
      const newItem = {
        id: data.length + 1,
        ...form,
      };
      setData([...data, newItem]);

      /*
      // Uncomment when using API
      try {
        await fetch("http://localhost:3000/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
      } catch (error) {
        console.error("Add error:", error);
      }
      */

      MySwal.fire("Added!", "Proposal has been added.", "success");
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
             Add Proposal
          </Button>
        </div>

      <Table striped bordered hover responsive className="orders-table">
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
                  onClick={() => handleEdit(item)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingItem ? "Edit Proposal" : "Add Proposal"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Proposal Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                value={form.details}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            {editingItem ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProposalsTable;
