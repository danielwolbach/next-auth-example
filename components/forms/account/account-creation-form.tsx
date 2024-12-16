"use client";

import { useActionState } from "react";
import { createAccount } from "~/lib/actions/auth";
import TextInput from "../elements/text-input";
import Form from "../form";
import SubmitButton from "../elements/submit-button";
import Heading from "~/components/text/heading";
import Message from "../elements/message";
import PasswordInput from "../elements/password-input";
import EmailInput from "../elements/email-input";

export default function AccountCreationForm() {
    const [state, action] = useActionState(createAccount, undefined);

    return (
        <Form action={action}>
            <Heading>Create account</Heading>
            <Message message={state?.message} />
            <TextInput
                name="name"
                label="Name"
                errors={state?.errors?.name}
                placeholder="John Doe"
            />
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
            <PasswordInput
                name="repeatPassword"
                label="Repeat password"
                errors={state?.errors?.repeatPassword}
                placeholder="Password"
            />
            <SubmitButton>Create</SubmitButton>
        </Form>
    );
}
