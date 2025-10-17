// components/ui/GlitchEffectsLayer.tsx
"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { StaticGlitchText } from "./StaticGlitchText"; // Importăm componenta memoizată

// Tipuri actualizate
type Glitch = {
     id: number;
     row: number;
     col: number;
     disappearAt: number;
     opacity: number;
};
type VerticalGlitch = { id: number; slotIndex: number; disappearAt: number };

export const GlitchEffectsLayer: React.FC = () => {
     const [activeGlitches, setActiveGlitches] = useState<Glitch[]>([]);
     const [activeVerticalGlitches, setActiveVerticalGlitches] = useState<
          VerticalGlitch[]
     >([]);
     const animationFrameId = useRef<number | null>(null);
     const lastGlitchTime = useRef<number>(0);
     const lastVerticalGlitchTime = useRef<number>(0);

     // Constantele pentru configurarea animației
     const GRID_SIZE = 6;
     const MAX_GLITCHES = 4; // Redus de la 8
     const GLITCH_INTERVAL = 1200; // Mărit de la 700
     const GLITCH_LIFESPAN_MIN = 2000;
     const GLITCH_LIFESPAN_MAX = 5000;

     const MAX_VERTICAL_GLITCHES = 3; // Redus de la 7
     const VERTICAL_GLITCH_INTERVAL = 1500; // Mărit de la 1000
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
               // Gestionează glitch-urile orizontale (cu opacitate pre-calculată)
               if (timestamp - lastGlitchTime.current > GLITCH_INTERVAL) {
                    lastGlitchTime.current = timestamp;
                    setActiveGlitches((currentGlitches) => {
                         const freshGlitches = currentGlitches.filter(
                              (g) => g.disappearAt > timestamp
                         );
                         if (freshGlitches.length >= MAX_GLITCHES)
                              return freshGlitches;

                         let randomRow: number, randomCol: number;
                         let isOccupied = true;
                         let attempts = 0;
                         do {
                              randomRow =
                                   Math.floor(Math.random() * GRID_SIZE) + 1;
                              randomCol =
                                   Math.floor(Math.random() * GRID_SIZE) + 1;
                              isOccupied = freshGlitches.some(
                                   (g) =>
                                        g.row === randomRow &&
                                        g.col === randomCol
                              );
                              attempts++;
                         } while (isOccupied && attempts < 20);

                         if (!isOccupied) {
                              const newGlitch: Glitch = {
                                   id: timestamp + Math.random(),
                                   row: randomRow,
                                   col: randomCol,
                                   disappearAt:
                                        timestamp +
                                        GLITCH_LIFESPAN_MIN +
                                        Math.random() *
                                             (GLITCH_LIFESPAN_MAX -
                                                  GLITCH_LIFESPAN_MIN),
                                   opacity: Math.random() * 0.4 + 0.2,
                              };
                              return [...freshGlitches, newGlitch];
                         }
                         return freshGlitches;
                    });
               }

               // Gestionează glitch-urile verticale
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
          <div className="absolute inset-0 z-10 pointer-events-none text-glitch">
               <StaticGlitchText />
               <div
                    className="absolute inset-0 grid"
                    style={{
                         gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                         gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                    }}
               >
                    {activeGlitches.map((glitch) => (
                         <DynamicGlitchText
                              key={glitch.id}
                              className="flex items-center justify-center text-center text-coderun-pink font-mono text-xs p-2 animate-pulse"
                              style={{
                                   gridRow: glitch.row,
                                   gridColumn: glitch.col,
                                   opacity: glitch.opacity,
                              }}
                         />
                    ))}
                    {activeVerticalGlitches.map((glitch) => {
                         const slot = verticalGlitchSlots[glitch.slotIndex];
                         return (
                              <DynamicGlitchText
                                   key={glitch.id}
                                   className={`absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest ${slot.position} ${slot.style}`}
                              />
                         );
                    })}
               </div>
          </div>
     );
};
