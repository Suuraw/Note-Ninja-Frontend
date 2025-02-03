"use client";
import { useState, useRef } from "react";
import { Send, Mic, X } from "lucide-react";
import { audioHandler, textSummarizer } from "../services/transcriptHandler";

export default function ChatInput({ onResponse, updateLoading, setInputType, setNewReStatus }) {
  const [prompt, setPrompt] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async () => {
    if (!prompt && !audioFile) return;
    
    setNewReStatus(true);
    updateLoading(true);

    let inputData = { input_type: "", input_data: prompt || "" };
    let response = "";

    if (audioFile) {
      // Handle Audio File Upload
      inputData.input_type = "audio";
      setInputType("audio");
      console.log("Uploading audio file:", audioFile.name);
      response = await audioHandler(inputData, audioFile);
    } else if (prompt.startsWith("https://drive.google.com")) {
      // Handle Google Drive Link
      inputData.input_type = "audio";
      setInputType("audio");
      console.log("Processing Google Drive link:", prompt);
      response = await audioHandler(inputData);
    } else {
      // Handle Text Input
      inputData.input_type = "text";
      setInputType("text");
      console.log("Processing text input:", prompt);
      response = await textSummarizer(JSON.stringify(inputData.input_data));
    }

    setNewReStatus(false);
    setPrompt("");
    setAudioFile(null);
    onResponse(response);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  return (
    <div className="w-full max-w-3xl bg-black-900/60 backdrop-blur-sm rounded-lg p-4 border border-black sm:ml-0 md:ml-14 mx-auto">
      <div
        className={`relative ${isDragging ? "ring-2 ring-primary" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message, paste a Google Drive audio link, or upload an audio file..."
          className="w-full px-4 py-3 rounded-lg bg-white text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-primary resize-none h-20 sm:h-24 pr-20 md:pr-24"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <div className="absolute right-2 bottom-2 flex gap-2 items-center">
          {audioFile ? (
            <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-gray-700 text-gray-200 max-w-[120px] sm:max-w-[150px]">
              <span className="text-xs truncate">{audioFile.name}</span>
              <button onClick={() => setAudioFile(null)} className="p-1 hover:bg-gray-600 rounded">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-lg transition-colors">
              <Mic size={20} className="text-black-300" />
            </button>
          )}
          <button onClick={handleSubmit} className="p-2 rounded-lg transition-colors">
            <Send size={20} className="text-black-300" />
          </button>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="audio/*" className="hidden" />
      </div>
    </div>
  );
}
