import "~/styles/global.css";
import { inter } from "~/lib/fonts";

interface Props {
    children: React.ReactNode;
}

export default function Layout(props: Readonly<Props>) {
    return (
        <html>
            <body
                className={`antialiased ${inter.className} p-4 text-zinc-950 h-dvh`}
            >
                <main className="flex flex-col gap-4 h-full">
                    {props.children}
                </main>
            </body>
        </html>
    );
}
