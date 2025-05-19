"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowDownTrayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

// Move constants outside the component for performance
const MODELS = [
  { name: "π0", desc: "Physical Intelligence" },
  { name: "Gr00t", desc: "NVIDIA" },
  { name: "OpenVLA", desc: "Stanford" },
  { name: "π0 for Server Room", desc: "Siemens via Tuna" },
  { name: "π0 for Breville Coffee", desc: "Local Café via Tuna" },
  { name: "Gr00t for draping", desc: "Tailor3 via Tuna" },
  { name: "Orca v2", desc: "Physical Intelligence" },
  { name: "MiniTuna", desc: "Tuna Robotics" },
  { name: "RoboFish", desc: "AquaAI" },
  { name: "π0 for Lab", desc: "MIT" },
  { name: "Gr00t for Assembly", desc: "NVIDIA" },
  { name: "Orca v1", desc: "Physical Intelligence" },
];

const DATASETS = [
  { name: "gardening (hose)", org: "BrightView Holdings" },
  { name: "zipping dress", org: "Sara Meller" },
  { name: "Front gear unpack and assem..", org: "Amazon" },
  { name: "Drape and pin saree", org: "Nina Tamara" },
  { name: "Bulb 3499e install", org: "Philipps" },
  { name: "Cable Replacement", org: "Siemens" },
  { name: "Sorting sushi", org: "Tokyo Robotics" },
  { name: "Tuna canning", org: "Ocean Foods" },
  { name: "Fish tank cleaning", org: "AquaAI" },
  { name: "Packing groceries", org: "SuperMart" },
  { name: "Book stacking", org: "LibraryBot" },
  { name: "Fruit picking", org: "AgriTech" },
  { name: "Toy assembly", org: "ToyCo" },
  { name: "Pet feeding", org: "PetBot" },
  { name: "Laundry folding", org: "HomeAI" },
  { name: "Table setting", org: "DineBot" },
  { name: "Plant watering", org: "GreenThumb" },
  { name: "Window cleaning", org: "CleanBot" },
  { name: "Remote control", org: "IoT Corp" },
  { name: "Sticker placement", org: "StickerAI" },
];

const INITIAL_SETTINGS = [
  { label: "Image Resolution", value: "244x244" },
  { label: "Augment Image Data", type: "toggle", value: true },
  { label: "Clean Text Data", type: "toggle", value: true },
  { label: "Freeze Vision Encoder", type: "toggle", value: false },
  { label: "Freeze Language Model", type: "toggle", value: true },
  { label: "Optimizer", value: "AdamW" },
  { label: "Batch Size", value: 256 },
  { label: "Learning Rate", value: 0.01 },
  { label: "Epochs", value: 5 },
  { label: "Simulate Policy", type: "toggle", value: false },
  { label: "Gradient Clipping", value: 1.0 },
  { label: "Dropout Rate", value: 0.2 },
  { label: "Early Stopping", type: "toggle", value: false },
  { label: "Weight Decay", value: 0.01 },
  { label: "Mixed Precision", type: "toggle", value: true },
];

