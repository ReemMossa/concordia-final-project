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
        {" "}
        Welcome to our online marketplace for healthy homemade dog food and
        treats! Our website is a platform where dog owners and enthusiasts can
        come together to connect with sellers who are passionate about creating
        wholesome and nutritious meals and snacks for our furry friends. At our
        website, we believe that dogs deserve the best quality food, just like
        we do. That's why we provide a marketplace where you can find sellers
        who use only the highest quality, all-natural ingredients to create
        healthy, homemade dog food and treats. Our sellers are passionate about
        their craft and are committed to ensuring that every meal or treat they
        make is delicious, nutritious, and safe for your furry companion to
        enjoy. Our platform is designed to make it easy for both sellers and
        clients to use. Sellers can upload their food and treats, set their
        prices, and manage their orders all from one convenient location.
        Clients can browse through the listings, filter through ingredients, and
        place orders with just a few clicks. We are proud to offer a wide range
        of homemade dog food and treats from a diverse group of sellers. Our
        platform allows you to discover new sellers and try out different
        recipes, giving you and your dog the opportunity to explore new flavors
        and textures. We are committed to supporting small businesses and
        helping dog owners provide their pets with the best quality food
        possible. Thank you for choosing Barkin' Good Food, and we look forward
        to connecting you with some amazing sellers and delicious homemade dog
        food and treats!
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
  padding-right: 20rem;
  padding-left: 20rem;
  line-height: 35px;
`;

const Img = styled.img`
  height: 35rem;
  width: 50rem;
  padding: 5rem;
`;

export default Homepage;
