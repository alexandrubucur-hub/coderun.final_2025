// components/ui/CyberpunkBackground.tsx
"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

const DynamicGlitchEffectsLayer = dynamic(
     () => import("./GlitchEffectsLayer").then((mod) => mod.GlitchEffectsLayer),
     { ssr: false }
);

interface CyberpunkBackgroundProps {
     children: React.ReactNode;
     isInView: boolean;

     startAnimatedBg?: boolean;
}

const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({
     children,
     isInView,
     startAnimatedBg = false, // --- MODIFICARE: Valoare implicită
}) => {
     const [showGlitches, setShowGlitches] = useState(false);

     const isSmallScreen = useMediaQuery("(max-width: 1024px)");

     useEffect(() => {
          let shouldShow: boolean;

          if (isSmallScreen) {
               // Pe ECRANE MICI: Așteptăm ambele semnale
               shouldShow = isInView && startAnimatedBg;
          } else {
               // Pe DESKTOP: Pornim imediat ce este vizibil
               shouldShow = isInView;
          }

          setShowGlitches(shouldShow);
     }, [isInView, startAnimatedBg, isSmallScreen]);

     return (
          <div>
               {/* Strat 0: Imaginea de fundal și gradientul (se încarcă imediat) */}
               <div className="absolute inset-0 z-0">
                    <div
                         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                         style={{ backgroundImage: 'url("/images/bg.png")' }}
                    />
                    <div
                         className="absolute inset-0 bg-gradient-to-b from-coderun-dark/90 via-coderun-dark-purple/70 to-coderun-dark/90"
                         style={{ opacity: 0.2 }}
                    />
               </div>

               {/* Strat 1: Animațiile de tip glitch (se randează conform noii logici) */}
               {showGlitches && (
                    <DynamicGlitchEffectsLayer isInView={showGlitches} />
               )}

               {/* Strat 2: Conținutul tău */}
               <div className="relative z-20">{children}</div>

               {/* Strat 3: Gradientul de la bază */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </div>
     );
};

export default React.memo(CyberpunkBackground);
