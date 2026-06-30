import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfViewer({
  file,
  currentPage,
  setCurrentPage,
}) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    setCurrentPage(1);
  }, [file, setCurrentPage]);

  function onLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setCurrentPage(1);
  }

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500">
        Select a PDF to preview
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-slate-950">

      {/* Toolbar */}

      <div className="flex items-center justify-between border-b border-slate-800 p-4">

        <div className="flex gap-2">

          <button
            onClick={() =>
              setCurrentPage((p) => Math.max(1, p - 1))
            }
            disabled={currentPage === 1}
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(numPages, p + 1)
              )
            }
            disabled={currentPage === numPages}
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        <p className="text-sm text-slate-300">
          Page {currentPage} / {numPages}
        </p>

        <div className="flex gap-2">

          <button
            onClick={() =>
              setScale((s) => Math.max(0.6, s - 0.2))
            }
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <ZoomOut size={18} />
          </button>

          <button
            onClick={() =>
              setScale((s) => Math.min(3, s + 0.2))
            }
            className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
          >
            <ZoomIn size={18} />
          </button>

        </div>

      </div>

      {/* PDF */}

      <div className="flex flex-1 justify-center overflow-auto p-6">

        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
        >

          <Page
            pageNumber={currentPage}
            scale={scale}
          />

        </Document>

      </div>

    </div>
  );
}

export default PdfViewer;