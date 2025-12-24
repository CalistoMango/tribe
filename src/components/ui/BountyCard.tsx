"use client";

import { ExternalLink } from "lucide-react";
import { type MockBounty } from "~/lib/mockData";

interface BountyCardProps {
  bounty: MockBounty;
}

export function BountyCard({ bounty }: BountyCardProps) {
  const progress = (bounty.spent / bounty.maxBudget) * 100;
  const remainingReplies = Math.floor((bounty.maxBudget - bounty.spent) / bounty.rewardPerReply);

  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      {/* Poster info */}
      <div className="flex items-center gap-3 mb-3">
        <img src={bounty.poster.pfp} alt="" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <div className="font-medium">{bounty.poster.displayName}</div>
          <div className="text-sm text-zinc-400">@{bounty.poster.username} - {bounty.timeAgo}</div>
        </div>
        <div className="text-right">
          <div className="text-green-400 font-bold">${bounty.rewardPerReply.toFixed(2)}</div>
          <div className="text-xs text-zinc-500">per reply</div>
        </div>
      </div>

      {/* Cast text */}
      <p className="text-zinc-200 mb-3">{bounty.castText}</p>

      {/* Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-zinc-400">{bounty.repliesCount} replies</span>
          <span className="text-zinc-400">~{remainingReplies} spots left</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        Reply on Warpcast
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}
