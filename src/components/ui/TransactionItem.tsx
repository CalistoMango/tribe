"use client";

import { TrendingUp, DollarSign, X } from "lucide-react";
import { type Transaction } from "~/lib/mockData";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { type, amount, from, time, reason } = transaction;

  return (
    <div className="flex items-center gap-3 bg-zinc-900 rounded-lg p-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        type === 'earned' ? 'bg-green-500/20 text-green-400' :
        type === 'claimed' ? 'bg-violet-500/20 text-violet-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {type === 'earned' && <TrendingUp className="w-5 h-5" />}
        {type === 'claimed' && <DollarSign className="w-5 h-5" />}
        {type === 'rejected' && <X className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <div className="font-medium">
          {type === 'earned' && `Earned from ${from}`}
          {type === 'claimed' && 'Claimed to wallet'}
          {type === 'rejected' && `Rejected from ${from}`}
        </div>
        <div className="text-sm text-zinc-400">
          {time}
          {reason && <span className="text-red-400"> - {reason}</span>}
        </div>
      </div>
      <div className={`font-bold ${
        type === 'earned' ? 'text-green-400' :
        type === 'claimed' ? 'text-violet-400' :
        'text-zinc-500'
      }`}>
        {type === 'rejected' ? '-' : '+'}${amount.toFixed(2)}
      </div>
    </div>
  );
}
