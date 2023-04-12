import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpSeller = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
      province: "",
      country: "",
    },
    dogName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/registrationSeller", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status > 500) {
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            if (resData.status === 200) {
              window.alert(resData.message);
              navigate("/");
            } else {
              window.alert(resData.message);
            }
          })
          .catch((err) => window.alert(err));
      }
    });
  };
  return (
    <Wrapper>
      <H1>Sign Up to sell Barkin' Good Food</H1>
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          <NameDiv>
            <NameInput
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            <NameInput
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </NameDiv>

          <Input
            type="text"
            id="street"
            name="street"
            placeholder="Street"
            value={formData.address.street}
            onChange={handleAddressChange}
            required
          />
          <Input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={formData.address.city}
            onChange={handleAddressChange}
            required
          />

          <Input
            type="text"
            id="province"
            name="province"
            placeholder="Province"
            value={formData.address.province}
            onChange={handleAddressChange}
            required
          />
          <Input
            type="text"
            id="country"
            name="country"
            placeholder="Country"
            value={formData.address.country}
            onChange={handleAddressChange}
            required
          />
          <Input
            type="text"
            id="dogName"
            name="dogName"
            placeholder="Your furry friend's name"
            value={formData.dogName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </FormDiv>

        <ButtonContainer>
          <Button type="submit">Create my account!</Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 1rem;
  margin-left: 40rem;
  margin-right: 40rem;
  margin-top: 5rem;
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
`;

const NameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    width: 20rem;
    margin: 0px 20px;
  }
`;

const Input = styled.input`
  margin: 0px 20px;
  width: 45rem;
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
`;
const NameInput = styled.input`
  border-radius: 5px;
  padding: 15px;
  width: 20rem;
  margin: 0px 20px;
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  margin-top: 2rem;
  background-color: blue;
  color: white;
  padding: 15px;
  width: 20rem;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
export default SignUpSeller;
