import { NextRequest } from "next/server";
import { updateSession } from "./lib/auth/session";

export async function middleware(request: NextRequest) {
    return updateSession(request);
}
