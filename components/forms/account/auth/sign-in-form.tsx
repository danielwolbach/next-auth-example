"use client";

import { useActionState } from "react";
import { signIn } from "~/lib/actions/auth";
import Form from "../../form";
import Heading from "../../../text/heading";
import Message from "../../elements/message";
import SubmitButton from "../../elements/submit-button";
import TextLink from "~/components/text/text-link";
import PasswordInput from "../../elements/password-input";
import EmailInput from "../../elements/email-input";

export default function SignInForm() {
    const [state, action] = useActionState(signIn, undefined);

    return (
        <Form action={action}>
            <Heading>Sign in</Heading>
            <Message message={state?.message} />
            <EmailInput
                name="email"
                label="Email"
                errors={state?.errors?.email}
                placeholder="johndoe@example.com"
            />
            <PasswordInput
                name="password"
                label="Password"
                errors={state?.errors?.password}
                placeholder="Password"
            />
            <SubmitButton>Sign in</SubmitButton>
            <section className="grid place-items-center">
                <TextLink href="/account/recover">Forgot password?</TextLink>
            </section>
        </Form>
    );
}
