import {
  Bot,
  Plus,
  FileText,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import UploadButton from "@/components/upload/UploadButton";

function Sidebar({
  uploadedFiles,
  onFilesSelected,
  selectedPdf,
  setSelectedPdf,
  onNewChat,
}) {
  return (
    <aside className="flex w-80 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}
      <div className="p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">

            <Bot className="h-6 w-6 text-white" />

          </div>

          <div>

            <h1 className="text-xl font-bold text-white">
              MultiPDF AI
            </h1>

            <p className="text-sm text-slate-400">
              Chat with your PDFs
            </p>

          </div>

        </div>

      </div>

      {/* New Chat */}

      <div className="px-6">

        <Button
  onClick={onNewChat}
  className="h-11 w-full rounded-xl"
>
  <Plus className="mr-2 h-4 w-4" />
  New Chat
</Button>

      </div>

      {/* Upload */}

      <div className="mt-3 px-6">

        <UploadButton
          onFilesSelected={onFilesSelected}
        />

      </div>

      {/* Search */}

      <div className="mt-5 px-6">

        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 px-3">

          <Search className="h-4 w-4 text-slate-500" />

          <input
            placeholder="Search PDFs..."
            className="w-full bg-transparent px-3 py-3 text-sm text-white outline-none"
          />

        </div>

      </div>

      {/* Uploaded PDFs */}

      <div className="mt-7 flex-1 overflow-y-auto px-6">

        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">

          Uploaded PDFs

        </h3>

        {uploadedFiles.length === 0 ? (

          <div className="rounded-xl border border-dashed border-slate-800 p-6 text-center">

            <FileText className="mx-auto h-8 w-8 text-slate-600" />

            <p className="mt-3 text-sm text-slate-500">

              No PDFs uploaded

            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {uploadedFiles.map((file, index) => (

              <div
                key={index}
                onClick={() => setSelectedPdf(file)}
                className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 ${
                  selectedPdf?.name === file.name
                    ? "border-blue-500 bg-slate-800"
                    : "border-slate-800 bg-slate-900 hover:border-blue-500"
                }`}
              >

                <div className="flex gap-3">

                  <FileText className="mt-1 h-5 w-5 shrink-0 text-blue-400" />

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-medium text-white">

                      {file.name}

                    </p>

                    <p className="mt-1 text-xs text-slate-500">

                      {(file.size / 1024 / 1024).toFixed(2)} MB

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <p className="text-center text-xs text-slate-500">

          MultiPDF AI v3

        </p>

      </div>

    </aside>
  );
}

export default Sidebar;