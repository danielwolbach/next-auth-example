"use client";

import { recoverAccount } from "~/lib/actions/auth";
import { useActionState } from "react";
import Form from "../form";
import Heading from "../../text/heading";
import Message from "../elements/message";
import PasswordInput from "../elements/password-input";
import SubmitButton from "../elements/submit-button";

interface Props {
    tokenId: string;
}

export default function AccountRecoveryForm(props: Readonly<Props>) {
    const recoverAccountBound = recoverAccount.bind(null, props.tokenId);
    const [state, action] = useActionState(recoverAccountBound, undefined);

    return (
        <Form action={action}>
            <Heading>Recover account</Heading>
            <Message message={state?.message} />
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
            <SubmitButton>Recover</SubmitButton>
        </Form>
    );
}
