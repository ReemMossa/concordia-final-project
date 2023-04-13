import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const HomepageClient = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [homepageSeller, setHomepageSeller] = useState([]);
  const [state, setState] = useState("loading");
  const navigate = useNavigate();
  console.log("currentuser", currentUser);

  useEffect(() => {
    if (currentUser.type !== "client") {
      navigate("/homepageseller");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetch("/getItems").then((res) => {
      console.log("res", res);
      if (res.status > 500) {
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            setHomepageSeller(resData.data);
            console.log("resdate", resData.data);
          })
          .catch((err) => window.alert(err));
      }
    });

    setState("idle");
  }, []);

  if (state === "loading") {
    return <div>Loading..</div>;
  }
  console.log("homepageseller", homepageSeller);

  return (
    <>
      <h1>Welcome {currentUser.firstName}</h1>

      <Button>
        <StyledLink to="/Sellernewitem">Upload new food</StyledLink>
      </Button>
      <div>
        {homepageSeller.length > 0 &&
          homepageSeller.map((item) => {
            return (
              <>
                <div>
                  {item.adTitle} : {item.description}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

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

export default HomepageClient;
