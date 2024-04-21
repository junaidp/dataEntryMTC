import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";

const index = () => {
  const [value, setValue] = React.useState("CLAUDE");
  return (
    <div className="mt-4">
      <div className="row float-end" style={{ marginRight: "0px" }}>
        <select
          className="form-select  h-40"
          aria-label="Default select example"
          onChange={(e) => {
            if (e?.target?.value !== "") {
              setValue(e?.target?.value);
            }
          }}
          value={value}
        >
          <option value="">Select AI Type</option>
          <option value="CLAUDE">CLAUDE</option>
          <option value="OPENAI">OPENAI</option>
          <option value="GEMINI">GEMINI</option>
        </select>
      </div>
      <div>
        <MainForm />
        <ChatBot value={value} />
      </div>
    </div>
  );
};

export default index;
