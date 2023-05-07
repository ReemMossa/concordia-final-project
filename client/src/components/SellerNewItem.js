import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const SellerNewItem = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [imageSelected, setImageSelected] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: currentUser._id,
    dishName: "",
    description: "",
    ingredients: {
      protein: [],
      organs: [],
      nutsAndSeeds: [],
      other: [],
    },
    size: "",
    price: "",
    imageUrl: "",
    status: "available",
  });

  const handleInputChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        ingredients: {
          ...formData.ingredients,
          [e.target.name]: e.target.checked ? true : false,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataImage = new FormData();
    formDataImage.append("file", imageSelected);
    formDataImage.append("upload_preset", "lyxwlobx");

    fetch("https://api.cloudinary.com/v1_1/dhn6kqmnu/image/upload", {
      method: "POST",
      body: formDataImage,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data.secure_url;

        fetch("/addSellerItem", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ ...formData, imageUrl: imageUrl }),
        }).then((res) => {
          if (res.status > 500) {
            navigate("/");
          } else {
            res
              .json()
              .then((resData) => {
                if (resData.status === 200) {
                  navigate("/homepageSeller");
                } else {
                  navigate("/errorpage");
                }
              })
              .catch((err) => window.alert(err));
          }
        });
      })
      .catch((error) => {
        console.error("Error uploading image to Cloudinary", error);
      });
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

  const checkboxSizeOnChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => {
      const currentSize = prev.size;
      const hasValue = currentSize.includes(value);
      if (hasValue) {
        return {
          ...prev,
          size: [...currentSize.filter((item) => item !== value)],
        };
      } else {
        return {
          ...prev,
          size: value,
        };
      }
    });
  };

  return (
    <Wrapper>
      <H1>Please fill out this form to upload your dish</H1>
      <Form onSubmit={handleSubmit}>
        <FormDiv>
          <Input
            type="text"
            id="dishName"
            name="dishName"
            placeholder="Name of your dish *"
            value={formData.dishName}
            onChange={handleInputChange}
            required
          />
          <Input
            type="text"
            id="description"
            name="description"
            placeholder="Please write a detailed description of your dish *"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <Span>
            <Ingredients>Main ingredients used</Ingredients>
            <Select>(*Please select all that apply)</Select>
          </Span>
          <Type>Protein</Type>
          <Checkbox>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Chicken"
                checked={formData.ingredients.protein.includes("Chicken")}
                onChange={checkboxProteinOnChange}
              />
              Chicken
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Beef"
                checked={formData.ingredients.protein.includes("Beef")}
                onChange={checkboxProteinOnChange}
              />
              Beef
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Turkey"
                checked={formData.ingredients.protein.includes("Turkey")}
                onChange={checkboxProteinOnChange}
              />
              Turkey
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Pork"
                checked={formData.ingredients.protein.includes("Pork")}
                onChange={checkboxProteinOnChange}
              />
              Pork
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Lamb"
                checked={formData.ingredients.protein.includes("Lamb")}
                onChange={checkboxProteinOnChange}
              />
              Lamb
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Fish"
                checked={formData.ingredients.protein.includes("Fish")}
                onChange={checkboxProteinOnChange}
              />
              Fish
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="protein"
                value="Veggie"
                checked={formData.ingredients.protein.includes("Veggie")}
                onChange={checkboxProteinOnChange}
              />
              Veggie
            </Label>
          </Checkbox>
          <Type>Organs</Type>
          <Checkbox>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="organs"
                value="Liver"
                checked={formData.ingredients.organs.includes("Liver")}
                onChange={checkboxOrgansOnChange}
              />
              Liver
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="organs"
                value="Kidney"
                checked={formData.ingredients.organs.includes("Kidney")}
                onChange={checkboxOrgansOnChange}
              />
              Kidney
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="organs"
                value="Spleen"
                checked={formData.ingredients.organs.includes("Spleen")}
                onChange={checkboxOrgansOnChange}
              />
              Spleen
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="organs"
                value="Heart"
                checked={formData.ingredients.organs.includes("Heart")}
                onChange={checkboxOrgansOnChange}
              />
              Heart
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="organs"
                value="Pancreas"
                checked={formData.ingredients.organs.includes("Pancreas")}
                onChange={checkboxOrgansOnChange}
              />
              Pancreas
            </Label>
          </Checkbox>
          <Type>Nuts & Seeds</Type>
          <Checkbox>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="nutsAndSeeds"
                value="Chia"
                checked={formData.ingredients.nutsAndSeeds.includes("Chia")}
                onChange={checkboxNutsAndSeedsOnChange}
              />
              Chia
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="nutsAndSeeds"
                value="Sunflower"
                checked={formData.ingredients.nutsAndSeeds.includes(
                  "Sunflower"
                )}
                onChange={checkboxNutsAndSeedsOnChange}
              />
              Sunflower
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="nutsAndSeeds"
                value="HempSeeds"
                checked={formData.ingredients.nutsAndSeeds.includes(
                  "HempSeeds"
                )}
                onChange={checkboxNutsAndSeedsOnChange}
              />
              Hemp seeds
            </Label>
          </Checkbox>
          <Type>Other</Type>
          <Checkbox>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="other"
                value="Eggs"
                checked={formData.ingredients.other.includes("Eggs")}
                onChange={checkboxOtherOnChange}
              />
              Eggs
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="other"
                value="Bones"
                checked={formData.ingredients.other.includes("Bones")}
                onChange={checkboxOtherOnChange}
              />
              Raw Bones
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="other"
                value="Fruits"
                checked={formData.ingredients.other.includes("Fruits")}
                onChange={checkboxOtherOnChange}
              />
              Fruits
            </Label>
            <Label>
              <InputCheckbox
                type="checkbox"
                name="other"
                value="Vegetables"
                checked={formData.ingredients.other.includes("Vegetables")}
                onChange={checkboxOtherOnChange}
              />
              Vegetables
            </Label>
          </Checkbox>
          <Type>Meal portion size</Type>
          <Checkbox>
            <Label>
              <InputCheckbox
                type="radio"
                name="size"
                value="5-8cups"
                checked={formData.size.includes("5-8cups")}
                onChange={checkboxSizeOnChange}
              />
              5-8 cups
            </Label>
            <Label>
              <InputCheckbox
                type="radio"
                name="size"
                value="9-16cups"
                checked={formData.size.includes("9-16cups")}
                onChange={checkboxSizeOnChange}
              />
              9-16 cups
            </Label>
            <Label>
              <InputCheckbox
                type="radio"
                name="size"
                value="17-22cups"
                checked={formData.size.includes("17-22cups")}
                onChange={checkboxSizeOnChange}
              />
              17-22 cups
            </Label>
            <Label>
              <inpuInputCheckboxt
                type="radio"
                name="size"
                value="23-26cups"
                checked={formData.size.includes("23-26cups")}
                onChange={checkboxSizeOnChange}
              />
              23-26 cups
            </Label>
            <Label>
              <InputCheckbox
                type="radio"
                name="size"
                value="27-30cups"
                checked={formData.size.includes("27-30cups")}
                onChange={checkboxSizeOnChange}
              />
              27-30 cups
            </Label>
          </Checkbox>
          <InputPrice
            type="number"
            id="price"
            name="price"
            placeholder="Price of dish - CAD$ *"
            value={formData.price}
            onChange={handleInputChange}
            step="any"
            required
          />
          <Type>Upload an image of your dish *</Type>
          <InputImage
            type="file"
            onChange={(e) => {
              const image = e.target.files[0];
              setImageSelected(image);
              setFormData({
                ...formData,
                imageUrl: URL.createObjectURL(image),
              });
            }}
            required
          />
          <Img src={formData.imageUrl} />
        </FormDiv>

        <ButtonContainer>
          <Button type="submit">Upload my food!</Button>
        </ButtonContainer>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin-left: 40rem;
  margin-right: 40rem;
  margin-top: 1rem;
`;

const Form = styled.form`
  margin: 2px auto;
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

const Span = styled.span`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Ingredients = styled.span`
  font-size: 20px;
  color: #23953c;
  font-weight: bolder;
  margin-right: 10px;
`;

const Select = styled.span`
  font-size: 13px;
  color: #23953c;
  font-weight: bolder;
  font-style: italic;
`;

const Input = styled.input`
  margin: 0px 20px;
  width: 45rem;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
`;

const InputPrice = styled.input`
  margin: 20px 20px;
  width: 22.5rem;
  border-radius: 5px;
  padding: 15px;
  text-align: center;
`;

const Checkbox = styled.div`
  display: inline-block;
`;

const InputCheckbox = styled.input`
  display: inline-block;
  margin-left: 20px;
`;

const Type = styled.p`
  margin-bottom: 5px;
  color: #23953c;
  font-weight: bolder;
  margin-left: 20px;
`;

const Label = styled.label`
  display: inline-block;
  margin-right: 30px;
  margin-bottom: 20px;
`;

const InputImage = styled.input`
  margin-left: 20px;
`;

const Img = styled.img`
  width: 200px;
  margin-top: 20px;
  margin-left: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 1rem;
  color: white;
  float: right;
  margin-top: 20px;
  cursor: pointer;
`;

export default SellerNewItem;
