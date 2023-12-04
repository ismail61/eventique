import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const AboutUs = () => {
  return (
    <>
      <nav>
        <NavLink to={'/'}>
          <div className="">
            <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
          </div>
        </NavLink>
      </nav>
      <section id="websiteContent" className="websiteContent" style={{ height: '100vh' }}>
        <h2 style={{ textAlign: 'center' }}> About us </h2>
        <p>
          Eventique is a platform that aims to provide an elevated event planning experience by bringing together different elements of the event planning process. It will enable users to go through a directory of local venues, catering services, and decoration service providers, allowing them to compare services, prices, and view feedback from previous customers. Eventique will also offer direct communication channels allowing planners to articulate their ideas in a more efficient manner to users. Events providers are able to list their services from a variety of categories to satisfy the interests of the public. Also, users can review the profile of the events providers to see other customers’ reviews, past events, and valuable information e.g. Saudi commercial register.
        </p>
      </section>
      {/* Footer */}
      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </>
  );
};

export default AboutUs;
