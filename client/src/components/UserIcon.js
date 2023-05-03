import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./UserContext";

const UserIcon = ({ initials, navigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleDashboardClick = () => {
    if (location.pathname === "/homepage") {
      return;
    }

    if (currentUser.type === "client") {
      navigate("/homepageclient");
    } else {
      navigate("/homepageseller");
    }
  };

  const handleSignOutClick = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      <Circle ref={ref} onClick={() => setDropdownOpen(!dropdownOpen)}>
        {initials}
      </Circle>
      {dropdownOpen && (
        <Dropdown>
          <DropdownItem onClick={handleProfileClick}>My Profile</DropdownItem>
          <DropdownItem onClick={handleDashboardClick}>Dashboard</DropdownItem>
          <DropdownItem onClick={handleSignOutClick}>Sign Out</DropdownItem>
        </Dropdown>
      )}
    </>
  );
};

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #23953c;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
  &:hover {
    background-color: #177b27;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 85px;
  right: 0;

  background-color: black;
  border: 1px solid black;
  border-radius: 5px;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 20px;
`;

const DropdownItem = styled.div`
  font-size: 25px;
  line-height: 60px;
  color: #23953c;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default UserIcon;
