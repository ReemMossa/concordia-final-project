import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const EditSellerItem = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imageSelected, setImageSelected] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/getOneItem/${currentUser._id}`)
      .then((res) => {
        if (res.status > 500) {
          navigate("/errorPage");
        }
        return res.json();
      })
      .then((resData) => {
        if (!resData.data) {
          navigate("/errorPage");
        }

        const filteredItems = resData.data.filter(
          (item) => item.status !== "pending"
        );
        setItems(filteredItems);
      })
      .catch((error) => {
        navigate("/errorPage");
        setItems([]);
      });
  }, []);

  const handleChange = (e) => {
    const itemName = e.target.value;
    const item = items.find((item) => item.dishName === itemName);
    setSelectedItem(item);
    setFormData({ ...item });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/editSellerItemNoStatus/${selectedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((resData) => {
        navigate("/homepageseller");
        if (items > 0) {
          const updatedItems = items.map((item) =>
            item._id === selectedItem._id ? resData.data : item
          );
          setItems(updatedItems);
        }
      });
  };

  const handleFormDelete = (e) => {
    e.preventDefault();
    fetch(`/deleteSellerItem/${selectedItem._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("res", res);
          throw new Error("Failed to delete the seller item");
        }
        const updatedItems = items.filter(
          (item) => item._id !== selectedItem._id
        );
        setItems(updatedItems);
        navigate("/homepageseller");
        return res.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <>
      <ButtonHomepage>
        <StyledLink to="/homepageseller">Return to your homepage</StyledLink>
      </ButtonHomepage>
      <Dropdown>
        <div>Please pick one of your AVAILABLE items that you want to edit</div>
        <div>* You can no longer edit your pending or sold items</div>
      </Dropdown>
      <div>
        <Dropdown>
          <select value={selectedItem?.dishName} onChange={handleChange}>
            <option value="">Select an item to modify...</option>
            {console.log("items", items)}
            {items
              .filter((item) => item.status === "available")
              .map((item) => (
                <option key={item._id} value={item.dishName}>
                  {item.dishName}
                </option>
              ))}
          </select>
        </Dropdown>
      </div>
      {selectedItem && (
        <div>
          <Wrapper>
            <H1>{selectedItem.dishName}</H1>
            <Form onSubmit={handleFormSubmit}>
              <FormDiv>
                <Type>Edit description</Type>
                <Input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
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
                      checked={formData.ingredients?.protein?.includes(
                        "Chicken"
                      )}
                      onChange={checkboxProteinOnChange}
                    />
                    Chicken
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Beef"
                      checked={formData.ingredients?.protein?.includes("Beef")}
                      onChange={checkboxProteinOnChange}
                    />
                    Beef
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Turkey"
                      checked={formData.ingredients?.protein?.includes(
                        "Turkey"
                      )}
                      onChange={checkboxProteinOnChange}
                    />
                    Turkey
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Pork"
                      checked={formData.ingredients?.protein?.includes("Pork")}
                      onChange={checkboxProteinOnChange}
                    />
                    Pork
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Lamb"
                      checked={formData.ingredients?.protein?.includes("Lamb")}
                      onChange={checkboxProteinOnChange}
                    />
                    Lamb
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Fish"
                      checked={formData.ingredients?.protein?.includes("Fish")}
                      onChange={checkboxProteinOnChange}
                    />
                    Fish
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="protein"
                      value="Veggie"
                      checked={formData.ingredients?.protein?.includes(
                        "Veggie"
                      )}
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
                      checked={formData.ingredients?.organs?.includes("Liver")}
                      onChange={checkboxOrgansOnChange}
                    />
                    Liver
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="organs"
                      value="Kidney"
                      checked={formData.ingredients?.organs?.includes("Kidney")}
                      onChange={checkboxOrgansOnChange}
                    />
                    Kidney
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="organs"
                      value="Spleen"
                      checked={formData.ingredients?.organs?.includes("Spleen")}
                      onChange={checkboxOrgansOnChange}
                    />
                    Spleen
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="organs"
                      value="Heart"
                      checked={formData.ingredients?.organs?.includes("Heart")}
                      onChange={checkboxOrgansOnChange}
                    />
                    Heart
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="organs"
                      value="Pancreas"
                      checked={formData.ingredients?.organs?.includes(
                        "Pancreas"
                      )}
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
                      checked={formData.ingredients?.nutsAndSeeds?.includes(
                        "Chia"
                      )}
                      onChange={checkboxNutsAndSeedsOnChange}
                    />
                    Chia
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="nutsAndSeeds"
                      value="Sunflower"
                      checked={formData.ingredients?.nutsAndSeeds?.includes(
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
                      checked={formData.ingredients?.nutsAndSeeds?.includes(
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
                      checked={formData.ingredients?.other?.includes("Eggs")}
                      onChange={checkboxOtherOnChange}
                    />
                    Eggs
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="other"
                      value="Bones"
                      checked={formData.ingredients?.other?.includes("Bones")}
                      onChange={checkboxOtherOnChange}
                    />
                    Raw Bones
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="other"
                      value="Fruits"
                      checked={formData.ingredients?.other?.includes("Fruits")}
                      onChange={checkboxOtherOnChange}
                    />
                    Fruits
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="checkbox"
                      name="other"
                      value="Vegetables"
                      checked={formData.ingredients?.other?.includes(
                        "Vegetables"
                      )}
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
                      checked={formData.size === "5-8cups"}
                      onChange={handleInputChange}
                    />
                    5-8 cups
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="radio"
                      name="size"
                      value="9-16cups"
                      checked={formData.size === "9-16cups"}
                      onChange={handleInputChange}
                    />
                    9-16 cups
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="radio"
                      name="size"
                      value="17-22cups"
                      checked={formData.size === "17-22cups"}
                      onChange={handleInputChange}
                    />
                    17-22 cups
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="radio"
                      name="size"
                      value="23-26cups"
                      checked={formData.size === "23-26cups"}
                      onChange={handleInputChange}
                    />
                    23-26 cups
                  </Label>
                  <Label>
                    <InputCheckbox
                      type="radio"
                      name="size"
                      value="27-30cups"
                      checked={formData.size === "27-30cups"}
                      onChange={handleInputChange}
                    />
                    27-30 cups
                  </Label>
                </Checkbox>
                <Type>Price of dish $</Type>
                <InputPrice
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                />
                <label>
                  <Type>Upload an image of your dish *</Type>
                  {!formData.imageUrl ? (
                    <InputImage
                      type="file"
                      name="imageUrl"
                      value={formData.imageUrl || ""}
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
                  ) : (
                    <StyledImage src={formData.imageUrl} />
                  )}
                </label>
              </FormDiv>
              <ButtonContainer>
                <Button type="submit">Submit Edited Item</Button>

                <Button
                  type="button"
                  onClick={handleFormDelete}
                  link
                  to="/homepageseller"
                >
                  Delete item
                </Button>
              </ButtonContainer>
            </Form>
          </Wrapper>
        </div>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  border-radius: 1rem;
  margin-left: 40rem;
  margin-right: 40rem;
  margin-top: -3rem;
`;

const Dropdown = styled.div`
  color: #23953c;
  font-size: 20px;
  margin-left: 10px;
  margin-top: 10px;
  font-weight: bolder;
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
  font-style: italic;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
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
  margin: 5px 20px 40px 20px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 1rem;
  width: 200px;
  color: white;
  float: right;
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 40px;
  cursor: pointer;
`;

const ButtonHomepage = styled.button`
  background-color: #23953c;
  font-size: 15px;
  padding: 1rem 1rem;
  color: white;
  float: right;
  margin-top: 1rem;
  margin-right: 5rem;
  cursor: pointer;
`;

export default EditSellerItem;
