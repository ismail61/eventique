import React from "react";
import { Modal, Button } from "react-bootstrap";

const PaymentModal = ({ show, onHide, onSelectPaymentMethod }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Choose a payment method:</p>
        <Button variant="primary" onClick={() => onSelectPaymentMethod("stripe")}>
          Stripe
        </Button>
        <Button variant="secondary" onClick={() => onSelectPaymentMethod("cod")}>
          Cash on Delivery (COD)
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
