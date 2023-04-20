import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const EditSellerItem = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("/getItems")
      .then((res) => res.json())
      .then((resData) => {
        setItems(resData.data);
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
        const updatedItems = items.map((item) =>
          item._id === selectedItem._id ? resData.data : item
        );
        setItems(updatedItems);
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>Please pick the item that you want to edit:</div>
      <div>
        <label>
          <select value={selectedItem?.dishName} onChange={handleChange}>
            <option value="">Select an item to modify...</option>
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
          <form onSubmit={handleFormSubmit}>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
              />
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
            <label>
              Size:
              <input
                type="text"
                name="size"
                value={formData.size || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Ingredients:
              <input
                type="text"
                name="ingredients"
                value={formData.ingredients?.protein || ""}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit" onChange={handleFormSubmit}>
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditSellerItem;
