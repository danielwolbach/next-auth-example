"use server";

import { database } from "~/database";
import {
    FormState,
    RecoverAccountSchema,
    RequestRecoverAccountSchema,
    SignInSchema,
    SignUpSchema,
} from "~/lib/definitions";
import { createSession, deleteSession } from "~/lib/auth/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { tokens, users } from "~/database/schema";
import { and, eq } from "drizzle-orm";
import { DatabaseError } from "pg";
import bcrypt from "bcrypt";
import { sendMail } from "~/lib/mail";
import { APP_BASE_URL } from "../environment";
import { getUser } from "../auth";

export async function createAccount(
    _state: FormState,
    data: FormData
): Promise<FormState> {
    const fields = SignUpSchema.safeParse(Object.fromEntries(data.entries()));

    if (!fields.success) {
        return {
            message: "Invalid fields",
            errors: fields.error.flatten().fieldErrors,
        };
    }

    const { email, name } = fields.data;
    const password = await bcrypt.hash(fields.data.password, 10);

    try {
        const user = (
            await database
                .insert(users)
                .values({
                    email,
                    password,
                    verified: false,
                    name,
                })
                .returning({ id: users.id })
        )[0];
        await createSession(String(user.id));
    } catch (error) {
        if (error instanceof DatabaseError) {
            const databaseError = error as DatabaseError;
            if (databaseError.constraint === "users_email_unique") {
                return {
                    message: "Email already in use",
                };
            }
        }

        return {
            message: "Internal server error",
        };
    }

    revalidatePath("/account");
    redirect("/account");
}

export async function deleteAccount(
    _state: FormState,
    _data: FormData
): Promise<FormState> {
    const user = await getUser();

    if (!user) {
        return {
            message: "You are not signed in",
        };
    }

    try {
        await database.delete(users).where(eq(users.id, user.id));
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    await deleteSession();

    revalidatePath("/account/redirect");
    redirect("/account/redirect");
}

export async function signIn(
    state: FormState,
    data: FormData
): Promise<FormState> {
    const fields = SignInSchema.safeParse(Object.fromEntries(data.entries()));

    if (!fields.success) {
        return {
            message: "Invalid fields",
            errors: fields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = fields.data;

    try {
        const user = (
            await database.select().from(users).where(eq(users.email, email))
        )[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
                message: "Invalid credentials",
            };
        }

        await createSession(String(user.id));
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    revalidatePath("/account");
    redirect("/account");
}

export async function signOut(
    _state: FormState,
    _data: FormData
): Promise<FormState> {
    await deleteSession();

    revalidatePath("/account");
    redirect("/account");
}

export async function requestAccountVerification(
    userId: string,
    _state: FormState,
    _data: FormData
): Promise<FormState> {
    try {
        const user = (
            await database.select().from(users).where(eq(users.id, userId))
        )[0];

        if (!user) {
            return {
                message: "User not found",
            };
        }

        if (user.verified) {
            return {
                message: "Account already verified",
            };
        }

        const previousToken = (
            await database
                .select({ id: tokens.id })
                .from(tokens)
                .where(
                    and(eq(tokens.userId, userId), eq(tokens.kind, "verify"))
                )
        )[0];

        if (previousToken) {
            await database
                .delete(tokens)
                .where(eq(tokens.id, previousToken.id));
        }

        const token = (
            await database
                .insert(tokens)
                .values({
                    userId,
                    kind: "verify",
                })
                .returning({ id: tokens.id })
        )[0];

        // TODO Do this properly.
        sendMail(
            user.email,
            "Verify your account",
            `Click here to verify: ${APP_BASE_URL}/account/verify/${token.id}`
        );
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    redirect("/account/redirect");
}

export async function verifyAccount(
    tokenId: string,
    _state: FormState,
    _data: FormData
) {
    try {
        const token = (
            await database.select().from(tokens).where(eq(tokens.id, tokenId))
        )[0];

        if (!token || token.kind !== "verify") {
            return {
                message: "Invalid token",
            };
        }

        if (token.expires < new Date()) {
            await database.delete(tokens).where(eq(tokens.id, tokenId));

            return {
                message: "Token expired",
            };
        }

        await database
            .update(users)
            .set({ verified: true })
            .where(eq(users.id, token.userId));

        await database.delete(tokens).where(eq(tokens.id, tokenId));
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    revalidatePath("/account");
    redirect("/account");
}

export async function requestAccountRecovery(
    _state: FormState,
    data: FormData
): Promise<FormState> {
    const fields = RequestRecoverAccountSchema.safeParse(
        Object.fromEntries(data.entries())
    );

    if (!fields.success) {
        return {
            message: "Invalid fields",
            errors: fields.error.flatten().fieldErrors,
        };
    }

    const { email } = fields.data;

    try {
        const user = (
            await database.select().from(users).where(eq(users.email, email))
        )[0];

        if (!user) {
            return {
                message: "No account with that email",
            };
        }

        const previousToken = (
            await database
                .select({ id: tokens.id })
                .from(tokens)
                .where(
                    and(eq(tokens.userId, user.id), eq(tokens.kind, "recover"))
                )
        )[0];

        if (previousToken) {
            await database
                .delete(tokens)
                .where(eq(tokens.id, previousToken.id));
        }

        const token = (
            await database
                .insert(tokens)
                .values({
                    userId: user.id,
                    kind: "recover",
                })
                .returning({ id: tokens.id })
        )[0];

        // TODO Do this properly.
        sendMail(
            user.email,
            "Recover your account",
            `Click here to recover: ${APP_BASE_URL}/account/recover/${token.id}`
        );
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    redirect("/account/redirect");
}

export async function recoverAccount(
    tokenId: string,
    _state: FormState,
    data: FormData
): Promise<FormState> {
    const fields = RecoverAccountSchema.safeParse(
        Object.fromEntries(data.entries())
    );

    if (!fields.success) {
        return {
            message: "Invalid fields",
            errors: fields.error.flatten().fieldErrors,
        };
    }

    try {
        const token = (
            await database.select().from(tokens).where(eq(tokens.id, tokenId))
        )[0];

        if (!token || token.kind !== "recover") {
            return {
                message: "Invalid token",
            };
        }

        if (token.expires < new Date()) {
            await database.delete(tokens).where(eq(tokens.id, tokenId));

            return {
                message: "Token expired",
            };
        }

        const password = await bcrypt.hash(fields.data.password, 10);

        await database
            .update(users)
            .set({ password })
            .where(eq(users.id, token.userId));

        await database.delete(tokens).where(eq(tokens.id, tokenId));
    } catch (_error) {
        return {
            message: "Internal server error",
        };
    }

    redirect("/account/auth/sign-in");
}
