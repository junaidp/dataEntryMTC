import React from "react";
import "./App.css";
import Tabs from "./components/common/Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OnBoarding from "./components/onBoarding";
import ChatPage from "./components/chat/chat";

const App = () => {
  return (
    <div className="mx-4 my-4 main-wrapper">
      <ToastContainer />
      <div className="m-50 m-30">
        <div className="mb-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Tabs />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/onBoarding" element={<OnBoarding />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
