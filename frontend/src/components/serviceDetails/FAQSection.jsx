import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const faqs = [
  { question: "How many logo concepts will I get?", answer: "You'll receive three unique concepts to choose from, all tailored to your brand vision and requirements." },
  { question: "Can I request changes to my logo?", answer: "Absolutely, unlimited revisions are included until you are fully satisfied with the design." },
  { question: "What file formats are delivered?", answer: "You'll get AI, SVG, PNG, JPG, and PDF files suitable for digital and print use." },
];

export default function FAQSection() {
  return (
    <div className="mb-3">
      <h6 className="fw-bold mb-3">Frequently Asked Questions</h6>
      <Accordion>
        {faqs.map((faq, idx) => (
          <Accordion.Item eventKey={String(idx)} key={idx}>
            <Accordion.Header>{faq.question}</Accordion.Header>
            <Accordion.Body>{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}