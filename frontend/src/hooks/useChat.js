import { useState } from "react";
import { streamQuestion } from "../services/api";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question) {
    if (!question.trim()) return;

    // Add user message and empty AI message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
      {
        role: "ai",
        text: "",
        sources: [],
      },
    ]);

    setLoading(true);

    // Buffer to avoid duplicated characters
    let fullResponse = "";

    try {
      await streamQuestion(question, (chunk) => {
        fullResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            text: fullResponse,
          };

          return updated;
        });
      });
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "ai",
          text: "❌ Something went wrong.",
          sources: [],
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    sendMessage,
  };
}