
import "./App.css";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import ProfileSettings from "./component/profile";
import Home from "./pages/home";
import VendorProfile from "./pages/vendor";
import AboutUs from "./component/aboutUs";
import Contact from "./pages/contact";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VendorSignUp from "./pages/vendor/signup";
import Services from "./pages/services";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from "./pages/logout";
import VendorSignIn from "./pages/vendor/signin";
import TableContent from "./pages/vendor/items";
import OrderTable from "./pages/order";
import ForgotPassword from "./pages/forgotpassword";
import ChangePassword from "./pages/changePassword";
import ResetPassword from "./pages/resetPassword";
import Orders from "./pages/vendor/orders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" exact element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/orders" element={<OrderTable />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/vendor/signup" element={<VendorSignUp />} />
          <Route path="/vendor/signin" element={<VendorSignIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/:vendorId/services" exact element={<Services />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/vendor/items" element={<TableContent />} />
          <Route path="/vendor/orders" element={<Orders />} />
          <Route path="/vendor" element={<VendorProfile />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
    </div>
  );
}

export default App;
