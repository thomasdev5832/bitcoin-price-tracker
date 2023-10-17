import { useState } from 'react'
import './index.css'
import AmountInput from './AmountInput';
import ResultRow from './ResultRow';

function App() {
  const [amount, setAmount] = useState('100');

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className='uppercase text-3xl text-center font-thin font-sans text-orange-500'>Find cheapest BTC</h1>
      <div className='flex justify-center m-4'>
        <AmountInput 
         value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
      </div>
      <div className='mt-6'>
        <ResultRow />
        <ResultRow />
        <ResultRow />
        <ResultRow loading={true} />
      </div>
    </main>
  )
}

export default App
