// components/ui/PlexusBackground.tsx
"use client";

// --- MODIFICARE: Importăm useState și useEffect ---
import React, { useRef, useEffect, useCallback, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";

const BASE_PARTICLE_COUNT = 80;
const MAX_LINK_DISTANCE = 160;
const MOUSE_INTERACTION_RADIUS = 200;
const PARTICLE_BASE_SPEED = 0.4;
const MIN_PARTICLE_COUNT = 40;

const PARTICLE_COLOR = "rgba(250, 88, 182, 0.9)";
const LINK_COLOR = "rgba(122, 11, 192, 0.7)";
const MOUSE_HIGHLIGHT_COLOR = "rgba(0, 204, 255, 1)";

type Particle = {
     x: number;
     y: number;
     speedX: number;
     speedY: number;
     history: { x: number; y: number }[];
};

interface PlexusBackgroundProps {
     isInView: boolean;
     // --- MODIFICARE: Prop nou care semnalează sfârșitul animațiilor de conținut ---
     startAnimatedBg: boolean;
}

const PlexusBackground: React.FC<PlexusBackgroundProps> = ({
     isInView,
     startAnimatedBg, // --- MODIFICARE: Primim noul prop ---
}) => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const particlesRef = useRef<Particle[]>([]);
     const mouseRef = useRef<{ x?: number; y?: number }>({
          x: undefined,
          y: undefined,
     });

     // --- MODIFICARE: Stare unică pentru a controla toate animațiile de fundal ---
     const [runAnimation, setRunAnimation] = useState(false);

     // --- MODIFICARE: Efectul pornește DOAR când ambele condiții sunt îndeplinite ---
     useEffect(() => {
          setRunAnimation(isInView && startAnimatedBg);
     }, [isInView, startAnimatedBg]);

     const initializeParticles = useCallback(() => {
          // --- MODIFICARE: Verifică 'runAnimation' ---
          if (!runAnimation) {
               particlesRef.current = []; // Curăță particulele
               return;
          }

          const canvas = canvasRef.current;
          if (!canvas) return;

          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          if (width === 0 || height === 0) {
               console.warn("Canvas size 0, retrying init...");
               setTimeout(initializeParticles, 50);
               return;
          }

          // ... (restul logicii de inițializare) ...
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;

          const ctx = canvas.getContext("2d");
          if (ctx) {
               ctx.scale(dpr, dpr);
          }

          const calculatedParticles = Math.floor(
               ((width * height) / (1920 * 1080)) * BASE_PARTICLE_COUNT
          );
          const particleCount = Math.max(
               MIN_PARTICLE_COUNT,
               calculatedParticles
          );

          const tempParticles: Particle[] = [];
          for (let i = 0; i < particleCount; i++) {
               tempParticles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    speedX:
                         Math.random() * PARTICLE_BASE_SPEED -
                         PARTICLE_BASE_SPEED / 2,
                    speedY:
                         Math.random() * PARTICLE_BASE_SPEED -
                         PARTICLE_BASE_SPEED / 2,
                    history: [
                         {
                              x: Math.random() * width,
                              y: Math.random() * height,
                         },
                    ],
               });
          }
          particlesRef.current = tempParticles;
          // --- MODIFICARE: Depinde de 'runAnimation' ---
     }, [runAnimation]);

     useEffect(() => {
          let resizeTimeout: NodeJS.Timeout | null = null;

          const handleMouseMove = (event: MouseEvent) => {
               mouseRef.current = { x: event.clientX, y: event.clientY };
          };
          const handleMouseLeave = () => {
               mouseRef.current = { x: undefined, y: undefined };
          };

          const handleResize = () => {
               if (resizeTimeout) {
                    clearTimeout(resizeTimeout);
               }
               // --- MODIFICARE: Curăță canvas-ul la resize ---
               const canvas = canvasRef.current;
               if (canvas) {
                    const ctx = canvas.getContext("2d");
                    if (ctx)
                         ctx.clearRect(
                              0,
                              0,
                              canvas.clientWidth,
                              canvas.clientHeight
                         );
               }
               particlesRef.current = []; // Golește particulele
               resizeTimeout = setTimeout(initializeParticles, 250);
          };

          // --- MODIFICARE: Rulează listenerii doar dacă animația e activă ---
          if (runAnimation) {
               window.addEventListener("mousemove", handleMouseMove);
               window.addEventListener("mouseleave", handleMouseLeave);
               window.addEventListener("resize", handleResize);

               const initTimeout = setTimeout(initializeParticles, 50);

               return () => {
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mouseleave", handleMouseLeave);
                    window.removeEventListener("resize", handleResize);

                    if (resizeTimeout) {
                         clearTimeout(resizeTimeout);
                    }
                    clearTimeout(initTimeout);
               };
          }
          // --- MODIFICARE: Depinde de 'runAnimation' ---
     }, [runAnimation, initializeParticles]);

     useAnimationFrame(() => {
          // --- MODIFICARE: Rulează frame-ul doar dacă animația e activă ---
          if (!runAnimation) {
               const canvas = canvasRef.current;
               if (canvas) {
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                         ctx.clearRect(
                              0,
                              0,
                              canvas.clientWidth,
                              canvas.clientHeight
                         );
                    }
               }
               return;
          }

          // ... (restul logicii de desenare useAnimationFrame) ...
          const particles = particlesRef.current;
          const canvas = canvasRef.current;
          const mouse = mouseRef.current;
          if (!canvas || particles.length === 0) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

          particles.forEach((p) => {
               p.x += p.speedX;
               p.y += p.speedY;

               if (p.x < 0 || p.x > canvas.clientWidth) p.speedX *= -1;
               if (p.y < 0 || p.y > canvas.clientHeight) p.speedY *= -1;

               p.history.push({ x: p.x, y: p.y });
               if (p.history.length > 5) {
                    p.history.shift();
               }

               ctx.beginPath();
               ctx.moveTo(p.history[0].x, p.history[0].y);
               for (let i = 1; i < p.history.length; i++) {
                    ctx.lineTo(p.history[i].x, p.history[i].y);
               }
               ctx.strokeStyle = `${PARTICLE_COLOR.slice(0, -2)}0.3)`;
               ctx.lineWidth = 2;
               ctx.stroke();

               ctx.beginPath();
               ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
               ctx.fillStyle = PARTICLE_COLOR;
               ctx.fill();

               let isNearMouse = false;
               if (mouse.x !== undefined && mouse.y !== undefined) {
                    const dxMouse = p.x - mouse.x;
                    const dyMouse = p.y - mouse.y;
                    if (
                         Math.sqrt(dxMouse ** 2 + dyMouse ** 2) <
                         MOUSE_INTERACTION_RADIUS
                    ) {
                         isNearMouse = true;
                    }
               }

               particles.forEach((other) => {
                    if (p === other) return;
                    const dx = p.x - other.x;
                    const dy = p.y - other.y;
                    const distance = Math.sqrt(dx ** 2 + dy ** 2);

                    if (distance < MAX_LINK_DISTANCE) {
                         ctx.beginPath();
                         ctx.moveTo(p.x, p.y);
                         ctx.lineTo(other.x, other.y);
                         const opacity = 1 - distance / MAX_LINK_DISTANCE;

                         if (isNearMouse) {
                              ctx.strokeStyle = `rgba(0, 204, 255, ${
                                   opacity * 0.8
                              })`;
                              ctx.lineWidth = 1;
                         } else {
                              ctx.strokeStyle = `rgba(122, 11, 192, ${
                                   opacity * 0.5
                              })`;
                              ctx.lineWidth = 0.5;
                         }
                         ctx.stroke();
                    }
               });
          });
     });

     return (
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
               {/* --- MODIFICARE: Randează totul doar dacă 'runAnimation' e true --- */}
               {runAnimation && (
                    <>
                         {/* Pata 1 (Roz Principal) */}
                         <motion.div
                              className="absolute z-0 will-change-transform"
                              style={{
                                   width: "35rem",
                                   height: "35rem",
                                   top: "50%",
                                   left: "15%",
                                   backgroundColor: "rgba(236, 72, 153, 0.3)",
                                   borderRadius: "50%",
                                   filter: "blur(130px)",
                              }}
                              // --- MODIFICARE: Simplifică 'animate' ---
                              animate={{
                                   x: [0, 100, 50, -50, 0],
                                   y: [0, -50, 100, 50, 0],
                                   scale: [1, 1.1, 1, 0.9, 1],
                                   rotate: [0, 15, -10, 10, 0],
                              }}
                              transition={{
                                   duration: 40,
                                   ease: "easeInOut",
                                   repeat: Infinity,
                                   repeatType: "mirror",
                              }}
                         />

                         {/* Pata 2 (Mov Principal) */}
                         <motion.div
                              className="absolute z-0 will-change-transform"
                              style={{
                                   width: "30rem",
                                   height: "30rem",
                                   top: "15%",
                                   left: "65%",
                                   backgroundColor: "rgba(122, 11, 192, 0.3)",
                                   borderRadius: "50%",
                                   filter: "blur(120px)",
                              }}
                              animate={{
                                   x: [0, -80, 20, 40, 0],
                                   y: [0, 60, -100, -30, 0],
                                   scale: [1, 0.9, 1.15, 1, 1],
                                   rotate: [0, -10, 20, -5, 0],
                              }}
                              transition={{
                                   duration: 35,
                                   ease: "easeInOut",
                                   repeat: Infinity,
                                   repeatType: "mirror",
                              }}
                         />

                         {/* Pata 3 (Albastru Electric)*/}
                         <motion.div
                              className="absolute z-0 will-change-transform"
                              style={{
                                   width: "28rem",
                                   height: "28rem",
                                   top: "20%",
                                   left: "5%",
                                   backgroundColor: "rgba(0, 204, 255, 0.2)",
                                   borderRadius: "50%",
                                   filter: "blur(130px)",
                              }}
                              animate={{
                                   x: [0, 50, -100, 20, 0],
                                   y: [0, -100, 30, -50, 0],
                                   scale: [1, 1.05, 0.9, 1.1, 1],
                                   rotate: [0, 20, -5, 15, 0],
                              }}
                              transition={{
                                   duration: 45,
                                   ease: "easeInOut",
                                   repeat: Infinity,
                                   repeatType: "mirror",
                              }}
                         />

                         {/* Pata 4 (Roz Secundar) */}
                         <motion.div
                              className="absolute z-0 will-change-transform"
                              style={{
                                   width: "20rem",
                                   height: "20rem",
                                   top: "70%",
                                   left: "70%",
                                   backgroundColor: "rgba(236, 72, 153, 0.2)",
                                   borderRadius: "50%",
                                   filter: "blur(110px)",
                              }}
                              animate={{
                                   x: [0, -40, 60, -20, 0],
                                   y: [0, 30, -80, 50, 0],
                                   scale: [1, 0.95, 1.1, 0.9, 1],
                              }}
                              transition={{
                                   duration: 50,
                                   ease: "easeInOut",
                                   repeat: Infinity,
                                   repeatType: "mirror",
                              }}
                         />

                         {/* Canvas-ul cu particule */}
                         <canvas
                              ref={canvasRef}
                              className="relative top-0 left-0 w-full h-full z-10 will-change-transform"
                         />
                    </>
               )}
          </div>
     );
};

export default PlexusBackground;
