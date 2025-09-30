export function ForestVisual() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-accent to-accent/80 relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <pattern
              id="forest-pattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M5 15 Q10 5 15 15"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth="3"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#forest-pattern)" />
        </svg>
      </div>
    </div>
  );
}

export function RiverVisual() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40 relative">
        <div className="absolute inset-0 opacity-40">
          <div
            className="w-full h-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, hsl(var(--background)) 0px, hsl(var(--background)) 1px, transparent 1px, transparent 3px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export function TempleVisual() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <div className="w-full h-full relative overflow-hidden">
        <div
          className="absolute inset-0 grid gap-1"
          style={{
            gridTemplateColumns: "repeat(20, 1fr)",
            gridTemplateRows: "repeat(20, 1fr)",
          }}
        >
          {Array.from({ length: 400 }, (_, i) => {
            const colors = [
              "hsl(var(--muted))",
              "hsl(var(--accent))",
              "hsl(var(--accent-foreground)/0.3)",
              "hsl(var(--primary)/0.2)",
              "hsl(var(--secondary))",
            ];
            const randomColor =
              colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className="w-full h-full"
                style={{ backgroundColor: randomColor }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
