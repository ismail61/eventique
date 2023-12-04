import React, { useEffect, useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import VendorNavbar from "../../../component/vendor-navbar";

const OrderTable = () => {
  const [openOrder, setOpenOrder] = useState(null);
  const vendor = localStorage.getItem('vendor');
  const [orders, setOrder] = useState([]);
  const navigate = useNavigate();

  const toggleOrderDetails = (orderId) => {
    setOpenOrder((prevOpenOrder) => (prevOpenOrder === orderId ? null : orderId));
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3001/vendor/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': vendor,
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        setOrder(responseData?.data || [])
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vendor) {
      fetchOrders();
    } else {
      navigate('/vendor/signin')
    }
  }, [])

  return (
    <div>

      <VendorNavbar />
      <div style={{ padding: '2%' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Order Date</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <React.Fragment key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>{order.createdAt?.substring(0, 10)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.status}</td>
                  <td>
                    <Button variant="primary" onClick={() => toggleOrderDetails(order._id)}>
                      {openOrder === order.id ? "Hide Details" : "Show Details"}
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <Collapse in={openOrder === order._id}>
                      <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Item Name</th>
                              <th>Quantity</th>
                              <th>Price</th>
                              <th>User Info</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order?.items?.map((item) => (
                              <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{JSON.stringify(order.user)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
