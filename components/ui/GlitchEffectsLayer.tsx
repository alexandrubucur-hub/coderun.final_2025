"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { StaticGlitchText } from "./StaticGlitchText";

// --- Setări de performanță ---
const POOL_SIZE = 5; // Număr fix de glitch-uri orizontale
const VERTICAL_POOL_SIZE = 3; // Număr fix de glitch-uri verticale
const GLITCH_INTERVAL = 2000; // Mai rar
const GLITCH_LIFESPAN = 3000;
const VERTICAL_GLITCH_INTERVAL = 3000; // Mai rar
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
     const animationFrameId = useRef<number | null>(null);

     // --- Pool-ul de elemente ---
     const glitchPoolRef = useRef<Glitch[]>([]);
     const verticalGlitchPoolRef = useRef<VerticalGlitch[]>([]);

     // --- Referințe directe la elementele DOM ---
     // Acestea vor fi populate de array-ul de 'ref' din JSX
     const glitchElsRef = useRef<(HTMLDivElement | null)[]>([]);
     const verticalGlitchElsRef = useRef<(HTMLDivElement | null)[]>([]);

     const lastGlitchTime = useRef<number>(0);
     const lastVerticalGlitchTime = useRef<number>(0);

     const verticalGlitchSlots = useMemo(
          () => [
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

     // Inițializăm pool-ul o singură dată
     useEffect(() => {
          // Asigurăm că array-urile au lungimea corectă înainte de a le mapa
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

     useEffect(() => {
          if (!isInView) {
               if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
               }
               // Ascundem totul când nu e vizibil
               glitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
               });
               verticalGlitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
               });
               return;
          }

          const animate = (timestamp: number) => {
               if (!animationFrameId.current) return; // Oprit între timp

               const containerWidth = containerRef.current?.offsetWidth ?? 0;
               const containerHeight = containerRef.current?.offsetHeight ?? 0;

               // --- Gestionează Glitch-urile Orizontale ---
               glitchPoolRef.current.forEach((glitch) => {
                    if (timestamp > glitch.disappearAt) {
                         if (glitch.el) glitch.el.style.opacity = "0";
                    }
               });

               if (timestamp - lastGlitchTime.current > GLITCH_INTERVAL) {
                    lastGlitchTime.current = timestamp;
                    const availableGlitch = glitchPoolRef.current.find(
                         (g) => timestamp > g.disappearAt
                    );

                    if (
                         availableGlitch &&
                         availableGlitch.el &&
                         containerWidth > 0
                    ) {
                         const x = Math.random() * containerWidth * 0.8; // 80% din lățime
                         const y = Math.random() * containerHeight * 0.8; // 80% din înălțime
                         const opacity = Math.random() * 0.4 + 0.2;

                         availableGlitch.el.style.transform = `translate(${x}px, ${y}px)`;
                         availableGlitch.el.style.opacity = opacity.toString();
                         availableGlitch.disappearAt =
                              timestamp + GLITCH_LIFESPAN;
                    }
               }

               // --- Gestionează Glitch-urile Verticale ---
               verticalGlitchPoolRef.current.forEach((glitch) => {
                    if (timestamp > glitch.disappearAt) {
                         if (glitch.el) glitch.el.style.opacity = "0";
                    }
               });

               if (
                    timestamp - lastVerticalGlitchTime.current >
                    VERTICAL_GLITCH_INTERVAL
               ) {
                    lastVerticalGlitchTime.current = timestamp;
                    const availableGlitch = verticalGlitchPoolRef.current.find(
                         (g) => timestamp > g.disappearAt
                    );

                    if (availableGlitch && availableGlitch.el) {
                         // Asociază un slot random de fiecare dată
                         const slot =
                              verticalGlitchSlots[
                                   Math.floor(
                                        Math.random() *
                                             verticalGlitchSlots.length
                                   )
                              ];
                         availableGlitch.el.className = `absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest ${slot.position} ${slot.style}`;
                         // Opacitatea este deja în 'slot.style', dar o forțăm pentru tranziție
                         availableGlitch.el.style.opacity = "1";
                         availableGlitch.disappearAt =
                              timestamp + VERTICAL_GLITCH_LIFESPAN;
                    }
               }

               animationFrameId.current = requestAnimationFrame(animate);
          };

          if (isInView && !animationFrameId.current) {
               animationFrameId.current = requestAnimationFrame(animate);
          }

          return () => {
               if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                    animationFrameId.current = null;
               }
          };
     }, [isInView, verticalGlitchSlots]);

     return (
          <div
               ref={containerRef}
               className="absolute inset-0 z-10 pointer-events-none text-glitch will-change-transform"
          >
               <StaticGlitchText />

               {/* Containerul pentru glitch-uri dinamice. FĂRĂ 'useState' */}
               <div className="absolute inset-0">
                    {/* Pool-ul Orizontal */}
                    {Array.from({ length: POOL_SIZE }).map((_, i) => (
                         <div
                              key={i}
                              // --- CORECȚIE AICI ---
                              ref={(el) => {
                                   glitchElsRef.current[i] = el;
                              }}
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
                              // --- CORECȚIE AICI ---
                              ref={(el) => {
                                   verticalGlitchElsRef.current[i] = el;
                              }}
                              className="absolute transition-opacity duration-500" // className va fi suprascris
                              style={{ opacity: 0, willChange: "opacity" }}
                         >
                              {/* Vom randa textul în bucla 'animate' prin schimbarea 'className' */}
                              <DynamicGlitchText />
                         </div>
                    ))}
               </div>
          </div>
     );
};
