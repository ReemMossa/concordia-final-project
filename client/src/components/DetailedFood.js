import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailedFood = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/getOneItemOnly/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log("data", data.data);
        console.log("itemId", itemId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  return (
    <>
      <h1>Food details</h1>
      {item && (
        <div>
          <div>Dish Name: {item[0].dishName}</div>
          <div>Description: {item[0].description}</div>
          <div>Price: {item[0].price} $</div>
          <div>Size: {item[0].size}</div>
          <p>Ingredients:</p>
          <div>Protein: {item[0].ingredients.protein}</div>
          <div>Organs: {item[0].ingredients.organs}</div>
          <div>Nuts & Seeds: {item[0].ingredients.nutsAndSeeds}</div>
          <div>Other: {item[0].ingredients.other}</div>
          <div>
            <Img src={item[0].imageUrl}></Img>
          </div>
          <button>Buy Now</button>
        </div>
      )}
    </>
  );
};

const Img = styled.img`
  width: 150px;
`;

export default DetailedFood;
