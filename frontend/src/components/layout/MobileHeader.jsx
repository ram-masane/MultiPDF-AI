import { Menu } from "lucide-react";

export default function MobileHeader({
  onMenuClick,
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="md:hidden border-b border-slate-800 bg-[#050816]">

      <div className="flex items-center justify-between px-4 py-4">

        <button
          onClick={onMenuClick}
          className="text-white"
        >
          <Menu size={28} />
        </button>

        <h1 className="text-xl font-bold text-white">
          MultiPDF AI
        </h1>

        <div className="w-7"></div>

      </div>

      <div className="flex">

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex-1 py-3 ${
            activeTab === "chat"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-slate-400"
          }`}
        >
          Chat
        </button>

        <button
          onClick={() => setActiveTab("pdf")}
          className={`flex-1 py-3 ${
            activeTab === "pdf"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-slate-400"
          }`}
        >
          PDF
        </button>

      </div>

    </div>
  );
}