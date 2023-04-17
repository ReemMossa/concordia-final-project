import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

import Header from "./Header";

import GlobalStyles from "../GlobalStyles";

import SignUp from "./SignUp";
import SignUpClient from "./SignUpClient";
import SignUpSeller from "./SignUpSeller";
import Login from "./Login";
import HomepageClient from "./HomepageClient";
import HomepageSeller from "./HomepageSeller";
import SellerNewItem from "./SellerNewItem";
import DogInformation from "./DogInformation";

const App = () => {
  return (
    <>
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
          <Route path="/doginformation" element={<DogInformation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
