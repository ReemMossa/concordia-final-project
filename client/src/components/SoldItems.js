import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

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
    <div>
      <ItemGrid>
        {homepageSeller && homepageSeller.length > 0 && (
          <div>
            <h2>Your sold items</h2>
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
                </Item>
              ))}
          </div>
        )}
      </ItemGrid>
    </div>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img`
  width: 100px;
  border-radius: 50%;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-left: 20rem;
  margin-right: 20rem;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 3rem;
`;

export default SoldItems;
