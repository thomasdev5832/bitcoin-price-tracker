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
            className={"p-2 outline-none  focus:outline-orange-500 " + props.className}
            value={props.value} 
            onChange={props.onChange}
      />
    )
}