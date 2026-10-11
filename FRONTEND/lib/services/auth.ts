export type AuthResult = { ok: boolean; error?: string };

export async function signIn(email: string, password: string): Promise<AuthResult> {
  await new Promise((r) => setTimeout(r, 400));
  if (!email.includes("@")) return { ok: false, error: "Enter a valid work email." };
  if (password.replace(/•/g, "").length < 4) return { ok: false, error: "Enter your password." };
  return { ok: true };
}

export async function requestPasswordReset(email: string): Promise<AuthResult> {
  await new Promise((r) => setTimeout(r, 400));
  if (!email.includes("@")) return { ok: false, error: "Enter a valid work email." };
  return { ok: true };
}

export async function verifyTwoFactor(code: string): Promise<AuthResult> {
  await new Promise((r) => setTimeout(r, 400));
  if (!/^\d{6}$/.test(code)) return { ok: false, error: "Enter the six-digit code." };
  return { ok: true };
}
