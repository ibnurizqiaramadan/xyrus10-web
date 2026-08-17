import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { lucia } from "./auth";

export async function getUser() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {
    // next.js throws when setting cookies in server components
  }
  return user;
}

// Works in both server components and server actions, so one guard covers page loads and mutations.
export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login");
  return user;
}
