import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

function UploadButton({ onFilesSelected }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 0) {
      onFilesSelected(files);
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
      />

      <Button
        onClick={handleClick}
        className="w-full justify-start gap-2 rounded-xl"
      >
        <Upload className="h-4 w-4" />
        Upload PDFs
      </Button>
    </>
  );
}

export default UploadButton;