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
  const [errorMessage, setErrorMessage] = useState("");

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
    navigate(`/payment/${itemId}`);
  };

  const updatedFormData = {
    ...formData,
    status: "sold",
  };

  const handleComplete = (e) => {
    e.preventDefault();
    fetch(`/editSellerItem/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === 200) {
          navigate(`/homepageseller`);
          console.log(resData);
        } else {
          setErrorMessage(resData.message);
        }
      })
      .catch((err) => window.alert(err));
  };
  return (
    <>
      {item && (
        <>
          <Div>
            <Name>{item[0].dishName}</Name>
            <Text>{item[0].description}</Text>
            <Text>{item[0].price} $</Text>
            <Text>Size: </Text>
            <Text> {item[0].size}</Text>
            <Text>Main Ingredients</Text>
            <div>{item[0].ingredients.protein}</div>
            <div>{item[0].ingredients.organs}</div>
            <div>{item[0].ingredients.nutsAndSeeds}</div>
            <div>{item[0].ingredients.other}</div>
          </Div>
          <Img src={item[0].imageUrl}></Img>
          {currentUser.type === "client" && (
            <Button onClick={handleSubmit}>Buy Now</Button>
          )}
          {currentUser.type === "seller" && item[0].status === "pending" && (
            <Button onClick={handleComplete}>Order Complete</Button>
          )}
        </>
      )}
    </>
  );
};

const Img = styled.img`
  width: 500px;
  margin-top: 20rem;
  margin-left: 10rem;
  position: absolute;
  top: 0;
`;

const Name = styled.p`
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 40px;
  color: #23953c;
  margin-top: 2rem;
  margin-bottom: 4rem;
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
  padding: 10px 10px;
  display: flex;
  cursor: pointer;
  margin: 5rem auto;
`;

export default DetailedFood;
