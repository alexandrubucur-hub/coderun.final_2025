// app/components/home/Despre.tsx
"use client";

import React from "react";
import Image from "next/image";
import InfoCard from "@/components/ui/InfoCard";
import { motion, Variants } from "framer-motion";
import PlexusBackground from "@/components/ui/PlexusBackground";

const containerVariants: Variants = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.25,
          },
     },
};

const itemVariants: Variants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

const Despre: React.FC = () => {
     return (
          <section
               id="about"
               className="relative min-h-screen w-full overflow-hidden bg-coderun-dark pt-16 pb-4 md:pb-16"
          >
               <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               <PlexusBackground />

               {/* --- CONTINUTUL PAGINII --- */}
               <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                    <motion.div
                         className="w-full max-w-7xl mx-auto"
                         variants={containerVariants}
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.2 }}
                    >
                         <motion.h2
                              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white leading-tight text-center mb-16 md:mb-24 pt-4"
                              variants={itemVariants}
                         >
                              <span className="block FontGradient text-coderun-pink-light animate-pulse text-glow">
                                   ABOUT CODERUN
                              </span>
                         </motion.h2>

                         <div className="space-y-12 md:space-y-20">
                              <motion.div
                                   className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="What is Coderun?">
                                             {
                                                  "CodeRun is a free IT marathon, now in its 6th edition, taking place between November 10–23, 2025. The event challenges students to grow in a competitive setting, as they advance through checkpoints around Cluj-Napoca, moving from one company to another."
                                             }
                                        </InfoCard>
                                   </div>
                                   <div className="w-full md:w-1/2 flex justify-center group">
                                        <div className="w-full max-w-sm h-80 rounded-lg">
                                             <Image
                                                  src="/images/fatacr.webp"
                                                  alt="CodeRun Mascot"
                                                  width={700}
                                                  height={800}
                                                  className="w-full h-full object-contain object-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-glow-purple"
                                             />
                                        </div>
                                   </div>
                              </motion.div>

                              <motion.div
                                   className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="Preparation and Challenges">
                                             {
                                                  "Before the competition days, participants will join online training sessions led by professionals from our partner companies, so they can start the challenge fully prepared. Each company’s challenge will have two difficulty levels: easy and hard, giving participants the chance to choose their pace or push their limits."
                                             }
                                        </InfoCard>
                                   </div>
                                   <div className="w-full md:w-1/2 flex justify-center group">
                                        <div className="w-full max-w-sm h-80 rounded-lg">
                                             <Image
                                                  src="/images/code.png"
                                                  alt="Code"
                                                  width={400}
                                                  height={200}
                                                  className="w-full h-full object-contain object-center transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-glow-pink"
                                             />
                                        </div>
                                   </div>
                              </motion.div>

                              <motion.div
                                   className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="The Coding Marathon">
                                             {
                                                  "With six checkpoints in total, CodeRun tests both technical skills and the ability to adapt and apply knowledge from the trainings.The event highlights participants who complete the challenges with consistency and resilience."
                                             }
                                        </InfoCard>
                                   </div>
                                   <div className="w-full md:w-1/2 flex justify-center group">
                                        <div className="w-full max-w-sm h-80 rounded-lg">
                                             <Image
                                                  src="/images/run.png"
                                                  alt="Run"
                                                  width={400}
                                                  height={200}
                                                  className="w-full h-full object-contain object-center transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-glow-purple"
                                             />
                                        </div>
                                   </div>
                              </motion.div>
                         </div>
                    </motion.div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </section>
     );
};

export default Despre;
