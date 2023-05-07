import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageClient, setHomepageClient] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [state, setState] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && currentUser.type !== "client") {
      navigate("/homepageseller");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetch("/getItems").then(
      (res) => {
        if (res.status > 500) {
          navigate("/errorpage");
        } else {
          res
            .json()
            .then((resData) => {
              setHomepageClient(resData.data);
            })
            .catch((err) => window.alert(err));
        }
      },
      [currentUser]
    );

    setState("idle");
  }, []);

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

  return (
    <>
      <DivFilter>
        <Sort>
          <label>
            <Options>Sort</Options>
            <Select value={sortBy} onChange={handleSort}>
              <option value="">Select an option...</option>
              <option value="price">Price (low to high)</option>
              <option value="priceDesc">Price (high to low)</option>
            </Select>
          </label>
        </Sort>
      </DivFilter>

      <Text>Please click on the dish for more information</Text>

      {homepageClient.length > 0 && (
        <DivGrid>
          <ItemGrid>
            {homepageClient
              .filter((item) => item.status === "available")
              .map((item) => (
                <Item key={item._id}>
                  <div>
                    <StyledLink to={`/items/${item._id}`}>
                      <DishName>{item.dishName}</DishName>
                    </StyledLink>
                    <Description> {item.description}</Description>
                    <Price>{item.price}$</Price>
                  </div>
                  <StyledLink to={`/items/${item._id}`}>
                    <Img src={item.imageUrl} />
                  </StyledLink>
                </Item>
              ))}
          </ItemGrid>
        </DivGrid>
      )}
    </>
  );
};

const DivFilter = styled.div`
  display: flex;
  justify-content: right;
`;

const Select = styled.select`
  background-color: white;
  padding: 5px;
  margin-top: 5px;
  color: #23953c;
  font-size: 20px;
`;

const Sort = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const Options = styled.p`
  margin-top: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  color: #23953c;
  text-align: left;
`;

const Text = styled.p`
  text-align: left;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 25px;
  margin-left: 1rem;
  text-align: center;
  margin-bottom: 10px;
`;

const DivGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 2rem;
  height: 400px;
  width: 400px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const DishName = styled.div`
  color: #23953c;
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 10px;
`;

const Description = styled.div`
  color: #23953c;
  margin-bottom: 10px;
`;

const Price = styled.div`
  color: #23953c;
  font-weight: bold;
  font-size: 30px;
`;

const Img = styled.img`
  width: 200px;
  height: 150px;
  margin-top: 2rem;
`;

export default HomepageClient;
