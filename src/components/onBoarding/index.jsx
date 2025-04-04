import React from "react";
import MainForm from "./components/MainForm";
import ChatBot from "../chat/chat";
import ChatContainer from "../chat/ChatBox.jsx/index";
import "./index.css";
import { useSelector, useDispatch } from "react-redux";
import SignInDialog from "./SignInDialog";
import { resetOnBoardingAddSuccess } from "../../global-redux/reducers/onBoard/slice";
import { v4 as uuidv4 } from "uuid";

const index = () => {
  const dispatch = useDispatch();
  const { experiences, onBoardingAddSuccess, signUpAddSuccess, signInData } =
    useSelector((state) => state?.onBoard);
  const [showChat, setShowChat] = React.useState(false);
  const [userName, setUserName] = React.useState("Ricardo");
  const [showSignInDialog, setShowLoginDialog] = React.useState(false);
  const [buttonName, setButtonName] = React.useState("Sign In");
  const [sessionId, setSessionId] = React.useState("");


  React.useEffect(() => {
    if (onBoardingAddSuccess || signUpAddSuccess) {
      dispatch(resetOnBoardingAddSuccess());
    }
  }, [onBoardingAddSuccess, signUpAddSuccess]);

  React.useEffect(() => {
    if (signInData?.customers && signInData?.customers?.length !== 0) {
      setButtonName(signInData?.customers[0]?.firstName || "Name Not Found");
    }
  }, [signInData]);

  React.useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  return (
    <div className="mt-4">
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
          {buttonName}
        </h5>
      </div>

      <div>
        {!showChat ? (
          <MainForm userName={userName} setUserName={setUserName} />
        ) : (
          <ChatContainer />
        )}
        <ChatBot
          sessionId={sessionId}
          userName={userName}
          showChat={showChat}
          setShowChat={setShowChat}
        />
      </div>
    </div>
  );
};

export default index;
