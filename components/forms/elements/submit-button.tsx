import { LoaderCircle } from "lucide-react";
import { montserrat } from "~/lib/fonts";
import { useFormStatus } from "react-dom";

interface Props {
    children: React.ReactNode;
}

export default function SubmitButton(props: Readonly<Props>) {
    const status = useFormStatus();

    return (
        <button
            disabled={status.pending}
            type="submit"
            className={`p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 ring-offset-2 ring-zinc-800 capitalize font-semibold ${montserrat.className} relative`}
        >
            <div className={`${status.pending && "text-transparent"}`}>
                {props.children}
            </div>
            {status.pending && (
                <div className="absolute top-0 left-0 right-0 bottom-0 grid place-items-center">
                    <LoaderCircle className="animate-spin" />
                </div>
            )}
        </button>
    );
}
