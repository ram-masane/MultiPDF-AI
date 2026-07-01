function InputBox({
  value,
  setValue,
  onSend,
}) {
  function handleSend() {
    if (!value.trim()) return;

    onSend(value);

    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSend();
      function handleNewChat() {
  clearChat();
  setInput("");
}
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-950 p-5">

      <div className="mx-auto flex max-w-4xl items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-lg">

        <input
          className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
          placeholder="Ask anything about your PDF..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          onClick={handleSend}
          className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default InputBox;