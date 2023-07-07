/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,

  MDBNavbarToggler,
  MDBCollapse,
} from "mdb-react-ui-kit";
import {Link} from 'react-router-dom';
import axios from "axios";
import jwt_decode from 'jwt-decode'
function Home() {
  const hist=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", {
        email: email,
        password: password,
      });
        const token=response.data;
        localStorage.setItem("token",token);
        const decodedToken=jwt_decode(token);

        if(decodedToken.role==="admin"){
          hist("/AdminDashBoard");
        }
        else{
          hist("/UserDashBoard");
        }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom ">
      {" "}
      <MDBNavbar expand="lg" light bgColor="light" className="fixed-top p-4">
        <div className="container">
          

          <MDBNavbarToggler
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink
                  style={{ fontSize: "1.8rem",color:"#4169E1",fontWeight:"bolder"}}
                  to="#"
                >
                 
                Intelligent Assessment System
                </MDBNavbarLink>
              </MDBNavbarItem>
            </ul>

            <div className="d-flex align-items-center">
             
              <MDBBtn color="primary" className="me-3">
                Sign up
              </MDBBtn>
              <a
                className="btn btn-dark px-3"
                href="https://github.com/adiabb05-1317/Intelligent-Assesement-project"
                role="button"
              >
                <MDBIcon fab icon="github" />
              </a>
            </div>
          </MDBCollapse>
        </div>
      </MDBNavbar>
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>

            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="facebook-f" />
            </MDBBtn>

            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="twitter" />
            </MDBBtn>

            <MDBBtn floating size="md" tag="a" className="me-2">
              <MDBIcon fab icon="linkedin-in" />
            </MDBBtn>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <MDBInput
            wrapperClass="mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            id="formControlLg"
            type="email"
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
          />

          <div className="d-flex justify-content-between mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn  onClick ={HandleSubmit} className="mb-0 px-5" size="lg">
              Login
            </MDBBtn>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Don't have an account?{" "}
             <Link to='/signup' className="danger">Register</Link>
            </p>
          </div>
        </MDBCol>
      </MDBRow>
      <div
        className="footer fixed-bottom  text-white py-2"
        style={{ backgroundColor: "#4169E1" }}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="text-white">
            Copyright © 2020. All rights reserved.
          </div>

          <div className="social-icons">
            <MDBBtn
              tag="a"
              color="none"
              className="mx-1"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="facebook-f" size="md" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-1"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="twitter" size="md" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-1"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="google" size="md" />
            </MDBBtn>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-1"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="linkedin-in" size="md" />
            </MDBBtn>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
}

export default Home;
