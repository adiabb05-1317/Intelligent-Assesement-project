import React, { useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { Link, useParams,useNavigate } from "react-router-dom"; // Import useParams to get the subject from URL params

const InstructionPage = () => {
  const hist=useNavigate()
  const [agreed, setAgreed] = useState(false);
  const { subject } = useParams(); // Get the subject from URL params
 console.log(subject)
  // Function to handle user agreement
  const handleAgree = () => {
  hist(`/ExamPortal/${subject}`)
  };

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard className="text-center p-4">
            <MDBCardBody>
              <h2 className="mb-4">Test Instructions</h2>
              <div className="bg-light-green p-3 mb-4">
                {/* Instructions about Java and Python test */}
                <ul className="text-left">
                  <li>This is a test containing 30 questions on {subject}.</li>
                  <li>The duration of the test is 15 minutes.</li>
                  <li>There is no negative marking for wrong answers.</li>
                </ul>
              </div>
              <div className="mb-4">
                {/* Agree statement with checkbox */}
                <MDBInput
                  type="checkbox"
                  label="By checking this box, I agree to abide by the rules and conditions of the test. I understand that I cannot pause or restart the test once started."
                  id="agreeCheckbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
              </div>
              {/* Agree button */}
              <MDBBtn color="success" disabled={!agreed} onClick={handleAgree}>
                Continue Test
              </MDBBtn>
              <div className="mt-4">
                {/* Link to cancel and go back */}
                <Link to="/">Cancel</Link>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default InstructionPage;
