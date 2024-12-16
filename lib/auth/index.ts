import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "~/lib/auth/session";
import { cache } from "react";
import { database } from "~/database";
import { eq } from "drizzle-orm";
import { users } from "~/database/schema";

export const getSession = cache(async () => {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie);

    if (!session?.sub) {
        return null;
    }

    return session;
});

export const getUser = cache(async () => {
    const session = await getSession();

    if (!session) {
        return null;
    }

    const user = (
        await database.select().from(users).where(eq(users.id, session.sub))
    )[0];

    if (!user) {
        return null;
    }

    return user;
});
