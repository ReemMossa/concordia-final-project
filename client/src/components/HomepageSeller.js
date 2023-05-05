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

  return (
    <>
      <Div>
        {homepageSeller && (
          <Button>
            <StyledLinkButton to="/editselleritem">
              Edit exisiting food
            </StyledLinkButton>
          </Button>
        )}

        <Button>
          <StyledLinkButton to="/sellernewitem">
            Upload new food
          </StyledLinkButton>
        </Button>
        <Button>
          <StyledLinkButton to="/historysolditems">
            View your history
          </StyledLinkButton>
        </Button>
      </Div>
      {homepageSeller && homepageSeller.length > 0 && (
        <>
          <DivGrid>
            <ItemGrid>
              {homepageSeller
                .filter((item) => item.status === "available")
                .map((item) => (
                  <Item key={item._id}>
                    <div>
                      <StyledLink to={`/items/${item._id}`}>
                        <DishName>{item.dishName}</DishName>
                      </StyledLink>
                      <Description> {item.description}</Description>
                      <Price> {item.price}$</Price>
                    </div>
                    <StyledLink to={`/items/${item._id}`}>
                      <Img src={item.imageUrl} />
                    </StyledLink>
                    <StatusAvailable>AVAILABLE</StatusAvailable>
                  </Item>
                ))}
            </ItemGrid>
          </DivGrid>
          <DivGrid>
            <ItemGrid>
              {homepageSeller
                .filter((item) => item.status === "pending")
                .map((item) => (
                  <Item key={item._id}>
                    <div>
                      <StyledLink to={`/items/${item._id}`}>
                        {item.dishName}
                      </StyledLink>
                      <div> {item.description}</div>
                      <div> {item.price}$</div>
                    </div>
                    <StyledLink to={`/items/${item._id}`}>
                      <Img src={item.imageUrl} />
                    </StyledLink>
                    <StatusPending>PENDING</StatusPending>
                  </Item>
                ))}
            </ItemGrid>
          </DivGrid>
        </>
      )}
    </>
  );
};

const Div = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledLinkButton = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 1rem;

  color: white;
  float: right;
  margin-right: 3rem;
  margin-top: 2rem;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
  margin-top: 2rem;
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

const DishName = styled.div`
  color: #23953c;
  font-size: 20px;
  font-weight: bolder;
`;

const Description = styled.div`
  color: #23953c;
`;

const Price = styled.div`
  color: #23953c;
  font-weight: bold;
`;

const StatusAvailable = styled.div`
  position: absolute;
  bottom: 0;
  color: #66eaa3;
  font-weight: bolder;
`;

const StatusPending = styled.div`
  position: absolute;
  bottom: 0;
  color: orange;
  font-weight: bolder;
`;
export default HomepageSeller;
