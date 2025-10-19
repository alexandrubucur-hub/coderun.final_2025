// app/components/home/Faq.tsx
"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, Variants, useInView } from "framer-motion";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

const faqData = [
     // ... (datele faq rămân la fel) ...
     {
          question: "Who can participate in CodeRun?",
          answer: "CodeRun is open to all university students passionate about IT and programming, regardless of their faculty or experience level.",
     },
     {
          question: "Is it necessary to form a team?",
          answer: "You can join either individually or in a team of up to three members. While solo participation is allowed, teamwork is encouraged to combine different skills and make the experience more fun.",
     },
     {
          question: "Is there a participation fee?",
          answer: "No, CodeRun is completely free to join!",
     },
     {
          question: "What technologies will be used in the challenges?",
          answer: "Each challenge is designed by our partners and may involve various programming languages and technologies depending on their specific field. The exact tools and frameworks will be introduced during the training sessions.",
     },
];

const faqContainerVariants: Variants = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2 },
     },
};

const faqItemVariants: Variants = {
     hidden: { opacity: 0, y: 40 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

const Faq: React.FC = () => {
     const [openIndex, setOpenIndex] = useState<number | null>(null);
     const toggleFAQ = (index: number) => {
          setOpenIndex(openIndex === index ? null : index);
     };

     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });

     // --- MODIFICARE: Stare pentru a ști când s-au terminat animațiile de conținut ---
     const [contentAnimationComplete, setContentAnimationComplete] =
          useState(false);

     return (
          <section
               ref={sectionRef}
               id="faq"
               className="relative w-full overflow-hidden bg-gradient-cyberpunk py-12 lg:py-20"
          >
               <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               {/* --- MODIFICARE: Trimitem noul prop 'startAnimatedBg' --- */}
               <CyberpunkBackground
                    isInView={isInView}
                    startAnimatedBg={contentAnimationComplete}
               >
                    <div className="relative z-20 w-full py-20 px-4">
                         <motion.div
                              className="max-w-3xl mx-auto"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={faqContainerVariants}
                              // --- MODIFICARE: Adăugăm semnalul de finalizare ---
                              onAnimationComplete={() => {
                                   setContentAnimationComplete(true);
                              }}
                         >
                              <motion.h2
                                   className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-center mb-12"
                                   variants={faqItemVariants}
                              >
                                   {/* ... (restul codului) ... */}
                                   <span
                                        className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                             isInView ? "text-glow" : ""
                                        }`}
                                   >
                                        FREQUENTLY ASKED QUESTIONS
                                   </span>
                              </motion.h2>
                              <motion.div
                                   className="space-y-4"
                                   // --- ATENȚIE: Acest 'variants' este corect, dar 'onAnimationComplete'
                                   // este pe containerul principal, care se termină după acest 'stagger'.
                                   // Dacă acest 'div' are propriul stagger, ar trebui să fie el cel cu 'onAnimationComplete'.
                                   // Pentru simplitate, lăsăm pe containerul părinte.
                                   variants={faqItemVariants}
                              >
                                   {faqData.map((item, index) => (
                                        <div
                                             key={index}
                                             className="bg-[#1A1A40]/40 backdrop-blur-sm rounded-2xl border border-[#270082] shadow-[0_0_15px_rgba(122,11,192,1)] transition-all duration-300 hover:border-[#FA58B6] hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                             style={{
                                                  willChange:
                                                       "border-color, box-shadow",
                                             }}
                                        >
                                             <button
                                                  onClick={() =>
                                                       toggleFAQ(index)
                                                  }
                                                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                             >
                                                  <span className="text-2xl FontBold text-[#FC9BD3]">
                                                       {item.question}
                                                  </span>
                                                  <motion.div
                                                       animate={{
                                                            rotate:
                                                                 openIndex ===
                                                                 index
                                                                      ? 180
                                                                      : 0,
                                                       }}
                                                       transition={{
                                                            duration: 0.3,
                                                       }}
                                                       className="shrink-0"
                                                       style={{
                                                            willChange:
                                                                 "transform",
                                                       }}
                                                  >
                                                       <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-coderun-pink"
                                                       >
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                       </svg>
                                                  </motion.div>
                                             </button>
                                             <AnimatePresence>
                                                  {openIndex === index && (
                                                       <motion.div
                                                            initial={{
                                                                 opacity: 0,
                                                                 height: 0,
                                                                 scaleY: 0,
                                                                 transformOrigin:
                                                                      "top",
                                                            }}
                                                            animate={{
                                                                 opacity: 1,
                                                                 height: "auto",
                                                                 scaleY: 1,
                                                            }}
                                                            exit={{
                                                                 opacity: 0,
                                                                 height: 0,
                                                                 scaleY: 0,
                                                            }}
                                                            transition={{
                                                                 duration: 0.3,
                                                                 ease: "easeInOut",
                                                            }}
                                                       >
                                                            <div className="px-6 pb-6">
                                                                 <p className="text-gray-300 leading-relaxed border-t border-coderun-dark-purple/50 pt-4">
                                                                      {
                                                                           item.answer
                                                                      }
                                                                 </p>
                                                            </div>
                                                       </motion.div>
                                                  )}
                                             </AnimatePresence>
                                        </div>
                                   ))}
                              </motion.div>
                         </motion.div>
                    </div>
               </CyberpunkBackground>
          </section>
     );
};

export default Faq;
