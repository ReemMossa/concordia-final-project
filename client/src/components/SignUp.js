import React, { useState } from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

const SignUp = () => {
  const [clientBackgroundColor, setClientBackgroundColor] = useState("white");
  const [sellerBackgroundColor, setSellerBackgroundColor] = useState("white");
  const [buttonText, setButtonText] = useState("Create Account");

  const handleClientClick = () => {
    setClientBackgroundColor("#66EAA3");
    setSellerBackgroundColor("white");
    setButtonText("Join as a CLIENT");
  };

  const handleSellerClick = () => {
    setSellerBackgroundColor("#66EAA3");
    setClientBackgroundColor("white");
    setButtonText("Join as a SELLER");
  };

  return (
    <Wrapper>
      <H1>Are you looking to buy or sell food?</H1>
      <Div>
        <Client
          style={{ backgroundColor: clientBackgroundColor }}
          onClick={handleClientClick}
        >
          Looking to buy
        </Client>
        <Seller
          style={{ backgroundColor: sellerBackgroundColor }}
          onClick={handleSellerClick}
        >
          Looking to sell
        </Seller>
      </Div>

      <ButtonDiv>
        {clientBackgroundColor === "#66EAA3" ? (
          <Link to="/signupclient">
            <Button
              disabled={buttonText === "Create Account"}
              style={{
                backgroundColor:
                  buttonText === "Create Account" ? "#66EAA3" : "",
              }}
            >
              {buttonText}
            </Button>
          </Link>
        ) : (
          <Link to="/signupseller">
            <Button
              disabled={buttonText === "Create Account"}
              style={{
                backgroundColor:
                  buttonText === "Create Account" ? "#66EAA3" : "",
              }}
            >
              {buttonText}
            </Button>
          </Link>
        )}
      </ButtonDiv>
      <TextDiv>
        Already have an account? <Link to="/login">Log In</Link>
      </TextDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin-left: 40rem;
  margin-right: 40rem;
  margin-top: 10rem;
`;

const H1 = styled.h1`
  font-size: 35px;
  width: 100%;
  text-align: center;
  color: #23953c;
`;

const Div = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 5rem;
`;

const Client = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 3rem;
  margin-right: 1.5rem;
  font-size: 25px;
  width: 13rem;
  text-align: center;
  &:hover {
    border: 2px solid #23953c;
    cursor: pointer;
  }
`;

const Seller = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 3rem;
  font-size: 25px;
  margin-left: 1.5rem;
  width: 13rem;
  text-align: center;
  &:hover {
    border: 2px solid #23953c;
    cursor: pointer;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Button = styled.button`
  padding: 0.8rem 8rem;
  background-color: #23953c;
  color: white;
  font-size: 20px;
  margin-top: 2rem;
  cursor: pointer;
`;

const TextDiv = styled.div`
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export default SignUp;
