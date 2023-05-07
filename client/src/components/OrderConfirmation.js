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
            <Title>Thank you for ordering from Barkin' Good Food!</Title>
            <Div>
              <span>
                <Info>An email confirmation has been sent to: </Info>
                {orderConfirmation.email}
              </span>
              <span>
                <Info>Order number: </Info>
                {orderConfirmation._id}{" "}
              </span>
              <span>
                <Info>Order total: </Info>$ {orderConfirmation.totalPrice}
              </span>
            </Div>
            <DivSeller>
              <InfoSeller>
                The food is ready for PICKUP. The seller's information has been
                sent to your e-mail.
              </InfoSeller>
            </DivSeller>
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

const Title = styled.h1``;

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivSeller = styled.div`
  margin-top: 50px;
`;

const Info = styled.span`
  color: #23953c;
  font-size: 20px;
`;

const InfoSeller = styled.span`
  font-size: 20px;

  font-weight: bolder;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 500px;
  margin-left: 20rem;
  margin-top: 2rem;
`;

export default OrderConfirmation;
