/** @format */

import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ServiceCard from "../cards/ServiceCard";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllServicesAction, getMyServicesAction } from "../../store/slices/serviceSlice";

const ServicesTab = ({ isMyProfile }) => {
  const {myServices, isLoading, error} = useSelector((myStore)  => myStore.serviceSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyServicesAction());
  },[])
  return (
    <div className="services-tab">
      {isMyProfile && (
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary">
            <Plus className="me-2" />
            Add New Service
          </Button>
        </div>
      )}

      <Row xs={1} md={2} lg={3} className="g-4">
        {myServices.map((service) => (
          <Col key={service.id}>
            <ServiceCard service={service} isOwner={isMyProfile} />
          </Col>
        ))}

        {myServices.length === 0 && (
          <Col xs={12}>
            <div className="text-center py-5">
              <h5 className="text-muted mb-3">No services available</h5>
              {isMyProfile && (
                <Button variant="primary">
                  <Plus className="me-2" />
                  Create Your First Service
                </Button>
              )}
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ServicesTab;