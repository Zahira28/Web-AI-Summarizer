import { useState, useEffect } from 'react'

import Header from "./components/Header"
import Summarizer from "./components/Summarizer"
import History from "./components/History"


function App() {
  const [inputText, setInputText] = useState("")
  const [summary, setSummary] = useState("")
  const [history, setHistory] = useState([])
  const [darkMode, setDarkMode]= useState(false)
  const [copied, setCopied] = useState(false)
  const [model, setModel] = useState("mistralai/mistral-7b-instruct:free")
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("summaryHistory")) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.style.overscrollBehavior = 'none';
  }, [darkMode]);

  const handleSummarize = async () => {
  if (inputText.trim() === "") return;

  setSummary("");
  setLoading(true);
  // Kirim teks ke API untuk diringkas
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            {
              role: "user",
              content: `Summarize the following text without any addition answer. Answer in the language the user speaks:\n${inputText}`,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    setSummary(data.choices[0].message.content);
    const newHistory = [...history, data.choices[0].message.content];
    setHistory(newHistory);
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
  } catch (error) {
    console.error("Gagal mengambil data ringkasan:", error);
  } finally {
    setLoading(false);
  }
};

  const handleReset = () => {
    setInputText("");
    setSummary("");
  };

  const handleDelete = (index) => {
      const newHistory = history.filter((_, i) => i !== index);
      setHistory(newHistory);
      localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
    };
  
  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="bg-gray-100 text-black dark:bg-[#3D211A] dark:text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
        <span className="material-symbols-outlined text-white dark:text-[#3D211A]">
          light_mode
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div className={`w-11 h-6 rounded-full transition-colors relative ${
            darkMode ? 'bg-[#6F4D38]' : 'bg-gray-300'
          }`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
              darkMode ? 'translate-x-[12px]' : 'translate-x-0.5'
            }`}></div>
          </div>
        </label>
        <span className="material-symbols-outlined text-white dark:text-[#3D211A]">
          dark_mode
        </span>
      </div>
      
      <div className="flex flex-col text-center">
        <Header title="AI Summarizer" />
      </div>
      <main className="max-w-6xl mx-auto p-6">
        <Summarizer
          inputText={inputText}
          setInputText={setInputText}
          handleReset={handleReset}
          handleSummarize={handleSummarize}
          summary={summary}
          copied={copied}
          setCopied={setCopied}
          setModel={setModel}
          model={model}
          loading={loading}
        />
        <History history={history} handleDelete={handleDelete}/>
      </main>
    </div>
  );
}
export default App;