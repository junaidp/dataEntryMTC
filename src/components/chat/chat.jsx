import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";
import logo from "../../../src/assets/log.png";
import axios from "axios";

// Styled components
const ChatBox = styled(Box)({
  flexGrow: 1,
  overflowY: "auto",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  display: "flex",
  flexDirection: "column",
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
  padding: "10px 20px",
  backgroundColor: isUser ? "#007bff" : "#e0e0e0",
  color: isUser ? "#fff" : "#000",
  borderRadius: "20px",
  marginBottom: "10px",
  maxWidth: "60%",
}));

const TypingEffect = styled("span")({
  display: "inline-block",
  animation: "blink 1s steps(5, start) infinite",
  "@keyframes blink": {
    "50%": { opacity: 0 },
  },
});

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendMessageToAPI = async (query) => {
    const apiUrl =
      "https://3345-2a0a-a547-a807-0-2540-ea42-1a48-8f78.ngrok-free.app/chat";

    const requestBody = {
      query: query,
      newUser: true,
      ai: "OPENAI",
      customerId: "293b846f-9207-4988-b067-0fc21a2bc4b3",
    };

    setLoading(true);
    setIsTyping(true);

    try {
      let { data } = await axios.post(apiUrl, requestBody);
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: data, sender: "Luxel" },
      ]);
    } catch (error) {
      console.error("Error fetching the chat response:", error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    setMessages([
      ...messages,
      { id: messages.length + 1, text: input, sender: "User" },
    ]);
    sendMessageToAPI(input);
    setInput("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
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
      <Box sx={{ height: "64px" }} />

      {/* Chat Area */}
      <ChatBox>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} isUser={msg.sender === "User"}>
            {msg.text}
          </MessageBubble>
        ))}
        {isTyping && (
          <MessageBubble>
            <TypingEffect>Luxel is typing...</TypingEffect>
          </MessageBubble>
        )}
      </ChatBox>

      {/* Input Area - Fixed */}
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
