import React from 'react'
import InvoiceBuilder from './components/InvoiceBuilder'


export default function App(){
return (
<div className="min-h-screen p-6">
<div className="max-w-5xl mx-auto">
<h1 className="text-2xl font-semibold mb-6">Invoice Builder</h1>
<InvoiceBuilder />
</div>
</div>
)
}