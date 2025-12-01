import React, { useState, useEffect } from "react";

function Loading({ children, duration = 1200, brand = "Coffee CMS", message = "Brewing your experience…" }) {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(95, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (elapsed < duration) raf.current = requestAnimationFrame(step);
    };
    const raf = { current: null };
    raf.current = requestAnimationFrame(step);

    const t1 = setTimeout(() => {
      setProgress(100);
      setExiting(true);
      const t2 = setTimeout(() => setShow(false), 320);
      return () => clearTimeout(t2);
    }, duration);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(t1);
    };
  }, [duration]);

  if (show) {
    return (
      <div className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900" />
        <div className="relative h-full w-full flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            {/* White Spinner */}
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-white/20" />
              <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-white animate-spin" />
            </div>

            {/* White Text */}
            <p className="text-white/90 text-lg tracking-wide font-semibold">
              {message}
            </p>

            <div className="w-64 h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

export default Loading;
