import React from 'react';

const VendorProfile = () => {
  return (
    <div>
      <header>
        <div className="">
          <img src="images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
        </div>
        <div className="header-content">
          <h1>Vendor Name</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Packages</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="services">
          <h2>Services</h2>
          <div className="service">
            <h3>Service 1</h3>
            <p>Description of Service 1</p>
            <button>Book Now</button>
          </div>
          <div className="service">
            <h3>Service 2</h3>
            <p>Description of Service 2</p>
            <button>Book Now</button>
          </div>
          {/* Add more service divs as needed */}
        </section>

        <section className="packages">
          <h2>Packages</h2>
          <div className="package">
            <h3>Package 1</h3>
            <p>Description of Package 1</p>
            <button>Book Now</button>
          </div>
          <div className="package">
            <h3>Package 2</h3>
            <p>Description of Package 2</p>
            <button>Book Now</button>
          </div>
          {/* Add more package divs as needed */}
        </section>
      </main>

      <footer>
        <p>&copy; 2023 Vendor Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorProfile;
