import ReactMarkdown from "react-markdown";

const Summarizer = ({
  inputText,
  setInputText,
  summary,
  handleSummarize,
  handleReset,
  copied,
  setCopied,
  model,
  setModel,
  loading,
}) => {
  return (
    <>
      <p className="mb-4 text-lg">Masukkan teks untuk diringkas:</p>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek V3</option>
        <option value="meta-llama/llama-3.3-70b-instruct:free">
          Llama 3.3 70B Instruct (Meta)
        </option>
        <option value="google/gemini-2.0-flash-exp:free">
          Gemini Flash 2.0 Experimental (Google)
        </option>
      </select>
      
      <div className="flex-1 flex flex-col relative"> 
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-white dark:bg-[#492921] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="10"
          placeholder="Input your text here..."
        ></textarea>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleSummarize}
            className="absolute bottom-3 right-3 px-4 py-2 bg-[#C2A77C] text-white rounded hover:bg-[#A07856] dark:bg-[#A07856] dark:hover:bg-[#6F4D38] transition"
          >
            Summarize
          </button>
          <button
            onClick={handleReset}
            className="material-symbols-outlined text-[#C2A77C] dark:text-[#A07856] cursor-pointer hover:text-[#A07856] dark:hover:text-[#6F4D38] absolute bottom-5 left-6"
            title="Delete all"
          >
            delete
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col relative mt-8">
      <label htmlFor="summaryText" className="mb-2 font-semibold">Ringkasan</label>
      <textarea
        id="summaryText"
        className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-[#492921] dark:text-white"
        rows="10"
        placeholder="Your summary will appear here..."
        value={summary}
        readOnly
      ></textarea>
      <span
        className="material-symbols-outlined text-[#C2A77C] dark:text-[#A07856] cursor-pointer hover:text-[#A07856] dark:hover:text-[#6F4D38] absolute bottom-5 right-5"
        onClick={() => {
          navigator.clipboard.writeText(summary || "");
          setCopied(true);
          setTimeout (() => {setCopied(false);}, 2000);
        }}
        title="Copy to Clipboard"
      >
        content_copy
      </span>
      {copied && (
        <span className="absolute bottom-16 right-5 text-sm text-green-500">Copied!</span>
      )}
    </div>
    </>
  );
};

export default Summarizer;