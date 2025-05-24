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
  const [model, setModel] = useState("google/gemini-2.0-flash-exp:free")
  
  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("summaryHistory")) || [];
    setHistory(storedHistory);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSummarize = () => {
    if (inputText.trim() === "") return;
    // Simulasi ringkasan: output sama dengan input
    setSummary(inputText);
    const newHistory = [...history, inputText];
    setHistory(newHistory);
    localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
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
            model={setModel}
          />
          <History history ={history} handleDelete={handleDelete}/>
          <div className="absolute top-6 right-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#C2A77C] dark:text-gray-400">light_mode</span>
        <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={darkMode} onChange={toggleTheme} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:bg-[#6F4D38] transition"></div>
        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
      </label>
      <span className="material-symbols-outlined text-black dark:text-gray-400">dark_mode</span>
      </div>
      </main>
    </div>
  );
}
export default App;