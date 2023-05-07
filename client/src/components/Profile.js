import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("loading");
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");
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
          const { firstName, lastName, address, email, type } = data.data;
          setFirstName(firstName);
          setLastName(lastName);
          setAddress(address);
          setEmail(email);
          setType(type);
          setStatus("idle");
          setCurrentUser({
            _id: currentUser._id,
            firstName,
            lastName,
            address,
            email,
            type,
          });
        })
        .catch((error) => {
          setStatus("error");
        });
    }
  }, []);

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
        address,
        email,
        password: newPassword,
      }),
    })
      .then((res) => res.json())

      .then((resData) => {
        if (resData.status === 404) {
          setErrorMessage(resData.message);
        } else {
          fetch(`/getUser/${email}`)
            .then((res) => res.json())
            .then((data) => {
              setCurrentUser(data.data);
              setEditMode(false);
              setErrorMessage("");
              navigate("/profile");
            });
        }
      });
  };

  if (currentUser) {
    return (
      <Wrapper>
        {status === "loading" && <p>Loading...</p>}
        {errorMessage && <p>{errorMessage}</p>}
        {status === "error" && <p>Error loading profile data</p>}
        {status === "idle" && (
          <Form onSubmit={handleFormSubmit}>
            <FormDiv>
              <div>
                {editMode ? (
                  <NameDiv>
                    <NameInput
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <NameInput
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </NameDiv>
                ) : (
                  <>
                    <Text> Name: </Text>
                    {firstName} {lastName}
                  </>
                )}
              </div>
              <div>
                {editMode ? (
                  <Input
                    type="text"
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    required
                  />
                ) : (
                  <MainProfile>
                    <Address>Address </Address>
                    <Text> Street: </Text>
                    {address.street}
                  </MainProfile>
                )}
              </div>

              <div>
                {editMode ? (
                  <Input
                    type="text"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    required
                  />
                ) : (
                  <MainProfile>
                    <Text>City: </Text>
                    {address.city}
                  </MainProfile>
                )}
              </div>
              <div>
                {editMode ? (
                  <Input
                    type="text"
                    value={address.province}
                    onChange={(e) =>
                      setAddress({ ...address, province: e.target.value })
                    }
                    required
                  />
                ) : (
                  <MainProfile>
                    <Text>Province: </Text>
                    {address.province}
                  </MainProfile>
                )}
              </div>
              <div>
                {editMode ? (
                  <Input
                    type="text"
                    value={address.country}
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    required
                  />
                ) : (
                  <MainProfile>
                    <Text>Country: </Text>
                    {address.country}
                  </MainProfile>
                )}
              </div>
              <div>
                {editMode ? (
                  <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                ) : (
                  <MainProfile>
                    <Text>Email: </Text>
                    {email}
                  </MainProfile>
                )}
              </div>

              <div>
                {editMode ? (
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password ***"
                    required
                  />
                ) : (
                  <MainProfile>
                    <Text>Password </Text>
                    ****
                  </MainProfile>
                )}
              </div>

              {editMode ? (
                <ButtonContainer>
                  <Button type="button" onClick={handleFormSubmit}>
                    Save Changes
                  </Button>
                  <Button onClick={() => setEditMode(false)}>Cancel</Button>
                </ButtonContainer>
              ) : (
                <ButtonEditProfile onClick={() => setEditMode(true)}>
                  Edit Profile
                </ButtonEditProfile>
              )}
            </FormDiv>
          </Form>
        )}
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
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

const NameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  input {
    width: 20rem;
    margin: 0px 20px;
  }
`;

const NameInput = styled.input`
  border-radius: 5px;
  padding: 15px;
  width: 10rem;
  text-align: center;
`;

const Input = styled.input`
  margin: 0px 20px;
  width: 45rem;
  border-radius: 5px;
  padding: 15px;
  margin-top: 30px;
`;

const Address = styled.div`
  color: #23953c;
  font-weight: bolder;
`;

const MainProfile = styled.div`
  line-height: 30px;
`;

const Text = styled.span`
  color: #23953c;
`;

const ButtonEditProfile = styled.button`
  margin-top: 2rem;
  background-color: #23953c;
  color: white;
  padding: 15px;
  width: 10rem;
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-top: 2rem;
  background-color: #23953c;
  color: white;
  padding: 15px;
  width: 10rem;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 20px;
`;

export default Profile;
