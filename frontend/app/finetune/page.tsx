"use client";
import { useEffect, useState } from "react";

export default function FinetunePage() {
  const [loading, setLoading] = useState(true);
  const [flashing, setFlashing] = useState(false);
  const [flashSuccess, setFlashSuccess] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  const handleFlash = () => {
    setFlashing(true);
    setFlashSuccess(false);
    setTimeout(() => {
      setFlashing(false);
      setFlashSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] font-mono">
      {loading ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-2xl font-black">Finetuning in progress...</div>
        </div>
      ) : flashing ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-2xl font-black text-green-700">Flashing to hardware...</div>
        </div>
      ) : flashSuccess ? (
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 flex items-center justify-center">
            <span className="text-6xl text-green-600">✔️</span>
          </div>
          <div className="text-2xl font-black text-green-700">Successfully flashed to hardware!</div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div className="text-2xl font-black mb-4">Finetuning Complete!</div>
          <div className="flex gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-6 rounded-xl text-lg transition" disabled={flashing}>Download Policy</button>
            <button className="bg-green-600 hover:bg-green-700 text-white font-black py-3 px-6 rounded-xl text-lg transition" onClick={handleFlash} disabled={flashing}>Flash to Hardware</button>
          </div>
        </div>
      )}
    </div>
  );
} 