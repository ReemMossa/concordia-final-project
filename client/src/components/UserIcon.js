import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const UserIcon = ({ initials, navigate }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const location = useLocation();

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
      <Circle onClick={() => setDropdownOpen(!dropdownOpen)}>{initials}</Circle>
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
  display: inline-block;
  margin-left: auto;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #23953c;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 123px;
  right: 0;
  background-color: #23953c;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const DropdownItem = styled.div`
  margin-top: 5px;
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
export default UserIcon;
