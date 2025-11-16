import React, { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

const InvoiceBuilder = () => {
  // State for bill from (billing information)
  const [billFrom, setBillFrom] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
  });

  // State for client details
  const [client, setClient] = useState({
    name: '',
    address: '',
    invoiceNumber: '',
    date: '',
  });

  // State for line items
  const [items, setItems] = useState([]);

  // State for new item input
  const [newItem, setNewItem] = useState({
    description: '',
    quantity: 1,
    unitRate: 0,
  });

  // Tax rate (10%, as per common practice; rules don't specify)
  const taxRate = 0.1;

  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  // Calculate tax
  const tax = subtotal * taxRate;

  // Calculate grand total
  const grandTotal = subtotal + tax;

  // Add new item
  const addItem = () => {
    if (newItem.description && newItem.quantity > 0 && newItem.unitRate >= 0) {
      const amount = newItem.quantity * newItem.unitRate;
      setItems([...items, { ...newItem, amount }]);
      setNewItem({ description: '', quantity: 1, unitRate: 0 });
    }
  };

  // Edit item
  const editItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = field === 'quantity' ? (parseInt(value) || 1) : field === 'unitRate' ? (parseFloat(value) || 0) : value;
    if (field === 'quantity' || field === 'unitRate') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].unitRate;
    }
    setItems(updatedItems);
  };

  // Delete item
  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // PDF export ref
  const invoiceRef = useRef();

  // Generate PDF
  const generatePDF = () => {
    const element = invoiceRef.current;
    if (!element) return;
    window.scrollTo(0, 0);
    const options = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `Invoice_${client.invoiceNumber || 'Draft'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, allowTaint: true, useCORS: true, scrollX: 0, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Invoice Builder</h1>

        {/* Bill From Section (Billing Information) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Bill From (Billing Information)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company Name"
              value={billFrom.name}
              onChange={(e) => setBillFrom({ ...billFrom, name: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={billFrom.address}
              onChange={(e) => setBillFrom({ ...billFrom, address: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={billFrom.email}
              onChange={(e) => setBillFrom({ ...billFrom, email: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={billFrom.phone}
              onChange={(e) => setBillFrom({ ...billFrom, phone: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Client Details Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Client Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name"
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={client.address}
              onChange={(e) => setClient({ ...client, address: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Invoice Number"
              value={client.invoiceNumber}
              onChange={(e) => setClient({ ...client, invoiceNumber: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={client.date}
              onChange={(e) => setClient({ ...client, date: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Add Item Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Add Line Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={isNaN(newItem.quantity) ? 1 : newItem.quantity}
              onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Unit Rate"
              value={isNaN(newItem.unitRate) ? 0 : newItem.unitRate}
              onChange={(e) => setNewItem({ ...newItem, unitRate: parseFloat(e.target.value) || 0 })}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={addItem} className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition">
              Add Item
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Line Items</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border p-3 text-left">Description</th>
                <th className="border p-3 text-center">Quantity</th>
                <th className="border p-3 text-center">Unit Rate</th>
                <th className="border p-3 text-center">Amount</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => editItem(index, 'description', e.target.value)}
                      className="w-full border p-2 rounded"
                    />
                  </td>
                  <td className="border p-3 text-center">
                    <input
                      type="number"
                      value={isNaN(item.quantity) ? 1 : item.quantity}
                      onChange={(e) => editItem(index, 'quantity', e.target.value)}
                      className="w-full border p-2 rounded text-center"
                    />
                  </td>
                  <td className="border p-3 text-center">
                    <input
                      type="number"
                      value={isNaN(item.unitRate) ? 0 : item.unitRate}
                      onChange={(e) => editItem(index, 'unitRate', e.target.value)}
                      className="w-full border p-2 rounded text-center"
                    />
                  </td>
                  <td className="border p-3 text-center font-semibold">${item.amount.toFixed(2)}</td>
                  <td className="border p-3 text-center">
                    <button
                      onClick={() => deleteItem(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="mb-6 text-right bg-gray-50 p-4 rounded-lg">
          <p className="text-lg">Subtotal: <span className="font-semibold">${subtotal.toFixed(2)}</span></p>
          <p className="text-lg">Tax: <span className="font-semibold">${tax.toFixed(2)}</span></p>
          <p className="text-xl font-bold text-blue-600">Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>

        {/* Invoice Preview (Printable Layout) */}
        <div ref={invoiceRef} className="mb-6 border border-gray-300 rounded-lg p-6 bg-white">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Invoice Preview</h2>
            <p className="text-sm text-gray-600">Printable Layout - PDF will have 2 pages</p>
          </div>
          {/* Page 1 */}
          <div>
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold text-blue-600">Invoice</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Bill From:</h2>
                <p>Name: {billFrom.name || 'N/A'}</p>
                <p>Address: {billFrom.address || 'N/A'}</p>
                <p>Email: {billFrom.email || 'N/A'}</p>
                <p>Phone: {billFrom.phone || 'N/A'}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Bill To:</h2>
                <p>Name: {client.name || 'N/A'}</p>
                <p>Address: {client.address || 'N/A'}</p>
                <p>Invoice Number: {client.invoiceNumber || 'N/A'}</p>
                <p>Date: {client.date || 'N/A'}</p>
              </div>
            </div>
            <table className="w-full border-collapse border border-gray-400 mb-6">
              <thead>
                <tr className="bg-blue-100">
                  <th className="border p-3 text-left">Description</th>
                  <th className="border p-3 text-center">Qty</th>
                  <th className="border p-3 text-center">Rate</th>
                  <th className="border p-3 text-center">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="border p-3">{item.description}</td>
                    <td className="border p-3 text-center">{item.quantity}</td>
                    <td className="border p-3 text-center">${item.unitRate}</td>
                    <td className="border p-3 text-center">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
            </div>
          </div>
          {/* Page Break */}
          <div style={{ pageBreakAfter: 'always' }}></div>
          {/* Page 2 */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-600">Payment Terms</h2>
            <p>Payment due within 30 days. Thank you!</p>
          </div>
        </div>

        {/* PDF Export Button */}
        <div className="text-center">
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceBuilder;