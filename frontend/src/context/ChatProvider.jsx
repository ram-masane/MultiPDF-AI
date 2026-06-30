import { useState } from "react";

import ChatContext from "./ChatContext";

import { askQuestion } from "../services/api";

function ChatProvider({ children }) {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  async function sendMessage(question) {

    if (!question.trim()) return;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {

      const response = await askQuestion(question);

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: response.answer,
          sources: response.sources || [],
        },
      ]);

    }

    catch {

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: "Something went wrong.",
        },
      ]);

    }

    finally {

      setLoading(false);

    }

  }

  function sendQuickPrompt(prompt) {

    setInput("");

    sendMessage(prompt);

  }

  return (

    <ChatContext.Provider
      value={{
        messages,
        loading,
        input,
        setInput,
        sendMessage,
        sendQuickPrompt,
      }}
    >

      {children}

    </ChatContext.Provider>

  );

}

export default ChatProvider;