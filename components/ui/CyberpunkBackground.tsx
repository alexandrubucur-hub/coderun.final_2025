// components/ui/CyberpunkBackground.tsx
"use client";

// --- MODIFICARE: Importurile necesare pentru stare, efecte și încărcare dinamică ---
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// --- MODIFICARE: Importă GlitchEffectsLayer dinamic și cu 'ssr: false' ---
const DynamicGlitchEffectsLayer = dynamic(
     () => import("./GlitchEffectsLayer").then((mod) => mod.GlitchEffectsLayer),
     { ssr: false }
);

interface CyberpunkBackgroundProps {
     children: React.ReactNode;
     isInView: boolean;
     // --- MODIFICARE: Prop nou care semnalează sfârșitul animațiilor de conținut ---
     startAnimatedBg: boolean;
}

const CyberpunkBackground: React.FC<CyberpunkBackgroundProps> = ({
     children,
     isInView,
     startAnimatedBg, // --- MODIFICARE: Primim noul prop ---
}) => {
     // --- MODIFICARE: Stare locală pentru a controla afișarea efectelor ---
     const [showGlitches, setShowGlitches] = useState(false);

     // --- MODIFICARE: Efectul pornește DOAR când ambele condiții sunt îndeplinite ---
     useEffect(() => {
          if (isInView && startAnimatedBg) {
               // Pornește efectele de glitch DOAR DUPĂ ce conținutul s-a animat
               setShowGlitches(true);
          } else {
               // Resetează dacă iese din ecran sau dacă animația de conținut nu e gata
               setShowGlitches(false);
          }
     }, [isInView, startAnimatedBg]); // Depinde de ambele semnale

     return (
          // --- PĂSTRARE: Structura JSX originală (rădăcina este un <div> simplu) ---
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

               {/* Strat 1: Animațiile de tip glitch (componenta optimizată) */}
               {/* ---- MODIFICARE: Se randează condiționat DUPĂ noua logică ---- */}
               {showGlitches && (
                    <DynamicGlitchEffectsLayer isInView={showGlitches} />
               )}

               {/* Strat 2: Conținutul tău (pornește când 'isInView' e true) */}
               <div className="relative z-20">{children}</div>

               {/* Strat 3: Gradientul de la bază */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </div>
     );
};

export default React.memo(CyberpunkBackground);
