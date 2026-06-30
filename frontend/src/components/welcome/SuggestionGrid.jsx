import {
  BookOpen,
  Brain,
  GraduationCap,
  Sparkles,
} from "lucide-react";

function SuggestionGrid({ onQuickPrompt }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <ActionCard
        icon={<BookOpen className="h-6 w-6 text-blue-400" />}
        title="Summarize PDF"
        description="Give me a concise summary of this document."
        onClick={() => onQuickPrompt("Summarize this PDF.")}
      />

      <ActionCard
        icon={<Brain className="h-6 w-6 text-purple-400" />}
        title="Explain Concepts"
        description="Explain the important concepts from this PDF."
        onClick={() => onQuickPrompt("Explain the important concepts from this PDF.")}
      />

      <ActionCard
        icon={<GraduationCap className="h-6 w-6 text-green-400" />}
        title="Generate Quiz"
        description="Generate MCQs from this PDF."
        onClick={() => onQuickPrompt("Generate MCQs from this PDF.")}
      />

      <ActionCard
        icon={<Sparkles className="h-6 w-6 text-orange-400" />}
        title="Important Points"
        description="List all important takeaways."
        onClick={() => onQuickPrompt("List all important takeaways from this PDF.")}
      />

    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-slate-800"
    >

      <div className="mb-5">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm text-slate-400">
        {description}
      </p>

    </div>
  );
}

export default SuggestionGrid;