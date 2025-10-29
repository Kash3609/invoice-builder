import React, { useState, useRef } from "react";
import InvoicePreview from "./InvoicePreview";
import LineItemRow from "./LineItemRow";
import { exportToPdf } from "../utils/pdfExport";
import { FaPlus, FaDownload, FaTrash } from "react-icons/fa";

export default function InvoiceBuilder() {
  const [client, setClient] = useState({
    name: "",
    address: "",
    company: "",  // Added for Customer Company
    invoiceNumber: "INV-001",
    date: new Date().toISOString().split("T")[0],
  });

  const [items, setItems] = useState([
    { id: 1, description: "", qty: 1, rate: 0 },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef();

  const handleItemChange = (index, updatedItem) => {
    const updated = [...items];
    updated[index] = { ...updated[index], ...updatedItem };
    setItems(updated);
  };

  const addItem = () => {
    const newId = items.length + 1;
    setItems([...items, { id: newId, description: "", qty: 1, rate: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.qty) || 0) * (Number(item.rate) || 0), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const downloadPDF = async () => {
    setIsGenerating(true);
    console.log('Client:', client);
    console.log('Items:', items);
    console.log('Subtotal:', subtotal, 'Tax:', tax, 'Total:', total);
    console.log('PDF Ref:', pdfRef.current);
    // Small delay for render
    setTimeout(async () => {
      await exportToPdf(pdfRef, `${client.invoiceNumber}.pdf`);
      setIsGenerating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 flex flex-col items-center font-sans">
      <div className="bg-white w-full max-w-5xl shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-200">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-2">Invoice Builder</h1>
          <p className="text-gray-600 text-lg">Create professional invoices effortlessly</p>
        </div>

        {/* Client Details Section */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-6 rounded-2xl mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
            <span className="mr-2">👤</span> Client & Invoice Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Client Name"
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              className="border-2 border-blue-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Customer Company (Optional)"
              value={client.company}
              onChange={(e) => setClient({ ...client, company: e.target.value })}
              className="border-2 border-blue-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="text"
              placeholder="Invoice Number"
              value={client.invoiceNumber}
              onChange={(e) => setClient({ ...client, invoiceNumber: e.target.value })}
              className="border-2 border-blue-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <textarea
              placeholder="Client Address"
              value={client.address}
              onChange={(e) => setClient({ ...client, address: e.target.value })}
              className="border-2 border-blue-300 p-4 rounded-xl w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              rows="3"
            />
            <input
              type="date"
              value={client.date}
              onChange={(e) => setClient({ ...client, date: e.target.value })}
              className="border-2 border-blue-300 p-4 rounded-xl w-full md:col-span-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="bg-white border-2 border-gray-200 p-6 rounded-2xl mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span> Line Items
          </h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-xl border">
                <LineItemRow
                  item={item}
                  onChange={(updates) => handleItemChange(index, updates)}
                  onRemove={() => removeItem(index)}
                />
              </div>
            ))}
          </div>
          <button
            onClick={addItem}
            className="mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition flex items-center shadow-lg"
          >
            <FaPlus className="mr-2" /> Add Item
          </button>
        </div>

        {/* Totals Section */}
        <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-6 rounded-2xl shadow-lg text-right">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Invoice Summary</h2>
          <div className="space-y-2 text-lg">
            <p className="flex justify-between"><span>Subtotal:</span> <span className="font-semibold">₹{subtotal.toFixed(2)}</span></p>
            <p className="flex justify-between"><span>Tax (10%):</span> <span className="font-semibold">₹{tax.toFixed(2)}</span></p>
            <hr className="border-indigo-300" />
            <p className="flex justify-between text-2xl font-bold text-indigo-900"><span>Grand Total:</span> <span>₹{total.toFixed(2)}</span></p>
          </div>
        </div>
      </div>

      {/* PDF Preview (Off-Screen for Export) */}
      <div 
        ref={pdfRef} 
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '800px', backgroundColor: 'white' }}
      >
        <InvoicePreview client={client} meta={{ invoiceNo: client.invoiceNumber, date: client.date }} items={items} subtotal={subtotal} tax={tax} total={total} />
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        disabled={isGenerating}
        className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition flex items-center shadow-lg disabled:opacity-50"
      >
        <FaDownload className="mr-2" />
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </button>
    </div>
  );
}