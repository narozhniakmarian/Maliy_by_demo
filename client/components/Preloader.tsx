export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative w-20 h-20">
        <svg
          className="w-full h-full animate-spin-slow"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Lure body */}
          <ellipse cx="50" cy="40" rx="12" ry="18" fill="currentColor" className="text-primary" />
          
          {/* Lure head */}
          <circle cx="50" cy="20" r="8" fill="currentColor" className="text-primary" />
          
          {/* Hook */}
          <path
            d="M 50 58 Q 55 70, 50 80 Q 45 70, 50 58"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            strokeLinecap="round"
          />
          
          {/* Eye */}
          <circle cx="50" cy="18" r="2" fill="currentColor" className="text-secondary" />
        </svg>
      </div>
      <div className="absolute">
        <div className="text-center mt-32">
          <p className="text-sm font-medium text-foreground">Loading...</p>
        </div>
      </div>
    </div>
  );
}
