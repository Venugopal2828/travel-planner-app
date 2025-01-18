import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";

import {
  FullScreenContainer,
  FormWrapper,
  Title,
  Subtitle,
  InputGroup,
  Input,
  InputIcon,
  Button,
  Link,
} from './SharedStyles'; // Adjust the import path if necessary
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userId: '',
  });
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8083/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      const decodedToken = jwtDecode(data.token);  // Decode the token to get userId
      const username = decodedToken.sub; 
      localStorage.setItem('username', username);
      console.log('Username:', username);
      const userId = data.userId; // Assuming 'sub' is where the userId is stored

      localStorage.setItem('userId', userId);
      console.log('User ID:', userId, "saved in local storage");
      console.log(data);
      setMessage('Login successful!');
      navigate('/homepage');
      } else {
        const errorData = await response.text();
        setMessage(`Error: ${errorData}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <FullScreenContainer>
      <FormWrapper>
        <Title>Welcome</Title>
        <Subtitle>Travel With A Peace Of Mind</Subtitle>
        {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        <form onSubmit={handleSignIn}>
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </InputGroup>
          <Button type="submit">Sign In</Button>
        </form>
        <Link href="/signup">Don't have an account? Sign Up</Link>
      </FormWrapper>
    </FullScreenContainer>
  );
};

export default SignInPage;
