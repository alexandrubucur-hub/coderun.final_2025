// components/ui/GlitchEffectsLayer.tsx
"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { StaticGlitchText } from "./StaticGlitchText";

// Tipuri actualizate - Am înlocuit row/col cu x/y pentru pozitionare precisă
type Glitch = {
     id: number;
     x: number; // Coordonata X în pixeli
     y: number; // Coordonata Y în pixeli
     disappearAt: number;
     opacity: number;
};
type VerticalGlitch = { id: number; slotIndex: number; disappearAt: number };

export const GlitchEffectsLayer: React.FC = () => {
     const [activeGlitches, setActiveGlitches] = useState<Glitch[]>([]);
     const [activeVerticalGlitches, setActiveVerticalGlitches] = useState<
          VerticalGlitch[]
     >([]);

     // Referință către container pentru a-i citi dimensiunile
     const containerRef = useRef<HTMLDivElement>(null);

     const animationFrameId = useRef<number | null>(null);
     const lastGlitchTime = useRef<number>(0);
     const lastVerticalGlitchTime = useRef<number>(0);

     // Constantele pentru configurarea animației
     const GRID_SIZE = 6;
     const MAX_GLITCHES = 4;
     const GLITCH_INTERVAL = 1200;
     const GLITCH_LIFESPAN_MIN = 2000;
     const GLITCH_LIFESPAN_MAX = 5000;

     const MAX_VERTICAL_GLITCHES = 3;
     const VERTICAL_GLITCH_INTERVAL = 1500;
     const VERTICAL_GLITCH_LIFESPAN_MIN = 3000;
     const VERTICAL_GLITCH_LIFESPAN_MAX = 5000;

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
               {
                    position: "top-[45%] left-[90%]",
                    style: "opacity-25 text-coderun-pink",
               },
               {
                    position: "top-[80%] left-[5%]",
                    style: "opacity-20 text-coderun-accent",
               },
          ],
          []
     );

     useEffect(() => {
          const animate = (timestamp: number) => {
               if (timestamp - lastGlitchTime.current > GLITCH_INTERVAL) {
                    lastGlitchTime.current = timestamp;

                    // Citim dimensiunile containerului direct în bucla de animație
                    const containerWidth =
                         containerRef.current?.offsetWidth ?? 0;
                    const containerHeight =
                         containerRef.current?.offsetHeight ?? 0;

                    setActiveGlitches((currentGlitches) => {
                         const freshGlitches = currentGlitches.filter(
                              (g) => g.disappearAt > timestamp
                         );
                         if (freshGlitches.length >= MAX_GLITCHES)
                              return freshGlitches;

                         const randomRow = Math.floor(
                              Math.random() * GRID_SIZE
                         );
                         const randomCol = Math.floor(
                              Math.random() * GRID_SIZE
                         );

                         const newGlitch: Glitch = {
                              id: timestamp + Math.random(),
                              // Calculăm pozitia în pixeli pentru a o folosi cu `transform`
                              x: randomCol * (containerWidth / GRID_SIZE),
                              y: randomRow * (containerHeight / GRID_SIZE),
                              disappearAt:
                                   timestamp +
                                   GLITCH_LIFESPAN_MIN +
                                   Math.random() *
                                        (GLITCH_LIFESPAN_MAX -
                                             GLITCH_LIFESPAN_MIN),
                              opacity: Math.random() * 0.4 + 0.2,
                         };
                         return [...freshGlitches, newGlitch];
                    });
               }

               if (
                    timestamp - lastVerticalGlitchTime.current >
                    VERTICAL_GLITCH_INTERVAL
               ) {
                    lastVerticalGlitchTime.current = timestamp;
                    setActiveVerticalGlitches((current) => {
                         const freshGlitches = current.filter(
                              (g) => g.disappearAt > timestamp
                         );
                         if (freshGlitches.length >= MAX_VERTICAL_GLITCHES)
                              return freshGlitches;

                         const availableSlots = verticalGlitchSlots
                              .map((_, index) => index)
                              .filter(
                                   (index) =>
                                        !freshGlitches.some(
                                             (g) => g.slotIndex === index
                                        )
                              );

                         if (availableSlots.length === 0) return freshGlitches;

                         const randomSlotIndex =
                              availableSlots[
                                   Math.floor(
                                        Math.random() * availableSlots.length
                                   )
                              ];
                         const newGlitch: VerticalGlitch = {
                              id: timestamp + Math.random(),
                              slotIndex: randomSlotIndex,
                              disappearAt:
                                   timestamp +
                                   VERTICAL_GLITCH_LIFESPAN_MIN +
                                   Math.random() *
                                        (VERTICAL_GLITCH_LIFESPAN_MAX -
                                             VERTICAL_GLITCH_LIFESPAN_MIN),
                         };
                         return [...freshGlitches, newGlitch];
                    });
               }

               animationFrameId.current = requestAnimationFrame(animate);
          };

          animationFrameId.current = requestAnimationFrame(animate);

          return () => {
               if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
               }
          };
     }, [verticalGlitchSlots]);

     return (
          <div
               ref={containerRef}
               className="absolute inset-0 z-10 pointer-events-none text-glitch will-change-transform"
          >
               <StaticGlitchText />

               {/* Containerul pentru glitch-uri dinamice. Am eliminat grid-ul de aici. */}
               <div className="absolute inset-0">
                    {activeGlitches.map((glitch) => (
                         <DynamicGlitchText
                              key={glitch.id}
                              className="absolute flex items-center justify-center text-center text-coderun-pink font-mono text-xs p-2 animate-pulse"
                              style={{
                                   // Folosim transform pentru a muta elementul, cea mai performantă metodă
                                   transform: `translate(${glitch.x}px, ${glitch.y}px)`,
                                   opacity: glitch.opacity,
                                   willChange: "transform, opacity", // Hint suplimentar pentru browser
                              }}
                         />
                    ))}
                    {activeVerticalGlitches.map((glitch) => {
                         const slot = verticalGlitchSlots[glitch.slotIndex];
                         return (
                              <DynamicGlitchText
                                   key={glitch.id}
                                   className={`absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest ${slot.position} ${slot.style}`}
                                   style={{ willChange: "opacity" }} // Adăugăm will-change și aici
                              />
                         );
                    })}
               </div>
          </div>
     );
};
