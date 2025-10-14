"use client";

import React from "react";
import Image from "next/image";
import InfoCard from "@/components/ui/InfoCard";
import { motion, Variants } from "framer-motion";

// Variantele de animație definite în afara componentei
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
                              <span className="block FontTest text-coderun-pink-light animate-pulse text-glow">
                                   DESPRE
                              </span>
                         </motion.h2>

                         <div className="space-y-12 md:space-y-20">
                              {/* --- Rândul 1: Card stânga, Imagine dreapta --- */}
                              <motion.div
                                   className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="Ce este Coderun?">
                                             CodeRun este un maraton IT gratuit,
                                             aflat la cea de a 6-a ediție, care
                                             se va desfășura în perioada 10-23
                                             noiembrie 2025. Evenimentul
                                             dezvoltă studenții într-un cadru
                                             competitiv, participantii avansând
                                             prin punctele de control
                                             (checkpoints) din Cluj-Napoca, de
                                             la companie la companie.
                                        </InfoCard>
                                   </div>
                                   <div className="w-full md:w-1/2 flex justify-center group">
                                        <div className="w-full max-w-sm h-80 rounded-lg">
                                             <Image
                                                  src="/images/fatacr.PNG"
                                                  alt="CodeRun Mascot"
                                                  width={700}
                                                  height={800}
                                                  className="w-full h-full object-contain object-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-glow-purple"
                                             />
                                        </div>
                                   </div>
                              </motion.div>

                              {/* --- Rândul 2: Imagine stânga, Card dreapta --- */}
                              <motion.div
                                   className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="Pregătire și Provocări">
                                             Pentru a porni la drum echipați cu
                                             toată informația de care au nevoie,
                                             participanții vor beneficia de
                                             sesiuni de training online
                                             susținute de reprezentanții
                                             companiilor partenere. Evenimentul
                                             se remarcă prin flexibilitatea
                                             oferită de probe, atât
                                             participanților, cât și
                                             companiilor. Fiecare probă va avea
                                             doua nivele de dificultate: easy și
                                             hard. Prin structura propusă în
                                             secțiunile de mai jos, noi
                                             încurajăm participanții să iasă din
                                             zona de confort și să își asume
                                             riscuri.
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

                              {/* --- Rândul 3: Card stânga, Imagine dreapta --- */}
                              <motion.div
                                   className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                                   variants={itemVariants}
                              >
                                   <div className="w-full md:w-1/2">
                                        <InfoCard title="Maratonul de Coding">
                                             CodeRun prezintă un traseu cu 6
                                             puncte de control (checkpoints),
                                             menite să supună participanții
                                             probelor create de companiile
                                             partenere, solicitându-le
                                             capacitățile de coding, dar și de
                                             asimilare și aplicare a
                                             informațiilor din cadrul sesiunilor
                                             de training. Evenimentul
                                             evidențiază participanții care duc
                                             la final probele, cu cadență și
                                             reziliență.
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
