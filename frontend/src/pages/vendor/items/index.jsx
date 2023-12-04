import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VendorNavbar from "../../../component/vendor-navbar";

const TableContent = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const vendor = localStorage.getItem('vendor');
  const [editedItem, setEditedItem] = useState({
    id: null,
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  const handleEdit = (item) => {
    setEditedItem(item);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditedItem({
      id: null,
      name: "",
      price: "",
      quantity: "",
      description: "",
    });
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/vendor/items/${editedItem._id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': vendor,
        },
        body: JSON.stringify(editedItem),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully edit a item');
        handleEditModalClose();
        fetchItems();
      } else {
        toast.error(responseData?.message || 'Failed to edit new item');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Request');
    }
  };

  // add data section
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewItem({
      name: "",
      price: "",
      quantity: "",
      description: "",
      image: "",
    });
  };

  const handleAddSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/vendor/items/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': vendor,
        },
        body: JSON.stringify(newItem),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully add a item');
        handleAddModalClose();
        fetchItems();
      } else {
        toast.error(responseData?.message || 'Failed to add new item');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Request');
    }
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3001/vendor/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': vendor,
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        setData(responseData?.data || [])
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (vendor) {
      fetchItems();
    } else {
      navigate('/vendor/signin')
    }
  }, [])
  return (
    <div>
      <VendorNavbar />
      <div className="data px-4" style={{ padding: '3%' }}>
        <div className="addbtn">
          <button variant="success" onClick={handleAddModalOpen}>
            Add Item
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Image url</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item,) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.description}</td>
                  <td><img src={item?.image} height={"150px"} width={"150px"} alt="Image url image" /></td>
                  <td className="">
                    <tr className="">
                      <td className="border-0">
                        <button
                          className="btn btn-info btn-sm mr-2 "
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      </td>
                      {/* <td className="border-0">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td> */}
                    </tr>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* edit modal */}
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  required
                  value={editedItem.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  name="price"
                  required
                  value={editedItem.price}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter quantity"
                  name="quantity"
                  required
                  value={editedItem.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={editedItem.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Image url"
                  name="image"
                  value={editedItem.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add Modal */}
        <div className="container px-5">
          <Modal show={showAddModal} onHide={handleAddModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    required
                    name="name"
                    value={newItem.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    required
                    name="price"
                    value={newItem.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formQuantity">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    name="quantity"
                    required
                    value={newItem.quantity}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={newItem.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formName">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Image url"
                    name="image"
                    value={newItem.image}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleAddSave}>
                Add Item
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>

  );
};

export default TableContent;