import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import logo from "../../../../src/assets/log.png";
import { toast } from "react-toastify";

// Styled components
const ChatBox = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  padding: "40px 20px",
  backgroundColor: "#f5f5f5",
  display: "flex",
  background: "#f5f5f5",
  padding: "40px",
  minHeight: "80vh",
  margin: "40px",
  overflowY: "auto",
  flexDirection: "column",
  "@media (max-width: 700px)": {
    margin: "40px 0px",
    padding: "10px",
  },
});

const InputBox = styled(Box)({
  position: "fixed",
  bottom: 0,
  width: "90%",
  padding: "10px 20px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const MessageBubble = styled(Box)(({ isUser }) => ({
  alignSelf: isUser ? "flex-end" : "flex-start",
  padding: "20px",
  backgroundColor: isUser ? "#007bff" : "#e0e0e0",
  color: isUser ? "#fff" : "#000",
  borderRadius: "20px",
  marginBottom: "10px",
  maxWidth: "60%",
  "@media (max-width: 700px)": {
    maxWidth: "100%",
  },
}));

const TypingEffect = styled("span")({
  display: "inline-block",
  animation: "blink 1s steps(5, start) infinite",
  "@keyframes blink": {
    "50%": { opacity: 0 },
  },
});

const ChatPage = () => {
  const chatBoxRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");

  const sendMessageToAPI = async (query) => {
    if (loading || isTyping || !query.trim()) return;

    const apiUrl =
      "https://2588-2a0a-a547-a807-0-c922-aec9-b892-6d84.ngrok-free.app/chat";

    const requestBody = {
      query: query,
      newUser: true,
      ai: "OPENAI",
      customerId: "293b846f-9207-4988-b067-0fc21a2bc4b3",
    };

    setLoading(true);
    setIsTyping(true);
    setCurrentResponse("");

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let responseText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        responseText += chunk;
        setCurrentResponse((prev) => prev + chunk);
      }

      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: responseText, sender: "Luxel" },
      ]);
      setCurrentResponse("");
    } catch (error) {
      toast.error("Error fetching the chat response");
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, text: input, sender: "User" },
    ]);
    sendMessageToAPI(input);
    setInput("");
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, currentResponse]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <AppBar position="fixed" color="primary" sx={{ background: "white" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ color: "black", fontSize: "30px" }}>
            Luxel
          </Typography>
          <ChatBubbleIcon />
          <Avatar src={logo} sx={{ height: "70px", width: "70px" }} />
        </Toolbar>
      </AppBar>

      {/* Spacer to avoid top bar overlap */}
      <Box sx={{ height: "80px" }} />

      {/* Chat Area */}
      <ChatBox ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <MessageBubble key={index} isUser={msg.sender === "User"}>
            {msg.text}
          </MessageBubble>
        ))}

        {/* Show streamed response while loading */}
        {loading && (
          <MessageBubble>
            {currentResponse || <TypingEffect>Luxel is typing...</TypingEffect>}
          </MessageBubble>
        )}
      </ChatBox>

      {/* Input Area */}
      <Box sx={{ height: "80px" }} />

      <InputBox>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          disabled={loading}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={loading}
        >
          <SendIcon />
        </IconButton>
      </InputBox>
    </Box>
  );
};

export default ChatPage;
