// components/ui/CyberpunkBackground.tsx

"use client";

import React from "react";
import { GlitchEffectsLayer } from "./GlitchEffectsLayer";

interface CyberpunkBackgroundProps {
     children: React.ReactNode;
}

const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({
     children,
}) => {
     return (
          <div>
               {/* Strat 0: Imaginea de fundal și gradientul */}
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

               {/* Strat 1: Animațiile de tip glitch (componenta optimizată) */}
               <GlitchEffectsLayer />

               {/* Strat 2: Conținutul tău */}
               <div className="relative z-20">{children}</div>

               {/* Strat 3: Gradientul de la bază */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </div>
     );
};

export default React.memo(CyberpunkBackground);
