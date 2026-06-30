import { Card } from "@/components/ui/card";

function SuggestionCard({ icon, title, description, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="
        cursor-pointer
        border-slate-800
        bg-slate-900
        p-6
        transition-all
        duration-300
        hover:border-blue-500
        hover:bg-slate-800
        hover:shadow-xl
        hover:scale-[1.02]
      "
    >
      <div className="mb-4 text-blue-500">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>
    </Card>
  );
}

export default SuggestionCard;