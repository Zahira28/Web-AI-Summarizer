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
      <p className="mb-2 text-lg">Choose your AI:</p>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded bg-white dark:bg-[#492921] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="mistralai/mistral-7b-instruct:free">
          Mistral 7B Instruct (Mistral)
        </option>
        <option value="qwen/qwen3-32b:free">
          Qwen 3 32B (Qwen)
        </option>
        <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek V3</option>
        <option value="meta-llama/llama-3.3-70b-instruct:free">
          Llama 3.3 70B Instruct (Meta)
        </option>
        <option value="google/gemini-2.0-flash-exp:free">
          Gemini Flash 2.0 Experimental (Google)
        </option>
      </select>

  <div className="flex-1 flex flex-col relative border-gray-300 rounded-lg overflow-hidden">
    <textarea
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      className="w-full h-48 p-4 bg-white dark:bg-[#492921] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      placeholder="Input your text here..."
    />

    <div className="flex justify-end items-center p-4 bg-gray-50 dark:bg-[#492921]">
      <button
        onClick={handleSummarize}
        className="px-6 py-2 bg-[#C2A77C] text-white rounded hover:bg-[#A07856] dark:bg-[#A07856] dark:hover:bg-[#6F4D38] transition"
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
    <section className="mt-8 bg-white p-4 rounded shadow dark:bg-[#492921]">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>
      <div className="text-gray-700 dark:text-gray-200">
        {summary ? (
          <ReactMarkdown>{summary}</ReactMarkdown>
        ) : loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3">Processing...</span>
          </div>
        ) : (
          <span className="text-gray-400">Your summary will appear here.</span>
        )}
      </div>
    </section>

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