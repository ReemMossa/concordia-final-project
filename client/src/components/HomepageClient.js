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

  if (state === "loading") {
    return <div>Loading..</div>;
  }

  console.log("currentUser", currentUser);
  return (
    <>
      <h1>Hello {currentUser.firstName}</h1>

      <div>
        {currentUser.dogName}'s age: {dogInformation.dogAge} old
      </div>
      <div>
        {currentUser.dogName}'s weight: {dogInformation.dogWeight} lbs
      </div>

      <h2>All available meals:</h2>
      <p>Please click on the item to purchase</p>
      <div>
        {homepageClient.length > 0 &&
          homepageClient.map((item) => {
            return (
              <>
                <div>
                  Dish Name:{" "}
                  <Link to={`/items/${item._id}`}>{item.dishName}</Link>
                  Description: {item.description}
                  Price: {item.price}
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
