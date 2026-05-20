"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup") {
      await new Promise((r) => setTimeout(r, 800));
      setLoading(false);
      setError("Account created! Please sign in with your credentials.");
      setMode("signin");
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password. Try demo@leadrx10.com / demo1234");
    } else {
      router.push("/leads");
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl: "/leads" });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex flex-1 flex-col bg-zinc-950 relative overflow-hidden p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 via-zinc-950 to-zinc-950" />

        <div className="relative z-10 flex items-center gap-2.5 mb-16">
          <Image
            src="/logo.png"
            alt="leadRX10"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-white text-base font-semibold tracking-tight">leadRX10</span>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center max-w-md">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            Find your next 100 customers — before your competitors do.
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-10">
            AI-powered B2B lead intelligence for SaaS sales teams that want to close more, prospect less.
          </p>

          <div className="space-y-4">
            {[
              { stat: "275M+", label: "Verified B2B contacts" },
              { stat: "18.2%", label: "Average reply rate" },
              { stat: "70%", label: "Less time on manual prospecting" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-center gap-4">
                <div className="text-2xl font-bold text-indigo-400 w-20 shrink-0">{stat}</div>
                <div className="text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-800">
            <p className="text-xs text-zinc-500 mb-4">Trusted by teams at</p>
            <div className="flex items-center gap-5 text-zinc-500 text-sm font-medium">
              {["Notion", "Stripe", "Figma", "Linear", "Vercel"].map((co) => (
                <span key={co}>{co}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <Image
              src="/logo.png"
              alt="leadRX10"
              width={30}
              height={30}
              className="rounded-lg"
            />
            <span className="text-base font-semibold tracking-tight">leadRX10</span>
          </div>

          <div>
            <h1 className="text-xl font-semibold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signin"
                ? "Sign in to your leadRX10 workspace"
                : "Start finding leads in under 2 minutes"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-background px-4 h-10 text-sm font-medium hover:bg-muted transition-all duration-150 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
            ) : (
              <GoogleIcon />
            )}
            {googleLoading
              ? "Redirecting..."
              : mode === "signin"
              ? "Continue with Google"
              : "Sign up with Google"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleCredentials} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="text-xs font-medium block mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-medium block mb-1.5">Email</label>
              <input
                type="email"
                required
                placeholder={mode === "signin" ? "demo@leadrx10.com" : "you@company.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium">Password</label>
                {mode === "signin" && (
                  <button type="button" className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder={mode === "signin" ? "demo1234" : "Min. 8 characters"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 pr-10 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className={cn(
                  "flex items-start gap-2 rounded-lg px-3 py-2.5 text-xs",
                  error.includes("created")
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300"
                )}
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 h-10 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all duration-150 disabled:opacity-60 shadow-sm"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  {mode === "signin" ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
              className="text-indigo-500 font-medium hover:text-indigo-400 transition-colors"
            >
              {mode === "signin" ? "Sign up" : "Sign in"}
            </button>
          </p>

          {mode === "signin" && (
            <p className="text-center text-xs text-muted-foreground">
              Demo credentials:{" "}
              <span className="font-mono text-foreground/70">demo@leadrx10.com</span> /{" "}
              <span className="font-mono text-foreground/70">demo1234</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
      />
      <path
        fill="#34A853"
        d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
      />
      <path
        fill="#FBBC05"
        d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
      />
      <path
        fill="#EA4335"
        d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
      />
    </svg>
  );
}
