/** @format */

import React, { useEffect } from "react";
import { Card, Image, Stack, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../store/slices/userSlice";
import { Link } from "react-router-dom";

export default function SellerInfo({ id }) {
  const dispatch = useDispatch();
  const { profile, isLoading } = useSelector((myStore) => myStore.userSlice);

  useEffect(() => {
    // Don't make the API call if id is undefined
    if (id) {
      dispatch(fetchUserProfile(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Add check for profile existence
  if (!profile) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="text-center text-muted">
            Profile not found
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <div className="d-flex gap-4">
          <Link to={`/profile/${profile?.id}`}>
            <Image
              src={profile?.photo || '/default-avatar.png'} // Add fallback image
              roundedCircle
              width={72}
              height={72}
              className="seller-avatar"
            />
          </Link>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 mb-2">
              <h5 className="mb-0">
                {profile?.first_name} {profile?.second_name}
              </h5>
            </div>
            <div className="text-muted mb-3">
              <small>
                {profile?.response_time || 'N/A'} Response Time
              </small>
            </div>
            <p className="mb-3">{profile?.bio || 'No bio available'}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
