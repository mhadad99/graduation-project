
import { useState, useEffect } from "react";
import { Table, Modal, Button } from "react-bootstrap";
// import axios from "axios";
// import "../Styles/ManageOrdersTable.css";

const ProposalsTable = () => {
  const [data, setData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const staticData = [
      { id: 1, name: "Marketing Strategy", details: "Proposal for new product launch" },
      { id: 2, name: "App Modernization", details: "Modernize legacy systems" },
      { id: 3, name: "Cybersecurity Plan", details: "Implement security measures" },
    ];
    setData(staticData);

    /*
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/proposals");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching ProposalsTable:", error);
      }
    };
    fetchData();
    */
  }, []);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setData((prev) => prev.filter((item) => item.id !== itemToDelete));
    setShowDeleteModal(false);

    /*
    try {
      await axios.delete(`http://localhost:3000/proposals/${itemToDelete}`);
      setData((prev) => prev.filter((item) => item.id !== itemToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting:", error);
    }
    */
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleEdit = (id) => {
    alert(`Edit proposal with ID: ${id}`);
    // Add your actual edit logic here
  };

  return (
    <div className="orders-container p-3">
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
                  onClick={() => handleEdit(item.id)}
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

      <Modal show={showDeleteModal} onHide={handleDeleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProposalsTable;
