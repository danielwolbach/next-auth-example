import AccountVerificationForm from "~/components/forms/account/account-verification-form";

interface Props {
    params: Promise<Params>;
}

interface Params {
    tokenId: string;
}

export default async function Page(props: Readonly<Props>) {
    const params = await props.params;
    return <AccountVerificationForm tokenId={params.tokenId} />;
}
