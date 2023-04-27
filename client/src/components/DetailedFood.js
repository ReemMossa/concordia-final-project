import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailedFood = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      status: "pending",
    };

    fetch(`/editSellerItem/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log("resdata", resData);
        navigate("/payment");
      });
  };

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
          {currentUser.type === "client" && (
            <button onClick={handleSubmit}>Buy Now</button>
          )}
        </div>
      )}
    </>
  );
};

const Img = styled.img`
  width: 150px;
`;

export default DetailedFood;
