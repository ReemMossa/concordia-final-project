import mainLogo from "./mainlogo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <>
      <Div>
        <Link to="/">
          <Img src={mainLogo} alt="doglogo" />
        </Link>
        <Title>
          <StyledLinkTitle to="/"></StyledLinkTitle>
        </Title>

        <LoginButtonStyled>
          <LoginButton />
        </LoginButtonStyled>
        <Button>
          <StyledLinkSignUp to="/signup">Sign up</StyledLinkSignUp>
        </Button>
      </Div>
    </>
  );
};

const Img = styled.img`
  width: 300px;
`;
const Div = styled.div`
  border-bottom: 1px solid lightblue;
  height: 5rem;
  display: flex;
`;

const StyledLinkTitle = styled(Link)`
  text-decoration: none;
  color: blue;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bolder;

  width: 10rem;
  margin-top: 1.5rem;
  margin-left: 1.5rem;
`;

const LoginButtonStyled = styled.div`
  padding-bottom: 2rem;
  margin-left: 90rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  background-color: blue;
  font-size: 15px;
  padding: 0.2rem 1.5rem;
  margin: 1.1rem 0rem 1.1rem 1rem;
  border-radius: 30px;
`;

const StyledLinkSignUp = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default Header;
