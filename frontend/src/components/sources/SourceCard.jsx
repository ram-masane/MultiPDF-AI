import { FileText, ArrowRight } from "lucide-react";

function SourceCard({
  source,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4 text-left transition-all duration-200 hover:border-blue-500 hover:bg-slate-800"
    >
      <div className="flex items-center gap-3">

        <div className="rounded-lg bg-blue-600/20 p-2">

          <FileText className="h-5 w-5 text-blue-400" />

        </div>

        <div>

          <p className="font-medium text-white">

            {source.source}

          </p>

          <p className="text-sm text-slate-400">

            Page {source.page}

          </p>

        </div>

      </div>

      <ArrowRight className="h-5 w-5 text-slate-500" />

    </button>
  );
}

export default SourceCard;