import React from 'react';

export default function LineItemRow({ item, onChange, onRemove }) {
  const amount = (Number(item.qty) || 0) * (Number(item.rate) || 0);
  return (
    <div className="grid grid-cols-12 gap-2 items-center border-b pb-2 mb-2">
      <input
        className="col-span-12 md:col-span-6 border p-2 rounded"
        value={item.description}
        onChange={(e) => onChange({ description: e.target.value })}
        placeholder="Description"
      />
      <input
        className="col-span-4 md:col-span-2 border p-2 rounded"
        type="number"
        min="1"
        value={item.qty}
        onChange={(e) => onChange({ qty: e.target.value })}
        placeholder="Qty"
      />
      <input
        className="col-span-4 md:col-span-2 border p-2 rounded"
        type="number"
        min="0"
        step="0.01"
        value={item.rate}
        onChange={(e) => onChange({ rate: e.target.value })}
        placeholder="Rate"
      />
      <div className="col-span-2 md:col-span-1 text-right font-medium">₹{amount.toFixed(2)}</div>
      <button
        className="col-span-2 md:col-span-1 text-red-500 hover:text-red-700 transition"
        onClick={onRemove}
      >
        ✕
      </button>
    </div>
  );
}