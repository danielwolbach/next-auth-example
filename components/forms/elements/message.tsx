interface Props {
    message?: string;
}

export default function Message(props: Readonly<Props>) {
    return (
        <>
            {props.message && (
                <p className="text-red-500 text-sm">{props.message}</p>
            )}
        </>
    );
}
