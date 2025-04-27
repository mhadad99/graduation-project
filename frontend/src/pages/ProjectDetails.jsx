import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
        //     axios.get(http://localhost:5000/projects/${id})
        //     .then(res => setProject(res.data))
        //     .catch(err => console.error(err));
        // }, [id]);

        // if (!project) return <p>Loading...</p>;

    // (بدل axios مؤقتًا)
    const mockData = {
        title: "Website Redesign",
        postedTime: "2 days ago",
        location: "Riyadh, Saudi Arabia",
        description: "We need a full redesign of our company website using React and Bootstrap. Must be responsive and modern.",
        price: 1200,
        level: "Intermediate",
        type: "One-time project",
        skills: ["React", "Bootstrap", "CSS", "UI/UX"],
        client: {
          location: "KSA",
          rating: 4.8,
          reviewsCount: 25,
          totalSpent: "$5,000"
        }
      };

    setProject(mockData);
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
        <Container className="mt-5">
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2>{project.title}</h2>
              <p className="text-muted">{project.postedTime} • {project.location}</p>
              <hr />
              <h5>Description:</h5>
              <p>{project.description}</p>
    
              <Row className="mt-4">
                <Col md={6}>
                  <h5>Budget:</h5>
                  <Badge bg="success" className="fs-5">${project.price}</Badge>
                  <p className="mt-2"><strong>Level:</strong> {project.level}</p>
                  <p><strong>Type:</strong> {project.type}</p>
                </Col>
                <Col md={6}>
                  <h5>Required Skills:</h5>
                  <div>
                    {project.skills.map((skill, index) => (
                      <Badge key={index} bg="info" className="me-2 mb-1">{skill}</Badge>
                    ))}
                  </div>
                </Col>
              </Row>
    
              <hr className="my-4" />
    
              <h5>Client Info</h5>
              <p><strong>Location:</strong> {project.client.location}</p>
              <p><strong>Rating:</strong> {project.client.rating} ⭐ ({project.client.reviewsCount} reviews)</p>
              <p><strong>Total Spent:</strong> {project.client.totalSpent}</p>
            </Card.Body>
          </Card>
        </Container>
      );
}

export default ProjectDetails;
