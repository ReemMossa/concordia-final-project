import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

import Header from "./Header";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import GlobalStyles from "../GlobalStyles";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import SignUp from "./SignUp";
import SignUpClient from "./SignUpClient";
import SignUpSeller from "./SignUpSeller";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <LogoutButton />

      <Profile />
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupclient" element={<SignUpClient />} />
          <Route path="/signupseller" element={<SignUpSeller />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
