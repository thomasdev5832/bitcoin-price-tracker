import { useEffect, useState } from 'react'
import './index.css'
import AmountInput from './AmountInput';
import ResultRow from './ResultRow';
import LoadingSkeleton from './LoadingSkeleton';
import axios from 'axios';
import {sortBy} from 'lodash';
import  useDebouncedEffect  from  'use-debounced-effect';

type CachedResult = {
  provider: string;
  btc: string;
};

type OfferResults = {[keys:string]:string};

const defaultAmount = '100';

function App() {

  const [prevAmount, setPrevAmount] = useState(defaultAmount);
  const [amount, setAmount] = useState('100');
  const [cachedResults, setCachedResults] = useState<CachedResult[]>([]);
  const [offerResults, setOfferResults] = useState<OfferResults>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('https://b1sx1i9xp6.us.aircode.run/cachedValues')
      .then(res => {
        setCachedResults(res.data);
        setLoading(false);
     });
  }, []);

  useDebouncedEffect(() => {
    if(amount === defaultAmount){
      return;
    }
    if(amount !== prevAmount) {
      setLoading(true);
      axios
      .get(`https://b1sx1i9xp6.us.aircode.run/offers?amount=${amount}`)
      .then(res => {
        setLoading(false);
        setOfferResults(res.data);
        setPrevAmount(amount);
      })
    }
  }, 300, [amount]);

  const sortedCache:CachedResult[] = sortBy(cachedResults, 'btc').reverse();
  const sortedResults:CachedResult[] = sortBy(Object.keys(offerResults).map(provider => ({
      provider, 
      btc:offerResults[provider]
  })), 'btc').reverse();

  const showCached = amount === defaultAmount;
  const rows = showCached ? sortedCache : sortedResults;

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className='m-4 uppercase text-6xl text-center font-bold font- bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent'>Find cheapest BTC</h1>
      <div className='flex justify-center m-4'>
        <AmountInput 
         value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
      </div>
      <div className='mt-6'>
        {loading && (
            <LoadingSkeleton />
        )}
        {!loading && rows.map(result => (
            <ResultRow 
              key={result.provider}
              providerName={result.provider} 
              btc={result.btc}
            />
        ))}
      </div>
    </main>
  )
}

export default App
