"use client";

import { useActionState } from "react";
import { requestAccountRecovery } from "~/lib/actions/auth";
import SubmitButton from "../elements/submit-button";
import Message from "../elements/message";
import Heading from "../../text/heading";
import Form from "../form";
import EmailInput from "../elements/email-input";

export default function AccountRecoveryRequestForm() {
    const [state, action] = useActionState(requestAccountRecovery, undefined);

    return (
        <Form action={action}>
            <Heading>Request account recovery</Heading>
            <Message message={state?.message} />
            <EmailInput
                name="email"
                label="Email"
                errors={state?.errors?.email}
                placeholder="johndoe@example.com"
            />
            <SubmitButton>Request</SubmitButton>
        </Form>
    );
}
