import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const DogInformation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [state, setState] = useState("loading");
  const [doginformation, setDogInformation] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dogWeight: "",
    dogAge: "",
    _id: currentUser._id,
  });
  console.log("currentuser", currentUser._id);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORMDATA", formData);

    fetch("/addDogInformation", {
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
              navigate("/doginformation");
            } else {
              window.alert(resData.message);
            }
          })
          .catch((err) => window.alert(err));
      }
    });
  };

  useEffect(() => {
    fetch("/getItems").then((res) => {
      console.log("res", res);
      if (res.status > 500) {
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            setDogInformation(resData.data);
            console.log("resdate", resData.data);
          })
          .catch((err) => window.alert(err));
      }
    });

    setState("idle");
  }, []);

  return (
    <>
      <div>
        Hey there {currentUser.firstName}! We want to know all about you and{" "}
        {currentUser.dogName} so we can help you choose the right food!
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          id="dogWeight"
          name="dogWeight"
          placeholder="Weight in pounds - lbs"
          value={formData.dogWeight}
          onChange={handleInputChange}
          step="any"
          required
        />
        <select
          id="dogAge"
          name="dogAge"
          value={formData.dogAge}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an age range</option>
          <option value="6-12weeks">6-12 weeks old</option>
          <option value="3-4months">3-4 months old</option>
          <option value="5-7months">5-7 months old</option>
          <option value="8-12months">8-12 months old</option>
          <option value="adult">12+ months (adult)</option>
        </select>

        <button type="submit">Submit</button>
      </form>
      <div>{currentUser.dogName}'s information</div>
      <div>{currentUser.dogWeight} lbs</div>
      <div>{currentUser.dogAge}</div>
    </>
  );
};

export default DogInformation;
