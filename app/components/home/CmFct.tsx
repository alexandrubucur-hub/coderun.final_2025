// CmFct.tsx
"use client";

import React, { useRef } from "react"; // MODIFICARE: Adăugăm React și useRef
import InfoCard from "@/components/ui/InfoCard";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import { motion, Variants, useInView } from "framer-motion"; // MODIFICARE: Adăugăm useInView

const containerVariants: Variants = {
     // ... (variantele rămân neschimbate)
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.25,
          },
     },
};

const itemVariants: Variants = {
     // ... (variantele rămân neschimbate)
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

const CmFct: React.FC = () => {
     // --- MODIFICARE: Adăugăm detectarea vizibilității ---
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });
     // --- SFÂRȘIT MODIFICARE ---

     return (
          <section
               ref={sectionRef} // MODIFICARE: Adăugăm ref-ul
               id="how-it-works"
               className="relative w-full overflow-hidden bg-gradient-cyberpunk  py-20 lg:py-32"
          >
               <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               {/* MODIFICARE: Trimitem 'isInView' către fundal */}
               <CyberpunkBackground isInView={isInView}>
                    <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
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
                                   {/* MODIFICARE: Oprim animația 'text-glow' */}
                                   <span
                                        className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                             isInView ? "text-glow" : ""
                                        }`}
                                   >
                                        HOW DOES IT WORK?
                                   </span>
                              </motion.h2>
                              <motion.div
                                   className="flex flex-col lg:flex-row justify-center items-stretch gap-8"
                                   variants={containerVariants}
                              >
                                   <motion.div
                                        variants={itemVariants}
                                        className="flex"
                                        style={{
                                             willChange:
                                                  "transform, box-shadow, border-color",
                                        }}
                                   >
                                        <InfoCard title="Learn, Train & Compete">
                                             {
                                                  "CodeRun is a team-based IT competition where participants can register individually or in teams of up to three. The competition unfolds in two main stages: a training phase and a competition phase. During the first eleven days, participants attend online training sessions hosted by our partners to prepare for the upcoming tasks."
                                             }
                                        </InfoCard>
                                   </motion.div>
                                   <motion.div
                                        variants={itemVariants}
                                        className="flex"
                                        style={{
                                             willChange:
                                                  "transform, box-shadow, border-color",
                                        }}
                                   >
                                        <InfoCard title="Six Checkpoints to Victory">
                                             {
                                                  "In the second stage, the teams take on a series of challenges at six checkpoints spread across Cluj-Napoca. Each checkpoint represents a partner company or the BEST x UT challenge and offers two levels of difficulty, easy and hard. Teams must complete all challenges in order, earning points for both accuracy and speed."
                                             }
                                        </InfoCard>
                                   </motion.div>
                                   <motion.div
                                        variants={itemVariants}
                                        className="flex"
                                        style={{
                                             willChange:
                                                  "transform, box-shadow, border-color",
                                        }}
                                   >
                                        <InfoCard title="Points, Bonuses, and Ranking">
                                             {
                                                  "The scoring system rewards technical skill and efficiency, each challenge has a maximum score, bonus points for quick completion, and partial credit for correct progress. At the end of the route, the cumulative score determines the final ranking. "
                                             }
                                        </InfoCard>
                                   </motion.div>
                              </motion.div>
                         </motion.div>
                    </div>
               </CyberpunkBackground>
          </section>
     );
};

export default CmFct;
