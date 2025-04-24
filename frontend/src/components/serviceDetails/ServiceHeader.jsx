import React from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ServiceHeader({ service }) {
  const { currentUser } = useSelector(state => state.user);
  
  if (!service) {
    return null;
  }
  
  // Get category from tags (first tag is usually the category)
  const category = service.tags && service.tags.length > 0 ? service.tags[0] : 'Service';
  
  return (
    <div className="bg-white p-4 rounded border mb-3 shadow-sm d-flex flex-column align-items-center">
      <Breadcrumb className="mb-2" style={{ fontSize: '0.9rem' }}>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/services' }}>Services</Breadcrumb.Item>
        <Breadcrumb.Item active>{category}</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fw-bold mb-3 text-center" style={{fontSize: '2rem'}}>{service.title}</h2>
      <Card className="mb-3 p-3 align-items-center flex-row gap-4 border-0 shadow-sm" >
        <Link to={`/profile/${service.userId}`}>
          <Image 
            src={currentUser && currentUser.id === service.userId ? 
              (currentUser.profileImage || "https://i.imgur.com/JFHjdNZ.jpeg") : 
              "https://i.imgur.com/JFHjdNZ.jpeg"} 
            roundedCircle 
            width={72} 
            height={72} 
            alt="Seller Avatar" 
            style={{objectFit: 'cover', border: '2px solid #d8e6fc'}} 
          />
        </Link>
        <Stack gap={1} style={{flex: 1}}>
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <Link to={`/profile/${service.userId}`} className="text-decoration-none">
              <span className="fw-semibold" style={{fontSize: '1.12rem'}}>
                {currentUser && currentUser.id === service.userId ? currentUser.name : 'Service Provider'}
              </span>
            </Link>
            {service.featured && <Badge bg="success" className="ms-1">Featured</Badge>}
            {service.averageRating >= 4.5 && <Badge bg="primary" className="ms-1">Top Rated</Badge>}
          </div>
        </Stack>
      </Card>
      <Stack direction="horizontal" gap={3} className="align-items-center justify-content-center">
        <Image 
          src={service.image || "https://i.imgur.com/thdopBi.jpeg"} 
          alt="Service Cover" 
          fluid 
          rounded 
          style={{maxHeight: 220, objectFit: 'cover', width: '100%'}} 
        />
      </Stack>
    </div>
  );
}