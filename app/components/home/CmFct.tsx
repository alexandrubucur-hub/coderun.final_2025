"use client";

import React, { useEffect, useState, useMemo } from "react";
// import Image from "next/image"; // Am șters importul nefolosit
// import Link from "next/link"; // Am șters importul nefolosit
import InfoCard from "@/components/ui/InfoCard";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";

const CmFct: React.FC = () => {
     // --- Am șters 'isLogoVisible' și logica IntersectionObserver care nu erau folosite ---

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

     // Folosim useMemo pentru a ne asigura că array-ul nu este recreat la fiecare render,
     // ceea ce face dependența din useEffect mai stabilă.
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
                    if (current.length >= MAX_VERTICAL_GLITCHES) {
                         return current;
                    }

                    const availableSlots = verticalGlitchSlots
                         .map((_, index) => index)
                         .filter(
                              (index) =>
                                   !current.some((g) => g.slotIndex === index)
                         );

                    if (availableSlots.length === 0) {
                         return current;
                    }

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
          // ▼▼▼ SOLUȚIA PENTRU WARNING-UL DE DEPENDINȚĂ ▼▼▼
     }, [verticalGlitchSlots]);

     return (
          <section className="relative min-h-screen w-full overflow-hidden bg-gradient-cyberpunk">
               <div className="absolute inset-0 z-0">
                    <div
                         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                         style={{
                              backgroundImage: 'url("/images/bg.png")',
                         }}
                    />
                    <div
                         className="absolute inset-0 bg-gradient-to-b from-coderun-dark/90 via-coderun-dark-purple/70 to-coderun-dark/90"
                         style={{ opacity: 0.2 }}
                    />
               </div>
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />

               <div className="absolute inset-0 z-10 pointer-events-none text-glitch">
                    <div className="absolute top-[6%] left-[5%] text-coderun-pink font-mono text-xs opacity-40">
                         <span>
                              {/* ▼▼▼ SOLUȚIA PENTRU EROAREA DE GHILIMELE ▼▼▼ */}
                              {`{code: 'reality'}`}
                         </span>
                    </div>

                    {/* Restul codului tău static rămâne la fel */}
                    <div className="absolute top-[12%] left-[15%] text-coderun-purple font-mono text-xs opacity-30 ">
                         <span>export default Cyberpunk;</span>
                    </div>
                    <div className="absolute top-[7%] right-[5%] text-coderun-purple font-mono text-[10px] opacity-25">
                         <span>{"// 0xDEADBEEF"}</span>
                    </div>
                    <div className="absolute top-[15%] right-[10%] text-coderun-pink font-mono text-xs opacity-35">
                         <span>{`if(dream.isReal()) {hack();}`}</span>
                    </div>
                    <div className="absolute top-[25%] left-8 font-mono text-xs opacity-30 text-coderun-purple [writing-mode:vertical-rl] tracking-widest">
                         <span>::SYSTEM.STATUS:ONLINE_AWAITING_INPUT::</span>
                    </div>
                    <div className="absolute top-[30%] right-8 font-mono text-xs opacity-35 text-coderun-pink [writing-mode:vertical-rl] tracking-widest">
                         <span>--REALITY_CHECKSUM_VALIDATED--//</span>
                    </div>
                    {/* ... și așa mai departe ... */}

                    {/* Containerul pentru Glitch-uri Dinamice */}
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
                    <div className="w-full max-w-7xl mx-auto">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              <InfoCard title="Ce este Coderun?">
                                   O competiție de programare intensă unde îți
                                   poți testa limitele și creativitatea. Intră
                                   în arenă și demonstrează-ți abilitățile!
                              </InfoCard>
                              <InfoCard title="Programul Evenimentului">
                                   De la workshop-uri de pregătire până la marea
                                   finală, descoperă calendarul complet și nu
                                   rata nicio etapă importantă.
                              </InfoCard>
                              <InfoCard title="Înscrie-te Acum!">
                                   Ești gata să intri în joc? Butonul de
                                   înscriere te așteaptă. Creează-ți contul și
                                   pregătește-te pentru o nouă realitate.
                              </InfoCard>
                         </div>
                    </div>
               </div>
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </section>
     );
};

export default CmFct;
