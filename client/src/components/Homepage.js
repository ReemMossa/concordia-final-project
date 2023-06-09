import React from "react";
import meatAndVeggies from "./meat-and-veggies.webp";
import dogpaw from "./dogpaw.jpg";
import styled from "styled-components";

const Homepage = () => {
  return (
    <>
      <Div>
        <img src={dogpaw}></img>
        <Textdiv>
          <Text>FRESH</Text>
          <Text>DELICIOUS</Text>
          <Text>HEALTHY</Text>
        </Textdiv>
        <FoodImg src={meatAndVeggies} alt="dogfood" />
      </Div>
      <P>
        Barkin' Good Food is a platform that connects buyers and sellers of
        homemade dog food, offering a wide range of options to suit different
        dietary needs, preferences, and budgets. Whether you're looking for
        grain-free, raw, organic, or specialized diets, you can browse through
        our listings and find the perfect match for your dog. And if you're a
        seller, you can showcase your culinary skills and reach a wider audience
        of dog lovers who appreciate the value of homemade food. So, let's get
        started and make some tails wag with delicious and healthy homemade dog
        food!
      </P>
      <SignUp>Sign up as a seller or a buyer to get started, or log in!</SignUp>
    </>
  );
};

const Div = styled.div`
  display: flex;
  margin-top: 5rem;
  margin-left: 3rem;
`;

const Textdiv = styled.div`
  margin-top: 10rem;
`;

const Text = styled.div`
  color: #23953c;
  font-size: 70px;
  font-weight: bolder;
`;
const P = styled.p`
  font-size: 25px;
  font-style: italic;
  text-align: center;
  padding-right: 20rem;
  padding-left: 20rem;
  line-height: 45px;
  margin-top: 5rem;
`;

const SignUp = styled.p`
  font-size: 25px;
  font-style: italic;
  text-align: center;
  padding-right: 20rem;
  padding-left: 20rem;
  line-height: 45px;
  margin-top: 5rem;
  font-weight: bolder;
  font-size: 30px;
`;

const FoodImg = styled.img`
  border-radius: 50%;
  height: 25rem;
  width: 30rem;
  margin-left: 20rem;
`;

export default Homepage;
