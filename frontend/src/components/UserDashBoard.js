import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
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

  const previousTests = [
    { id: 1, language: "Java", score: 90 },
    { id: 2, language: "Python", score: 85 },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const handleTest = (subject) => () => {
    hist(`/InstructionPage/${subject}`);
  };

  return (
    <div>
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Dashboard</MDBNavbarBrand>
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
                <MDBNavbarLink href="#">
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
                <MDBBtn color="danger" onClick={handleLogout}>
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
        <MDBRow>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <h2 className="card-title">Welcome to Your Dashboard!</h2>
                <p className="card-text">
                  You can attempt tests in Java and Python.
                  <br />
                  Please read the instructions carefully before starting the
                  test.
                </p>
                <MDBBtn color="primary" onClick={handleTest("java")}>
                  Start Java Test
                </MDBBtn>
                <MDBBtn color="primary" onClick={handleTest("python")}>Start Python Test</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <h2 className="card-title">Previous Test Results</h2>
                <MDBTable striped>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th>Language</th>
                      <th>Score</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {previousTests.map((test) => (
                      <tr key={test.id}>
                        <td>{test.id}</td>
                        <td>{test.language}</td>
                        <td>{test.score}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default UserDashboard;
