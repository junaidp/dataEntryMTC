import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";
import ExperienceDialog from "./ExperienceDialog";
import "./index.css";
import { useSelector } from "react-redux";
import SignInDialog from "./SignInDialog";

const index = () => {
  const [value, setValue] = React.useState("CLAUDE");
  const [showSignInDialog, setShowLoginDialog] = React.useState(false);
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
      {showSignInDialog && (
        <div className="modal-objective">
          <div className="model-wrap">
            <SignInDialog setShowLoginDialog={setShowLoginDialog} />
          </div>
        </div>
      )}
      <div className="flex float-end AIWrap" style={{ marginRight: "0px" }}>
        <h5
          className="link-info cursor-pointer mt-1"
          onClick={() => setShowLoginDialog(true)}
        >
          Sign In
        </h5>
      </div>

      <div>
        <MainForm />
        <ChatBot value={value} />
      </div>
    </div>
  );
};

export default index;
