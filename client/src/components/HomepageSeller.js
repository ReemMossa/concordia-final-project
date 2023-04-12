import React from "react";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomepageSeller = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  console.log("currentuser", currentUser);
  return (
    <>
      <h1>Welcome {currentUser.firstName}</h1>

      <Button>
        <StyledLink to="/Sellernewitem">Upload new food</StyledLink>
      </Button>
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  background-color: blue;
  font-size: 15px;
  padding: 1rem 1.5rem;
  border-radius: 30px;
  color: white;
  float: right;
  margin-right: 9rem;
`;

export default HomepageSeller;
