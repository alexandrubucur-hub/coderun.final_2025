"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { StaticGlitchText } from "./StaticGlitchText";

// --- Setările de performanță rămân neschimbate ---
const POOL_SIZE = 5;
const VERTICAL_POOL_SIZE = 3;
const GLITCH_INTERVAL = 2000;
const GLITCH_LIFESPAN = 3000;
const VERTICAL_GLITCH_INTERVAL = 3000;
const VERTICAL_GLITCH_LIFESPAN = 4000;
// ---

type Glitch = {
     el: HTMLDivElement | null;
     disappearAt: number;
};

type VerticalGlitch = {
     el: HTMLDivElement | null;
     disappearAt: number;
};

interface GlitchEffectsLayerProps {
     isInView: boolean;
}

export const GlitchEffectsLayer: React.FC<GlitchEffectsLayerProps> = ({
     isInView,
}) => {
     const containerRef = useRef<HTMLDivElement>(null);

     // --- Pool-ul de elemente ---
     const glitchPoolRef = useRef<Glitch[]>([]);
     const verticalGlitchPoolRef = useRef<VerticalGlitch[]>([]);

     // --- Referințe directe la elementele DOM ---
     const glitchElsRef = useRef<(HTMLDivElement | null)[]>([]);
     const verticalGlitchElsRef = useRef<(HTMLDivElement | null)[]>([]);

     // --- MODIFICARE: Stocăm ID-urile timerelor în loc de animationFrame ---
     const horizontalTimerRef = useRef<NodeJS.Timeout | null>(null);
     const verticalTimerRef = useRef<NodeJS.Timeout | null>(null);
     // Stocăm toate timerele de ascundere pentru cleanup
     const hideTimersRef = useRef<NodeJS.Timeout[]>([]);

     const verticalGlitchSlots = useMemo(
          () => [
               // ... (array-ul verticalGlitchSlots rămâne neschimbat)
               {
                    position: "top-[15%] left-[12%]",
                    style: "opacity-30 text-coderun-purple",
               },
               {
                    position: "top-[60%] left-[22%]",
                    style: "opacity-20 text-coderun-accent",
               },
               {
                    position: "top-[20%] left-[35%]",
                    style: "opacity-35 text-coderun-pink-light",
               },
               {
                    position: "top-[75%] left-[45%]",
                    style: "opacity-25 text-coderun-purple",
               },
               {
                    position: "top-[10%] left-[55%]",
                    style: "opacity-35 text-coderun-pink",
               },
               {
                    position: "top-[55%] left-[68%]",
                    style: "opacity-25 text-coderun-accent",
               },
               {
                    position: "top-[30%] left-[78%]",
                    style: "opacity-30 text-coderun-pink-light",
               },
               {
                    position: "top-[85%] left-[85%]",
                    style: "opacity-20 text-coderun-purple",
               },
          ],
          []
     );

     // Inițializăm pool-ul o singură dată (rămâne neschimbat)
     useEffect(() => {
          glitchElsRef.current = glitchElsRef.current.slice(0, POOL_SIZE);
          verticalGlitchElsRef.current = verticalGlitchElsRef.current.slice(
               0,
               VERTICAL_POOL_SIZE
          );

          glitchPoolRef.current = glitchElsRef.current.map((el) => ({
               el,
               disappearAt: 0,
          }));
          verticalGlitchPoolRef.current = verticalGlitchElsRef.current.map(
               (el) => ({
                    el,
                    disappearAt: 0,
               })
          );
     }, []);

     // --- MODIFICARE: Bucla de animație înlocuită cu setTimeout ---
     useEffect(() => {
          // Funcție pentru a ascunde un element după o perioadă
          const hideElement = (glitch: Glitch | VerticalGlitch) => {
               if (glitch.el) {
                    glitch.el.style.opacity = "0";
               }
               glitch.disappearAt = 0; // Marcat ca disponibil
          };

          // Funcție pentru a genera un glitch orizontal
          const spawnHorizontalGlitch = () => {
               if (!containerRef.current) return; // Verificare de siguranță

               const now = Date.now();
               const availableGlitch = glitchPoolRef.current.find(
                    (g) => now > g.disappearAt || g.disappearAt === 0
               );

               if (availableGlitch && availableGlitch.el) {
                    const containerWidth = containerRef.current.offsetWidth;
                    const containerHeight = containerRef.current.offsetHeight;

                    if (containerWidth > 0) {
                         const x = Math.random() * containerWidth * 0.8;
                         const y = Math.random() * containerHeight * 0.8;
                         const opacity = Math.random() * 0.4 + 0.2;

                         availableGlitch.el.style.transform = `translate(${x}px, ${y}px)`;
                         availableGlitch.el.style.opacity = opacity.toString();
                         availableGlitch.disappearAt = now + GLITCH_LIFESPAN;

                         // Programează ascunderea
                         const hideTimer = setTimeout(
                              () => hideElement(availableGlitch),
                              GLITCH_LIFESPAN
                         );
                         hideTimersRef.current.push(hideTimer);
                    }
               }
               // Reprogramează următorul glitch
               horizontalTimerRef.current = setTimeout(
                    spawnHorizontalGlitch,
                    GLITCH_INTERVAL
               );
          };

          // Funcție pentru a genera un glitch vertical
          const spawnVerticalGlitch = () => {
               if (!containerRef.current) return; // Verificare de siguranță

               const now = Date.now();
               const availableGlitch = verticalGlitchPoolRef.current.find(
                    (g) => now > g.disappearAt || g.disappearAt === 0
               );

               if (availableGlitch && availableGlitch.el) {
                    const slot =
                         verticalGlitchSlots[
                              Math.floor(
                                   Math.random() * verticalGlitchSlots.length
                              )
                         ];
                    // Suprascriem className complet
                    availableGlitch.el.className = `absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest transition-opacity duration-1000 ${slot.position} ${slot.style}`;
                    availableGlitch.el.style.opacity = "1"; // Forțează opacitatea la apariție
                    availableGlitch.disappearAt =
                         now + VERTICAL_GLITCH_LIFESPAN;

                    // Programează ascunderea
                    const hideTimer = setTimeout(
                         () => hideElement(availableGlitch),
                         VERTICAL_GLITCH_LIFESPAN
                    );
                    hideTimersRef.current.push(hideTimer);
               }
               // Reprogramează următorul glitch
               verticalTimerRef.current = setTimeout(
                    spawnVerticalGlitch,
                    VERTICAL_GLITCH_INTERVAL
               );
          };

          // --- Logica de Start/Stop ---
          if (isInView) {
               // Pornim buclele de timer doar dacă nu rulează deja
               if (!horizontalTimerRef.current) {
                    horizontalTimerRef.current = setTimeout(
                         spawnHorizontalGlitch,
                         GLITCH_INTERVAL
                    );
               }
               if (!verticalTimerRef.current) {
                    verticalTimerRef.current = setTimeout(
                         spawnVerticalGlitch,
                         VERTICAL_GLITCH_INTERVAL
                    );
               }
          }

          // --- Funcția de Cleanup ---
          return () => {
               // Oprim buclele principale care generează glitch-uri
               if (horizontalTimerRef.current) {
                    clearTimeout(horizontalTimerRef.current);
                    horizontalTimerRef.current = null;
               }
               if (verticalTimerRef.current) {
                    clearTimeout(verticalTimerRef.current);
                    verticalTimerRef.current = null;
               }

               // Oprim toate timerele de ascundere programate
               hideTimersRef.current.forEach(clearTimeout);
               hideTimersRef.current = [];

               // Ascundem totul rapid la ieșirea din view
               // (Acest lucru este acum acoperit și de opacitatea containerului,
               // dar facem o curățare suplimentară a stării)
               glitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
                    g.disappearAt = 0;
               });
               verticalGlitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
                    g.disappearAt = 0;
               });
          };
     }, [isInView, verticalGlitchSlots]); // Dependința e corectă

     return (
          <div
               ref={containerRef}
               className="absolute inset-0 z-10 pointer-events-none text-glitch will-change-transform transition-opacity duration-500"
               // --- STRATEGIA 2: Aplicăm opacitatea pe containerul principal ---
               style={{ opacity: isInView ? 1 : 0 }}
          >
               {/* Componenta de text static (nu se mișcă) */}
               <StaticGlitchText />

               {/* Containerul pentru glitch-uri dinamice (folosind pool-ul) */}
               <div className="absolute inset-0">
                    {/* Pool-ul Orizontal */}
                    {Array.from({ length: POOL_SIZE }).map((_, i) => (
                         <div
                              key={i}
                              ref={(el) => {
                                   glitchElsRef.current[i] = el;
                              }}
                              // Tranziția se aplică la ascundere (când 'hideElement' setează opacitatea la 0)
                              className="absolute transition-opacity duration-500"
                              style={{
                                   opacity: 0,
                                   willChange: "transform, opacity",
                              }}
                         >
                              <DynamicGlitchText className="flex items-center justify-center text-center text-coderun-pink font-mono text-xs p-2" />
                         </div>
                    ))}

                    {/* Pool-ul Vertical */}
                    {Array.from({ length: VERTICAL_POOL_SIZE }).map((_, i) => (
                         <div
                              key={i}
                              ref={(el) => {
                                   verticalGlitchElsRef.current[i] = el;
                              }}
                              // className va fi suprascris de 'spawnVerticalGlitch'
                              // Păstrăm tranziția aici ca fallback
                              className="absolute transition-opacity duration-1000"
                              style={{ opacity: 0, willChange: "opacity" }}
                         >
                              {/* Textul este adăugat prin DynamicGlitchText */}
                              <DynamicGlitchText />
                         </div>
                    ))}
               </div>
          </div>
     );
};
