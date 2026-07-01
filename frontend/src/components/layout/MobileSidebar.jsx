import { Menu } from "lucide-react";

function MobileSidebar({ onOpen }) {
  return (
    <div className="md:hidden flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
      <button
        onClick={onOpen}
        className="rounded-lg p-2 hover:bg-slate-800"
      >
        <Menu size={24} />
      </button>

      <h1 className="text-lg font-bold text-white">
        MultiPDF AI
      </h1>

      <div className="w-8" />
    </div>
  );
}

export default MobileSidebar;