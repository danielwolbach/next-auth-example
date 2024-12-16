import "server-only";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_SECRET } from "../environment";

const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;
const ENCODED_KEY = new TextEncoder().encode(AUTH_SECRET);

export async function encrypt(subject: string, expires: Date) {
    return new SignJWT()
        .setSubject(subject)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expires)
        .sign(ENCODED_KEY);
}

export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, ENCODED_KEY, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (_error) {
        console.log("Failed to decrypt session");
    }
}

export async function createSession(subject: string) {
    const expires = new Date(Date.now() + SESSION_DURATION);
    const session = await encrypt(subject, expires);
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        // secure: true,
        expires: expires,
        // sameSite: "lax",
        // path: "/",
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value;
    const payload = await decrypt(session);
    const response = NextResponse.next();

    if (session && payload) {
        const expires = new Date(Date.now() + SESSION_DURATION);
        const newSession = await encrypt(payload.sub, expires);

        response.cookies.set("session", newSession, {
            httpOnly: true,
            // secure: true,
            expires: expires,
            // sameSite: "lax",
            // path: "/",
        });
    }

    return response;
}
