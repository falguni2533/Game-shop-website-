import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">

          {/* Logo & About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h2 className="footerLogo">🎮 GameShop</h2>
            <p className="footerText">
              Discover the latest games, explore exciting adventures,
              and build your ultimate gaming library with GameShop.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footerHeading">Quick Links</h5>
            <ul className="footerLinks">
              <li><a href="#home">Home</a></li>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#my-library">Library</a></li>
              <li><a href="#bag">Cart</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footerHeading">Support</h5>
            <ul className="footerLinks">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footerHeading">Follow Us</h5>

            <div className="socialIcons">
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-youtube"></i></a>
              <a href="#"><i className="bi bi-discord"></i></a>
            </div>
          </div>

        </div>

        <hr />

        <div className="copyright">
          © 2026 <span>GameShop</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;