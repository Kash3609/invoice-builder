import React from 'react';

export default function InvoicePreview({ client, meta, items, subtotal, tax, total }) {
  return (
    <div className="text-gray-800 p-8 bg-white" style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '2' }}>
      {/* Page 1: Header, Supplier, and Client (With Colors) */}
      <header className="flex justify-between items-center mb-8 border-b pb-6" style={{ backgroundColor: '#e3f2fd', padding: '10px', borderRadius: '10px' }}>
        <div>
          <h3 className="text-5xl font-bold" style={{ color: '#1976d2' }}>Global Tech Solutions</h3>
          <p className="text-2xl" style={{ color: '#424242' }}>456 Innovation Drive, Tech City</p>
          <p className="text-2xl" style={{ color: '#424242' }}>California, USA, 90210</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-4xl" style={{ color: '#1976d2' }}>Invoice</p>
          <p className="text-2xl" style={{ color: '#424242' }}>#: {meta.invoiceNo}</p>
          <p className="text-2xl" style={{ color: '#424242' }}>Date: {meta.date}</p>
        </div>
      </header>

      {/* Supplier Company Section (From) - Structured */}
      <section className="mb-6" style={{ backgroundColor: '#f3e5f5', padding: '10px', borderRadius: '10px' }}>
        <p className="font-medium text-3xl" style={{ color: '#7b1fa2' }}>From:</p>
        <p className="text-2xl" style={{ color: '#424242' }}><strong>Business Name:</strong> Global Tech Solutions</p>
        <p className="text-xl" style={{ color: '#424242' }}><strong>Address:</strong> 456 Innovation Drive, Tech City</p>
        <p className="text-xl" style={{ color: '#424242' }}><strong>City:</strong> California</p>
        <p className="text-xl" style={{ color: '#424242' }}><strong>State:</strong> USA</p>
        <p className="text-xl" style={{ color: '#424242' }}><strong>ZIP:</strong> 90210</p>
        <p className="text-xl" style={{ color: '#424242' }}><strong>Phone:</strong> +1 (555) 123-4567 | <strong>Email:</strong> billing@globaltech.com | <strong>GST:</strong> 22AAAAA0000A1Z5</p>
      </section>

      {/* Customer Company Section (Bill To - Enhanced) */}
      <section className="mb-8" style={{ backgroundColor: '#e8f5e8', padding: '10px', borderRadius: '10px' }}>
        <p className="font-medium text-3xl" style={{ color: '#388e3c' }}>Bill To:</p>
        <p className="text-3xl" style={{ color: '#424242' }}>{client.name}</p>
        <p className="text-xl" style={{ color: '#424242' }}>{client.company || 'Customer Company Name'}</p>
        <p className="whitespace-pre-wrap text-2xl" style={{ color: '#424242' }}>{client.address}</p>
      </section>

      {/* Huge Spacer to Push Second Page Content Far Down */}
      <div style={{ height: '600px' }}></div>

      {/* Page 2: Items, Totals, and Footer (With Colors) */}
      <table className="w-full border-collapse mb-6 text-xl" style={{ border: '2px solid #1976d2' }}>
        <thead>
          <tr className="border-b bg-gray-100" style={{ backgroundColor: '#e3f2fd' }}>
            <th className="text-left py-4 px-4" style={{ color: '#1976d2' }}>Description</th>
            <th className="text-right py-4 px-4" style={{ color: '#1976d2' }}>Qty</th>
            <th className="text-right py-4 px-4" style={{ color: '#1976d2' }}>Rate</th>
            <th className="text-right py-4 px-4" style={{ color: '#1976d2' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, index) => (
            <tr key={it.id || index} className="border-b" style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff' }}>
              <td className="py-4 px-4" style={{ color: '#424242' }}>{it.description}</td>
              <td className="py-4 px-4 text-right" style={{ color: '#424242' }}>{it.qty}</td>
              <td className="py-4 px-4 text-right" style={{ color: '#424242' }}>₹{Number(it.rate || 0).toFixed(2)}</td>
              <td className="py-4 px-4 text-right" style={{ color: '#424242' }}>
                ₹{((Number(it.qty) || 0) * (Number(it.rate) || 0)).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-80" style={{ backgroundColor: '#fff3e0', padding: '10px', borderRadius: '10px' }}>
          <div className="flex justify-between py-3 text-2xl">
            <span style={{ color: '#f57c00' }}>Subtotal</span>
            <span style={{ color: '#424242' }}>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-3 text-2xl">
            <span style={{ color: '#f57c00' }}>Tax (10%)</span>
            <span style={{ color: '#424242' }}>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-3xl py-3 border-t">
            <span style={{ color: '#f57c00' }}>Total</span>
            <span style={{ color: '#424242' }}>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Payment Details */}
      <footer className="mt-8 text-lg text-gray-600 border-t pt-4" style={{ backgroundColor: '#fce4ec', padding: '10px', borderRadius: '10px' }}>
        <p className="font-medium" style={{ color: '#c2185b' }}>Payment Details:</p>
        <p style={{ color: '#424242' }}>Payment is due within 30 days of invoice date.</p>
        <p style={{ color: '#424242' }}>Bank: Global Bank | Account: 9876543210 | IFSC: GLOB0001234</p>
        <p style={{ color: '#424242' }}>Notes: Thank you for your business.</p>
      </footer>
    </div>
  );
}