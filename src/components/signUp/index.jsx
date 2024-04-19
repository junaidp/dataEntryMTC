import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";

const index = () => {
  return (
    <div className="mt-4">
      <MainForm />
      <ChatBot />
    </div>
  );
};

export default index;
