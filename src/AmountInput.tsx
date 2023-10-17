import Input, { InputProps } from "./Input";

export default function AmountInput(props:InputProps) {
    return (
        <div className="flex items-center bg-neutral-800 border border-white/5 rounded-md">
            <Input
                placeholder="Amount"
                className="border-0 w-24 pl-4 bg-transparent focus:outline-none"
                value={props.value} 
                onChange={props.onChange} 
            />
            <span className="text-white/50 px-2 pr-4">USD</span>
        </div>
    );
}