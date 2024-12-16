"use client";

import { useActionState } from "react";
import { verifyAccount } from "~/lib/actions/auth";
import SubmitButton from "../elements/submit-button";
import Message from "../elements/message";
import Heading from "../../text/heading";
import Form from "../form";

interface Props {
    tokenId: string;
}

export default function AccountVerificationForm(props: Readonly<Props>) {
    const verifyAccountWithId = verifyAccount.bind(null, props.tokenId);
    const [state, action] = useActionState(verifyAccountWithId, undefined);

    return (
        <Form action={action}>
            <Heading>Verify account</Heading>
            <Message message={state?.message} />
            <SubmitButton>Verify</SubmitButton>
        </Form>
    );
}
