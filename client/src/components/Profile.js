import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [dogName, setDogName] = useState(currentUser.dogName);
  const [address, setAddress] = useState(currentUser.address);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(currentUser.password);

  //   const handleSaveChanges = () => {
  //     e.preventDefault();
  //     fetch(`/getUser/${currentUser._id}`)
  //     .then((resData) => {
  //       if (resData.status !== 200) {
  //         return resData.message;
  //       }
  //     })
  //     .then((res) => res.json())
  //     .then((resData) => {
  //       setItems(resData.data);
  //     })
  //     .catch((error) => {
  //       console.log("catdh error", error);
  //       setItems([]);
  //     });
  // }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`/updateUser/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        dogName,
        address,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setCurrentUser(resData); // update currentUser state with the new values
        setEditMode(false);
      });
  };

  if (currentUser && currentUser.type === "client") {
    return (
      <>
        <form onSubmit={handleFormSubmit}>
          <div>
            Name:{" "}
            {editMode ? (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : (
              <>
                {currentUser.firstName} {currentUser.lastName}
              </>
            )}
          </div>
          <div>
            Dog name:{" "}
            {editMode ? (
              <>
                <input
                  type="text"
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                />
              </>
            ) : (
              <>{currentUser.dogName}</>
            )}
          </div>
          <div>Address:</div>
          <div>
            Street:{" "}
            {editMode ? (
              <input
                type="text"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            ) : (
              <>{currentUser.address.street}</>
            )}
          </div>
          <div>
            City:{" "}
            {editMode ? (
              <input
                type="text"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            ) : (
              <>{currentUser.address.city}</>
            )}
          </div>
          <div>
            Province:{" "}
            {editMode ? (
              <input
                type="text"
                value={address.province}
                onChange={(e) =>
                  setAddress({ ...address, province: e.target.value })
                }
              />
            ) : (
              <>{currentUser.address.province}</>
            )}
          </div>
          <div>
            Country:{" "}
            {editMode ? (
              <input
                type="text"
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
              />
            ) : (
              <>{currentUser.address.country}</>
            )}
          </div>
          <div>
            Email:{" "}
            {editMode ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail({ ...email, email: e.target.value })}
              />
            ) : (
              <>{currentUser.email}</>
            )}
          </div>

          <div>
            Password:{" "}
            {editMode ? (
              <input
                type="password"
                value={currentUser.password}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, password: e.target.value })
                }
              />
            ) : (
              "********"
            )}
          </div>
        </form>

        {editMode ? (
          <button type="button" onClick={handleFormSubmit}>
            Save Changes
          </button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </>
    );
  }
};

export default Profile;
