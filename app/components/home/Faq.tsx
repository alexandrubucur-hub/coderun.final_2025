"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

const faqData = [
     {
          question: "Cine poate participa la CodeRun?",
          answer: "CodeRun este deschis tuturor studenților pasionați de programare, indiferent de anul de studiu sau specializare. Tot ce contează este dorința de a învăța și de a concura.",
     },
     {
          question: "Este necesară formarea unei echipe?",
          answer: "Da, competiția se desfășoară în echipe de 3 persoane. Vă încurajăm să vă formați echipa din timp, dar vom oferi și o platformă de matchmaking pentru cei care își caută coechipieri.",
     },
     {
          question: "Există o taxă de participare?",
          answer: "Nu, participarea la CodeRun este complet gratuită. Evenimentul este susținut de companiile partenere, care doresc să investească în viitoarea generație de programatori.",
     },
     {
          question: "Ce tehnologii vor fi folosite în cadrul probelor?",
          answer: "Tehnologiile specifice variază de la o ediție la alta și sunt alese de companiile partenere. Participanții vor beneficia de sesiuni de training înainte de începerea probelor pentru a se familiariza cu tool-urile necesare.",
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

     return (
          <section
               id="faq"
               className="relative w-full overflow-hidden bg-gradient-cyberpunk py-8"
          >
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               <CyberpunkBackground>
                    <div className="relative z-20 w-full py-20 px-4">
                         <motion.div
                              className="max-w-3xl mx-auto"
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.2 }}
                              variants={faqContainerVariants}
                         >
                              <motion.h2
                                   className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-center mb-12"
                                   variants={faqItemVariants}
                              >
                                   <span className="block FontTest text-coderun-pink-light animate-pulse text-glow">
                                        ÎNTREBĂRI FRECVENTE
                                   </span>
                              </motion.h2>
                              <motion.div
                                   className="space-y-4"
                                   variants={faqItemVariants}
                              >
                                   {faqData.map((item, index) => (
                                        <div
                                             key={index}
                                             // AICI AM APLICAT STILUL DIN INFOCARD
                                             className="bg-[#1A1A40]/40 backdrop-blur-sm rounded-2xl border border-[#270082] shadow-[0_0_15px_rgba(122,11,192,1)] transition-all duration-300 hover:border-[#FA58B6] hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                        >
                                             <button
                                                  onClick={() =>
                                                       toggleFAQ(index)
                                                  }
                                                  className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                             >
                                                  <span
                                                       className="text-2xl font-bold text-[#FC9BD3]"
                                                       style={{
                                                            fontFamily:
                                                                 "sans-serif",
                                                       }}
                                                  >
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
                                                                 height: 0,
                                                                 opacity: 0,
                                                            }}
                                                            animate={{
                                                                 height: "auto",
                                                                 opacity: 1,
                                                            }}
                                                            exit={{
                                                                 height: 0,
                                                                 opacity: 0,
                                                            }}
                                                            transition={{
                                                                 duration: 0.4,
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
