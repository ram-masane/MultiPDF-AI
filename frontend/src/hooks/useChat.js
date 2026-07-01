import { useState } from "react";
import { streamQuestion } from "../services/api";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage(question) {
    if (!question.trim()) return;

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

  // ⭐ NEW
  function clearChat() {
    setMessages([]);
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
  };
}