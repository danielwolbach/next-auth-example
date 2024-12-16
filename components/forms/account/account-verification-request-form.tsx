"use client";

import { useActionState } from "react";
import { requestAccountVerification as requestVerify } from "~/lib/actions/auth";
import Form from "../form";
import SubmitButton from "../elements/submit-button";
import Message from "../elements/message";
import Heading from "../../text/heading";

interface Props {
    userId: string;
}

export default function AccountVerificationRequestForm(props: Readonly<Props>) {
    const requestVerifyWithId = requestVerify.bind(null, props.userId);
    const [state, action] = useActionState(requestVerifyWithId, undefined);
    return (
        <Form action={action}>
            <Heading>Request account verification</Heading>
            <Message message={state?.message} />
            <SubmitButton>Request</SubmitButton>
        </Form>
    );
}
