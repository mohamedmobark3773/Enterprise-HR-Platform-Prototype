"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import type { AuthScreen } from "@/components/auth/auth-types";
import { signIn, requestPasswordReset, verifyTwoFactor } from "@/lib/services/auth";

const copy: Record<AuthScreen, { title: string; subtitle: string; action: string }> = {
  login: {
    title: "Login",
    subtitle: "Secure access to your global operations workspace.",
    action: "Sign in securely",
  },
  "forgot-password": {
    title: "Forgot Password",
    subtitle: "We’ll send a secure recovery link to your work email.",
    action: "Send reset link",
  },
  "two-factor": {
    title: "Two-Factor Authentication",
    subtitle: "Enter the six-digit authenticator code.",
    action: "Verify and continue",
  },
};

export function AuthView({ screen }: { screen: AuthScreen }) {
  const router = useRouter();
  const { locale, setLocale, tr } = useApp();
  const [email, setEmail] = useState("amira.khalid@nexus.energy");
  const [password, setPassword] = useState("password123");
  const [code, setCode] = useState("482913");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resent, setResent] = useState(false);
  const config = copy[screen];

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);
    setLoading(true);
    const result =
      screen === "login" ? await signIn(email, password)
      : screen === "forgot-password" ? await requestPasswordReset(email)
      : await verifyTwoFactor(code);
    setLoading(false);
    if (!result.ok) { setError(result.error || "Something went wrong."); return; }
    setSubmitted(true);
    if (screen === "login" || screen === "two-factor") router.push("/dashboard");
  };

  return (
    <main className="auth-screen">
      <div className="auth-brand-bar">
        <strong>◆ NEXUS CORE</strong>
        <select value={locale} onChange={(event) => setLocale(event.target.value as typeof locale)} aria-label="Language">
          <option value="en">EN</option>
          <option value="fr">FR</option>
          <option value="ar">AR</option>
        </select>
      </div>
      <form className="auth-card" onSubmit={submit}>
        <h1>{tr(config.title)}</h1>
        <p>{tr(config.subtitle)}</p>
        {screen === "two-factor" ? (
          <label className="auth-code-field">
            <span>{tr("Authenticator code")}</span>
            <input value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" maxLength={6} aria-label="Authenticator code" />
          </label>
        ) : (
          <>
            <label className="auth-field">
              <span>{tr("Work email")}</span>
              <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required aria-label="Work email" />
            </label>
            {screen === "login" && (
              <label className="auth-field">
                <span>{tr("Password")}</span>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} required aria-label="Password" />
                <button type="button" className="auth-link" onClick={() => setShowPassword((v) => !v)}>{tr(showPassword ? "Hide password" : "Show password")}</button>
              </label>
            )}
          </>
        )}
        {error && <p className="auth-feedback" role="alert">{tr(error)}</p>}
        <button className="auth-primary" type="submit" disabled={loading}>{loading ? tr("Working…") : tr(config.action)}</button>
        {submitted && screen === "forgot-password" && <p className="auth-feedback">{tr("Recovery link requested")}</p>}
        {screen === "login" && <button className="auth-link" type="button" onClick={() => router.push("/forgot-password")}>{tr("Forgot password?")}</button>}
        {screen === "login" && <button className="auth-link" type="button" onClick={() => router.push("/two-factor")}>{tr("Continue with Microsoft SSO")}</button>}
        {screen === "two-factor" && <button className="auth-link" type="button" onClick={() => setResent(true)}>{resent ? tr("Code resent") : tr("Resend code")}</button>}
        {screen !== "login" && <button className="auth-link" type="button" onClick={() => router.push("/login")}>{tr("Back to sign in")}</button>}
      </form>
      <p className="auth-footer">Enterprise SSO · Privacy · IT Support</p>
    </main>
  );
}

export default AuthView;
