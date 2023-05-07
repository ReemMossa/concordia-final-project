import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import saddog from "./saddog.jpg";

const SoldItems = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageSeller, setHomepageSeller] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/getOneItem/${currentUser._id}`)
      .then((res) => {
        if (res.status > 500) {
          navigate("/");
        } else {
          res
            .json()
            .then((resData) => {
              setHomepageSeller(resData.data);
            })
            .catch((err) => window.alert(err));
        }
        setState("idle");
      })
      .catch((err) => {
        window.alert(err);
        setState("idle");
      });
  }, [currentUser, navigate]);

  if (state === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <>
      {homepageSeller && homepageSeller.length > 0 && (
        <DivGrid>
          <ItemGrid>
            {homepageSeller
              .filter((item) => item.status === "sold")
              .map((item) => (
                <Item key={item._id}>
                  Dish Name:
                  <StyledLink to={`/items/${item._id}`}>
                    {item.dishName}
                  </StyledLink>
                  Price: {item.price}
                  <StyledLink to={`/items/${item._id}`}>
                    <Img src={item.imageUrl} alt="" />
                  </StyledLink>
                  <StatusSold>SOLD</StatusSold>
                </Item>
              ))}
          </ItemGrid>
        </DivGrid>
      )}
      {!homepageSeller.some((item) => item.status === "sold") && (
        <>
          <NoItems>
            <NoSold>You have not sold any items yet!</NoSold>
            <DogImg src={saddog}></DogImg>
          </NoItems>
        </>
      )}
    </>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const DivGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 50px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 2rem;
  height: 175px;
  width: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const StatusSold = styled.div`
  position: absolute;
  bottom: 0;
  color: red;
`;

const NoItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NoSold = styled.h1`
  font-size: 40px;
  margin-left: 10px;
  text-align: center;
  margin-top: -5rem;
  color: #23953c;
`;

const DogImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SoldItems;
