import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [aboutUsSection, setAboutUsSection] = useState(false);
  const [faqSection, setFAQSection] = useState(false);
  const user = localStorage.getItem('user');

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:3001/user/home/vendors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        setVendors(responseData?.data || [])
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, [])

  return (
    <div>
      {/* Navigation */}
      <nav>
        <NavLink to={'/'}>
          <div className="">
            <img src="images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
          </div>
        </NavLink>
        <div className="tabs">
          <ul>
            <li>
              <a href="/contact">
                <button className="tab">
                  Contact
                </button>
              </a>
            </li>
            {!user ?
              (<>
                <li>
                  <a href="/signin">
                    <button className="tab">Sign In</button>
                  </a>
                </li>
                <li>
                  <a href="/signup">
                    <button className="tab">Signup</button>
                  </a>
                </li></>) :
              <>
                <li>
                  <a href="/logout">
                    <button className="tab">Log out</button>
                  </a>
                </li>
                <li>
                  <a href="/orders">
                    <button className="tab">Orders</button>
                  </a>
                </li>
                <li>
                  <a href="/change-password">
                    <button className="tab">Change Password</button>
                  </a>
                </li></>
            }

          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Eventique!</h1>
          <p>Your one-stop solution for event planning, party services, and catering in Riyadh.</p>
          <a href="#packages" className="btn">
            Start Now!
          </a>
        </div>
      </section>

      {/* Carousel */}
      <div
        id="myCarousel"
        className="carousel slide carousel-container"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        {/* Slides - CHANGE PICTURES HERE */}
        <div className="carousel-inner text-center">
          <div className="carousel-item active">
            <img src="images/carousel1.png" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="images/carousel2.png" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="images/carousel3.png" alt="Slide 3" />
          </div>
          <div className="carousel-item">
            <img src="images/carousel4.png" alt="Slide 4" />
          </div>
        </div>

        {/* Controls */}
        <a className="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

      {/* Packages Section */}
      <section id="packages" className="packages">
        <h2>Explore our vendors!</h2>
        <div className="package-list">
          {
            (vendors || []).map(vendor => {
              return (
                <div className="package-card">
                  <img src="https://example.com/package1.jpg" alt="Package 1" />
                  <h3>{vendor?.name}</h3>
                  <NavLink to={`/${vendor?._id}/services`}>
                    <p>Visit shop</p>
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about" onClick={() => setAboutUsSection(!aboutUsSection)}>
        <div className="section">
          <h2>About Us</h2>
          {
            aboutUsSection && (<div id="section1-content" className="section-content">
              <p>
                Eventique is a comprehensive website and serves as a centralized hub for event
                planning, party services, catering, and the advertising of nearby party stores and
                event boutiques. By giving individuals, event planners, and businesses a practical
                and user-friendly solution, it seeks to revolutionize the event industry in Riyadh,
                Saudi Arabia.
              </p>
            </div>)
          }
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq" onClick={() => setFAQSection(!faqSection)}>
        {
          <div className="section">
            <h2>FAQ</h2>
            {
              faqSection && (<div id="section2-content" className="section-content">
                <div className="question">How do I find the right event planner for my needs?</div>
                <div className="answer">
                  Our website provides a search feature that allows clients to filter event planners
                  based on various criteria including event type. Clients can browse through event
                  planner profiles, portfolios, and ratings to help them make a decision.
                </div>
                <div className="question">How do I ensure the reliability and quality of event planners?</div>
                <div className="answer">
                  We strive to maintain a high standard of quality on our platform. Event planners are
                  required to create profiles that showcase their experience, portfolio, and services.
                  Clients can browse through these profiles to assess the event planner's credibility
                  and expertise.
                </div>
              </div>)
            }

          </div>
        }
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
