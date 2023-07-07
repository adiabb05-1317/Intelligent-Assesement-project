import React,{useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
function Signup() {
  const [email, setEmail] = useState('');
  const[password,setPassword]=useState('');
  const hist=useNavigate();
 const  handleSignup=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("http://localhost:3001/api/users/signup",{
        email:email,
        password:password
    }
      );
      console.log(res)
     
      hist('/')
  }
    catch(err)
    {
      console.log(err);
    }
 }
  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

              <h2 className="fw-bold mb-2 text-center">Sign Up</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' value={email} onChange={(e)=>setEmail(e.target.value)} id='formControlLg' type='email' size="lg"/>
              <MDBInput wrapperClass='mb-4 w-100' label='Password'  value={password} onChange={(e)=>setPassword(e.target.value)} id='formControlLg' type='password' size="lg"/>

              <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />

              <MDBBtn onClick={handleSignup} size='lg'>
                Sign up
              </MDBBtn>
              <Link to="/">aldready registered!</Link>
              <hr className="my-4" />

              <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
                <MDBIcon fab icon="google" className="mx-2"/>
                Sign up with google
              </MDBBtn>

              <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                <MDBIcon fab icon="facebook-f" className="mx-2"/>
                Sign up with facebook
              </MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default Signup;