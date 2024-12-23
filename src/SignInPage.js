import React from 'react';
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

import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const SignInPage = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Add authentication logic here (optional).
    // If authentication is successful, navigate to the homepage.
    navigate('/homepage'); // Replace '/dashboard' with your desired homepage route
  };
  return (
    <FullScreenContainer>
      <FormWrapper>
        <Title>Welcome</Title>
        <Subtitle>Travel With A Peace Of Mind</Subtitle>
        <form onSubmit={handleSignIn}>
          <InputGroup>
            <InputIcon>
              <FaEnvelope />
            </InputIcon>
            <Input type="email" placeholder="Email" required />
          </InputGroup>
          <InputGroup>
            <InputIcon>
              <FaLock />
            </InputIcon>
            <Input type="password" placeholder="Password" required />
          </InputGroup>
          <Button type="submit">Sign In</Button> {/* Calls handleSignIn */}
        </form>
        <Link href="/signup">Don't have an account? Sign Up</Link>
      </FormWrapper>
    </FullScreenContainer>
  );
};

export default SignInPage;
