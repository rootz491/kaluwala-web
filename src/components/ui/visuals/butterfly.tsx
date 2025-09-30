export function ButterflyVisual() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40 rounded-lg transform rotate-3"></div>
      <div className="relative bg-gradient-to-br from-primary/30 via-primary/40 to-primary/50 rounded-lg p-6 sm:p-8 md:p-12 lg:p-16">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-background/20 to-transparent rounded-lg"></div>
        </div>
        <div className="relative">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.6" />
              </pattern>
            </defs>
            <path
              d="M100 80 Q120 60 140 80 Q130 100 100 100 Q70 100 60 80 Q80 60 100 80"
              fill="url(#dots)"
            />
            <path
              d="M100 120 Q120 140 140 120 Q130 100 100 100 Q70 100 60 120 Q80 140 100 120"
              fill="url(#dots)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="2"
              ry="40"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
