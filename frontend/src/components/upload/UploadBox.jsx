import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { uploadPDFs } from "@/services/api";

function UploadBox({ setUploadedFiles }) {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSelect = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one PDF.");
      return;
    }

    try {
      setUploading(true);

      const result = await uploadPDFs(files);

      setUploadedFiles(result.files);

      alert(result.message);

      setFiles([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20">

            <Upload className="h-8 w-8 text-blue-500" />

          </div>

          <h2 className="text-3xl font-bold text-white">
            Upload PDFs
          </h2>

          <p className="mt-2 text-slate-400">
            Upload one or multiple PDFs and chat with them instantly.
          </p>

        </div>

        {/* Upload Area */}

        <div
          onClick={() => inputRef.current.click()}
          className="mt-8 cursor-pointer rounded-xl border-2 border-dashed border-slate-700 p-10 text-center transition hover:border-blue-500 hover:bg-slate-800"
        >

          <Upload className="mx-auto mb-4 h-10 w-10 text-slate-500" />

          <p className="text-lg font-medium text-white">
            Drag & Drop PDFs
          </p>

          <p className="mt-1 text-sm text-slate-400">
            or click here to browse
          </p>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf"
            onChange={handleSelect}
            className="hidden"
          />

        </div>

        {/* Selected Files */}

        {files.length > 0 && (

          <div className="mt-8 space-y-3">

            {files.map((file, index) => (

              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
              >

                <div className="flex items-center gap-3">

                  <FileText className="h-5 w-5 text-blue-400" />

                  <div>

                    <p className="text-sm font-medium text-white">

                      {file.name}

                    </p>

                    <p className="text-xs text-slate-500">

                      {(file.size / 1024 / 1024).toFixed(2)} MB

                    </p>

                  </div>

                </div>

                <button
                  onClick={() => removeFile(index)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-red-400"
                >

                  <X className="h-4 w-4" />

                </button>

              </div>

            ))}

          </div>

        )}

        {/* Upload Button */}

        <div className="mt-8 flex justify-center">

          <Button
            size="lg"
            disabled={uploading}
            onClick={handleUpload}
            className="rounded-xl px-10"
          >

            {uploading ? "Uploading..." : "Upload PDFs"}

          </Button>

        </div>

      </div>

    </div>
  );
}

export default UploadBox;