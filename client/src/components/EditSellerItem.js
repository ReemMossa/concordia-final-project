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
        if (res.status === 404) {
          return [];
        } else if (res.status > 500) {
          navigate("/errorPage");
        }
        return res.json();
      })
      .then((resData) => {
        if (!resData.data) {
          setItems([]);
        } else {
          const filteredItems = resData.data.filter(
            (item) => item.status !== "pending"
          );
          setItems(filteredItems);
        }
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
    fetch(`/editSellerItem/${selectedItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((resData) => {
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
      <Wrapper>
        <div>Please pick the item that you want to edit:</div>
        <div>
          <label>
            <select value={selectedItem?.dishName} onChange={handleChange}>
              <option value="">Select an item to modify...</option>
              {items.length === 0 && (
                <option value="">No items to modify</option>
              )}
              {items.map((item) => (
                <option key={item._id} value={item.dishName}>
                  {item.dishName}
                </option>
              ))}
            </select>
          </label>
        </div>
        {selectedItem && (
          <div>
            <h2>{selectedItem.dishName}</h2>
            <Form onSubmit={handleFormSubmit}>
              <FormDiv>
                <label>
                  Description:
                  <Input
                    type="text"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <p>Ingredients:</p>
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
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Beef"
                    checked={formData.ingredients?.protein?.includes("Beef")}
                    onChange={checkboxProteinOnChange}
                  />
                  Beef
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Turkey"
                    checked={formData.ingredients?.protein?.includes("Turkey")}
                    onChange={checkboxProteinOnChange}
                  />
                  Turkey
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Pork"
                    checked={formData.ingredients?.protein?.includes("Pork")}
                    onChange={checkboxProteinOnChange}
                  />
                  Pork
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Lamb"
                    checked={formData.ingredients?.protein?.includes("Lamb")}
                    onChange={checkboxProteinOnChange}
                  />
                  Lamb
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Fish"
                    checked={formData.ingredients?.protein?.includes("Fish")}
                    onChange={checkboxProteinOnChange}
                  />
                  Fish
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="protein"
                    value="Veggie"
                    checked={formData.ingredients?.protein?.includes("Veggie")}
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
                    checked={formData.ingredients?.organs?.includes("Liver")}
                    onChange={checkboxOrgansOnChange}
                  />
                  Liver
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organs"
                    value="Kidney"
                    checked={formData.ingredients?.organs?.includes("Kidney")}
                    onChange={checkboxOrgansOnChange}
                  />
                  Kidney
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organs"
                    value="Spleen"
                    checked={formData.ingredients?.organs?.includes("Spleen")}
                    onChange={checkboxOrgansOnChange}
                  />
                  Spleen
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organs"
                    value="Heart"
                    checked={formData.ingredients?.organs?.includes("Heart")}
                    onChange={checkboxOrgansOnChange}
                  />
                  Heart
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="organs"
                    value="Pancreas"
                    checked={formData.ingredients?.organs?.includes("Pancreas")}
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
                    checked={formData.ingredients?.nutsAndSeeds?.includes(
                      "Chia"
                    )}
                    onChange={checkboxNutsAndSeedsOnChange}
                  />
                  Chia
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="nutsAndSeeds"
                    value="Sunflower"
                    checked={formData.ingredients?.nutsAndSeeds?.includes(
                      "Sunflower"
                    )}
                    onChange={checkboxNutsAndSeedsOnChange}
                  />
                  Sunflower
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="nutsAndSeeds"
                    value="HempSeeds"
                    checked={formData.ingredients?.nutsAndSeeds?.includes(
                      "HempSeeds"
                    )}
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
                    checked={formData.ingredients?.other?.includes("Eggs")}
                    onChange={checkboxOtherOnChange}
                  />
                  Eggs
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="other"
                    value="Bones"
                    checked={formData.ingredients?.other?.includes("Bones")}
                    onChange={checkboxOtherOnChange}
                  />
                  Raw Bones
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="other"
                    value="Fruits"
                    checked={formData.ingredients?.other?.includes("Fruits")}
                    onChange={checkboxOtherOnChange}
                  />
                  Fruits
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="other"
                    value="Vegetables"
                    checked={formData.ingredients?.other?.includes(
                      "Vegetables"
                    )}
                    onChange={checkboxOtherOnChange}
                  />
                  Vegetables
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                  />
                </label>
                Meal portion size:
                <label>
                  Size:
                  <br />
                  <input
                    type="radio"
                    name="size"
                    value="5-8cups"
                    checked={formData.size === "5-8cups"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="size-5-8cups">5-8cups</label>
                  <br />
                  <input
                    type="radio"
                    name="size"
                    value="9-16cups"
                    checked={formData.size === "9-16cups"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="size-9-16cups">9-12cups</label>
                  <input
                    type="radio"
                    name="size"
                    value="17-22cups"
                    checked={formData.size === "17-22cups"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="size-17-22cups">17-20cups</label>
                  <input
                    type="radio"
                    name="size"
                    value="23-26cups"
                    checked={formData.size === "23-26cups"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="size-23-26cups">23-26cups</label>
                  <input
                    type="radio"
                    name="size"
                    value="27-30cups"
                    checked={formData.size === "27-30cups"}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="size-27-30cups">27-30cups</label>
                </label>
                <label>
                  Image:
                  {formData.imageUrl ? (
                    <>
                      <StyledImage src={formData.imageUrl} />
                      <input
                        type="file"
                        name="imageUrl"
                        onChange={(e) => {
                          const image = e.target.files[0];
                          setImageSelected(image);
                          setFormData({
                            ...formData,
                            imageUrl: URL.createObjectURL(image),
                          });
                        }}
                      />
                    </>
                  ) : (
                    <input
                      type="file"
                      name="imageUrl"
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
                  )}
                </label>
              </FormDiv>
              <button type="submit">Submit</button>

              <button
                type="button"
                onClick={handleFormDelete}
                link
                to="/homepageseller"
              >
                Delete item
              </button>
            </Form>
          </div>
        )}
      </Wrapper>
      <Button>
        <StyledLink to="/homepageseller">Return to your homepage</StyledLink>
      </Button>
    </>
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

const Input = styled.input`
  margin: 0px 20px;
  width: 45rem;
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
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

export default EditSellerItem;
