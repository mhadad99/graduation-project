import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const images = [
  'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
];

export default function PortfolioGallery() {
  return (
    <Card className="p-3 shadow-sm border-0 mb-3">
      <h6 className="fw-bold mb-3">Portfolio</h6>
      <Row xs={1} md={1} className="g-2">
        {images.map((img, i) => (
          <Col key={i}>
            <Card.Img src={img} alt={`Portfolio ${i + 1}`} style={{height: 120, objectFit: 'cover', borderRadius: 8}} />
          </Col>
        ))}
      </Row>
    </Card>
  );
}