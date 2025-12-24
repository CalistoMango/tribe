"use client";

import { Gift, Copy } from "lucide-react";
import { mockReferrals } from "~/lib/mockData";

export function ReferralTab() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText("tribe.xyz/r/calistomango");
  };

  return (
    <div>
      {/* Your Referral Link */}
      <div className="bg-gradient-to-br from-fuchsia-900/50 to-violet-900/50 border border-fuchsia-800/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Gift className="w-5 h-5 text-fuchsia-400" />
          <span className="font-medium">Your Referral Link</span>
        </div>
        <div className="bg-zinc-900/50 rounded-lg p-3 flex items-center gap-2 mb-4">
          <code className="flex-1 text-sm text-zinc-300 truncate">tribe.xyz/r/calistomango</code>
          <button onClick={handleCopyLink} className="text-fuchsia-400 hover:text-fuchsia-300">
            <Copy className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-zinc-400">Invite friends to earn airdrop allocation. Referrals are tracked forever.</p>
      </div>

      {/* Your Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="text-sm text-zinc-400 mb-1">Your Referrals</div>
          <div className="text-2xl font-bold text-fuchsia-400">12</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="text-sm text-zinc-400 mb-1">Your Rank</div>
          <div className="text-2xl font-bold">#47</div>
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <h3 className="font-medium mb-3">Referral Leaderboard</h3>
        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          {mockReferrals.map((ref, i) => (
            <div
              key={ref.rank}
              className={`flex items-center gap-3 p-4 ${i !== mockReferrals.length - 1 ? 'border-b border-zinc-800' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                ref.rank === 1 ? 'bg-yellow-500 text-yellow-900' :
                ref.rank === 2 ? 'bg-zinc-400 text-zinc-900' :
                ref.rank === 3 ? 'bg-orange-600 text-orange-100' :
                'bg-zinc-700 text-zinc-300'
              }`}>
                {ref.rank}
              </div>
              <img src={ref.pfp} alt="" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <div className="font-medium">{ref.displayName}</div>
                <div className="text-sm text-zinc-400">@{ref.username}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-fuchsia-400">{ref.referrals}</div>
                <div className="text-xs text-zinc-500">referrals</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
