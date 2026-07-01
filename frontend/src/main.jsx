import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import ChatProvider from "./context/ChatProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      import { ChatProvider } from "./context/ChatContext";

root.render(
    <ChatProvider>
        <App />
    </ChatProvider>
);
    </ChatProvider>
  </StrictMode>
);