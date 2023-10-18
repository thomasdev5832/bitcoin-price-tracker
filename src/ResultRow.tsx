import paybisLogo from './assets/Paybis.png';
import moonpayLogo from './assets/MoonPay.svg';
import transakLogo from './assets/Transak.svg';


type ResultRowProps = {
    loading?: boolean;
    providerName?: string;
    btc?: string;
};

type Logo = {
    source:string, 
    invert?:boolean
};

const logos:{[keys:string]:Logo} = {
    paybis: {source:paybisLogo, invert:true},
    moonpay: {source:moonpayLogo},
    guardarian: {source: 'https://guardarian.com/main-logo.svg'},
    transak: {source: transakLogo},
};

export default function ResultRow({loading, providerName, btc}: ResultRowProps) {
    return (
        <div className=" relative cursor-pointer p-4 m-2 border border-orange-500 rounded  bg-orange-500 hover:bg-neutral-900 hover:border-orange-500 transition duration-150 ease-out hover:ease-in overflow-hidden">
            <div className="flex gap-4">
               
                    {providerName && (
                        <div className="grow items-center flex">
                            <img 
                                src={logos[providerName].source} 
                                className={
                                    "w-24 "+(logos[providerName]?.invert ? 'invert' : '')
                                }
                                alt="" 
                            />
                        </div>
                    )}
                
                
                {btc && (
                    <div className="flex gap-2">
                        <span className="font-semibold">
                            { new Intl.NumberFormat('sv-SE',{minimumFractionDigits:8}).format(parseFloat(btc))}
                        </span>
                        <span className="text-white/80">BTC</span>
                    </div>
                )}
            </div>
            {loading && (
                <div className="inset-0 absolute"></div>
            )}
        </div>
    );
}