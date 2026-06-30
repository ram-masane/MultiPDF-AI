import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import WelcomeScreen from "../components/welcome/WelcomeScreen";
import ReadyToChat from "../components/chat/ReadyToChat";
import ChatBox from "../components/chat/ChatBox";
import InputBox from "../components/chat/InputBox";
import PdfViewer from "../components/pdf/PdfViewer";

import { uploadPDFs } from "../services/api";
import useChat from "../hooks/useChat";

function Home() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  // ⭐ NEW
  const [currentPage, setCurrentPage] = useState(1);

  const [input, setInput] = useState("");

  const {
    messages,
    loading,
    sendMessage,
  } = useChat();

  async function handleFilesSelected(files) {

    try {

      await uploadPDFs(files);

      setUploadedFiles((prev) => [
        ...prev,
        ...files,
      ]);

      if (files.length > 0) {
        setSelectedPdf(files[0]);
        setCurrentPage(1);
      }

    } catch (err) {

      console.error(err);
      alert("Upload Failed");

    }

  }

  function handleSend(message) {
    sendMessage(message);
    setInput("");
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white">

      <Sidebar
        uploadedFiles={uploadedFiles}
        onFilesSelected={handleFilesSelected}
        selectedPdf={selectedPdf}
        setSelectedPdf={setSelectedPdf}
      />

      <main className="flex flex-1 overflow-hidden">

        {/* LEFT */}

        <div className="flex flex-1 flex-col">

          <div className="flex-1 overflow-y-auto">

            {uploadedFiles.length === 0 ? (

              <WelcomeScreen
                onQuickPrompt={sendMessage}
              />

            ) : messages.length === 0 ? (

              <ReadyToChat
                uploadedFiles={uploadedFiles}
                onPromptClick={sendMessage}
              />

            ) : (

              <ChatBox
                messages={messages}
                loading={loading}
              />

            )}

          </div>

          <InputBox
            value={input}
            setValue={setInput}
            onSend={handleSend}
          />

        </div>

        {/* RIGHT */}

        <div className="w-[45%] border-l border-slate-800">

          <PdfViewer
            file={selectedPdf}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

        </div>

      </main>

    </div>
  );
}

export default Home;