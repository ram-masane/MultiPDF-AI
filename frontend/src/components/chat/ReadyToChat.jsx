import {
  CheckCircle2,
  FileText,
  BookOpen,
  Brain,
  GraduationCap,
  Sparkles,
} from "lucide-react";

function ReadyToChat({
  uploadedFiles = [],
  onPromptClick,
}) {
  const file = uploadedFiles[0];

  const prompts = [
    {
      icon: <BookOpen className="h-5 w-5 text-blue-400" />,
      title: "Summarize PDF",
      text: "Give me a concise summary of this document.",
      prompt: "Summarize this PDF.",
    },
    {
      icon: <Brain className="h-5 w-5 text-purple-400" />,
      title: "Explain Concepts",
      text: "Explain the important concepts from this PDF.",
      prompt: "Explain the important concepts from this PDF.",
    },
    {
      icon: <GraduationCap className="h-5 w-5 text-green-400" />,
      title: "Generate Quiz",
      text: "Generate MCQs from this PDF.",
      prompt: "Generate 20 MCQs from this PDF.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-orange-400" />,
      title: "Important Points",
      text: "List all important takeaways.",
      prompt: "List all important points from this PDF.",
    },
  ];

  return (
    <div className="flex h-full items-center justify-center px-8">
      <div className="w-full max-w-5xl">

        {/* Uploaded PDF */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20">

              <FileText className="h-8 w-8 text-blue-400" />

            </div>

            <div className="flex-1 min-w-0">

              <p className="text-sm uppercase tracking-wider text-slate-500">

                Uploaded Document

              </p>

              <h2 className="truncate text-2xl font-bold text-white">

                {file?.name}

              </h2>

            </div>

            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">

              <CheckCircle2 className="h-5 w-5 text-emerald-400" />

              <span className="text-sm font-medium text-emerald-400">

                Ready to Chat

              </span>

            </div>

          </div>

        </div>

        {/* Prompt Cards */}

        <div className="mt-10">

          <h2 className="mb-8 text-center text-3xl font-bold text-white">

            What would you like to do?

          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            {prompts.map((prompt, index) => (

              <div
                key={index}
                onClick={() => onPromptClick(prompt.prompt)}
                className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800 active:scale-95"
              >

                <div className="mb-4">

                  {prompt.icon}

                </div>

                <h3 className="text-lg font-semibold text-white">

                  {prompt.title}

                </h3>

                <p className="mt-2 text-sm text-slate-400">

                  {prompt.text}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

export default ReadyToChat;