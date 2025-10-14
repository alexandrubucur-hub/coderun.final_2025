"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, useAnimationFrame } from "framer-motion";

// --- Constante de configurare pentru design și performanță ---
const BASE_PARTICLE_COUNT = 80;
const MAX_LINK_DISTANCE = 160;
const MOUSE_INTERACTION_RADIUS = 200;
const PARTICLE_BASE_SPEED = 0.4;

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

const PlexusBackground: React.FC = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const particlesRef = useRef<Particle[]>([]);
     const mouseRef = useRef<{ x?: number; y?: number }>({
          x: undefined,
          y: undefined,
     });

     // --- Funcția de inițializare a particulelor, adaptabilă la dimensiunea ecranului ---
     const initializeParticles = useCallback(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const width = canvas.clientWidth;
          const height = canvas.clientHeight;

          // Setăm rezoluția canvas-ului ținând cont de densitatea pixelilor ecranului (DPI)
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;

          const ctx = canvas.getContext("2d");
          if (ctx) {
               // Scalăm contextul pentru a putea desena folosind aceleași coordonate ca înainte
               ctx.scale(dpr, dpr);
          }

          // Ajustăm numărul de particule în funcție de suprafața ecranului
          const particleCount = Math.floor(
               ((width * height) / (1920 * 1080)) * BASE_PARTICLE_COUNT
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
     }, []);

     // --- Gestionarea evenimentelor (mouse, resize) ---
     useEffect(() => {
          initializeParticles();
          const handleMouseMove = (event: MouseEvent) => {
               mouseRef.current = { x: event.clientX, y: event.clientY };
          };
          const handleMouseLeave = () => {
               mouseRef.current = { x: undefined, y: undefined };
          };
          let resizeTimeout: NodeJS.Timeout;
          const handleResize = () => {
               clearTimeout(resizeTimeout);
               resizeTimeout = setTimeout(initializeParticles, 250);
          };

          window.addEventListener("mousemove", handleMouseMove);
          window.addEventListener("mouseleave", handleMouseLeave);
          window.addEventListener("resize", handleResize);

          return () => {
               window.removeEventListener("mousemove", handleMouseMove);
               window.removeEventListener("mouseleave", handleMouseLeave);
               window.removeEventListener("resize", handleResize);
               clearTimeout(resizeTimeout);
          };
     }, [initializeParticles]);

     // --- Bucla principală de animație și desenare ---
     useAnimationFrame(() => {
          const particles = particlesRef.current;
          const canvas = canvasRef.current;
          const mouse = mouseRef.current;
          if (!canvas || particles.length === 0) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          // Deoarece contextul este scalat, trebuie să curățăm canvas-ul folosind dimensiunile CSS
          ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

          particles.forEach((p) => {
               // Mișcarea particulei
               p.x += p.speedX;
               p.y += p.speedY;

               // Folosim dimensiunile CSS (clientWidth) pentru logica de coliziune
               if (p.x < 0 || p.x > canvas.clientWidth) p.speedX *= -1;
               if (p.y < 0 || p.y > canvas.clientHeight) p.speedY *= -1;

               // Actualizăm istoricul pentru coadă
               p.history.push({ x: p.x, y: p.y });
               if (p.history.length > 5) {
                    p.history.shift();
               }

               // Desenăm coada
               ctx.beginPath();
               ctx.moveTo(p.history[0].x, p.history[0].y);
               for (let i = 1; i < p.history.length; i++) {
                    ctx.lineTo(p.history[i].x, p.history[i].y);
               }
               ctx.strokeStyle = `${PARTICLE_COLOR.slice(0, -2)}0.3)`;
               ctx.lineWidth = 2;
               ctx.stroke();

               // Desenăm particula principală
               ctx.beginPath();
               ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
               ctx.fillStyle = PARTICLE_COLOR;
               ctx.fill();

               // Desenăm legăturile și gestionăm interacțiunea cu mouse-ul
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
          // Păstrăm overflow-hidden pentru a "tăia" marginile blurate care depășesc containerul
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
               {/* --- FUNDAL ÎMBUNĂTĂȚIT: 4 pete de culoare cu animații distincte --- */}

               {/* Pata 1 (Roz Principal) - Mai mare și mai intensă */}
               <motion.div
                    className="absolute z-0"
                    style={{
                         width: "35rem",
                         height: "35rem",
                         top: "50%",
                         left: "15%",
                         backgroundColor: "rgba(236, 72, 153, 0.3)",
                         borderRadius: "50%",
                         filter: "blur(130px)",
                    }}
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

               {/* Pata 2 (Mov Principal) - De asemenea, mai prezentă */}
               <motion.div
                    className="absolute z-0"
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

               {/* Pata 3 (NOUĂ: Albastru Electric) - Adaugă un accent vibrant */}
               <motion.div
                    className="absolute z-0"
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

               {/* Pata 4 (NOUĂ: Roz Secundar) - Creează profunzime */}
               <motion.div
                    className="absolute z-0"
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

               {/* Canvas-ul cu particule rămâne deasupra petelor de culoare */}
               <canvas
                    ref={canvasRef}
                    className="relative top-0 left-0 w-full h-full z-10"
               />
          </div>
     );
};

export default PlexusBackground;
