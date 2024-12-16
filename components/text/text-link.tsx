import Link from "next/link";

interface Props {
    href: string;
    children: React.ReactNode;
}

export default function TextLink(props: Readonly<Props>) {
    return (
        <Link
            href={props.href}
            className={`inline-flex items-center gap-1 underline`}
        >
            {props.children}
        </Link>
    );
}
