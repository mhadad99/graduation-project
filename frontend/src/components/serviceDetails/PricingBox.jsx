import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// import { Card, Button } from "react-bootstrap";

export default function PricingBox() {
  const handlePayNow = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/payment/pay/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2MjIyOTMzLCJpYXQiOjE3NDYyMjI2MzMsImp0aSI6IjcyNjY4YWZmOThjMTQ5Mzc5NjdiOGE2Y2ZiODYzZWE1IiwidXNlcl9pZCI6MX0.71Hkjy-oAkfBvG_PuOFVwWj7iunSiN-XDBOSbfJ2_PQ` // replace with real token
          
        },
        body: JSON.stringify({
          email: "mhadad315@gmail.com", // replace with real user email (e.g., from context or props)
          amount: 14900 // $149 in cents  
        })
      });

      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url; // redirect to Paymob iframe
      } else {
        alert("Payment failed or no payment URL received.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment request failed.");
    }
  };

  return (
    <Card className="shadow-sm p-4 border-0 mb-3" style={{ background: '#f8fffa' }}>
      <h4 className="fw-bold mb-3">$149 <span className="fw-normal fs-6 text-secondary">USD</span></h4>
      <div className="mb-3 text-muted" style={{fontSize: '1.01rem'}}>Standard Package</div>
      <ul className="mb-3 ps-3">
        <li>Logo Design & Source Files</li>
        <li>Up to 3 Concepts</li>
        <li>Unlimited Revisions</li>
      </ul>
      <Button variant="success" size="lg" className="w-100 fw-semibold" onClick={handlePayNow}>
        Continue ($149)
      </Button>
      <div className="text-center mt-2 text-secondary" style={{fontSize: 12}}>Safe Upwork payment · 5-day delivery</div>
    </Card>
  );
}