export default function Dashboard() {
  const [selectedModel, setSelectedModel] = useState(3);
  const [selectedDataset, setSelectedDataset] = useState(0);
  const [taskTitle, setTaskTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const router = useRouter();

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) setUploadedFile(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleToggle = (idx: number) => {
    setSettings((prev) =>
      prev.map((s, i) => {
        if (i === idx && s.type === "toggle") {
          return { ...s, value: !s.value, type: s.type };
        }
        return s;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-mono flex flex-col items-center py-8 px-2 sm:px-8">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between max-w-[1300px] mb-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl" style={{fontFamily: 'inherit'}}>🐟</span>
        </div>
        <div className="flex items-center gap-2">
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
          <span className="text-2xl font-black">Isha</span>
        </div>
      </div>
      {/* Main Card */}
      <div className="w-full bg-white border border-gray-200 rounded-[28px] shadow flex flex-row gap-6 p-5">
        {/* Left: Model Selection */}
        <div className="flex flex-col items-center w-1/4 gap-6 h-full">
          {/* Orca hand image placeholder */}
          
          {/* Orca hand image and title side by side */}
          <div className="flex flex-row items-center gap-4 mb-2">
            <Image
              src="/orca-hand.png"
              alt="Orca hand"
              width={80}
              height={80}
              className="object-contain w-20 h-20 rounded-lg"
            />
            <div className="text-4xl font-black tracking-wide">Orca v3</div>
          </div>
          <div className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-2 h-full">
            <div className="text-base font-black mb-2">Select your base model for finetuning</div>
            <div className="text-base mb-2">Model</div>
            <div className="flex flex-col gap-1 h-80 overflow-y-auto">
              {MODELS.map((m, i) => (
                <button
                  key={m.name}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-left transition border ${selectedModel === i ? "border-black bg-gray-50 font-black" : "border-transparent hover:bg-gray-100 font-normal"}`}
                  onClick={() => setSelectedModel(i)}
                >
                  <span className="text-lg">☆</span>
                  <span className="font-black text-lg leading-tight">{m.name}</span>
                  <span className="text-xs text-gray-400 ml-1 whitespace-nowrap">{m.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Center: Task & Dataset */}
        <div className="flex flex-col w-2/5 gap-8 items-center md:items-stretch h-full">
          <input
            className="w-full border border-gray-200 rounded-xl px-6 py-4 text-2xl font-black mb-2 focus:outline-none focus:ring-2 focus:ring-black/20 bg-[#fcfcfc] placeholder:text-gray-400"
            placeholder="Enter the title of your task"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
          />
          <div className="flex flex-col gap-3 bg-white border border-gray-200 rounded-2xl p-8 h-full">
            <div className="text-base font-black mb-2">Upload or find your finetune dataset</div>
            <div className="text-base mb-2">Dataset</div>
            <input
              className="w-full border border-gray-200 rounded px-3 py-2 text-base mb-2 bg-[#f8f8f8] placeholder:text-gray-400"
              placeholder="Search Tuna datasets"
              disabled
            />
            <div className="flex flex-col gap-2 h-80 overflow-y-auto mb-2">
              {DATASETS.map((d, i) => (
                <button
                  key={d.name}
                  className={`flex items-center gap-2 px-2 py-2 rounded-lg text-left transition border text-lg ${selectedDataset === i ? "border-black bg-[#fcfcfc] font-black" : "border-transparent hover:bg-gray-100 font-normal"}`}
                  onClick={() => setSelectedDataset(i)}
                >
                  <span className="text-lg">☆</span>
                  <span className="font-black">{d.name}</span>
                  <span className="text-xs text-gray-400 ml-1 whitespace-nowrap">{d.org}</span>
                </button>
              ))}
            </div>
            {/* File upload */}
            <div {...getRootProps()} className={`flex items-center gap-2 border-2 border-dashed rounded-xl px-4 py-4 cursor-pointer transition text-base ${isDragActive ? "border-black bg-gray-100" : "border-gray-300 bg-[#fcfcfc] hover:bg-gray-100"} mt-4`}>
              <input {...getInputProps()} />
              <ArrowDownTrayIcon className="w-6 h-6 text-gray-400" />
              <span className="text-base">{uploadedFile ? `${(uploadedFile.size/1e6).toFixed(0)}MB ${uploadedFile.name}` : "Upload dataset .zip"}</span>
              {uploadedFile && (
                <button
                  className="ml-auto p-1 hover:bg-gray-200 rounded"
                  onClick={e => { e.stopPropagation(); setUploadedFile(null); }}
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* Right: Finetuning Settings */}
        <div className="flex flex-col w-2/5 gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col gap-3">
            <div className="text-base font-black mb-2">Model and learning settings</div>
            <div className="text-base mb-2">Finetuning Settings</div>
            <div className="flex flex-col gap-2">
              {settings.map((s, i) => (
                <div key={s.label} className="flex items-center justify-between text-lg">
                  <span className={s.type === "toggle" ? "" : "font-black"}>{s.label}</span>
                  {s.type === "toggle" ? (
                    <button
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${s.value ? "bg-black border-black" : "bg-white border-gray-300"}`}
                      onClick={() => handleToggle(i)}
                    >
                      {s.value && <span className="w-3 h-3 bg-white rounded-full block" />}
                    </button>
                  ) : (
                    <span className="font-black">{s.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            className="w-full bg-[#1769ff] hover:bg-[#1257cc] text-white font-black py-4 rounded-2xl text-2xl transition shadow-sm tracking-wide"
            onClick={() => router.push("/finetune")}
          >
            ▶ Finetune
          </button>
        </div>
      </div>
    </div>
  );
}
