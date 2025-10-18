// Program.tsx
"use client";

import React, { useRef } from "react";
import { motion, Variants, useInView } from "framer-motion";
import PlexusBackground from "@/components/ui/PlexusBackground";

interface TimelineItemProps {
     startDate: Date;
     endDate: Date;
     date: string;
     title: string;
     description: string;
}

const timelineData: Omit<TimelineItemProps, "isLast">[] = [
     {
          startDate: new Date("2025-10-24"),
          endDate: new Date("2025-11-05"),
          date: "24 October - 5 November",
          title: "Register",
          description:
               "Coderunners sign up individually or in teams of up to three to join the competition.",
     },
     {
          startDate: new Date("2025-11-10"),
          endDate: new Date("2025-11-21"),
          date: "10-21 November",
          title: "Training Phase",
          description:
               "Participants take part in online sessions led by partner companies to prepare for the challenges ahead.",
     },
     {
          startDate: new Date("2025-11-22"),
          endDate: new Date("2025-11-23"),
          date: "22-23 November",
          title: "Competition Phase",
          description:
               "Teams move across checkpoints in Cluj-Napoca, solving real coding problems designed by our partners.",
     },
     {
          startDate: new Date("2025-12-04"),
          endDate: new Date("2025-12-05"),
          date: "4 December",
          title: "Award Ceremony",
          description:
               "The best teams are recognized and rewarded for their performance, creativity, and consistency throughout the event.",
     },
];

const containerVariants: Variants = {
     hidden: {},
     visible: {
          transition: {
               staggerChildren: 0.3,
          },
     },
};

const itemVariants: Variants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
     },
};

const Program: React.FC = () => {
     const today = new Date();
     today.setHours(0, 0, 0, 0);

     const activeIndex = timelineData.findIndex(
          (item) => today >= item.startDate && today <= item.endDate
     );

     const sectionRef = useRef(null);
     // --- MODIFICARE: Trigger pentru fundal (amount: 0.5) ---
     const backgroundInView = useInView(sectionRef, { amount: 0.3 });
     // --- MODIFICARE: Trigger pentru animația text-glow (amount: 0.2) ---
     const contentInView = useInView(sectionRef, { amount: 0.2 });

     return (
          <section
               ref={sectionRef}
               id="program"
               className="relative w-full overflow-hidden bg-coderun-dark pt-20 lg:pt-28 pb-8 lg:pb-28 px-4"
          >
               <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               {/* --- MODIFICARE: Folosim backgroundInView --- */}
               <PlexusBackground isInView={backgroundInView} />

               <div className="relative z-20 max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-center mb-16">
                         {/* --- MODIFICARE: Folosim contentInView --- */}
                         <span
                              className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                   contentInView ? "text-glow" : ""
                              }`}
                         >
                              EVENT CALENDAR
                         </span>
                    </h2>

                    <motion.ol
                         className="relative lg:grid lg:grid-cols-4 lg:gap-x-6"
                         initial="hidden"
                         whileInView="visible"
                         viewport={{ once: true, amount: 0.2 }}
                         variants={containerVariants}
                    >
                         {timelineData.map((item, index) => {
                              const isActive = index === activeIndex;
                              return (
                                   <motion.li
                                        key={index}
                                        className="relative mb-10 lg:mb-0 group flex flex-col"
                                        variants={itemVariants}
                                        style={{
                                             willChange:
                                                  "transform, box-shadow, border-color",
                                        }}
                                   >
                                        <div className="flex items-center mb-5">
                                             <div
                                                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ring-4 lg:ring-8 ring-coderun-dark shrink-0 transition-all duration-300 group-hover:scale-125 animate-pulse-glow ${
                                                       isActive
                                                            ? "bg-coderun-pink-light"
                                                            : "bg-coderun-purple"
                                                  }`}
                                             >
                                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                             </div>
                                             {!(
                                                  index ===
                                                  timelineData.length - 1
                                             ) && (
                                                  <div className="hidden lg:flex w-full h-1 bg-gradient-to-r from-coderun-purple to-coderun-pink opacity-50"></div>
                                             )}
                                        </div>

                                        {!(
                                             index ===
                                             timelineData.length - 1
                                        ) && (
                                             <div
                                                  className={`lg:hidden absolute left-4 top-8 h-full border-l-2 border-dashed ${
                                                       isActive
                                                            ? "border-coderun-pink"
                                                            : "border-coderun-purple/50"
                                                  }`}
                                             ></div>
                                        )}

                                        <div className="relative pl-12 lg:pl-0 transition-all duration-300 group-hover:-translate-y-2 flex-grow">
                                             <div
                                                  className={`p-6 rounded-2xl backdrop-blur-sm bg-[#1A1A40]/40 transition-all duration-300 h-full flex flex-col
                                                  ${
                                                       isActive
                                                            ? "border border-[#FA58B6] shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                                            : "border border-[#270082] shadow-[0_0_15px_rgba(122,11,192,1)] group-hover:border-[#FA58B6] group-hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                                  }`}
                                             >
                                                  <time className="block mb-2 text-sm font-normal font-mono leading-none text-white/70">
                                                       {item.date}
                                                  </time>
                                                  <h3 className="text-xl font-bold text-[#FC9BD3] FontTest">
                                                       {item.title}
                                                  </h3>
                                                  <p className="mt-2 text-base font-normal text-gray-300 leading-relaxed">
                                                       {item.description}
                                                  </p>
                                             </div>
                                        </div>
                                   </motion.li>
                              );
                         })}
                    </motion.ol>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </section>
     );
};

export default Program;
