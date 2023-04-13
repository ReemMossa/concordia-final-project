import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

import Header from "./Header";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import GlobalStyles from "../GlobalStyles";

import { useAuth0 } from "@auth0/auth0-react";
import SignUp from "./SignUp";
import SignUpClient from "./SignUpClient";
import SignUpSeller from "./SignUpSeller";
import Login from "./Login";
import HomepageClient from "./HomepageClient";
import HomepageSeller from "./HomepageSeller";
import SellerNewItem from "./SellerNewItem";
import Testcloudinary from "./Testcloudinary";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <LogoutButton />

      <Testcloudinary />
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupclient" element={<SignUpClient />} />
          <Route path="/signupseller" element={<SignUpSeller />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepageclient" element={<HomepageClient />} />
          <Route path="/homepageseller" element={<HomepageSeller />} />
          <Route path="/sellernewitem" element={<SellerNewItem />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
