export function AuthIllustration() {
  return (
    <div className="relative hidden h-full w-full items-center justify-center overflow-hidden bg-linear-to-br from-(--color-card-gradient-start) to-(--color-card-gradient-end) lg:flex">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-10 px-12 text-center">
        <svg
          className="auth-cards"
          width="280"
          height="200"
          viewBox="0 0 280 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="card card-3"
            x="30"
            y="70"
            width="200"
            height="120"
            rx="16"
            fill="rgba(255,255,255,0.12)"
          />
          <rect
            className="card card-2"
            x="15"
            y="45"
            width="220"
            height="120"
            rx="16"
            fill="rgba(255,255,255,0.22)"
          />
          <rect
            className="card card-1"
            x="0"
            y="20"
            width="240"
            height="130"
            rx="16"
            fill="white"
          />
          <circle
            className="card card-1"
            cx="205"
            cy="45"
            r="14"
            fill="var(--color-card-gradient-start)"
            opacity="0.85"
          />
          <rect
            className="card card-1"
            x="20"
            y="90"
            width="90"
            height="8"
            rx="4"
            fill="var(--color-text-muted)"
            opacity="0.4"
          />
          <rect
            className="card card-1"
            x="20"
            y="110"
            width="140"
            height="10"
            rx="4"
            fill="var(--color-heading)"
            opacity="0.5"
          />
        </svg>

        <div className="max-w-xs text-white">
          <h2 className="text-2xl font-semibold">
            Your finances, one dashboard.
          </h2>
          <p className="mt-2 text-sm text-white/70">
            Track spending, manage accounts, and grow your investments — all in
            one place.
          </p>
        </div>
      </div>

      <style>{`
        .auth-cards .card {
          animation: card-float 5s ease-in-out infinite;
        }
        .auth-cards .card-2 { animation-delay: 0.3s; }
        .auth-cards .card-3 { animation-delay: 0.6s; }

        @keyframes card-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .auth-cards .card { animation: none; }
        }
      `}</style>
    </div>
  );
}
