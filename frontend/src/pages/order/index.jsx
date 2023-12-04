import React, { useEffect, useState } from "react";
import { Table, Button, Collapse } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const OrderTable = () => {
    const [openOrder, setOpenOrder] = useState(null);
    const user = localStorage.getItem('user');
    const [orders, setOrder] = useState([]);
    const navigate = useNavigate();

    const toggleOrderDetails = (orderId) => {
        setOpenOrder((prevOpenOrder) => (prevOpenOrder === orderId ? null : orderId));
    };

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:3001/user/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user,
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
        if (user) {
            fetchOrders();
        } else {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <nav>
                <NavLink to={'/'}>
                    <div className="">
                        <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
                    </div>
                </NavLink>
                <div className="tabs">
                    <ul>
                        <li>
                            <a href="/logout">
                                <button className="tab">Logout</button>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div style={{ padding: '2%' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
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
                                    <td>{order.grandTotalPrice}</td>
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order?.items?.map((item) => (
                                                            <tr key={item._id}>
                                                                <td>{item.name}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{item.price}</td>
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
