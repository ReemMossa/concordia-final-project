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
    fetch(`/getOneItemOnly/${itemId}`).then((res) => {
      if (res.status > 500) {
        navigate("/errorPage");
      } else {
        res
          .json()
          .then((resData) => setItem(resData.data))
          .catch((err) => window.alert(err));
      }
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
        navigate(`/payment/${itemId}`);
      });
  };

  return (
    <>
      <Title>Food details</Title>
      {item && (
        <Div>
          <Text>Dish Name: {item[0].dishName}</Text>
          <Text>Description: {item[0].description}</Text>
          <Text>Price: {item[0].price} $</Text>
          <Text>Size: {item[0].size}</Text>
          <Text>Ingredients:</Text>
          <Text>Protein: {item[0].ingredients.protein}</Text>
          <Text>Organs: {item[0].ingredients.organs}</Text>
          <Text>Nuts & Seeds: {item[0].ingredients.nutsAndSeeds}</Text>
          <Text>Other: {item[0].ingredients.other}</Text>
          <Text>
            <Img src={item[0].imageUrl}></Img>
          </Text>
          {currentUser.type === "client" && (
            <Button onClick={handleSubmit}>Buy Now</Button>
          )}
        </Div>
      )}
    </>
  );
};

const Img = styled.img`
  width: 150px;
`;

const Title = styled.p`
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 30px;
  color: #23953c;
  margin-top: 2rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;
`;

const Text = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 30px;
`;

const Button = styled.button`
  background-color: #23953c;
  color: white;
  font-size: 15px;
  padding: 20px 8px;
  border-radius: 50%;
  display: inline-block;
  margin-top: 2rem;
  cursor: pointer;
`;

export default DetailedFood;
