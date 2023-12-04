import React, { useEffect, useState } from "react";
import "./index.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import CartModal from "./cart-modal";
import PaymentModal from "./payment-method";

const YourComponent = () => {
  const [items, setItems] = useState([]);
  const [carts, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { vendorId } = useParams();
  const user = localStorage.getItem('user');
  const navigate = useNavigate();
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const addToCart = async (item) => {
    if (!user) {
      navigate('/signin')
    } else {
      try {
        const response = await fetch('http://localhost:3001/user/cart/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': user,
          },
          body: JSON.stringify({
            itemId: item._id,
            quantity: 1
          }),
        });

        const responseData = await response.json();
        if (responseData?.data) {
          fetchCart();
          displayCart();
        } else {
          toast.error(responseData?.message || 'Failed to add to cart');
        }
      } catch (error) {
        console.log(error);
        toast.error('Invalid Signup');
      }
    }
  };

  const displayCart = async () => {
    setCartModalOpen(true);
  };

  const closeCartModal = () => {
    setCartModalOpen(false);
  };

  const fetchVendorItems = async () => {
    try {
      const url = inputValue ? `http://localhost:3001/user/items/${vendorId}?inputValue=${inputValue}` : `http://localhost:3001/user/items/${vendorId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        setItems(responseData?.data || [])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
      });

      const responseData = await response.json();
      if (responseData?.data?.items) {
        setCart(responseData?.data?.items || []);
        setTotal(responseData?.data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    setCartModalOpen(false);
    setPaymentModalOpen(true);
  };

  const handlePaymentMethodSelect = (method) => {
    // Handle the selected payment method (stripe or cod)
    console.log("Selected Payment Method:", method);
    setPaymentModalOpen(false);
    placeOrder(method);
  };

  const placeOrder = async (method) => {
    try {
      const response = await fetch('http://localhost:3001/user/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({
          items: carts?.map(item => {
            return {
              quantity: item.quantity,
              id: item.id?._id,
            }
          }),
          paymentMethod: method,
        }),
      });

      const responseData = await response.json();
      if (responseData?.data && responseData?.data?.url) {
        closeCartModal();
        window.location.href = responseData?.data?.url;
      } else if (responseData?.data) {
        closeCartModal();
        window.location.href = '/orders'
      }
      else {
        toast.error(responseData?.message || 'Failed to checkout');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Checkout request');
    }
  }

  const deleteCartItem = async (item) => {
    try {
      closeCartModal();
      const response = await fetch(`http://localhost:3001/user/cart/item-delete/${item?.id?._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        fetchCart();
      } else {
        toast.error(responseData?.message || 'Failed to delete cart item');
      }
    } catch (error) {

    }
  };

  const profileHandler = async () => {
    user ? navigate('/profile') : navigate('/signin');
  }

  const handleInput = async (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    fetchVendorItems();
  }, [inputValue])

  useEffect(() => {
    fetchVendorItems();
    if (user) {
      fetchCart();
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
        <div className="search-profile-cart">
          <input type="text" className="search-bar" placeholder="Search items" onChange={handleInput} />
          <span onClick={profileHandler} style={{ marginBottom: '15px' }}><i className="fas fa-user profile-icon"></i></span>
          <span onClick={displayCart} style={{ marginBottom: '15px' }}>
            <div className="cart">
              <i className="fas fa-shopping-cart shopping-cart"></i>{" "}
              <p id="count">{carts?.length || 0}</p>{" "}
            </div>
          </span>
        </div>
        <div className="tabs">
          <ul>
            <li>
              <a href="/about">
                <button className="tab">About Us</button>
              </a>
            </li>
            <li>
              <a href="/faq">
                <button className="tab">FAQ</button>
              </a>
            </li>
            {
              !user ? <>
                <li>
                  <a href="/signin">
                    <button className="tab">Sign in</button>
                  </a>
                </li>
                <li>
                  <a href="/signup">
                    <button className="tab">Sign up</button>
                  </a>
                </li>
              </> : <>
                <li>
                  <a href="/logout">
                    <button className="tab">Logout</button>
                  </a>
                </li>
                <li>
                  <a href="/orders">
                    <button className="tab">Orders</button>
                  </a>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>

      <section className="websiteContent_service" style={{ height: '100vh' }}>
        <h2>Explore our services!</h2>
        <div className="">
          <div className="row">
            {/* Items Section (large screens) */}
            <div className="col-lg-12">
              <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
                {(items || []).map((item) => (
                  <div key={item?._id} className="col">
                    <div className="card">
                      <img className="card-img-top" src={item.image} alt={item.name} />
                      <div className="card-body">
                        <p className="card-title" style={{ fontWeight: "bold", fontSize: "12px" }}>{item.name}</p>
                        <p className="card-text" style={{ fontSize: "12px" }}>{item.description}</p>
                        <p className="card-text" style={{ fontSize: "12px" }}>{item.quantity}</p>
                        <h5 className="card-price" style={{ color: "black", fontSize: "15px" }}>SAR {item.price}.00</h5>
                        {
                          item.quantity !== 0 ? <button className="btn btn-primary" onClick={() => addToCart(item)}>Add to cart</button> : <button className="btn btn-danger">Out of stock</button>
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CartModal
        show={isCartModalOpen}
        onHide={closeCartModal}
        items={carts}
        total={total}
        onDeleteCartItem={deleteCartItem}
        handleCheckout={handleCheckout}
        token={user}
      />

      <PaymentModal show={isPaymentModalOpen} onHide={() => setPaymentModalOpen(false)} onSelectPaymentMethod={handlePaymentMethodSelect} />


      {/* Footer */}
      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default YourComponent;
