"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

// Definim tipul pentru un element din timeline
interface TimelineItemProps {
     startDate: Date;
     endDate: Date;
     date: string;
     title: string;
     description: string;
}

// O listă cu datele pentru timeline
const timelineData: Omit<TimelineItemProps, "isLast">[] = [
     {
          startDate: new Date("2025-11-10"),
          endDate: new Date("2025-11-14"),
          date: "10-14 Noiembrie 2025",
          title: "Sesiuni de Training",
          description:
               "Participanții se familiarizează cu tehnologiile și uneltele necesare pentru probe, direct de la experții companiilor partenere.",
     },
     {
          startDate: new Date("2025-11-15"),
          endDate: new Date("2025-11-15"),
          date: "15 Noiembrie 2025",
          title: "Startul Maratonului",
          description:
               "Începe cursa! Primul checkpoint este deschis, iar echipele își pot demonstra abilitățile dobândite.",
     },
     {
          startDate: new Date("2025-11-16"),
          endDate: new Date("2025-11-22"),
          date: "16-22 Noiembrie 2025",
          title: "Desfășurarea Probelor",
          description:
               "Participanții navighează prin cele 6 checkpoint-uri, rezolvând provocări de la parteneri și acumulând puncte.",
     },
     {
          startDate: new Date("2025-11-23"),
          endDate: new Date("2025-11-23"),
          date: "23 Noiembrie 2025",
          title: "Marea Finală & Premierea",
          description:
               "Cele mai rezistente și rapide echipe sunt premiate. Oportunități de networking cu reprezentanții companiilor.",
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

// Componenta principală pentru Timeline
const Program: React.FC = () => {
     // ## MODIFICARE CHEIE AICI ##
     // Acum se folosește data curentă reală, nu una setată manual.
     const today = new Date();
     today.setHours(0, 0, 0, 0);

     const activeIndex = timelineData.findIndex(
          (item) => today >= item.startDate && today <= item.endDate
     );

     return (
          <section
               id="program"
               className="w-full overflow-hidden bg-coderun-dark py-20 px-4"
          >
               <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white leading-tight text-center mb-16">
                         <span className="block FontTest text-coderun-pink-light animate-pulse text-glow">
                              CALENDARUL EVENIMENTULUI
                         </span>
                    </h2>

                    <motion.ol
                         className="relative sm:flex sm:justify-center sm:gap-x-6"
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
                                        className="relative mb-10 sm:mb-0 group w-full sm:max-w-xs"
                                        variants={itemVariants}
                                   >
                                        <div className="flex items-center">
                                             <div
                                                  className={`z-10 flex items-center justify-center w-8 h-8 rounded-full ring-4 sm:ring-8 ring-coderun-dark shrink-0 transition-all duration-300 group-hover:scale-125 animate-pulse-glow ${
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
                                                  <div className="hidden sm:flex w-full h-1 bg-gradient-to-r from-coderun-purple to-coderun-pink opacity-50"></div>
                                             )}
                                        </div>

                                        <div
                                             className={`sm:hidden absolute left-4 top-8 h-full border-l-2 border-dashed ${
                                                  isActive
                                                       ? "border-coderun-pink"
                                                       : "border-coderun-purple/50"
                                             }`}
                                        ></div>

                                        <div className="mt-5 sm:pe-4 transition-all duration-300 group-hover:-translate-y-2">
                                             <div
                                                  className={`p-5 rounded-lg border bg-coderun-dark-purple/30 backdrop-blur-sm transition-all duration-300 
                                                  ${
                                                       isActive
                                                            ? "border-coderun-pink shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                                            : "border-coderun-purple/50 shadow-[0_0_15px_rgba(122,11,192,1)] group-hover:border-coderun-pink group-hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                                                  }`}
                                             >
                                                  <time className="block mb-2 text-sm font-normal font-mono leading-none text-white/70">
                                                       {item.date}
                                                  </time>
                                                  <h3 className="text-xl font-bold text-coderun-pink-light FontTest">
                                                       {item.title}
                                                  </h3>
                                                  <p className="mt-2 text-base font-normal text-white/90">
                                                       {item.description}
                                                  </p>
                                             </div>
                                        </div>
                                   </motion.li>
                              );
                         })}
                    </motion.ol>
               </div>
          </section>
     );
};

export default Program;
