import { Menu, FileText, MessageSquare } from "lucide-react";

function MobileHeader({
  activeTab,
  setActiveTab,
  setMobileMenuOpen,
}) {
  return (
    <div className="md:hidden border-b border-slate-800 bg-slate-950">

      {/* Top */}

      <div className="flex items-center justify-between p-4">

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-lg p-2 hover:bg-slate-800"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-lg font-bold">
          MultiPDF AI
        </h1>

        <div className="w-10" />

      </div>

      {/* Tabs */}

      <div className="flex">

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 transition ${
            activeTab === "chat"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-slate-400"
          }`}
        >
          <MessageSquare className="mx-auto mb-1" size={18} />

          Chat

        </button>

        <button
          onClick={() => setActiveTab("pdf")}
          className={`flex-1 py-3 transition ${
            activeTab === "pdf"
              ? "border-b-2 border-blue-500 text-blue-400"
              : "text-slate-400"
          }`}
        >
          <FileText className="mx-auto mb-1" size={18} />

          PDF

        </button>

      </div>

    </div>
  );
}

export default MobileHeader;