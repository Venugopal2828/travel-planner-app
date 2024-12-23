import styled from 'styled-components';
import imagenote from './signinimage3.jpeg';
export const FullScreenContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${imagenote}) no-repeat center center/cover;
  animation: fadeIn 2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormWrapper = styled.div`
  background: rgba(204, 217, 255, 0.5);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 350px;
  text-align: center;
  backdrop-filter: blur(5px);
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 1.5rem;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-size: 1rem;
  box-sizing: border-box;
`;

export const InputIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #999;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: linear-gradient(45deg, #6dd5ed, #2193b0);
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

export const Link = styled.a`
  font-size: 0.9rem;
  color:rgb(12, 27, 31) ;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
