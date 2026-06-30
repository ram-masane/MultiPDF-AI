import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import "highlight.js/styles/github-dark.css";

import { Bot, User } from "lucide-react";
import SourceCard from "@/components/sources/SourceCard";

function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-5xl gap-4 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
            isUser
              ? "bg-blue-600"
              : "bg-slate-800 border border-slate-700"
          }`}
        >
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-blue-400" />
          )}
        </div>

        {/* Bubble */}

        <div
          className={`rounded-3xl border shadow-xl p-6 ${
            isUser
              ? "bg-blue-600 border-blue-500 text-white"
              : "bg-slate-900 border-slate-800 text-slate-100"
          }`}
        >
          <div className="mb-4 text-sm font-semibold opacity-80">
            {isUser ? "You" : "MultiPDF AI"}
          </div>

          <article
            className="
            prose
            prose-invert
            max-w-none

            prose-headings:text-white
            prose-p:text-slate-200
            prose-strong:text-white
            prose-code:text-yellow-300
            prose-pre:bg-slate-950
            prose-pre:border
            prose-pre:border-slate-700
            prose-li:text-slate-200
            prose-a:text-blue-400
            prose-blockquote:border-blue-500
            prose-blockquote:text-slate-300

            prose-table:w-full
            prose-th:border
            prose-th:border-slate-700
            prose-td:border
            prose-td:border-slate-700
            prose-th:bg-slate-800
            prose-td:bg-slate-900
          "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.text}
            </ReactMarkdown>
          </article>

          {message.sources?.length > 0 && (

            <div className="mt-8 border-t border-slate-700 pt-6">

              <h3 className="mb-4 text-sm font-semibold text-slate-300">

                📚 Sources

              </h3>

              <div className="space-y-3">

                {message.sources.map((source, index) => (

                  <SourceCard
                    key={index}
                    source={source}
                  />

                ))}

              </div>

            </div>

          )}

        </div>

      </div>
    </div>
  );
}

export default ChatMessage;