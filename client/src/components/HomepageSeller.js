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
    if (currentUser.type !== "seller") {
      navigate("/homepageclient");
    }
  }, [currentUser]);

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
    });

    setState("idle");
  }, []);

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
      <h1>Welcome {currentUser.dogName}</h1>

      <div>
        {homepageSeller &&
          homepageSeller.length > 0 &&
          homepageSeller.map((item) => {
            if (item.status !== "pending") {
              return (
                <>
                  <h2>Here is what you have still for sale:</h2>
                  <div key={item._id}>
                    Dish Name:
                    <Link to={`/items/${item._id}`}>{item.dishName}</Link>
                    Price: {item.price}
                    <Img src={item.imageUrl}></Img>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <h2>Here are your pending items:</h2>
                  <div key={item._id}>
                    Dish Name:
                    <Link to={`/items/${item._id}`}>{item.dishName}</Link>
                    Price: {item.price}
                    <Img src={item.imageUrl}></Img>
                  </div>
                </>
              );
            }
          })}
      </div>
    </Div>
  );
};

const Div = styled.div`
  margin-left: 2rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Button = styled.button`
  background-color: blue;
  font-size: 15px;
  padding: 1rem 1.5rem;
  border-radius: 30px;
  color: white;
  float: right;
  margin-right: 9rem;
`;

const Img = styled.img`
  width: 150px;
`;
export default HomepageSeller;
