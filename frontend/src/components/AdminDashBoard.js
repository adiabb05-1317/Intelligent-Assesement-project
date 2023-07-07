import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const hist = useNavigate();

  const handleLogout = () => {
    hist("/");
  };

  const handleAddQuestion = async (language) => {
    const formData = new FormData();
    formData.append("myfile", file);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/questions/admin/addQuestions",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            language: language.toLowerCase(),
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully");
        alert("File uploaded successfully");
      } else {
        console.log("Error uploading file");
      }
    } catch (error) {
      console.log("Error uploading file", error);
    }
  };

  const handleAddSubject = () => {
    // Add logic to handle adding a subject
  };

  return (
    <div>
      <MDBNavbar expand="lg" dark bgColor="dark">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Admin Dashboard</MDBNavbarBrand>
          <MDBNavbarToggler
            type="button"
            data-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar id="navbarButtonsExample">
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="#">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">Questions</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">Subjects</MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <MDBNavbarItem>
                <MDBBtn color="danger" onClick={handleLogout}>
                  Logout
                </MDBBtn>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <MDBContainer fluid className="p-3">
        <MDBRow>
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <input
                  type="file"
                  className="custom-file-input"
                  name="myfile"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <div className="d-flex">
                  <MDBBtn
                    color="primary"
                    onClick={() => handleAddQuestion("java")}
                    className="mb-3 mt-3"
                  >
                    Add Java Questions
                  </MDBBtn>
                  <MDBBtn
                    color="primary"
                    onClick={() => handleAddQuestion("python")}
                    className="mb-3 mx-3 ml-3 mt-3"
                  >
                    Add Python Questions
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <h5 className="card-title">Add Subject/Programming Language</h5>
                <MDBInput
                  onChange={(e) => setSubject(e.target.value)}
                  label="Subject/Programming Language"
                />
                <MDBBtn color="primary" className="mb-3 mt-2 " onClick={handleAddSubject}>
                  Add Subject/Programming Language
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AdminDashboard;
