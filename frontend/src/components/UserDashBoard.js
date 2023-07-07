import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBNavbarToggler, MDBCollapse } from 'mdb-react-ui-kit';

const UserDashboard = () => {
  const userEmail = localStorage.getItem('userEmail'); // Get user email from localStorage token

  const previousTests = [
    { id: 1, language: 'Java', score: 90 },
    { id: 2, language: 'Python', score: 85 },
  ];
  const handleLogout=()=>{
    localStorage.removeItem('userEmail');
    window.location.href='/';
  }

  return (
    <div>
      <MDBNavbar expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'>Dashboard</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarButtonsExample'
            aria-controls='navbarButtonsExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </MDBNavbarToggler>
          <MDBCollapse navbar id='navbarButtonsExample'>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page' href='#'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#'>Your Previous Tests</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavbarItem>
              <MDBBtn color="danger" onClick={handleLogout}>
                  Logout
                </MDBBtn>
                <MDBNavbarLink href='/'>{userEmail}</MDBNavbarLink> {/* Display user email */}
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBContainer fluid className='p-3'>
        <MDBRow>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <h5 className='card-title'>Welcome to Your Dashboard!</h5>
                <p className='card-text'>You can attempt tests in Java and Python.</p>
                <MDBBtn color='primary'>Start Java Test</MDBBtn>
                <MDBBtn color='primary'>Start Python Test</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md='6'>
            <MDBCard>
              <MDBCardBody>
                <h5 className='card-title'>Previous Test Results</h5>
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
