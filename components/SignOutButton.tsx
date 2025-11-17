"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={() => signOut({ callbackUrl: "/signin" })}
      aria-label="Sign out"
    >
      Sign out
    </button>
  );
}
