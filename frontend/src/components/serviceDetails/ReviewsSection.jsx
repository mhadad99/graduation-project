import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';

const reviews = [
  {
    name: 'Evan R.',
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
    rating: 5,
    date: 'Jan 2024',
    text: "Superb work! The logo really reflects our brand and Alexandra made all tweaks fast. We'll be back for more design work soon.",
  },
  {
    name: 'Maria J.',
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg',
    rating: 5,
    date: 'Dec 2023',
    text: "Great collaboration—quick communication and an excellent end result. Highly recommend for logo projects.",
  },
];

function StarRating({ value }) {
    return (
        <span style={{ color: '#f8a800' }}>
            {'★'.repeat(Math.round(value))}{'☆'.repeat(5 - Math.round(value))}
        </span>
    );
}

export default function ReviewsSection() {
  return (
    <Card className="p-4 shadow-sm border-0">
      {/* <h6 className="fw-bold mb-3 color-inverse ">Reviews</h6> */}
      <Stack gap={3}>
        {reviews.map((r, i) => (
          <div key={i} className="d-flex gap-3 align-items-start">
            <Image src={r.avatar} roundedCircle width={40} height={40} alt={r.name} />
            <div>
              <div className="fw-semibold text-muted" style={{fontSize: '1.02rem'}}>{r.name}
                <span className="ms-2"><StarRating value={r.rating} /></span>
                <span className="ms-2 text-secondary" style={{fontSize:12}}>{r.date}</span>
              </div>
              <div className="text-secondary mt-1" style={{fontSize:'0.98rem'}}>{r.text}</div>
            </div>
          </div>
        ))}
      </Stack>
    </Card>
  );
}