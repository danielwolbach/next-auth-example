import Heading from "~/components/text/heading";
import TextLink from "~/components/text/text-link";
import { getUser } from "~/lib/auth";

export default async function Page() {
    const user = await getUser();

    if (!user) {
        return (
            <>
                <Heading>Account</Heading>
                <p>
                    You are not signed in. You can either{" "}
                    <TextLink href="/account/auth/sign-in">sign in</TextLink> or{" "}
                    <TextLink href="/account/create">sign up</TextLink>.
                </p>
            </>
        );
    }

    return (
        <>
            <Heading>Account</Heading>
            <p>
                You are logged in as {user.name} ({user.email}). You can{" "}
                <TextLink href="/account/auth/sign-out">sign out</TextLink> or{" "}
                <TextLink href="/account/delete">delete your account</TextLink>.
            </p>
            {!user.verified && (
                <p>
                    Your account is not verified.{" "}
                    <TextLink href="/account/verify">
                        Request verification.
                    </TextLink>
                </p>
            )}
        </>
    );
}
