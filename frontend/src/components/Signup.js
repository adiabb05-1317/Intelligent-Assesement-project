import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Signup = () => {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6" className="mx-auto">
          <div className="text-center">
            <h2>Beautiful Login Page</h2>
          </div>
          <form>
            <div className="grey-text">
              <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" />
              <MDBInput label="Your password" icon="lock" group type="password" validate />
            </div>
            <div className="text-center">
              <MDBBtn color="primary">Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
        <MDBCol md="6" className="d-flex align-items-center justify-content-center">
          <div>
            <img src="intelligent_assessment_picture.png" alt="Intelligent Assessment" />
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Signup;
