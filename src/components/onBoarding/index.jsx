import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";
import ExperienceDialog from "./ExperienceDialog";
import "./index.css";
import { useSelector } from "react-redux";

const index = () => {
  const [value, setValue] = React.useState("CLAUDE");
  const [showViewExperienceDialog, setShowViewExperienceDialog] =
    React.useState(false);
  const { experiences } = useSelector((state) => state?.onBoard);

  React.useEffect(() => {
    if (experiences?.length !== 0) {
      setShowViewExperienceDialog(true);
    }
  }, [experiences]);
  return (
    <div className="mt-4">
      {showViewExperienceDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <ExperienceDialog
              setShowViewExperienceDialog={setShowViewExperienceDialog}
            />
          </div>
        </div>
      )}
      <div className="flex float-end AIWrap" style={{ marginRight: "0px" }}>
        {/* <div>
          <p
            className="viewExperience underline cursor-pointer"
            onClick={() => setShowViewExperienceDialog(true)}
          >
            View Experiences
          </p>
        </div> */}
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
        <div></div>
      </div>

      <div>
        <MainForm />
        <ChatBot value={value} />
      </div>
    </div>
  );
};

export default index;
