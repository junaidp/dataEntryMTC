import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";
import ExperienceDialog from "./ExperienceDialog";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import SignInDialog from "./SignInDialog";
import { resetOnBoardingAddSuccess } from "../../global-redux/reducers/onBoard/slice";
import { v4 as uuidv4 } from "uuid";

const index = () => {
  const dispatch = useDispatch();
  const [showSignInDialog, setShowLoginDialog] = React.useState(false);
  const [showViewExperienceDialog, setShowViewExperienceDialog] =
    React.useState(false);
  const { experiences, onBoardingAddSuccess, signUpAddSuccess } = useSelector(
    (state) => state?.onBoard
  );
  const [sessionId, setSessionId] = React.useState("");

  React.useEffect(() => {
    if (experiences?.length !== 0) {
      setShowViewExperienceDialog(true);
    }
  }, [experiences]);
  React.useEffect(() => {
    if (onBoardingAddSuccess || signUpAddSuccess) {
      dispatch(resetOnBoardingAddSuccess());
    }
  }, [onBoardingAddSuccess, signUpAddSuccess]);

  React.useEffect(() => {
    setSessionId(uuidv4());
  }, []);
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
        <ChatBot sessionId={sessionId} />
      </div>
    </div>
  );
};

export default index;
