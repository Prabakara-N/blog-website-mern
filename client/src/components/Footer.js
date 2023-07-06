import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <MDBFooter
      className="py-3 container-fluid d-flex flex-column justify-content-center align-items-center text-white"
      style={{ backgroundColor: "#202c37" }}
    >
      <p className="c-right text-center">
        Copyright &copy; MERN stack Blogs 2023. All rights reserved.
      </p>

      <div className="container d-flex social justify-content-center align-items-center gap-3 fs-4 ">
        <a href="https://www.instagram.com/swag__55__/">
          <div className="text-white">
            <FaInstagram className="s-icon" />
          </div>
        </a>
        <a href="https://www.linkedin.com/in/prabakaran-m-105289219/">
          <div className="text-white">
            <FaLinkedin className="s-icon" />
          </div>
        </a>
        <a href="https://github.com/Prabakara-N">
          <div className="text-white">
            <FaGithub className="s-icon" />
          </div>
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
