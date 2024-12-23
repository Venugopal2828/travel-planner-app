import React from "react";
import styled from "styled-components";
import img from './Images/GoBeyond.jpg';
import { FaSearch, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <NavBar>
        <Logo src={img} alt="GoBeyond Logo"></Logo>
        <NavLinks>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#tours">Tours</NavLink>
          <NavLink href="#explore">Explore</NavLink>
          <NavLink href="#about">About Us</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
        </NavLinks>
      </NavBar>

      <Content>
        <TextSection>
          <Heading>Never Stop Exploring the World.</Heading>
          <SubHeading>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </SubHeading>
          <Button>Learn More</Button>
        </TextSection>

        <CardSection>
          <Card onClick={() => navigate('/beach')}>
            <CardImage src="https://images.pexels.com/photos/15917105/pexels-photo-15917105/free-photo-of-clear-sky-over-an-umbrella-and-deck-chairs-on-a-sandy-beach.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"  />
            <CardTitle>BEACH</CardTitle>
          </Card>
          <Card onClick={() => navigate('/nature')}>
            <CardImage src="https://images.pexels.com/photos/4915984/pexels-photo-4915984.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <CardTitle>NATURE</CardTitle>
          </Card>
          <Card onClick={() => navigate('/hotel')}>
            <CardImage src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
            <CardTitle>HOTEL</CardTitle>
          </Card>
          {/* <Card>
            <CardImage src=" https://images.pexels.com/photos/29090844/pexels-photo-29090844/free-photo-of-hiker-in-rugged-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=600"/>
            <CardTitle>TREKKING</CardTitle>
          </Card> */}
          <Card onClick={() => navigate('/destinations')}>
            <CardImage src=" https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&w=600"/>
            <CardTitle>DESTINATIONS</CardTitle>
          </Card>
          <Card>
            <CardImage src=" https://images.pexels.com/photos/3050833/pexels-photo-3050833.jpeg?auto=compress&cs=tinysrgb&w=600"/>
            <CardTitle>ITINERARY</CardTitle>
          </Card>
        </CardSection>
      </Content>

      <Footer>
        <FooterIcon>
          <FaFacebook />
        </FooterIcon>
        <FooterIcon>
          <FaTwitter />
        </FooterIcon>
        <FooterIcon>
          <FaInstagram />
        </FooterIcon>
        <FooterIcon>
          <FaLinkedin />
        </FooterIcon>
      </Footer>
    </MainContainer>
  );
};

export default Homepage;

// Styled Components
const MainContainer = styled.div`
  background: url(https://images.pexels.com/photos/29848859/pexels-photo-29848859/free-photo-of-scenic-view-of-bellagio-in-lombardy-italy.jpeg?auto=compress&cs=tinysrgb&w=600) no-repeat center
    center/cover;
  height: 103vh;
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem;
  background: rgba(255, 255, 255, 0.8);
`;

const Logo = styled.img`
  font-size: 0.5rem;
  height: 60px;
  font-weight: bold;
  color: #2c3e50;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: #34495e;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #2193b0;
  }
`;

const SearchIcon = styled.div`
  color: #34495e;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const TextSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #f0f0f0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  margin-bottom: 1.5rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  background: #2193b0;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #6dd5ed;
  }
`;

const CardSection = styled.div`
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1rem;
`;

const Card = styled.div`
  position: relative;
  width: 200px;
  height: 300px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
   border-right: 4px solid transparent; /* Border on the right */
  border-bottom: 4px solid transparent;

  &:hover {
    transform: scale(1.05) skew(-2deg,3deg);
    border-color: #2193b0;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;

  ${Card}:hover & {
    transform: scale(1.4); 
    opacity: 0.9; 
}
 
`;

const CardTitle = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: #fff;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1px;
`;

const FooterIcon = styled.div`
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #2193b0;
  }
`;
