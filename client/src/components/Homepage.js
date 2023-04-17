import React from "react";
import food from "./bowlwithfood.jpg";
import meatAndVeggies from "./meat-and-veggies.webp";
import goldenretriever from "./golden.webp";
import styled from "styled-components";

const Homepage = () => {
  return (
    <>
      <H1>DIY Homemade Dog Food</H1>
      <P>
        Ensure your dog stays healthy and in good physical condition by
        preparing a simple homemade recipe that is not only affordable compared
        to store-bought options, but also contains a variety of fresh vegetables
        that will benefit your dog's health!
      </P>

      <Img src={goldenretriever} alt="dog" />
      <Img src={meatAndVeggies} alt="dogfood" />
    </>
  );
};

const H1 = styled.h1`
  text-align: center;
`;

const P = styled.p`
  font-size: 25px;
  font-style: italic;
  text-align: center;
  padding-right: 40rem;
  padding-left: 40rem;
  line-height: 35px;
`;

const Img = styled.img`
  height: 35rem;
  width: 50rem;
  padding: 5rem;
`;

export default Homepage;
