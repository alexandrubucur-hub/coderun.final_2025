"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { StaticGlitchText } from "./StaticGlitchText";

const POOL_SIZE = 5;
const VERTICAL_POOL_SIZE = 3;
const GLITCH_INTERVAL = 2000;
const GLITCH_LIFESPAN = 3000;
const VERTICAL_GLITCH_INTERVAL = 3000;
const VERTICAL_GLITCH_LIFESPAN = 4000;

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

     const glitchPoolRef = useRef<Glitch[]>([]);
     const verticalGlitchPoolRef = useRef<VerticalGlitch[]>([]);

     const glitchElsRef = useRef<(HTMLDivElement | null)[]>([]);
     const verticalGlitchElsRef = useRef<(HTMLDivElement | null)[]>([]);

     const horizontalTimerRef = useRef<NodeJS.Timeout | null>(null);
     const verticalTimerRef = useRef<NodeJS.Timeout | null>(null);

     const hideTimersRef = useRef<NodeJS.Timeout[]>([]);

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

     useEffect(() => {
          const hideElement = (glitch: Glitch | VerticalGlitch) => {
               if (glitch.el) {
                    glitch.el.style.opacity = "0";
               }
               glitch.disappearAt = 0;
          };

          const spawnHorizontalGlitch = () => {
               if (!containerRef.current) return;

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

                         const hideTimer = setTimeout(
                              () => hideElement(availableGlitch),
                              GLITCH_LIFESPAN
                         );
                         hideTimersRef.current.push(hideTimer);
                    }
               }

               horizontalTimerRef.current = setTimeout(
                    spawnHorizontalGlitch,
                    GLITCH_INTERVAL
               );
          };

          const spawnVerticalGlitch = () => {
               if (!containerRef.current) return;

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
                    availableGlitch.el.className = `absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest transition-opacity duration-1000 ${slot.position} ${slot.style}`;
                    availableGlitch.el.style.opacity = "1";
                    availableGlitch.disappearAt =
                         now + VERTICAL_GLITCH_LIFESPAN;

                    const hideTimer = setTimeout(
                         () => hideElement(availableGlitch),
                         VERTICAL_GLITCH_LIFESPAN
                    );
                    hideTimersRef.current.push(hideTimer);
               }

               verticalTimerRef.current = setTimeout(
                    spawnVerticalGlitch,
                    VERTICAL_GLITCH_INTERVAL
               );
          };

          if (isInView) {
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

          return () => {
               if (horizontalTimerRef.current) {
                    clearTimeout(horizontalTimerRef.current);
                    horizontalTimerRef.current = null;
               }
               if (verticalTimerRef.current) {
                    clearTimeout(verticalTimerRef.current);
                    verticalTimerRef.current = null;
               }

               hideTimersRef.current.forEach(clearTimeout);
               hideTimersRef.current = [];

               glitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
                    g.disappearAt = 0;
               });
               verticalGlitchPoolRef.current.forEach((g) => {
                    if (g.el) g.el.style.opacity = "0";
                    g.disappearAt = 0;
               });
          };
     }, [isInView, verticalGlitchSlots]);

     return (
          <div
               ref={containerRef}
               className="absolute inset-0 z-10 pointer-events-none text-glitch will-change-transform transition-opacity duration-500"
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
