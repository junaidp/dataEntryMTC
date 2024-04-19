import React from "react";
import { setupChat } from "../../global-redux/reducers/onBoard/slice";
import { useDispatch, useSelector } from "react-redux";
import weAreHere from "../../assets/we-are-here.svg";
import { useDetectClickOutside } from "react-detect-click-outside";

const Chat = () => {
  const dispatch = useDispatch();
  const messagesEndRef = React.useRef(null);
  const { chatResponse, loading } = useSelector((state) => state?.onBoard);
  const [question, setQuestion] = React.useState("");
  const [chatHistory, setChatHistory] = React.useState([]);
  const [showChat, setShowChat] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState("");
  const ref = useDetectClickOutside({ onTriggered: () => setShowChat(false) });

  function handleSubmit(event) {
    if (event) {
      event?.preventDefault();
    }
    if (!loading && question !== "" && question) {
      setChatHistory([...chatHistory, { role: "user", content: question }]);
      let localStorageChat = [
        ...chatHistory,
        { role: "user", content: question },
      ];
      sessionStorage.setItem("chat", JSON.stringify(localStorageChat));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      setQuestion("");
      dispatch(
        setupChat({
          query: question,
          previousChat: [...chatHistory, { role: "user", content: question }],
        })
      );
    }
  }

  React.useEffect(() => {
    if (chatResponse?.content) {
      setChatHistory([
        ...chatHistory,
        { role: "system", content: chatResponse?.content[0]?.text },
      ]);

      let localStorageChat = [
        ...chatHistory,
        { role: "system", content: chatResponse?.content[0]?.text },
      ];
      sessionStorage.setItem("chat", JSON.stringify(localStorageChat));
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const options = {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedTime = date.toLocaleString("en-US", options);
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div ref={ref}>
      <div className={`chat-screen ${showChat && "show-chat"}`}>
        <div className="chat-body hide">
          <div className="chat-start">{currentTime}</div>
          <div className="chat-bubble you">
            Welcome to our site, if you need help simply reply to this message,
            we are online and ready to help.
          </div>
          <div className="chat-bubble me">Hi, I am back</div>
          <div className="chat-bubble me">I just want my Report Status.</div>
          <div className="chat-bubble me">
            As i am not getting any weekly reports nowadays.
          </div>

          {chatHistory?.map((chat, index) => {
            return (
              <div key={index}>
                <div
                  className={`chat-bubble ${
                    chat?.role === "user" ? "me" : "you"
                  }`}
                >
                  {chat?.content}
                </div>
              </div>
            );
          })}
          {loading && (
            <div className="chat-bubble you">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style={{
                  margin: "auto",
                  display: "block",
                  shapeRendering: "auto",
                  width: "43px",
                  height: "20px",
                }}
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
              >
                <circle cx="0" cy="44.1678" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.6s"
                  ></animate>
                </circle>
                <circle cx="45" cy="43.0965" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.39999999999999997s"
                  ></animate>
                </circle>{" "}
                <circle cx="90" cy="52.0442" r="15" fill="#ffffff">
                  <animate
                    attributeName="cy"
                    calcMode="spline"
                    keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5"
                    repeatCount="indefinite"
                    values="57.5;42.5;57.5;57.5"
                    keyTimes="0;0.3;0.6;1"
                    dur="1s"
                    begin="-0.19999999999999998s"
                  ></animate>
                </circle>
              </svg>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
        <div className={`chat-input ${!showChat ? "hide" : ""}`}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type a message..."
              value={question}
              onChange={(e) => setQuestion(e?.target?.value)}
            />
          </form>
          <div className="input-action-icon">
            <a onClick={handleSubmit}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-send"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="chat-bot-icon" onClick={() => setShowChat((pre) => !pre)}>
        <img src={weAreHere} className={showChat ? "hide" : ""} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          s
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`feather feather-message-square ${
            !showChat && "animate"
          } `}
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class={`feather feather-x  ${showChat && "animate"}`}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  );
};

export default Chat;
