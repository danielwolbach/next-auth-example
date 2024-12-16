import AccountVerificationRequestForm from "~/components/forms/account/account-verification-request-form";
import { getUser } from "~/lib/auth";

export default async function Page() {
    const user = await getUser();
    return <AccountVerificationRequestForm userId={user.id} />;
}
