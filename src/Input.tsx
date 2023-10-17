import {ChangeEventHandler} from "react";

export type InputProps = {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>
    className?: string;
    placeholder?: string;
};

export default function Input(props: InputProps) {
    return (
        <input type="text"
            placeholder={props.placeholder || ''}
            className={"p-2 m-2 border border-white/10 bg-neutral-800 " + props.className}
            value={props.value} 
            onChange={props.onChange}
      />
    )
}