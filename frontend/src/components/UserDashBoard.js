import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const UserDashboard = () => {
  const hist = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage
  const userEmail = jwtDecode(token).email; // Decode token and get userEmail

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const handleTest = (subject) => () => {
    hist(`/InstructionPage/${subject}`);
  };

  return (
    <div className="bg-light vh-100">
      <MDBNavbar expand="lg" dark bgColor="dark" className="mb-5">
        <MDBContainer fluid>
          <MDBNavbarBrand className="font-weight-bold">Dashboard</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </MDBNavbarToggler>
          <MDBCollapse navbar id="navbarButtonsExample">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="#">
                  <MDBIcon icon="home" className="me-2" />
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/previousResults">
                  <MDBIcon icon="file-alt" className="me-2" />
                  Your Previous Tests
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  <MDBIcon icon="chart-bar" className="me-2" />
                  Test Statistics
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">
                  <MDBIcon icon="chart-pie" className="me-2" />
                  Analysis
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavbarItem>
                <MDBBtn rounded color="danger" className="px-4" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </MDBNavbarItem>
              {userEmail && (
                <div className="d-flex align-items-center">
                  <div className="me-2 font-weight-bold text-white">
                    {userEmail}
                  </div>
                  <MDBNavbarLink href="/UserDashBoard.js">
                    <MDBIcon icon="user" className="me-1" />
                  </MDBNavbarLink>
                </div>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBContainer fluid className="p-3">
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard className="shadow">
              <MDBCardBody>
                <h2 className="card-title text-center mb-4 font-weight-bold">Welcome to Your Dashboard!</h2>
                <p className="card-text text-center mb-4">
                  You can attempt tests in Java and Python. Please read the instructions carefully before starting the test.
                </p>
                <div className="d-flex justify-content-between">
                  <MDBBtn rounded color="primary" className="px-5" onClick={handleTest("java")}>
                    Start Java Test
                  </MDBBtn>
                  <MDBBtn rounded color="secondary" className="px-5" onClick={handleTest("python")}>
                    Start Python Test
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default UserDashboard;
