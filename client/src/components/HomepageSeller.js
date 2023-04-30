import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageSeller = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageSeller, setHomepageSeller] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("REEM USER", currentUser);
    if (currentUser && currentUser.type !== "seller") {
      navigate("/homepageclient");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetch(`/getOneItem/${currentUser._id}`).then((res) => {
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
    });
  }, [currentUser]);

  if (state === "loading") {
    return <div>Loading...</div>;
  }
  console.log("homepageseller", homepageSeller);
  return (
    <Div>
      <Button>
        <StyledLink to="/sellernewitem">Upload new food</StyledLink>
      </Button>
      <Button>
        <StyledLink to="/editselleritem">Edit exisiting food</StyledLink>
      </Button>

      <ItemGrid>
        {homepageSeller && homepageSeller.length > 0 && (
          <>
            <div>
              <h2>Your pending items</h2>

              {homepageSeller
                .filter((item) => item.status === "pending")
                .map((item) => (
                  <Item key={item._id}>
                    Dish Name:
                    <StyledLink to={`/items/${item._id}`}>
                      {item.dishName}
                    </StyledLink>
                    Price: {item.price}
                    <StyledLink to={`/items/${item._id}`}>
                      <Img src={item.imageUrl}></Img>
                    </StyledLink>
                  </Item>
                ))}
            </div>
            <div>
              <h2>Your available items</h2>

              {homepageSeller
                .filter((item) => item.status === "available")
                .map((item) => (
                  <Item key={item._id}>
                    Dish Name:
                    <StyledLink to={`/items/${item._id}`}>
                      {item.dishName}
                    </StyledLink>
                    Price: {item.price}
                    <StyledLink to={`/items/${item._id}`}>
                      <Img src={item.imageUrl}></Img>
                    </StyledLink>
                  </Item>
                ))}
            </div>
          </>
        )}
      </ItemGrid>
    </Div>
  );
};

const Div = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 0rem;
  border-radius: 30px;
  color: white;
  float: right;
  margin-right: 3rem;
  margin-top: 2rem;
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

export default HomepageSeller;
