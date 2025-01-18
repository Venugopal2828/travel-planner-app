import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import styled from 'styled-components';
//import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
//import { FacebookLoginButton } from '@fb-tools/react';
import axios from 'axios';
import imagenote from './pic1.png';
//import Dashboard from './components/Dashboard';

// const SignUpPage = () => {
  // const navigate = useNavigate();

  const SignUpPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });
  
    const [message, setMessage] = useState("");
  
    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:8083/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          const data = await response.text(); // Assuming the backend sends a success message
          setMessage(`Success: ${data}`);
        } else {
          const errorData = await response.text();
          setMessage(`Error: ${errorData}`);
        }
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

  // // Handle Google Login Success
  // const handleGoogleSuccess = async (credentialResponse) => {
  //   const token = credentialResponse.credential; // Google token
  //   console.log('Google Token:', token);

  //   try {
  //     const response = await axios.post('http://localhost:8080/api/auth/google', { token });
  //     console.log('Google Login Success:', response.data);

  //     // Save token locally
  //     localStorage.setItem('authToken', response.data.token);

  //     // Redirect to dashboard
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error('Error during Google Login:', error.response?.data || error.message);
  //   }
  // };

  // // Handle Google Login Failure
  // const handleGoogleFailure = () => {
  //   console.log('Google Login Failed');
  // };

  // Handle Google Login Success
  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; //Google Token
    
    try{
      const response = await axios.post('http://localhost:8080/user/google-login', {token});
      if (response.status === 200){
        console.log('Google Login Success:', response.data);
        localStorage.setItem('authToken', response.data.token);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during Google Login:', error.response?.data || error.message);
      setMessage("Google Login Failed. Please try again");
    }
  };

  // Handle Google Login Failure
  const handleGoogleFailure = () => {
    console.log('Google Login Failed');
    alert("Google Login Failed. Please try again");
  };
  // // Handle Facebook Login Success
  // const handleFacebookResponse = async (response) => {
  //   console.log('Facebook Response:', response);

  //   if (response.accessToken) {
  //     try {
  //       const res = await axios.post('http://localhost:8080/api/auth/facebook', {
  //         token: response.accessToken,
  //       });
  //       console.log('Facebook Login Success:', res.data);

  //       // Save token locally
  //       localStorage.setItem('authToken', res.data.token);

  //       // Redirect to dashboard
  //       navigate('/dashboard');
  //     } catch (error) {
  //       console.error('Error during Facebook Login:', error.response?.data || error.message);
  //     }
  //   } else {
  //     console.error('Facebook Login Failed');
  //   }
  // };

  // // Regular Sign-Up Handler (example only)
  // const handleSignUp = async (e) => {
  //   e.preventDefault();

  //   const userData = {
  //     username: e.target.username.value,
  //     email: e.target.email.value,
  //     password: e.target.password.value,
  //   };

  //   try {
  //     const response = await axios.post('http://localhost:8080/api/auth/signup', userData);
  //     console.log('Sign Up Success:', response.data);

  //     // Save token locally
  //     localStorage.setItem('authToken', response.data.token);

  //     // Redirect to dashboard
  //     navigate('/dashboard');
  //   } catch (error) {
  //     console.error('Error during Sign Up:', error.response?.data || error.message);
  //   }
  // };

  return (
    <PageContainer>
      <Box>
        <Title>Create Your Account</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="username" type="text" placeholder="User Name"  onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email"  onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password"  onChange={handleChange} required />
          <Button type="submit">Sign Up</Button>
          {message && <p>{message}</p>}
        </Form>

        {/* Social Login */}
        <SocialLogin>
          <p>or connect with</p>
          <SocialButtons>
            {/* Facebook Login */}
            {/* <FacebookLoginButton
              appId="YOUR_FACEBOOK_APP_ID"
              onSuccess={handleFacebookResponse}
              onFailure={() => console.log('Facebook Login Failed')}
            /> */}

            {/* Google Login */}
            <GoogleOAuthProvider clientId="1030368328414-e3kd4umrp7148tstotg65uaukagjca78.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </GoogleOAuthProvider>
          </SocialButtons>
        </SocialLogin>

        <Footer>
          Already have an account?{' '}
          <Link onClick={() => navigate('/signin')}>Sign In</Link>
        </Footer>
      </Box>
    </PageContainer>
  );
};

export default SignUpPage;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${imagenote}) no-repeat center center/cover;
`;

const Box = styled.div`
  background: rgba(230, 218, 241, 0.5);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 350px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem;
  font-size: 1rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  background: #2193b0;
  transition: 0.3s;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }
`;

const SocialLogin = styled.div`
  text-align: center;

  p {
    margin-bottom: 0.8rem;
    color: #34495e;
  }
`;

const SocialButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: rgb(46, 1, 48);
`;

const Link = styled.span`
  color: rgb(26, 1, 34);
  cursor: pointer;
  text-decoration: underline;
  margin-left: 5px;
`;
