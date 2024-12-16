import AccountRecoveryForm from "~/components/forms/account/account-recovery-form";

interface Props {
    params: Promise<Params>;
}

interface Params {
    tokenId: string;
}

export default async function Page(props: Readonly<Props>) {
    const params = await props.params;
    return <AccountRecoveryForm tokenId={params.tokenId} />;
}
