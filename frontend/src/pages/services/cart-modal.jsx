import React from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const CartModal = ({ show, onHide, items, total, onDeleteCartItem, handleCheckout, token }) => {
  const checkout = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/orders/checkout-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          items: items.map(item => {
            return {
              quantity: item.quantity,
              id: item.id?._id,
            }
          }),
        }),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        handleCheckout();
      } else {
        toast.error(responseData?.message || 'Failed to checkout');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Checkout request');
    }
  }
  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(items || []).map((item, index) => (
          <div key={index} className="cart-item">
            <p>{item?.id?.name}</p>
            <p>Price: SAR {item?.id?.price}.00</p>
            <p>Quantity: {item.quantity}</p>
            <Button variant="danger" onClick={() => onDeleteCartItem(item)}>
              Delete
            </Button>
            <hr />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <p>Total: SAR {total}.00</p>
        <Button variant="primary" onClick={checkout}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
