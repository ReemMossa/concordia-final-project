import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageClient, setHomepageClient] = useState([]);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [sortBy, setSortBy] = useState("");
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

  const handleChange = (e) => {
    const protein = e.target.value;
    setSelectedProtein(protein);
  };

  let displayedMeals = homepageClient;

  if (selectedProtein) {
    displayedMeals = homepageClient.filter((meal) => {
      return meal.ingredients.protein.includes(selectedProtein);
    });
    console.log("homepageClient", homepageClient);
    console.log("selectedprotein", selectedProtein);
    console.log("displayedMeals", displayedMeals);
  }

  const handleSort = (e) => {
    const sortOption = e.target.value;
    setSortBy(sortOption);
  };

  let sortedClient = homepageClient;

  if (sortBy === "price") {
    sortedClient = homepageClient.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    sortedClient = homepageClient.sort((a, b) => b.price - a.price);
  }

  if (state === "loading") {
    return <div>Loading..</div>;
  }

  console.log("currentUser", currentUser);
  return (
    <>
      <h1>Hello {currentUser.firstName}</h1>

      <div>
        <label>
          Filter by main ingredient:
          <select value={selectedProtein} onChange={handleChange}>
            <option value="">Select a protein...</option>
            <option value="Chicken">Chicken</option>
            <option value="Beef">Beef</option>
            <option value="Turkey">Turkey</option>
            <option value="Pork">Pork</option>
            <option value="Lamb">Lamb</option>
            <option value="Fish">Fish</option>
            <option value="Veggie">Veggie</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={handleSort}>
            <option value="">Select an option...</option>
            <option value="price">Price (low to high)</option>
            <option value="priceDesc">Price (high to low)</option>
          </select>
        </label>
      </div>

      <h2>All available meals:</h2>
      <p>Please click on the item to purchase</p>
      <div>
        {displayedMeals.length > 0 &&
          displayedMeals.map((item) => {
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

      {/* <h2>All available meals:</h2>
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
      </div> */}
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
