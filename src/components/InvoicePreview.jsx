import React from 'react';

export default function InvoicePreview({ client, meta, items, subtotal, tax, total }) {
  return (
    <div className="text-gray-800 p-10 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.5', maxWidth: '800px', margin: '0 auto', border: '1px solid #ccc' }}>
      {/* Header */}
      <header className="text-center mb-8 border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Invoice</h1>
        <p className="text-lg text-gray-600">Invoice #: {meta.invoiceNo}</p>
        <p className="text-lg text-gray-600">Date: {meta.date}</p>
      </header>

      {/* From and Bill To Side by Side */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">From:</h2>
          <p className="text-gray-700 font-medium">Global Tech Solutions</p>
          <p className="text-gray-700">456 Innovation Drive</p>
          <p className="text-gray-700">Tech City, California, USA, 90210</p>
          <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-700">Email: billing@globaltech.com</p>
          <p className="text-gray-700">GST: 22AAAAA0000A1Z5</p>
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Bill To:</h2>
          <p className="text-gray-700 font-medium">{client.name}</p>
          <p className="text-gray-700">{client.company || 'Customer Company'}</p>
          <p className="text-gray-700 whitespace-pre-wrap">{client.address}</p>
        </div>
      </div>

      {/* Spacer for Page Break */}
      <div style={{ height: '600px' }}></div>

      {/* Items Table */}
      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left font-semibold">Description</th>
            <th className="border border-gray-300 p-3 text-center font-semibold">Qty</th>
            <th className="border border-gray-300 p-3 text-center font-semibold">Rate</th>
            <th className="border border-gray-300 p-3 text-center font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={it.id || index}>
              <td className="border border-gray-300 p-3">{it.description}</td>
              <td className="border border-gray-300 p-3 text-center">{it.qty}</td>
              <td className="border border-gray-300 p-3 text-center">₹{Number(it.rate || 0).toFixed(2)}</td>
              <td className="border border-gray-300 p-3 text-center">₹{((Number(it.qty) || 0) * (Number(it.rate) || 0)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 border border-gray-300 p-4 bg-gray-50">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax (10%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 border-t pt-4">
        <p>Payment is due within 30 days. Bank: Global Bank | Account: 9876543210 | IFSC: GLOB0001234</p>
        <p>Thank you for your business!</p>
      </footer>
    </div>
  );
}