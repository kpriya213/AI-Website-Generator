import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
  ];

  const examplePrompts = [
    "Create a SaaS landing page with hero section, features and pricing",
    "Create a modern developer portfolio website",
    "Create a responsive login page with glassmorphism design",
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your website first");
      return;
    }

    try {
      setLoading(true);
      console.log(import.meta.env.VITE_API_URL);
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          framework: framework.value,
        }),
      });

      const data = await res.json();

      // ⭐ IMPORTANT: check response status
      if (!res.ok) {
        if (res.status === 429) {
          toast.error("Daily limit reached. Try again tomorrow.");
        } else {
          toast.error(data.error || "AI generation failed");
        }

        return;
      }

      const generatedCode = extractCode(data.text);

      if (!generatedCode) {
        toast.error("AI didn't return valid code");
        return;
      }

      setCode(generatedCode);
      setOutputScreen(true);
      setTab(1);

      toast.success("Website generated successfully");
    } catch (error) {
      toast.error("Server connection failed");
      console.log(import.meta.env.VITE_API_URL);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function improveCode() {
    if (!code.trim()) {
      toast.error("Generate code first");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/improve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          framework: framework.value,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          toast.error("🚫 Daily AI limit reached");
        } else {
          toast.error(data.error || "Improvement failed");
        }

        return;
      }

      const improvedCode = extractCode(data.text);

      if (!improvedCode) {
        toast.error("AI didn't return valid code");
        return;
      }

      setCode(improvedCode);

      toast.success("UI improved");
    } catch (error) {
      toast.error("Server connection failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const copyCode = async () => {
    if (!code.trim()) return;

    await navigator.clipboard.writeText(code);

    toast.success("Code copied");
  };

  const downloadFile = () => {
    if (!code.trim()) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "AI-Generated-Website.html";

    link.click();

    URL.revokeObjectURL(url);

    toast.success("File downloaded");
  };

  const openInNewTab = () => {
    if (!code.trim()) return;

    const blob = new Blob([code], { type: "text/html" });

    const url = URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);

    toast.success("Preview refreshed");
  };

  return (
    <>
      <NavBar />

      <div className="flex items-center px-[100px] gap-2 justify-between">
        {/* LEFT PANEL */}

        <div className="left w-[50%] h-[85vh] bg-[#141319] mt-5 px-[20px] rounded-xl flex flex-col">
          <h3 className="text-[28px] font-bold tracking-tight mt-2">
            AI Website Generator
          </h3>

          <p className="text-gray-400 mt-2">
            Let AI code a website and show you how it looks!
          </p>

          <p className="mt-4 font-semibold">Framework</p>

          {/* Dark Theme Select */}

          <Select
            options={options}
            value={framework}
            onChange={(e) => setFramework(e)}
            className="mt-2"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111827",
                borderColor: "#374151",
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111827",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#1f2937" : "#111827",
                color: "white",
                cursor: "pointer",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
            }}
          />

          <p className="mt-5 font-semibold">Describe your website idea</p>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full min-h-[200px] bg-[#111827] mt-3 p-[10px] rounded-xl"
            placeholder="Example: Create a SaaS landing page with navbar, hero section, features and pricing cards"
          />

          {/* Example Prompts */}

          <div className="flex flex-wrap gap-2 mt-3">
            {examplePrompts.map((item, index) => (
              <button
                key={index}
                title="Click to use this prompt"
                onClick={() => setPrompt(item)}
                className="text-sm bg-zinc-800 px-3 py-1 rounded-lg hover:bg-zinc-700"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Generate Button */}

          <div className="flex justify-end mt-4">
            <button
              title="Generate website with AI"
              onClick={getResponse}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-indigo-500 hover:opacity-80"
              }`}
            >
              Generate <BsStars />
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}

        <div className="right w-[50%] h-[85vh] bg-[#141319] mt-5 px-[20px] rounded-xl relative">
          {loading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-50 rounded-xl">
              <ClipLoader size={45} color="#6366f1" />
              <p className="mt-4 text-gray-200 text-sm">
                AI is generating your website...
              </p>
            </div>
          )}

          {!outputScreen ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <div className="text-3xl mb-3">
                <HiOutlineCode />
              </div>

              <p>Your generated website code and preview will appear here.</p>
            </div>
          ) : (
            <>
              {/* Tabs */}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 py-2 rounded-lg ${
                    tab === 1 ? "bg-indigo-500" : "bg-zinc-800"
                  }`}
                >
                  Code
                </button>

                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 py-2 rounded-lg ${
                    tab === 2 ? "bg-indigo-500" : "bg-zinc-800"
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}

              <div className="flex justify-between mt-3 bg-[#17171C] p-2 rounded">
                <p>Generated Website Code</p>

                <div className="flex gap-3 text-lg">
                  {tab === 1 ? (
                    <>
                      <button title="Copy code" onClick={copyCode}>
                        <IoCopy />
                      </button>

                      <button title="Download HTML file" onClick={downloadFile}>
                        <PiExportBold />
                      </button>

                      <button
                        title="Improve UI with AI"
                        onClick={improveCode}
                        className="text-xs bg-indigo-500 px-2 rounded"
                      >
                        AI
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        title="Open preview in new tab"
                        onClick={openInNewTab}
                      >
                        <ImNewTab />
                      </button>

                      <button title="Refresh preview" onClick={refreshPreview}>
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editor / Preview */}

              <div className="mt-2">
                {tab === 1 ? (
                  <Editor
                    value={code}
                    height="60vh"
                    defaultLanguage="html"
                    theme="vs-dark"
                    onChange={(value) => setCode(value || "")}
                  />
                ) : (
                  <iframe
                    key={refreshKey}
                    srcDoc={code}
                    title="preview"
                    className="w-full h-[60vh] border-none"
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
