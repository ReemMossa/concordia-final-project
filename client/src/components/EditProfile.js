import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const EditProfile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [dogName, setDogName] = useState(currentUser.dogName);
  const [address, setAddress] = useState(currentUser.address);

  const handleSaveChanges = () => {
    setCurrentUser({
      ...currentUser,
      firstName,
      lastName,
      dogName,
      address,
    });
    setEditMode(false);
  };

  if (currentUser && currentUser.type === "client") {
    return (
      <>
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
              <input
                type="text"
                value={currentUser.dogName}
                onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
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
        {editMode ? (
          <form onSubmit={handleSaveChanges}>
            {/* Render input fields for editing */}
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </>
    );
  }
};

export default EditProfile;
