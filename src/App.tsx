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
      <h1 className='m-6  text-5xl  text-center font-light text-zinc-700'>Discover the Absolute Lowest Prices for BTC!</h1>
      <div className='flex justify-center m-4'>
        <AmountInput 
         value={amount} 
          onChange={e => setAmount(e.target.value)} 
        />
      </div>
      <div className='mt-8'>
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
      <div className='mx-auto pt-10'>
        <h3 className='text-center font-medium'>Learn about Bitcoin in:</h3>
        <p className='text-center font-semibold text-orange-600'>
        <a  href="https://bitcoin.org/en/">www.bitcoin.org</a>
        </p>
        <div className='m-auto flex justify-center mt-10'> 
          <a className='flex justify-center' target="_blank"  href="https://github.com/thomasdev5832">
            Made with 🧡 by
            <img className='ml-1 w-6 h-6 flex justify-center' src="./src/assets/github-mark.svg" alt="" />
          </a>
        </div>
      </div>
    </main>
  )
}

export default App
