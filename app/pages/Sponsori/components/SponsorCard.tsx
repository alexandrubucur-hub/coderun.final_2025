// app/sponsori/components/SponsorCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SponsorCardProps {
     name: string;
     logoUrl: string;
     websiteUrl: string;
     description: string;
     variants?: Variants;
}

const SponsorCard: React.FC<SponsorCardProps> = ({
     name,
     logoUrl,
     websiteUrl,
     description,
     variants,
}) => {
     const [isHovered, setIsHovered] = useState(false);
     const [isPinned, setIsPinned] = useState(false);

     const isDescriptionVisible = isHovered || isPinned;

     return (
          <motion.div
               variants={variants}
               className={`w-full max-w-md md:w-[360px] relative group isolate bg-coderun-dark/40 backdrop-blur-sm p-8 rounded-2xl border transition-all duration-300 ${
                    isDescriptionVisible
                         ? "border-coderun-pink shadow-[0_0_25px_rgba(250,88,182,0.7)]"
                         : "border-coderun-purple shadow-[0_0_15px_rgba(122,11,192,1)]"
               }`}
               onMouseEnter={() => {
                    if (!isPinned) {
                         setIsHovered(true);
                    }
               }}
               onMouseLeave={() => setIsHovered(false)}
               style={{
                    willChange: "border-color, box-shadow, transform, opacity",
               }}
          >
               <div className="flex flex-col items-center">
                    {/* --- Logo-ul cu Link --- */}
                    <Link
                         href={websiteUrl}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="relative z-10 flex items-center justify-center h-48 w-full transition-transform duration-300 group-hover:scale-105"
                         aria-label={`Visit ${name}'s website`}
                    >
                         <Image
                              src={logoUrl}
                              alt={`${name} logo`}
                              width={250}
                              height={150}
                              className="object-contain w-full h-full"
                         />
                    </Link>

                    {/* --- Săgeata pentru toggle --- */}
                    <button
                         onClick={() => {
                              setIsPinned(!isPinned);
                              setIsHovered(false);
                         }}
                         className="absolute bottom-4 right-4 z-20 text-coderun-pink hover:text-coderun-pink-light transition-all duration-300"
                         aria-label="Toggle description"
                    >
                         <motion.div
                              animate={{
                                   rotate: isDescriptionVisible ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                         >
                              <ChevronDown className="w-6 h-6" />
                         </motion.div>
                    </button>

                    {/* --- Descrierea (Animată) --- */}
                    <AnimatePresence>
                         {isDescriptionVisible && (
                              <motion.div
                                   initial={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                   }}
                                   animate={{
                                        opacity: 1,
                                        height: "auto",
                                        marginTop: "16px",
                                   }}
                                   exit={{
                                        opacity: 0,
                                        height: 0,
                                        marginTop: 0,
                                   }}
                                   transition={{
                                        duration: 0.3,
                                        ease: "easeInOut",
                                   }}
                                   className="relative z-10 w-full overflow-hidden"
                              >
                                   <p className="text-gray-300 text-sm leading-relaxed border-t border-coderun-dark-purple/50 pt-4">
                                        {description}
                                   </p>
                              </motion.div>
                         )}
                    </AnimatePresence>
               </div>
          </motion.div>
     );
};

export default SponsorCard;
