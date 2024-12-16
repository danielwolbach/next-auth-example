import Heading from "~/components/text/heading";
import TextLink from "~/components/text/text-link";

export default function Page() {
    return (
        <section className="grid place-items-center h-2/3">
            <section className="flex flex-col items-center gap-4">
                <Heading>Success</Heading>
                <p>Your last action was successful.</p>
                <TextLink href="/account">Go to Account</TextLink>
            </section>
        </section>
    );
}
