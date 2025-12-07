import React, { useState, useEffect, useRef } from "react";

function Loading({ children, duration = 1200, brand = "ភិមាន កាហ្វេ", message = "Initializing modules..." }) {
    const [show, setShow] = useState(true);
    const [exiting, setExiting] = useState(false);
    const [progress, setProgress] = useState(0);

    // --- Loading Logic (Kept as is for functionality) ---
    const raf = useRef(null);

    useEffect(() => {
        const start = Date.now();
        const step = () => {
            const elapsed = Date.now() - start;
            // Limit progress to 95% during the duration
            const pct = Math.min(95, Math.round((elapsed / duration) * 100));
            setProgress(pct);
            if (elapsed < duration) raf.current = requestAnimationFrame(step);
        };
        
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
    // ----------------------------------------------------

    if (show) {
        return (
            // Light background, squared main container with transition
            <div className={`fixed inset-0 z-[9999] transition-opacity duration-300 bg-gray-100 ${exiting ? 'opacity-0' : 'opacity-100'}`}>
                
                {/* Center Content Container */}
                <div className="relative h-full w-full flex items-center justify-center">
                    
                    <div className="flex flex-col items-center gap-8 p-10 bg-white border-2 border-gray-700"> {/* Squared container */}
                        
                        {/* Logo/Brand (using a square block) */}
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 bg-emerald-600 border-2 border-gray-700" /> {/* Squared Icon placeholder */}
                            <h1 className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
                                {brand.toUpper​Case()}
                            </h1>
                        </div>

                        {/* Loading Message (Emerald Accent) */}
                        <p className="text-emerald-700 text-lg tracking-wide font-mono font-semibold">
                            {message}
                        </p>

                        {/* Squared Progress Bar */}
                        <div className="w-80 h-3 bg-gray-200 overflow-hidden border-2 border-gray-700">
                            <div
                                // Use the emerald accent color for the progress filler
                                className="h-full bg-emerald-600 transition-all duration-200"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Optional: Simple Text Progress Indicator */}
                        <p className="text-sm text-gray-600 font-mono">
                            {progress}% loaded
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return children;
}

export default Loading;