import Heading from "~/components/text/heading";
import TextLink from "~/components/text/text-link";
import { APP_NAME } from "~/lib/environment";

export default function Page() {
    return (
        <>
            <Heading>{APP_NAME}</Heading>
            <TextLink href="/account">Account</TextLink>
        </>
    );
}
