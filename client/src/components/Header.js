import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchBlogs } from "../redux/features/blogSlice";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Header = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = user?.token;

  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(setLogout());
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchBlogs(search));
      navigate(`/blogs/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#202c37" }}>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "white", fontWeight: "600", fontSize: "22px" }}
        >
          Blogs
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#f0f8ff" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            {user?.result?._id && (
              <h5
                style={{
                  marginRight: "30px",
                  marginTop: "27px",
                  color: "#48a9a6",
                }}
              >
                {user?.result?.name}
              </h5>
            )}

            <form
              className="d-flex input-group w-auto position-relative search-input"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search Blog"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="position-absolute search"
                style={{ marginTop: "5px", marginLeft: "5px" }}
              >
                <MDBIcon fas icon="search" />
              </div>
            </form>

            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text navbar-item">Home</p>
              </MDBNavbarLink>
            </MDBNavbarItem>
            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <p
                      className="header-text navbar-item"
                      onClick={() => navigate("/addBlog")}
                    >
                      Add Blog
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink>
                    <p
                      className="header-text navbar-item"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <p className="header-text navbar-item" onClick={handleLogout}>
                    Logout
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <p
                    className="header-text navbar-item"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
