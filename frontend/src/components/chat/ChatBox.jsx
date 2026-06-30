import ChatMessage from "./ChatMessage";
import Loading from "./Loading";

function ChatBox({ messages, loading }) {

  return (

    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

      {messages.map((message, index) => (

        <ChatMessage
          key={index}
          message={message}
        />

      ))}

      {loading && <Loading />}

    </div>

  );

}

export default ChatBox;