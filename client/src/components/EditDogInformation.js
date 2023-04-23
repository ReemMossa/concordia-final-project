import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const EditDogInformation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [dogInfo, setDogInfo] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("/getDogInformation")
      .then((res) => res.json())
      .then((resData) => {
        setDogInfo(resData.data);
        console.log("resdata", resData.data);
      });
  }, []);

  const handleChange = (e) => {
    const dogName = e.target.value;
    const dog = dogInfo.find((dog) => dog.dogName === dogName);
    console.log("doginfo", dog);
    setSelectedDog(dog);
    setFormData({ ...dog });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/editDogInformation/${selectedDog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((resData) => {
        const updatedDogInfo = dogInfo.map((dog) =>
          dog._id === selectedDog._id ? resData.data : dog
        );
        setSelectedDog(updatedDogInfo);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkboxProteinOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const currentProtein = prev.ingredients.protein;
      const hasValue = currentProtein.includes(value);
      if (hasValue) {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            protein: [...currentProtein.filter((item) => item !== value)],
          },
        };
      } else {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            protein: [...currentProtein, value],
          },
        };
      }
    });
  };

  const checkboxOrgansOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const currentOrgans = prev.ingredients.organs;
      const hasValue = currentOrgans.includes(value);
      if (hasValue) {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            organs: [...currentOrgans.filter((item) => item !== value)],
          },
        };
      } else {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            organs: [...currentOrgans, value],
          },
        };
      }
    });
  };

  const checkboxNutsAndSeedsOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const currentNutsAndSeeds = prev.ingredients.nutsAndSeeds;
      const hasValue = currentNutsAndSeeds.includes(value);
      if (hasValue) {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            nutsAndSeeds: [
              ...currentNutsAndSeeds.filter((item) => item !== value),
            ],
          },
        };
      } else {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            nutsAndSeeds: [...currentNutsAndSeeds, value],
          },
        };
      }
    });
  };

  const checkboxOtherOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const currentOther = prev.ingredients.other;
      const hasValue = currentOther.includes(value);
      if (hasValue) {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            other: [...currentOther.filter((item) => item !== value)],
          },
        };
      } else {
        return {
          ...prev,
          ingredients: {
            ...prev.ingredients,
            other: [...currentOther, value],
          },
        };
      }
    });
  };

  return (
    <Wrapper>
      <div>Please pick the dog that you want to edit:</div>
      <div>
        <label>
          <select value={selectedDog?.dogName} onChange={handleChange}>
            <option value="">Select a dog to modify...</option>
            {dogInfo.map((dog) => (
              <option key={dog._id} value={dog.dogName}>
                {dog.dogName}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedDog && (
        <div>
          <h2>{selectedDog.dogName}</h2>

          <Form onSubmit={handleFormSubmit}>
            <FormDiv>
              {/* <input
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
        </select> */}
              <p>
                Please select the ingredients that you are looking for in{" "}
                {currentUser.dogName}'s diet
              </p>
              Protein:
              <label>
                <input
                  type="checkbox"
                  name="protein"
                  value="Chicken"
                  checked={formData.ingredients?.protein?.includes("Chicken")}
                  onChange={checkboxProteinOnChange}
                />
                Chicken
              </label>
              {/* <label>
          <input
            type="checkbox"
            name="protein"
            value="Beef"
            checked={formData.ingredients.protein.includes("Beef")}
            onChange={checkboxProteinOnChange}
          />
          Beef
        </label>
        <label>
          <input
            type="checkbox"
            name="protein"
            value="Turkey"
            checked={formData.ingredients.protein.includes("Turkey")}
            onChange={checkboxProteinOnChange}
          />
          Turkey
        </label>
        <label>
          <input
            type="checkbox"
            name="protein"
            value="Pork"
            checked={formData.ingredients.protein.includes("Pork")}
            onChange={checkboxProteinOnChange}
          />
          Pork
        </label>
        <label>
          <input
            type="checkbox"
            name="protein"
            value="Lamb"
            checked={formData.ingredients.protein.includes("Lamb")}
            onChange={checkboxProteinOnChange}
          />
          Lamb
        </label>
        <label>
          <input
            type="checkbox"
            name="protein"
            value="Fish"
            checked={formData.ingredients.protein.includes("Fish")}
            onChange={checkboxProteinOnChange}
          />
          Fish
        </label>
        <label>
          <input
            type="checkbox"
            name="protein"
            value="Veggie"
            checked={formData.ingredients.protein.includes("Veggie")}
            onChange={checkboxProteinOnChange}
          />
          Veggie
        </label>
        Organs:
        <label>
          <input
            type="checkbox"
            name="organs"
            value="Liver"
            checked={formData.ingredients.organs.includes("Liver")}
            onChange={checkboxOrgansOnChange}
          />
          Liver
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="Kidney"
            checked={formData.ingredients.organs.includes("Kidney")}
            onChange={checkboxOrgansOnChange}
          />
          Kidney
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="Spleen"
            checked={formData.ingredients.organs.includes("Spleen")}
            onChange={checkboxOrgansOnChange}
          />
          Spleen
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="Heart"
            checked={formData.ingredients.organs.includes("Heart")}
            onChange={checkboxOrgansOnChange}
          />
          Heart
        </label>
        <label>
          <input
            type="checkbox"
            name="organs"
            value="Pancreas"
            checked={formData.ingredients.organs.includes("Pancreas")}
            onChange={checkboxOrgansOnChange}
          />
          Pancreas
        </label>
        Nuts & Seeds:
        <label>
          <input
            type="checkbox"
            name="nutsAndSeeds"
            value="Chia"
            checked={formData.ingredients.nutsAndSeeds.includes("Chia")}
            onChange={checkboxNutsAndSeedsOnChange}
          />
          Chia
        </label>
        <label>
          <input
            type="checkbox"
            name="nutsAndSeeds"
            value="Sunflower"
            checked={formData.ingredients.nutsAndSeeds.includes("Sunflower")}
            onChange={checkboxNutsAndSeedsOnChange}
          />
          Sunflower
        </label>
        <label>
          <input
            type="checkbox"
            name="nutsAndSeeds"
            value="HempSeeds"
            checked={formData.ingredients.nutsAndSeeds.includes("HempSeeds")}
            onChange={checkboxNutsAndSeedsOnChange}
          />
          Hemp seeds
        </label>
        Other:
        <label>
          <input
            type="checkbox"
            name="other"
            value="Eggs"
            checked={formData.ingredients.other.includes("Eggs")}
            onChange={checkboxOtherOnChange}
          />
          Eggs
        </label>
        <label>
          <input
            type="checkbox"
            name="other"
            value="Bones"
            checked={formData.ingredients.other.includes("Bones")}
            onChange={checkboxOtherOnChange}
          />
          Raw Bones
        </label>
        <label>
          <input
            type="checkbox"
            name="other"
            value="Fruits"
            checked={formData.ingredients.other.includes("Fruits")}
            onChange={checkboxOtherOnChange}
          />
          Fruits
        </label>
        <label>
          <input
            type="checkbox"
            name="other"
            value="Vegetables"
            checked={formData.ingredients.other.includes("Vegetables")}
            onChange={checkboxOtherOnChange}
          />
          Vegetables
        </label> */}
            </FormDiv>
            <button type="submit" onChange={handleFormSubmit}>
              Submit
            </button>
          </Form>
        </div>
      )}
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

const Input = styled.input`
  margin: 0px 20px;
  width: 45rem;
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
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

const ButtonImage = styled.button`
  margin-top: 2rem;
  background-color: black;
  color: white;
  padding: 5px;
  width: 10rem;
  border: none;
  cursor: pointer;
`;

export default EditDogInformation;
