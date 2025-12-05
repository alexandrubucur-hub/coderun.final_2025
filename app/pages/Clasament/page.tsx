// app/pages/Clasament/page.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion, Variants } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import rankingData from "@/app/data/ranking.json";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

// Data types
type TeamScore = {
     code: string;
     scores: {
          imi: number;
          heits: number;
          sabau: number;
          ioan: number;
          uniqa: number;
          training: number;
     };
     total: number;
};

// Animation Variants (Same as Contact Page)
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
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

export default function ClasamentPage() {
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.1 });
     const isSmallScreen = useMediaQuery("(max-width: 1024px)");
     const [startAnimatedBg, setStartAnimatedBg] = useState(!isSmallScreen);
     const data = rankingData as TeamScore[];

     // Animation logic
     useEffect(() => {
          let timer: NodeJS.Timeout;
          if (isInView && isSmallScreen) {
               timer = setTimeout(() => {
                    setStartAnimatedBg(true);
               }, 500);
          } else if (!isSmallScreen) {
               setStartAnimatedBg(true);
          } else {
               setStartAnimatedBg(false);
          }
          return () => clearTimeout(timer);
     }, [isInView, isSmallScreen]);

     return (
          <main className="bg-coderun-dark text-white selection:bg-coderun-pink selection:text-white">
               {/* Custom Scrollbar Styles using Theme Colors */}
               <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                         width: 6px;
                         height: 6px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                         background: rgba(
                              26,
                              26,
                              64,
                              0.5
                         ); /* coderun-dark alpha */
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                         background: #7a0bc0; /* coderun-purple */
                         border-radius: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                         background: #fa58b6; /* coderun-pink */
                    }
                    .custom-scrollbar::-webkit-scrollbar-corner {
                         background: transparent;
                    }
               `}</style>

               <Navbar />

               {/* WRAPPER SECTION: min-h-screen contains the background */}
               <section
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center"
               >
                    <CyberpunkBackground
                         isInView={isInView}
                         startAnimatedBg={startAnimatedBg}
                    >
                         {/* Content Container with Motion */}
                         <motion.div
                              variants={containerVariants}
                              initial="hidden"
                              animate={isInView ? "visible" : "hidden"}
                              className="relative z-10 container mx-auto px-4 py-32 flex flex-col items-center justify-center h-full"
                         >
                              <motion.div
                                   className="text-center mb-16 px-4"
                                   variants={itemVariants}
                              >
                                   <h2 className="text-4xl sm:text-5xl">
                                        <span
                                             className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                                  isInView ? "text-glow" : ""
                                             }`}
                                        >
                                             LEADERBOARD
                                        </span>
                                   </h2>
                              </motion.div>

                              {/* TABLE CONTAINER with Motion & Contact Form Styles */}
                              <motion.div
                                   variants={itemVariants}
                                   className="w-full h-[70vh] overflow-auto custom-scrollbar relative isolate bg-coderun-dark/40 backdrop-blur-sm p-1 md:p-4 rounded-2xl border border-coderun-purple transition-all duration-300 shadow-[0_0_15px_rgba(122,11,192,1)] hover:border-coderun-pink hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                              >
                                   <table className="w-full text-left border-collapse relative">
                                        {/* Sticky Header */}
                                        <thead className="sticky top-0 z-20 bg-coderun-dark shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                                             <tr className="text-coderun-pink-light border-b border-coderun-purple/50 FontBold">
                                                  {/* Added whitespace-nowrap to prevent wrapping and force horizontal scroll */}
                                                  <th className="whitespace-nowrap p-4 text-xs md:text-sm uppercase tracking-wider bg-coderun-dark/95 backdrop-blur">
                                                       Rank
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs md:text-sm uppercase tracking-wider bg-coderun-dark/95 backdrop-blur">
                                                       Team Code
                                                  </th>

                                                  {/* Removed 'hidden md:table-cell' to show all data on mobile */}
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       IMI
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       HEITS
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       SABAU
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       IOAN
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       UNIQA
                                                  </th>
                                                  <th className="whitespace-nowrap p-4 text-xs text-center bg-coderun-dark/95 backdrop-blur">
                                                       Trainings
                                                  </th>

                                                  <th className="whitespace-nowrap p-4 text-xs md:text-sm uppercase tracking-wider text-right text-coderun-pink bg-coderun-dark/95 backdrop-blur">
                                                       Total
                                                  </th>
                                             </tr>
                                        </thead>

                                        {/* Table Body with Theme Hover Effects */}
                                        <tbody className="divide-y divide-coderun-dark-purple/50">
                                             {data.map((team, index) => (
                                                  <tr
                                                       key={team.code}
                                                       className="hover:bg-coderun-dark-purple/40 transition-colors duration-200 group"
                                                  >
                                                       {/* Rank: FontNormal */}
                                                       <td className="whitespace-nowrap p-4 FontNormal text-gray-400 text-sm group-hover:text-white transition-colors">
                                                            {index + 1}.
                                                       </td>

                                                       {/* Team Code: FontBold */}
                                                       <td className="whitespace-nowrap p-4 FontBold text-white group-hover:text-coderun-pink transition-colors text-sm md:text-base tracking-wide">
                                                            {team.code}
                                                       </td>

                                                       {/* Scores: FontNormal + Visible on Mobile */}
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {team.scores.imi}
                                                       </td>
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {team.scores.heits}
                                                       </td>
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {team.scores.sabau}
                                                       </td>
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {team.scores.ioan}
                                                       </td>
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {team.scores.uniqa}
                                                       </td>
                                                       <td className="whitespace-nowrap p-4 text-center text-gray-400 text-sm FontNormal group-hover:text-gray-200">
                                                            {
                                                                 team.scores
                                                                      .training
                                                            }
                                                       </td>

                                                       {/* Total: FontBold */}
                                                       <td className="whitespace-nowrap p-4 FontBold text-right text-xl text-coderun-pink drop-shadow-glow-pink">
                                                            {team.total}
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </motion.div>

                              {/* Footer Note with Motion */}
                              <motion.div
                                   variants={itemVariants}
                                   className="mt-6 text-center text-gray-400 text-xs md:text-sm FontNormal"
                              >
                                   <p>
                                        Identification codes have been sent to
                                        the team captains.
                                   </p>
                              </motion.div>
                         </motion.div>
                    </CyberpunkBackground>
               </section>

               <Footer />
          </main>
     );
}
