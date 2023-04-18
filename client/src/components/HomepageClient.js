import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageClient, setHomepageClient] = useState([]);
  const [dogInformation, setDogInformation] = useState([]);
  const [state, setState] = useState("loading");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.type !== "client") {
      navigate("/homepageseller");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetch("/getItems").then((res) => {
      if (res.status > 500) {
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            setHomepageClient(resData.data);
            console.log("resdate", resData.data);
          })
          .catch((err) => window.alert(err));
      }
    });

    setState("idle");
  }, []);

  useEffect(() => {
    fetch(`/getDogInformation/${currentUser._id}`).then((res) => {
      console.log("id", currentUser._id);
      if (res.status > 500) {
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            setDogInformation(resData.data);
          })
          .catch((err) => window.alert(err));
      }
    });

    setState("idle");
  }, []);

  if (state === "loading") {
    return <div>Loading..</div>;
  }

  return (
    <>
      <h1>Welcome {currentUser.firstName}</h1>
      {!dogInformation._id ? (
        <div>
          Do you need help? Click <a href="/doginformation">here</a> to
          personalize your experience.
        </div>
      ) : (
        <>
          <div>
            You can always modify your preferences{" "}
            <a href="/doginformation">here</a>
          </div>
          <div>
            {currentUser.dogName}'s age: {dogInformation.dogAge} old
          </div>
          <div>
            {currentUser.dogName}'s weight: {dogInformation.dogWeight} lbs
          </div>
        </>
      )}

      <h2>All available meals:</h2>

      <div>
        {homepageClient.length > 0 &&
          homepageClient.map((item) => {
            return (
              <>
                <div>
                  Dish Name: {item.dishName}
                  Description: {item.description}
                  Price: {item.price}
                  Portion size: {item.size}
                  <div>Ingredients:</div>
                  -Protein: {item.ingredients.protein}
                  -Organs: {item.ingredients.organs}
                  -Nuts & Seeds: {item.ingredients.nutsAndSeeds}
                  -Other: {item.ingredients.other}
                  <Img src={item.imageUrl}></Img>
                </div>
              </>
            );
          })}
      </div>
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

const Img = styled.img`
  width: 150px;
`;

export default HomepageClient;
