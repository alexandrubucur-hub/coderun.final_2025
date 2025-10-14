"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import { motion, Variants } from "framer-motion";

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

     const [activeGlitches, setActiveGlitches] = useState<
          Array<{ id: number; row: number; col: number }>
     >([]);
     const GRID_SIZE = 6;
     const MAX_GLITCHES = 8;

     useEffect(() => {
          const interval = setInterval(() => {
               setActiveGlitches((currentGlitches) => {
                    if (currentGlitches.length >= MAX_GLITCHES) {
                         return currentGlitches;
                    }
                    let randomRow: number, randomCol: number;
                    let isOccupied = true;
                    let attempts = 0;
                    do {
                         randomRow = Math.floor(Math.random() * GRID_SIZE) + 1;
                         randomCol = Math.floor(Math.random() * GRID_SIZE) + 1;
                         isOccupied = currentGlitches.some(
                              (g) => g.row === randomRow && g.col === randomCol
                         );
                         attempts++;
                    } while (isOccupied && attempts < 20);
                    if (!isOccupied) {
                         const newGlitch = {
                              id: Date.now(),
                              row: randomRow,
                              col: randomCol,
                         };
                         setTimeout(() => {
                              setActiveGlitches((prev) =>
                                   prev.filter((g) => g.id !== newGlitch.id)
                              );
                         }, 2000 + Math.random() * 3000);
                         return [...currentGlitches, newGlitch];
                    }
                    return currentGlitches;
               });
          }, 700);
          return () => clearInterval(interval);
     }, []);

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

     const MAX_VERTICAL_GLITCHES = 7;
     const [activeVerticalGlitches, setActiveVerticalGlitches] = useState<
          Array<{ id: number; slotIndex: number }>
     >([]);

     useEffect(() => {
          const interval = setInterval(() => {
               setActiveVerticalGlitches((current) => {
                    if (current.length >= MAX_VERTICAL_GLITCHES) return current;
                    const availableSlots = verticalGlitchSlots
                         .map((_, index) => index)
                         .filter(
                              (index) =>
                                   !current.some((g) => g.slotIndex === index)
                         );
                    if (availableSlots.length === 0) return current;
                    const randomSlotIndex =
                         availableSlots[
                              Math.floor(Math.random() * availableSlots.length)
                         ];
                    const newGlitch = {
                         id: Date.now(),
                         slotIndex: randomSlotIndex,
                    };
                    setTimeout(() => {
                         setActiveVerticalGlitches((prev) =>
                              prev.filter((g) => g.id !== newGlitch.id)
                         );
                    }, 3000 + Math.random() * 2000);
                    return [...current, newGlitch];
               });
          }, 1000);
          return () => clearInterval(interval);
     }, [verticalGlitchSlots]);

     return (
          <section className="relative min-h-screen w-full overflow-hidden bg-gradient-cyberpunk">
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

               <div className="absolute inset-0 z-10 pointer-events-none text-glitch ">
                    <div className="absolute top-[6%] left-[5%] text-coderun-pink font-mono text-xs opacity-40 ">
                         <span>{`{code: 'reality'}`}</span>
                    </div>
                    <div className="absolute top-[12%] left-[15%] text-coderun-purple font-mono text-xs opacity-30 ">
                         <span>export default Cyberpunk;</span>
                    </div>
                    <div className="absolute top-[7%] right-[5%] text-coderun-purple font-mono text-[10px] opacity-25">
                         <span>{"// 0xDEADBEEF"}</span>
                    </div>
                    <div className="absolute top-[15%] right-[10%] text-coderun-pink font-mono text-xs opacity-35">
                         <span>if(dream.isReal()) {`{hack();}`}</span>
                    </div>
                    <div className="absolute top-[25%] left-8 font-mono text-xs opacity-30 text-coderun-purple [writing-mode:vertical-rl] tracking-widest">
                         <span>::SYSTEM.STATUS:ONLINE_AWAITING_INPUT::</span>
                    </div>
                    <div className="absolute top-[30%] right-8 font-mono text-xs opacity-35 text-coderun-pink [writing-mode:vertical-rl] tracking-widest">
                         <span>--REALITY_CHECKSUM_VALIDATED--//</span>
                    </div>
                    <div className="absolute top-[40%] left-[8%] text-coderun-pink-light font-mono text-xs opacity-30">
                         <span>...system_override...</span>
                    </div>
                    <div className="absolute top-[60%] right-[10%] text-coderun-accent font-mono text-xs opacity-40">
                         <span>[initiate_protocol_7]</span>
                    </div>
                    <div className="absolute top-[75%] left-[15%] text-coderun-purple font-mono text-xs opacity-25 ">
                         <span>const matrix = new Reality();</span>
                    </div>
                    <div className="absolute top-[70%] right-[15%] text-coderun-pink-light font-mono text-xs opacity-20">
                         <span>{"// REBOOT SEQUENCE"}</span>
                    </div>
                    <div className="absolute bottom-[20%] left-[10%] text-coderun-pink-light font-mono text-xs opacity-40 ">
                         <span>while(true){`{challenge();}`}</span>
                    </div>
                    <div className="absolute bottom-[8%] left-[20%] text-coderun-purple font-mono text-xs opacity-25">
                         <span>err: reality_not_found</span>
                    </div>
                    <div className="absolute bottom-[10%] right-[5%] text-coderun-accent font-mono text-xs opacity-45">
                         <span>const future = await code();</span>
                    </div>
                    <div className="absolute bottom-[18%] right-[12%] text-coderun-pink font-mono text-[10px] opacity-30">
                         <span>{`{> access_granted}`}</span>
                    </div>
                    <div className="hidden lg:block absolute top-[25%] left-[30%] text-coderun-accent font-mono text-[10px] opacity-20">
                         <span>[core_memory_unlocked]</span>
                    </div>
                    <div className="hidden lg:block absolute top-[55%] right-[28%] text-coderun-purple font-mono text-xs opacity-30">
                         <span>new Thread().start();</span>
                    </div>
                    <div className="hidden lg:block absolute bottom-[30%] left-[48%] text-coderun-pink-light font-mono text-xs opacity-35">
                         <span>...compiling_dreams...</span>
                    </div>
                    <div className="hidden lg:block absolute bottom-[35%] left-[25%] text-coderun-purple font-mono text-xs opacity-25">
                         <span>function(){`{return dreams;}`}</span>
                    </div>
                    <div className="hidden lg:block absolute top-[35%] right-[30%] text-coderun-pink font-mono text-[10px] opacity-20">
                         <span>process.exit(0);</span>
                    </div>
                    <div className="hidden lg:block absolute top-[50%] left-[35%] text-coderun-accent font-mono text-[10px] opacity-25">
                         <span>--REALITY_CHECKSUM_VALIDATED--</span>
                    </div>
                    <div className="hidden lg:block absolute bottom-[40%] right-[32%] text-coderun-pink font-mono text-xs opacity-20">
                         <span>[initiate_protocol_7]</span>
                    </div>
                    <div className="hidden lg:block absolute top-[20%] left-[48%] text-coderun-purple font-mono text-xs opacity-25">
                         <span>...system_override...</span>
                    </div>
                    <div className="hidden lg:block absolute bottom-[25%] right-[45%] text-coderun-pink-light font-mono text-[10px] opacity-30">
                         <span>{`{> access_granted}`}</span>
                    </div>
                    <div className="hidden lg:block absolute top-[68%] left-[28%] text-coderun-accent font-mono text-xs opacity-20">
                         <span>const matrix = new Reality();</span>
                    </div>
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
                                        opacity: Math.random() * 0.4 + 0.2,
                                   }}
                              />
                         ))}
                         {activeVerticalGlitches.map((glitch) => {
                              const slot =
                                   verticalGlitchSlots[glitch.slotIndex];
                              return (
                                   <DynamicGlitchText
                                        key={glitch.id}
                                        className={`absolute font-mono text-xs [writing-mode:vertical-rl] tracking-widest ${slot.position} ${slot.style}`}
                                   />
                              );
                         })}
                    </div>
               </div>

               <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16">
                    <motion.div
                         className="w-full max-w-7xl mx-auto"
                         variants={containerVariants}
                         initial="hidden"
                         animate="visible"
                    >
                         <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center lg:justify-items-center">
                              <motion.div
                                   className="flex justify-center lg:justify-end"
                                   variants={itemVariants}
                              >
                                   <div className="relative group">
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
                                   <div className="relative">
                                        <Image
                                             src="/images/fatacr.PNG"
                                             alt="CodeRun Mascot"
                                             width={700}
                                             height={800}
                                             className="w-auto h-[450px] xl:h-[550px] 2xl:h-[650px] animate-float animate-glow-pulse"
                                        />
                                        <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/30 via-coderun-purple/20 to-transparent opacity-60 blur-2xl animate-pulse" />
                                        <div className="absolute -inset-8 bg-gradient-to-r from-coderun-accent/10 via-coderun-purple/10 to-coderun-pink/10 blur-3xl opacity-80" />
                                   </div>
                              </motion.div>
                              <motion.div
                                   className="flex justify-center lg:justify-start"
                                   variants={itemVariants}
                              >
                                   <div className="relative group">
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
                         <div className="lg:hidden flex flex-col items-center justify-center pt-8">
                              <motion.div
                                   className="flex justify-center"
                                   variants={itemVariants}
                              >
                                   <div
                                        className="relative transition-transform duration-500 ease-out"
                                        style={{
                                             transform: isLogoVisible
                                                  ? "scale(1.25)"
                                                  : "scale(1)",
                                        }}
                                   >
                                        <Image
                                             src="/images/fatacr.PNG"
                                             alt="CodeRun Mascot"
                                             width={350}
                                             height={490}
                                             className="w-auto h-80 sm:h-96 animate-float animate-glow-pulse"
                                        />
                                        <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/40 via-coderun-purple/20 to-transparent opacity-70 blur-xl animate-pulse" />
                                        <div className="absolute -inset-6 bg-gradient-to-r from-coderun-accent/15 via-coderun-purple/15 to-coderun-pink/15 blur-2xl opacity-90" />
                                   </div>
                              </motion.div>
                              <motion.div
                                   ref={logoRef}
                                   className="flex justify-center pt-6"
                                   variants={itemVariants}
                              >
                                   <div className="relative group">
                                        <Image
                                             src="/images/logo.png"
                                             alt="CodeRun"
                                             width={400}
                                             height={160}
                                             className="w-auto h-44 sm:h-60 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-glow-pink"
                                        />
                                   </div>
                              </motion.div>
                         </div>
                         <motion.div
                              className="flex justify-center mt-12 lg:mt-16"
                              variants={itemVariants}
                         >
                              <div className="text-center space-y-6">
                                   <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white leading-tight">
                                        <span className="block FontTest text-coderun-pink-light animate-pulse text-glow">
                                             JOIN THE CODERUNNERS
                                        </span>
                                   </h1>
                                   <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pb-2">
                                        <Link href="#">
                                             <GradientSlideButton
                                                  className="px-12 py-6 text-4xl rounded-3xl bg-black text-white border-2 border-coderun-accent text-glitch hover:scale-110 hover:shadow-lg hover:shadow-coderun-pink/30 active:scale-95"
                                                  colorFrom="#FA58B6"
                                                  colorTo="#7A0BC0"
                                             >
                                                  Înscrie-te
                                             </GradientSlideButton>
                                        </Link>
                                   </div>
                                   <div className="flex justify-center items-center gap-10 sm:gap-20 lg:gap-24 mt-10 opacity-80 pb-12">
                                        <Link href="https://bestcj.ro/">
                                             <Image
                                                  src="/images/best.png"
                                                  alt="Best Logo"
                                                  width={0}
                                                  height={0}
                                                  sizes="100vw"
                                                  className="w-36 h-auto sm:w-40 md:w-44 lg:w-52 xl:w-60 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,88,182,0.5)]"
                                             />
                                        </Link>
                                        <Link href="https://www.utcluj.ro/">
                                             <Image
                                                  src="/images/ut.png"
                                                  alt="UTCN Logo"
                                                  width={0}
                                                  height={0}
                                                  sizes="100vw"
                                                  className="w-24 h-auto sm:w-28 md:w-32 lg:w-40 xl:w-48 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,88,182,0.5)]"
                                             />
                                        </Link>
                                   </div>
                              </div>
                         </motion.div>
                    </motion.div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </section>
     );
};

export default HeroSection;
