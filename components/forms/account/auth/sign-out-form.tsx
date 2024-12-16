"use client";

import { useActionState } from "react";
import { signOut } from "~/lib/actions/auth";
import Form from "../../form";
import Heading from "../../../text/heading";
import SubmitButton from "../../elements/submit-button";
import Message from "../../elements/message";

export default function SignOutForm() {
    const [state, action] = useActionState(signOut, undefined);

    return (
        <Form action={action}>
            <Heading>Sign out</Heading>
            <Message message={state?.message} />
            <SubmitButton>Sign out</SubmitButton>
        </Form>
    );
}
