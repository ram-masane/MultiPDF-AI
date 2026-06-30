import { createContext, useContext } from "react";

const ChatContext = createContext();

export function useChatContext() {
  return useContext(ChatContext);
}

export default ChatContext;