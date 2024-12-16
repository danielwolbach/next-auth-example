import { montserrat } from "~/lib/fonts";

interface Props {
    children: React.ReactNode;
}

export default function Heading(props: Readonly<Props>) {
    return (
        <p
            className={`text-xl capitalize font-semibold ${montserrat.className}`}
        >
            {props.children}
        </p>
    );
}
