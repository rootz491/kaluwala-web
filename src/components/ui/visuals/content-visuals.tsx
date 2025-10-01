import homepageContent from "@/data/homepage-content.json";

const { sections } = homepageContent;

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

export function TempleVisual() {
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
