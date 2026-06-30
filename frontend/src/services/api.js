import axios from "axios";

// Railway Backend URL
const API = axios.create({
  baseURL: "https://multipdf-ai-production.up.railway.app",
  timeout: 30000,
});

// =====================================
// Upload PDFs
// =====================================

export async function uploadPDFs(files) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

// =====================================
// Normal Chat
// =====================================

export async function askQuestion(question) {
  const response = await API.post("/chat", {
    question,
  });

  return response.data;
}

// =====================================
// Streaming Chat
// =====================================

export async function streamQuestion(question, onChunk) {
  const response = await fetch(
    "https://multipdf-ai-production.up.railway.app/chat/stream",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Streaming failed.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
}