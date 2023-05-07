import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Login = () => {
  const Navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userEmail, setUserEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [matchedClient, setMatchedClient] = useState();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/getOneClient", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (res.status > 500) {
          Navigate("/errorpage");
        } else {
          res.json().then((resData) => {
            if (resData.status !== 200) {
              setErrorMessage(resData.message);
            } else {
              setMatchedClient(resData.data);
              setUserEmail(formData.email);
              window.localStorage.setItem(
                "currentUser",
                JSON.stringify(resData.data)
              );
              setCurrentUser(resData.data);
              if (resData.data.type === "client") {
                Navigate("/homepageclient");
              } else {
                Navigate("/homepageseller");
              }
            }
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      <H1>Log In To Barkin' Good Food</H1>
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          {errorMessage && <Error>{errorMessage}</Error>}

          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormDiv>

        <ButtonContainer>
          <Button type="submit">Log In</Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid lightgray;
  border-radius: 10px;
  margin: 5% auto;
  max-width: 800px;
`;

const Form = styled.form`
  margin: 1rem auto;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const H1 = styled.h1`
  text-align: center;
  color: #23953c;
`;

const Input = styled.input`
  margin: 0px 20px;
  width: 300px;
  border: 3px solid #23953c;
  border-radius: 5px;
  padding: 10px;
  margin-top: 30px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  background-color: #23953c;
  color: white;
  font-size: 20px;
  padding: 10px;
  width: 120px;
  border: none;
  cursor: pointer;
`;

const Error = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
`;

export default Login;
