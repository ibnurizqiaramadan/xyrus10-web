"use server";

import { lucia } from "./auth";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { scryptSync } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password required" };
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  if (!existingUser) {
    return { error: "Invalid username or password" };
  }

  const [salt, hash] = existingUser.passwordHash.split(":");
  const loginHash = scryptSync(password, salt, 64).toString("hex");

  if (loginHash !== hash) {
    return { error: "Invalid username or password" };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  (await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  
  redirect("/admin");
}

export async function logout() {
  const sessionCookie = (await cookies()).get(lucia.sessionCookieName);
  if (!sessionCookie) return;

  const { session } = await lucia.validateSession(sessionCookie.value);
  if (session) {
    await lucia.invalidateSession(session.id);
  }

  const blankCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(blankCookie.name, blankCookie.value, blankCookie.attributes);
  
  redirect("/admin/login");
}
