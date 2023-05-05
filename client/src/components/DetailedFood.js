import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailedFood = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { itemId, _id } = useParams();
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [seller, setSeller] = useState(null);
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

    fetch(`/getSellerInfo/${itemId}`)
      .then((res) => res.json())
      .then((resData) => {
        setSeller(resData.data);
        console.log("2", resData);
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
          navigate(`/ordercomplete`);
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
            <Info> {item[0].size}</Info>

            <Text>Main Ingredients</Text>
            <Info>Protein: {item[0].ingredients.protein}</Info>
            <Info>Organs: {item[0].ingredients.organs}</Info>
            <Info>Nuts & Seeds: {item[0].ingredients.nutsAndSeeds}</Info>
            <Info>Other: {item[0].ingredients.other}</Info>
          </Div>
          <Img src={item[0].imageUrl}></Img>
          {currentUser.type === "client" && seller && (
            <>
              <SellerInfo>
                *This dish is prepared by {seller.firstName} who lives in{" "}
                {seller.address.province}
              </SellerInfo>

              <Button onClick={handleSubmit}>Buy Now</Button>
            </>
          )}
          {currentUser.type === "seller" && item[0].status === "pending" && (
            <>
              <Button onClick={handleComplete}>Order was picked up</Button>
              <Note>
                {" "}
                ***Please only click the button once the client has picked up
                their food! This will change the status of the item from pending
                to sold!***
              </Note>
            </>
          )}
          {currentUser.type === "seller" && item[0].status === "available" && (
            <>
              <StyledLink to="/homepageseller">
                <Button>Return to Dashboard</Button>
              </StyledLink>
            </>
          )}
        </>
      )}
    </>
  );
};

const Img = styled.img`
  width: 500px;
  margin-top: 10rem;
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
  text-decoration: underline;
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
  margin-top: 20px;
`;

const Info = styled.div`
  font-size: 20px;
  font-weight: bolder;
  color: #23953c;
`;

const Button = styled.button`
  background-color: #23953c;
  color: white;
  font-size: 15px;
  padding: 10px 10px;
  display: flex;
  cursor: pointer;
  margin: 1.5rem auto;
`;

const Note = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 20px;
  margin-left: 46rem;
  margin-right: 46rem;
  margin-top: 5rem;
`;

const SellerInfo = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 15px;
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default DetailedFood;
