import { useId } from "react";
import Labeled from "./labeled";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    errors?: string[];
}

export default function TextInput(props: Readonly<Props>) {
    const id = useId();

    return (
        <Labeled htmlFor={id} label={props.label} errors={props.errors}>
            <input
                type="text"
                id={id}
                name={props.name}
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
                className="ring-1 ring-inset rounded-lg p-3 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-800 bg-zinc-50 placeholder:text-zinc-300"
            />
        </Labeled>
    );
}
