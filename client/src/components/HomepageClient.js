import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageClient, setHomepageClient] = useState([]);
  const [selectedProtein, setSelectedProtein] = useState(null);
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

  const handleChange = (e) => {
    const protein = e.target.value;
    setSelectedProtein(protein);
  };

  let displayedMeals = homepageClient;

  if (selectedProtein) {
    displayedMeals = homepageClient.filter((meal) => {
      return meal.ingredients.protein.includes(selectedProtein);
    });
  }

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

  console.log("currentUser", currentUser);
  return (
    <>
      <DivFilter>
        <Sort>
          <label>
            <Options>Main ingredient</Options>
            <Select value={selectedProtein} onChange={handleChange}>
              <option value="">Select a protein...</option>
              <option value="Chicken">Chicken</option>
              <option value="Beef">Beef</option>
              <option value="Turkey">Turkey</option>
              <option value="Pork">Pork</option>
              <option value="Lamb">Lamb</option>
              <option value="Fish">Fish</option>
              <option value="Veggie">Veggie</option>
            </Select>
          </label>
        </Sort>

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
                      {item.dishName}
                    </StyledLink>
                    <div> {item.description}</div>
                    <div> {item.price}$</div>
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
  background-color: lightgreen;
  padding: 5px;
  margin-top: 5px;
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
  font-size: 30px;
  color: #23953c;
  margin-left: 1rem;
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
  padding: 50px;
  margin-right: 50px;
  margin-left: 50px;
  margin-top: 3rem;
  height: 250px;
  width: 200px;
  text-align: center;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Img = styled.img`
  width: 150px;
  margin-top: 2rem;
`;

export default HomepageClient;
