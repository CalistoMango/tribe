"use client";

import { Sparkles } from "lucide-react";
import { mockTransactions } from "~/lib/mockData";
import { TransactionItem } from "~/components/ui/TransactionItem";

export function EarningsTab() {
  return (
    <div>
      {/* Balance Card */}
      <div className="bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 border border-violet-800/50 rounded-2xl p-6 mb-6">
        <div className="text-sm text-violet-300 mb-1">Available Balance</div>
        <div className="text-4xl font-bold mb-4">$24.85 <span className="text-xl text-zinc-400">USDC</span></div>
        <button className="bg-white text-zinc-900 font-semibold py-2 px-6 rounded-lg hover:bg-zinc-100 transition-colors">
          Claim All
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="text-sm text-zinc-400 mb-1">Total Earned</div>
          <div className="text-2xl font-bold text-green-400">$142.50</div>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4">
          <div className="text-sm text-zinc-400 mb-1">Approved Replies</div>
          <div className="text-2xl font-bold">847</div>
        </div>
      </div>

      {/* Quotient Score */}
      <div className="bg-zinc-900 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-medium">Quotient Score</span>
          </div>
          <span className="text-xl font-bold text-yellow-400">0.78</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2 mb-2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-xs text-zinc-400">Your multiplier: <span className="text-green-400 font-medium">1.25x</span> (earn $0.025 on $0.02 bounties)</p>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="font-medium mb-3">Recent Activity</h3>
        <div className="space-y-3">
          {mockTransactions.map(transaction => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}
