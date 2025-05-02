import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function PricingBox() {
  return (
    <Card className="shadow-sm p-4 border-0 mb-3" style={{ background: '#f8fffa' }}>
      <h4 className="fw-bold mb-3 color-inverse">$149 <span className="fw-normal fs-6 text-secondary">USD</span></h4>
      <div className="mb-3 text-muted" style={{fontSize: '1.01rem'}}>Standard Package</div>
      <ul className="mb-3 ps-3 color-inverse">
        <li >Logo Design & Source Files</li>
        <li>Up to 3 Concepts</li>
        <li>Unlimited Revisions</li>
      </ul>
      <Button variant="success" size="lg" className="w-100 fw-semibold">
        Continue ($149)
      </Button>
      <div className="text-center mt-2 text-secondary" style={{fontSize: 12}}>Safe Upwork payment · 5-day delivery</div>
    </Card>
  );
}