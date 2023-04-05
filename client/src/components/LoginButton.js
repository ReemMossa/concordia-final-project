import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()}>
        <Login>Log In</Login>
      </Button>
    )
  );
};

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  :hover {
    cursor: pointer;
  }
`;

const Login = styled.div`
  color: black;
  font-size: 20px;
`;

export default LoginButton;
