import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";

const SellerNewItem = () => {
  const [imageSelected, setImageSelected] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adTitle: "",
    description: "",
    imageUrl: "", // add imageUrl property to the initial state
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "lyxwlobx");

    fetch("https://api.cloudinary.com/v1_1/dhn6kqmnu/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.secure_url;
        setFormData({ ...formData, imageUrl: imageUrl });
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORMDATA", formData);
    fetch("/addSellerItem", {
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
              navigate("/homepageSeller");
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
      <H1>Upload your dish!</H1>
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          <Input
            type="text"
            id="adTitle"
            name="adTitle"
            placeholder="Ad Title"
            value={formData.adTitle}
            onChange={handleInputChange}
            required
          />

          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Please write a detailed description of your item"
            value={formData.description}
            onChange={handleInputChange}
            required
          />

          <input
            type="file"
            onChange={(e) => setImageSelected(e.target.files[0])}
          />
          <button onClick={uploadImage}>Upload Image</button>
          <Image cloudName="dhn6kqmnu" publicId={formData.imageUrl} />
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

export default SellerNewItem;
