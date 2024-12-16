"use client";

import { deleteAccount } from "~/lib/actions/auth";
import { useActionState } from "react";
import Form from "../form";
import Message from "../elements/message";
import SubmitButton from "../elements/submit-button";
import Heading from "~/components/text/heading";

export default function AccountDeletionForm() {
    const [state, action] = useActionState(deleteAccount, undefined);

    return (
        <Form action={action}>
            <Heading>Delete account</Heading>
            <Message message={state?.message} />
            <SubmitButton>Delete</SubmitButton>
        </Form>
    );
}
