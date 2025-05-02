import React from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

const serviceTitle = 'Professional Logo Design for Your Brand';
const coverImg = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80';

export default function ServiceHeader() {
  return (
    <div className="bg-white p-4 rounded border mb-3 shadow-sm d-flex flex-column align-items-center">
      <Breadcrumb className="mb-2" style={{ fontSize: '0.9rem' }}>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/services">Services</Breadcrumb.Item>
        <Breadcrumb.Item active>Logo Design</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fw-bold mb-3 text-center" style={{fontSize: '2rem'}}>{serviceTitle}</h2>
      <Card className="mb-3 p-3 align-items-center flex-row gap-4 border-0 shadow-sm" >
      <Image src="https://randomuser.me/api/portraits/women/68.jpg" roundedCircle width={72} height={72} alt="Seller Avatar" style={{objectFit: 'cover', border: '2px solid #d8e6fc'}} />
      <Stack gap={1} style={{flex: 1}}>
        <div className="d-flex align-items-center gap-2 justify-content-center">
          <span className="fw-semibold" style={{fontSize: '1.12rem'}}>Muhammad H</span>
           <Badge bg="success" className="ms-1">Top Rated</Badge>
        </div>
      
      </Stack>
    </Card>
      <Stack direction="horizontal" gap={3} className="align-items-center justify-content-center">
        <Image src={coverImg} alt="Service Cover" fluid rounded style={{maxHeight: 220, objectFit: 'cover', width: '100%'}} />
      </Stack>
    </div>
  );
}