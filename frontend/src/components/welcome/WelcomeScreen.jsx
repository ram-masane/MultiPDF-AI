import { Bot } from "lucide-react";
import SuggestionGrid from "./SuggestionGrid";

function WelcomeScreen({
  onQuickPrompt,
}) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-12">

      <div className="w-full max-w-4xl">

        <div className="flex flex-col items-center text-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 shadow-lg">

            <Bot className="h-10 w-10 text-white" />

          </div>

          <h1 className="text-5xl font-bold tracking-tight text-white">
            MultiPDF AI
          </h1>

          <p className="mt-4 text-lg text-slate-400">
            Upload PDFs, ask questions and learn faster with AI.
          </p>

        </div>

        <div className="mt-14">

          <SuggestionGrid
            onQuickPrompt={onQuickPrompt}
          />

        </div>

      </div>

    </div>
  );
}

export default WelcomeScreen;