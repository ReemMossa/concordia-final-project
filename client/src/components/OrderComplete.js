import React from "react";
import styled from "styled-components";
import dogwithhat from "./dogwithhat.jpg";
import { Link } from "react-router-dom";

const OrderComplete = () => {
  return (
    <>
      <Wrapper>
        <Div>Congratulations, you sold your dish!</Div>
        <Img src={dogwithhat}></Img>
        <Link to="/homepageseller">
          <Button>Back to my Dashboard</Button>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const Div = styled.div`
  font-size: 25px;
  margin-bottom: 50px;
  color: #23953c;
  font-size: 40px;
  font-weight: bolder;
`;

const Img = styled.img`
  width: 800px;
`;

const Button = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 1rem;
  color: white;
  float: right;
  margin-top: 30px;
`;
export default OrderComplete;
