import React from "react";
import { setupChat } from "../../global-redux/reducers/onBoard/slice";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";

const Chat = () => {
  const dispatch = useDispatch();
  const messagesEndRef = React.useRef(null);
  const unKnowRef = React.useRef(null);
  const { chatResponse, loading } = useSelector((state) => state?.onBoard);
  const [currentId, setCurrentId] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([]);

  function handleSubmit(event) {
    if (event) {
      event?.preventDefault();
    }
    if (!loading && question !== "" && question) {
      let id = uuidv4();
      setCurrentId(id);
      setChatHistory([
        ...chatHistory,
        { id: id, question: question, answer: "Progress..." },
      ]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      dispatch(
        setupChat(
          `?query=${question}&previousChat=${
            chatHistory?.length === 0
              ? ""
              : chatHistory?.map((chat) =>
                  chat?.question + ":" + chat?.answer === "Progress..."
                    ? "Unable to fetch results."
                    : chat?.answer
                )
          }`
        )
      );
    }
  }

  React.useEffect(() => {
    if (chatResponse?.content) {
      setChatHistory((pre) =>
        pre?.map((singleChat) =>
          singleChat?.id === currentId
            ? {
                ...singleChat,
                answer: chatResponse?.content[0]?.text,
              }
            : singleChat
        )
      );

      let localStorageChat = chatHistory?.map((singleChat) =>
        singleChat?.id === currentId
          ? {
              ...singleChat,
              answer: chatResponse?.content[0]?.text,
            }
          : singleChat
      );
      sessionStorage.setItem("chat", JSON.stringify(localStorageChat));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setCurrentId("");
      setQuestion("");
    }
  }, [chatResponse]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  React.useEffect(() => {
    const storedChat = sessionStorage.getItem("chat");
    if (storedChat) {
      const parsedChat = JSON.parse(storedChat);
      setChatHistory(parsedChat);
    }
  }, []);
  return (
    <div>
      <div className="chat-wrapper">
        {chatHistory?.length === 0 ? (
          <div>
            <h1 className="text-center">How can I help you today?</h1>
          </div>
        ) : (
          <div className="chat-container">
            {chatHistory?.map((chat, mainIndex) => (
              <div
                key={chat.id}
                className="chat-message"
                ref={
                  mainIndex === chatHistory?.length - 1
                    ? messagesEndRef
                    : unKnowRef
                }
              >
                <div className="question">
                  {chat.question.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`${
                        chatHistory?.length - 1 === mainIndex &&
                        "char-animation"
                      }`}
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="answer">
                  {chat.answer.split("").map((char, index) => (
                    <span
                      key={index}
                      className={`${
                        chatHistory?.length - 1 === mainIndex &&
                        "char-animation"
                      }`}
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="lastInputMainWrap">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            bottom: "30px",
            width: "90%",
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Write Here..."
            inputProps={{ "aria-label": "Write Here..." }}
            value={question}
            onChange={(event) => setQuestion(event?.target?.value)}
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {loading ? (
            <CircularProgress style={{ height: 20, width: 20 }} />
          ) : (
            <IconButton
              color="primary"
              sx={{ p: "10px" }}
              aria-label="directions"
              onClick={handleSubmit}
            >
              <DirectionsIcon />
            </IconButton>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Chat;
