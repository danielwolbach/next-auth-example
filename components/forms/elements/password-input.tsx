"use client";

import { useId, useState } from "react";
import Labeled from "./labeled";
import { Eye, EyeOff } from "lucide-react";

interface Props {
    name: string;
    label: string;
    placeholder?: string;
    defaultValue?: string;
    errors?: string[];
}

export default function TextInput(props: Readonly<Props>) {
    const id = useId();

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <Labeled htmlFor={id} label={props.label} errors={props.errors}>
            <div className="relative overflow-hidden rounded-lg">
                <input
                    type={visible ? "text" : "password"}
                    id={id}
                    name={props.name}
                    placeholder={props.placeholder}
                    defaultValue={props.defaultValue}
                    className="ring-1 ring-inset rounded-lg p-3 ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-800 bg-zinc-50 w-full placeholder:text-zinc-300"
                />
                <button
                    type="button"
                    onClick={toggleVisible}
                    className="absolute top-2 bottom-2 right-2 p-1 grid place-items-center rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800"
                >
                    {visible ? (
                        <EyeOff className="size-5 text-zinc-600" />
                    ) : (
                        <Eye className="size-5 text-zinc-600" />
                    )}
                </button>
            </div>
        </Labeled>
    );
}
