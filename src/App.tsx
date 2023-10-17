import { useState } from 'react'
import './index.css'
import AmountInput from './AmountInput';

function App() {
  const [amount, setAmount] = useState('100');

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className='uppercase text-3xl text-center font-bold bg-gradient-to-br from-orange-500 to-orange-400 bg-clip-text text-transparent from-30%'>Find cheapest BTC</h1>
      <div className='flex justify-center m-6'>
        <AmountInput 
         value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
      </div>
    </main>
  )
}

export default App
