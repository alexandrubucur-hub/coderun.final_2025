// app/components/home/Hero.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import { motion, Variants, useInView } from "framer-motion";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

const containerVariants: Variants = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.2,
          },
     },
};

const itemVariants: Variants = {
     hidden: { opacity: 0, y: 20 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

const HeroSection: React.FC = () => {
     const [isLogoVisible, setIsLogoVisible] = useState(false);
     const logoRef = React.useRef<HTMLDivElement | null>(null);

     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });

     const [contentAnimationComplete, setContentAnimationComplete] =
          useState(false);

     useEffect(() => {
          const observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach((entry) =>
                         setIsLogoVisible(entry.isIntersecting)
                    );
               },
               { threshold: 0.5 }
          );
          const node = logoRef.current;
          if (node) {
               observer.observe(node);
          }
          return () => {
               if (node) {
                    observer.unobserve(node);
               }
          };
     }, []);

     return (
          <section
               ref={sectionRef}
               id="home"
               className="relative min-h-screen w-full overflow-hidden bg-coderun-dark"
          >
               <CyberpunkBackground
                    isInView={isInView}
                    startAnimatedBg={contentAnimationComplete}
               >
                    {/* MODIFICARE: Padding-top redus pe ecrane mici (pt-10) și mărit înapoi pe sm: (sm:pt-16) */}
                    <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 lg:pt-8">
                         <motion.div
                              className="w-full max-w-7xl mx-auto"
                              variants={containerVariants}
                              initial="hidden"
                              animate="visible"
                              onAnimationComplete={() => {
                                   setContentAnimationComplete(true);
                              }}
                         >
                              {/* *
                               * Layout-ul pentru Desktop (lg:) - Neschimbat
                               *
                               */}
                              <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center lg:justify-items-center">
                                   <motion.div
                                        className="flex justify-center lg:justify-end"
                                        variants={itemVariants}
                                   >
                                        <div className="relative group will-change-transform">
                                             <Image
                                                  src="/images/code.png"
                                                  alt="Code"
                                                  width={400}
                                                  height={200}
                                                  className="w-auto h-56 xl:h-72 2xl:h-80 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-glow-pink"
                                             />
                                        </div>
                                   </motion.div>
                                   <motion.div
                                        className="flex justify-center"
                                        variants={itemVariants}
                                   >
                                        <div className="relative will-change-transform">
                                             <Image
                                                  src="/images/fatacr.webp"
                                                  alt="CodeRun Mascot"
                                                  width={700}
                                                  height={800}
                                                  className={`w-auto h-[450px] xl:h-[550px] 2xl:h-[650px] ${
                                                       isInView
                                                            ? "animate-glow-pulse"
                                                            : ""
                                                  }`}
                                                  style={{
                                                       willChange:
                                                            "filter, transform",
                                                  }}
                                             />
                                             <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/30 via-coderun-purple/20 to-transparent opacity-60 blur-2xl animate-pulse" />
                                             <div className="absolute -inset-8 bg-gradient-to-r from-coderun-accent/10 via-coderun-purple/10 to-coderun-pink/10 blur-3xl opacity-80" />
                                        </div>
                                   </motion.div>
                                   <motion.div
                                        className="flex justify-center lg:justify-start"
                                        variants={itemVariants}
                                   >
                                        <div className="relative group will-change-transform">
                                             <Image
                                                  src="/images/run.png"
                                                  alt="Run"
                                                  width={400}
                                                  height={200}
                                                  className="w-auto h-56 xl:h-72 2xl:h-80 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-glow-purple"
                                             />
                                        </div>
                                   </motion.div>
                              </div>

                              {/* *
                               * Layout-ul pentru Mobil (lg:hidden) - Aici sunt modificările
                               *
                               */}
                              {/* MODIFICARE: Padding-top redus (pt-4) și mărit înapoi pe sm: (sm:pt-8) */}
                              <div className="lg:hidden flex flex-col items-center justify-center pt-12 sm:pt-16">
                                   <motion.div
                                        className="flex justify-center"
                                        variants={itemVariants}
                                   >
                                        <div
                                             className="relative transition-transform duration-500 ease-out will-change-transform"
                                             style={{
                                                  transform: isLogoVisible
                                                       ? "scale(1.25)"
                                                       : "scale(1)",
                                             }}
                                        >
                                             {/* MODIFICARE: Înălțime redusă (h-64) și mărită înapoi pe sm: (sm:h-80) și md: (md:h-96) */}
                                             <Image
                                                  src="/images/fatacr.webp"
                                                  alt="CodeRun Mascot"
                                                  width={350}
                                                  height={490}
                                                  className={`w-auto h-64 sm:h-80 md:h-96 ${
                                                       isInView
                                                            ? "animate-glow-pulse"
                                                            : ""
                                                  }`}
                                             />
                                             <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/40 via-coderun-purple/20 to-transparent opacity-70 blur-xl animate-pulse" />
                                             <div className="absolute -inset-6 bg-gradient-to-r from-coderun-accent/15 via-coderun-purple/15 to-coderun-pink/15 blur-2xl opacity-90" />
                                        </div>
                                   </motion.div>
                                   <motion.div
                                        ref={logoRef}
                                        // MODIFICARE: Padding-top redus (pt-4) și mărit înapoi pe sm: (sm:pt-6)
                                        className="flex justify-center pt-4 sm:pt-6"
                                        variants={itemVariants}
                                   >
                                        <div className="relative group will-change-transform">
                                             {/* MODIFICARE: Înălțime redusă (h-32) și mărită înapoi pe sm: (sm:h-44) și md: (md:h-60) */}
                                             <Image
                                                  src="/images/logo.webp"
                                                  alt="CodeRun"
                                                  width={400}
                                                  height={160}
                                                  className="w-auto h-32 sm:h-44 md:h-60 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-glow-pink"
                                             />
                                        </div>
                                   </motion.div>
                              </div>

                              {/* *
                               * Conținutul Comun (Titlu, Buton, Logo-uri Sponsori)
                               *
                               */}
                              <motion.div
                                   // MODIFICARE: Margin-top redus (mt-8) și mărit înapoi pe sm: (sm:mt-12)
                                   className="flex justify-center mt-8 sm:mt-12 lg:mt-16"
                                   variants={itemVariants}
                              >
                                   {/* MODIFICARE: Spațiere verticală redusă (space-y-4) și mărită înapoi pe sm: (sm:space-y-6) */}
                                   <div className="text-center space-y-4 sm:space-y-6">
                                        {/* MODIFICARE: Dimensiune text redusă (text-2xl) și mărită înapoi pe sm: (sm:text-3xl) și md: (md:text-4xl) */}
                                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight break-words">
                                             <span
                                                  className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                                       isInView
                                                            ? "text-glow"
                                                            : ""
                                                  }`}
                                             >
                                                  JOIN THE CODERUNNERS
                                             </span>
                                        </h1>
                                        {/* MODIFICARE: Padding-top redus (pt-2) și mărit înapoi pe sm: (sm:pt-4) */}
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2 sm:pt-4 pb-2">
                                             <Link
                                                  href="#"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                             >
                                                  {/* MODIFICARE: Dimensiune text și padding/înălțime reduse și mărite înapoi pe sm:/md: */}
                                                  <GradientSlideButton
                                                       className="
                                                px-6 sm:px-8 md:px-12
                                                h-12 sm:h-14 md:h-16
                                                text-xl sm:text-2xl md:text-4xl
                                                rounded-3xl bg-black text-white border-2 border-coderun-accent text-glitch hover:scale-110 hover:shadow-lg hover:shadow-coderun-pink/30 active:scale-95 will-change-transform
                                            "
                                                       colorFrom="#FA58B6"
                                                       colorTo="#7A0BC0"
                                                  >
                                                       Register Now
                                                  </GradientSlideButton>
                                             </Link>
                                        </div>

                                        {/* Logo-urile sponsorilor - acestea pot rămâne sub linia de plutire pe ecranele mici */}
                                        <div className="flex justify-center items-center gap-10 sm:gap-20 lg:gap-24 mt-10 opacity-80 pb-12">
                                             <Link
                                                  href="https://bestcj.ro/"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                             >
                                                  {/* MODIFICARE: Lățime redusă (w-28) și mărită înapoi pe sm: (sm:w-36) */}
                                                  <Image
                                                       src="/images/best.png"
                                                       alt="Best Logo"
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       className="w-28 h-auto sm:w-36 md:w-44 lg:w-52 xl:w-60 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,88,182,0.5)] will-change-transform"
                                                  />
                                             </Link>
                                             <Link
                                                  href="https://www.utcluj.ro/"
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                             >
                                                  {/* MODIFICARE: Lățime redusă (w-20) și mărită înapoi pe sm: (sm:w-24) */}
                                                  <Image
                                                       src="/images/ut.png"
                                                       alt="UTCN Logo"
                                                       width={0}
                                                       height={0}
                                                       sizes="100vw"
                                                       className="w-20 h-auto sm:w-24 md:w-32 lg:w-40 xl:w-48 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,88,182,0.5)] will-change-transform"
                                                  />
                                             </Link>
                                        </div>
                                   </div>
                              </motion.div>
                         </motion.div>
                    </div>
               </CyberpunkBackground>
          </section>
     );
};

export default HeroSection;
