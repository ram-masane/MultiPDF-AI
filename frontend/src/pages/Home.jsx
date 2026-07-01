import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import WelcomeScreen from "../components/welcome/WelcomeScreen";
import ReadyToChat from "../components/chat/ReadyToChat";
import ChatBox from "../components/chat/ChatBox";
import InputBox from "../components/chat/InputBox";
import PdfViewer from "../components/pdf/PdfViewer";
import MobileHeader from "../components/layout/MobileHeader";

import { uploadPDFs } from "../services/api";
import useChat from "../hooks/useChat";

function Home() {

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  

  // ⭐ NEW
  const [currentPage, setCurrentPage] = useState(1);

  const [input, setInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");


  const {
  messages,
  loading,
  sendMessage,
  clearChat,
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
    <div className="flex h-screen flex-col bg-slate-950 text-white md:flex-row">
      <MobileHeader
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  setMobileMenuOpen={setMobileMenuOpen}
/>

      {/* Desktop Sidebar */}
<div className="hidden md:block">
  <Sidebar
  uploadedFiles={uploadedFiles}
  onFilesSelected={handleFilesSelected}
  selectedPdf={selectedPdf}
  setSelectedPdf={setSelectedPdf}
  onNewChat={handleNewChat}
/>
</div>

{/* Mobile Sidebar Drawer */}
{mobileMenuOpen && (
  <div className="fixed inset-0 z-50 md:hidden">

    {/* Background Overlay */}
    <div
      className="
absolute
inset-0
bg-black/60
backdrop-blur-sm
transition-opacity
duration-300
"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Sidebar */}
    <div
  className={`
    absolute
    left-0
    top-0
    h-full
    w-80
    bg-slate-950
    shadow-2xl
    overflow-y-auto
    transform
    transition-transform
    duration-300
    ease-in-out
    translate-x-0
  `}
>

      <Sidebar
  uploadedFiles={uploadedFiles}
  onFilesSelected={handleFilesSelected}
  selectedPdf={selectedPdf}
  setSelectedPdf={(pdf) => {
    setSelectedPdf(pdf);
    setMobileMenuOpen(false);
  }}
  onNewChat={() => {
    handleNewChat();
    setMobileMenuOpen(false);
  }}
/>

    </div>

  </div>
)}

      <main className="flex flex-1 overflow-hidden">

        {/* LEFT */}

<div
  className={`flex flex-1 flex-col ${
    activeTab === "pdf"
      ? "hidden md:flex"
      : "flex"
  }`}
>

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

        <div
  className={`border-l border-slate-800
  ${
    activeTab === "chat"
      ? "hidden md:block"
      : "block"
  }
  md:w-[45%] w-full`}
>

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