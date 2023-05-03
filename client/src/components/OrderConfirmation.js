import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import happygolden from "./happygolden.jpg";
import styled from "styled-components";

const OrderConfirmation = () => {
  const [orderConfirmation, setOrderConfirmation] = useState("");
  const { _id, itemId } = useParams();
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    fetch(`/order/${_id}`)
      .then((res) => res.json())
      .then((resData) => {
        setOrderConfirmation(resData.data);
      });

    // fetch seller details based on the itemId
    fetch(`/getSellerInfo/${itemId}`)
      .then((res) => res.json())
      .then((resData) => {
        setSeller(resData.data);
      });
  }, [itemId]);

  return (
    <Wrapper>
      {seller && (
        <Container>
          <Content>
            <Title>Thank you for your order!</Title>
            <p>
              An email confirmation has been sent to {orderConfirmation.email}
            </p>
            <p>Order number: {orderConfirmation._id} </p>
            <p>Order total: $ {orderConfirmation.totalPrice}</p>
            <p>Here is the seller's information: </p>
            <p>Name: {seller.firstName}</p>
            <p>Address: </p>
            <p>{seller.address.street}</p>
            <p>{seller.address.city}</p>
            <p>{seller.address.province}</p>
            <p>{seller.address.country}</p>
          </Content>
          <ImageContainer>
            <Img src={happygolden} />
          </ImageContainer>
        </Container>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 80%;
`;

const Content = styled.div`
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  margin-left: 10px;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 500px;
`;

export default OrderConfirmation;
