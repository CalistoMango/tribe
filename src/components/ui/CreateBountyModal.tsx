"use client";

import { X } from "lucide-react";
import { useState } from "react";

interface CreateBountyModalProps {
  onClose: () => void;
  onCreate: () => void;
}

export function CreateBountyModal({ onClose, onCreate }: CreateBountyModalProps) {
  const [castUrl, setCastUrl] = useState("");
  const [rewardPerReply, setRewardPerReply] = useState("0.02");
  const [maxBudget, setMaxBudget] = useState("1.00");

  const handleCreate = () => {
    // For now, just close the modal (static implementation)
    onCreate();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Create Bounty</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cast URL */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Cast URL</label>
          <input
            type="text"
            value={castUrl}
            onChange={(e) => setCastUrl(e.target.value)}
            placeholder="https://warpcast.com/username/0x..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Reward per reply */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Reward per approved reply</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
            <input
              type="number"
              step="0.01"
              value={rewardPerReply}
              onChange={(e) => setRewardPerReply(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 pl-8 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">USDC</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">Min $0.01 - Repliers earn 0.5x-1.5x based on reputation</p>
        </div>

        {/* Max budget */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-2">Max budget</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">$</span>
            <input
              type="number"
              step="0.10"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 pl-8 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">USDC</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">~50 replies at $0.02 base rate</p>
        </div>

        {/* Balance info */}
        <div className="bg-zinc-900 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-zinc-400">Your balance</span>
            <span className="font-semibold">$15.00 USDC</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">After this bounty</span>
            <span className="text-green-400">${(15 - parseFloat(maxBudget || "0")).toFixed(2)} USDC</span>
          </div>
        </div>

        {/* Create button */}
        <button
          onClick={handleCreate}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Create Bounty
        </button>
      </div>
    </div>
  );
}
