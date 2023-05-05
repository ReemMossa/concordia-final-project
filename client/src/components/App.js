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
import EditSellerItem from "./EditSellerItem";
import Profile from "./Profile";
import DetailedFood from "./DetailedFood";
import Payment from "./Payment";
import OrderConfirmation from "./OrderConfirmation";
import ErrorPage from "./Error";
import SoldItems from "./SoldItems";
import OrderComplete from "./OrderComplete";

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
          <Route path="/editselleritem" element={<EditSellerItem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/items/:itemId" element={<DetailedFood />} />
          <Route path="/payment/:itemId" element={<Payment />} />
          <Route path="/order/:_id" element={<OrderConfirmation />} />
          <Route path="/errorpage" element={<ErrorPage />} />
          <Route path="/historysolditems" element={<SoldItems />} />
          <Route path="/ordercomplete" element={<OrderComplete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
