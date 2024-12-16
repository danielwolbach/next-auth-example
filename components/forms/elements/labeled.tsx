import { Dot } from "lucide-react";

interface Props {
    htmlFor: string;
    label: string;
    children: React.ReactNode;
    errors?: string[];
}

export default function Labeled(props: Readonly<Props>) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={props.htmlFor} className="text-sm">
                {props.label}
            </label>
            {props.children}
            {props.errors && (
                <ul>
                    {props.errors.map((error, index) => (
                        <li
                            key={index}
                            className="text-sm text-red-500 flex items-center"
                        >
                            <Dot className="size-4" />
                            {error}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
