import doglogo1 from "./doglogo1.png";

import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();
  const path = location.pathname;

  const handleSignOut = () => {
    window.localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <>
      <Div>
        <Link to="/">
          <Img src={doglogo1} alt="doglogo" />
        </Link>
        <Title>
          <StyledLinkTitle to="/"></StyledLinkTitle>
        </Title>

        {currentUser ? (
          <Div>
            <Welcome> Welcome {currentUser.firstName}!</Welcome>
            <LoginButtonStyled>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </LoginButtonStyled>

            {path.includes("homepage") ? (
              <Button disabled>Dashboard</Button>
            ) : currentUser.type === "client" ? (
              <Button>
                <Link to="/homepageclient">Dashboard</Link>
              </Button>
            ) : (
              <Button>
                <Link to="/homepageseller">Dashboard</Link>
              </Button>
            )}

            <Link to="/profile">My profile</Link>
          </Div>
        ) : (
          <>
            <LoginButtonStyled>
              <Link to="/login">Log In</Link>
            </LoginButtonStyled>

            <Button>
              <StyledLinkSignUp to="/signup">Sign up</StyledLinkSignUp>
            </Button>
          </>
        )}
      </Div>
    </>
  );
};

const Img = styled.img`
  width: 500px;
`;
const Div = styled.div`
  border-bottom: 1px solid lightgray;
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

const Welcome = styled.div`
  display: flex;
  justify-content: right;
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
