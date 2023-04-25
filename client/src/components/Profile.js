import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";
// import bcrypt from "bcrypt";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [status, setStatus] = useState("loading");
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dogName, setDogName] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    province: "",
    country: "",
  });
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setStatus("loading");
      fetch(`/getUser/${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          const { firstName, lastName, dogName, address, email, password } =
            data.data;
          setFirstName(firstName);
          setLastName(lastName);
          setDogName(dogName);
          setAddress(address);
          setEmail(email);
          setNewPassword(password);
          setStatus("idle");
        })
        .catch((error) => {
          console.error(error);
          setStatus("error");
        });
    }
  }, [currentUser]);

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
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        setCurrentUser(resData); // update currentUser state with the new values
        setEditMode(false);
      });
  };

  //   const handleSave = () => {
  //     const hashedPassword = bcrypt.hash(newPassword, 10);
  //     setEditMode(false);
  //   };

  if (currentUser) {
    return (
      <>
        {status === "loading" && <p>Loading...</p>}
        {status === "error" && <p>Error loading profile data</p>}
        {status === "idle" && (
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
                  {firstName} {lastName}
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
                <>{dogName}</>
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
                <>{address.street}</>
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
                <>{address.city}</>
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
                <>{address.province}</>
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
                <>{address.country}</>
              )}
            </div>
            <div>
              Email:{" "}
              {editMode ? (
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                <>{email}</>
              )}
            </div>

            <div>
              Password:{" "}
              {editMode ? (
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              ) : (
                "****"
              )}
            </div>

            {editMode ? (
              <div>
                <button
                  type="button"
                  onClick={handleFormSubmit}
                  // onClick={() => {
                  //   handleFormSubmit();
                  //   handleSave();
                  // }}
                >
                  Save Changes
                </button>
                <button onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)}>Edit Profile</button>
            )}
          </form>
        )}
      </>
    );
  }
};

export default Profile;
