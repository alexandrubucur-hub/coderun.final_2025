// components/ui/PlexusBackground.tsx

"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// --- Constante de configurare pentru design și performanță ---
const BASE_PARTICLE_COUNT = 80;
const MAX_LINK_DISTANCE = 160;
const MOUSE_INTERACTION_RADIUS = 200;
const PARTICLE_BASE_SPEED = 0.4;
const MIN_PARTICLE_COUNT = 25; // MODIFICARE: Număr minim pentru mobil

// Paleta de culori pentru consistență
const PARTICLE_COLOR = "rgba(250, 88, 182, 0.9)"; // Coderun Pink
const LINK_COLOR = "rgba(122, 11, 192, 0.7)"; // Coderun Purple
const MOUSE_HIGHLIGHT_COLOR = "rgba(0, 204, 255, 1)"; // Accent electric blue

type Particle = {
     x: number;
     y: number;
     speedX: number;
     speedY: number;
     history: { x: number; y: number }[];
};

// --- MODIFICARE: Adăugăm interfața pentru props ---
interface PlexusBackgroundProps {
     isInView: boolean;
}

const PlexusBackground: React.FC<PlexusBackgroundProps> = ({ isInView }) => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const particlesRef = useRef<Particle[]>([]);
     const mouseRef = useRef<{ x?: number; y?: number }>({
          x: undefined,
          y: undefined,
     });

     const initializeParticles = useCallback(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          // --- MODIFICARE: Fix pentru "0-height" ---
          // Dacă elementul nu s-a randat corect, reîncercăm
          if (width === 0 || height === 0) {
               console.warn("Canvas size 0, retrying init...");
               setTimeout(initializeParticles, 50);
               return;
          }

          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;

          const ctx = canvas.getContext("2d");
          if (ctx) {
               ctx.scale(dpr, dpr);
          }

          // --- MODIFICARE: Logică nouă pentru numărul de particule ---
          const calculatedParticles = Math.floor(
               ((width * height) / (1920 * 1080)) * BASE_PARTICLE_COUNT
          );
          const particleCount = Math.max(
               MIN_PARTICLE_COUNT,
               calculatedParticles
          );
          // --- SFÂRȘIT MODIFICARE ---

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
     }, []); // Dependințe goale, funcția e stabilă

     // --- MODIFICARE: Logica principală pentru pornire și resize ---
     useEffect(() => {
          // Timer-ul pentru debounce-ul la resize
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
               // Așteptăm să se termine redimensionarea
               resizeTimeout = setTimeout(initializeParticles, 250);
          };

          // --- Logica de pornire ---
          if (isInView) {
               // Adăugăm ascultătorii de evenimente
               window.addEventListener("mousemove", handleMouseMove);
               window.addEventListener("mouseleave", handleMouseLeave);
               window.addEventListener("resize", handleResize);

               // Așteptăm 50ms pentru ca layout-ul (min-h-screen) să se stabilizeze
               const initTimeout = setTimeout(initializeParticles, 50);

               // --- Funcția de curățare ---
               return () => {
                    // Oprim ascultătorii când ieșim din view
                    window.removeEventListener("mousemove", handleMouseMove);
                    window.removeEventListener("mouseleave", handleMouseLeave);
                    window.removeEventListener("resize", handleResize);

                    // Curățăm orice timere
                    if (resizeTimeout) {
                         clearTimeout(resizeTimeout);
                    }
                    clearTimeout(initTimeout);
               };
          }
     }, [isInView, initializeParticles]); // Se re-rulează doar când isInView se schimbă
     // --- SFÂRȘIT MODIFICARE ---

     useAnimationFrame(() => {
          // --- MODIFICARE: Oprim animația dacă nu e vizibilă ---
          if (!isInView) {
               // Curățăm canvas-ul o singură dată la ieșire
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
          // --- SFÂRȘIT MODIFICARE ---

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
                    // --- MODIFICARE: Controlăm animația ---
                    animate={
                         isInView
                              ? {
                                     x: [0, 100, 50, -50, 0],
                                     y: [0, -50, 100, 50, 0],
                                     scale: [1, 1.1, 1, 0.9, 1],
                                     rotate: [0, 15, -10, 10, 0],
                                }
                              : {} // Oprim animația
                    }
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
                    // --- MODIFICARE: Controlăm animația ---
                    animate={
                         isInView
                              ? {
                                     x: [0, -80, 20, 40, 0],
                                     y: [0, 60, -100, -30, 0],
                                     scale: [1, 0.9, 1.15, 1, 1],
                                     rotate: [0, -10, 20, -5, 0],
                                }
                              : {} // Oprim animația
                    }
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
                    // --- MODIFICARE: Controlăm animația ---
                    animate={
                         isInView
                              ? {
                                     x: [0, 50, -100, 20, 0],
                                     y: [0, -100, 30, -50, 0],
                                     scale: [1, 1.05, 0.9, 1.1, 1],
                                     rotate: [0, 20, -5, 15, 0],
                                }
                              : {} // Oprim animația
                    }
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
                    // --- MODIFICARE: Controlăm animația ---
                    animate={
                         isInView
                              ? {
                                     x: [0, -40, 60, -20, 0],
                                     y: [0, 30, -80, 50, 0],
                                     scale: [1, 0.95, 1.1, 0.9, 1],
                                }
                              : {} // Oprim animația
                    }
                    transition={{
                         duration: 50,
                         ease: "easeInOut",
                         repeat: Infinity,
                         repeatType: "mirror",
                    }}
               />

               {/* Canvas-ul cu particule rămâne deasupra petelor de culoare */}
               <canvas
                    ref={canvasRef}
                    className="relative top-0 left-0 w-full h-full z-10 will-change-transform"
               />
          </div>
     );
};

export default PlexusBackground;
