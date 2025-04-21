import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Badge from 'react-bootstrap/Badge';
// import { StarFill } from 'react-bootstrap-icons';

const seller = {
  name: 'Alexandra King',
  avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  location: 'New York, USA',
  rating: 4.9,
  reviews: 128,
  bio: `Award-winning graphic designer with a decade of experience creating custom logos and branding for startups and established businesses alike. Passionate about delivering creative vision and exceeding your expectations.`,
  topRated: true
};

export default function SellerInfo() {
  return (
    <Card className="mb-3 p-3 align-items-center flex-row gap-4 border-0 shadow-sm" style={{background: '#f8fafc'}}>
      <Image src={seller.avatar} roundedCircle width={72} height={72} alt="Seller Avatar" style={{objectFit: 'cover', border: '2px solid #d8e6fc'}} />
      <Stack gap={1} style={{flex: 1}}>
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold" style={{fontSize: '1.12rem'}}>{seller.name}</span>
          {seller.topRated && <Badge bg="success" className="ms-1">Top Rated</Badge>}
        </div>
        <div className="d-flex align-items-center gap-2">
          {/* <StarFill color="#f8a800" size={18} /><span className="fw-bold">{seller.rating}</span> */}
          <span className="text-secondary">({seller.reviews} reviews)</span>
          <span className="mx-2 text-muted">·</span>
          <span className="text-muted">{seller.location}</span>
        </div>
        <div className="text-secondary mt-1" style={{fontSize: '0.97rem', lineHeight: 1.5}}>{seller.bio}</div>
      </Stack>
    </Card>
  );
}