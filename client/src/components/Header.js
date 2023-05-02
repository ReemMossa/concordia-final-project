import logo from "./logo.png";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Link to="/">
        <Img src={logo} alt="doglogo" />
      </Link>

      {currentUser ? (
        <>
          <UserIcon
            initials={`${currentUser.firstName[0].toUpperCase()}${currentUser.lastName[0].toUpperCase()}`}
            navigate={navigate}
          />
          <Div>You are logged on as a {currentUser.type}</Div>
        </>
      ) : (
        <>
          <ButtonLogIn>
            <StyledLink to="/login">Log In</StyledLink>
          </ButtonLogIn>

          <ButtonSignUp>
            <StyledLink to="/signup">Sign up</StyledLink>
          </ButtonSignUp>
        </>
      )}
    </Wrapper>
  );
};

const Img = styled.img`
  width: 500px;
`;

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: black;
`;

const ButtonLogIn = styled.button`
  background-color: #23953c;
  color: white;
  font-size: 15px;
  padding: 20px 10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: auto;
`;

const ButtonSignUp = styled.button`
  background-color: #23953c;
  color: white;
  font-size: 15px;
  padding: 20px 8px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Div = styled.div`
  color: white;
  margin-left: auto;
  margin-right: 90px;
`;

export default Header;
