import Input, { InputProps } from "./Input";

export default function AmountInput(props:InputProps) {
    return (
        <div className="flex items-center border border-neutral-600 rounded-md hover:border-orange-500 focus:border-orange-500">
            <Input
                placeholder="Amount"
                className="w-24 pl-4 bg-transparent text-lg font-semibold "
                value={props.value} 
                onChange={props.onChange} 
            />
            <span className="text-grey px-2 pr-6 ">USD</span>
        </div>
    );
}