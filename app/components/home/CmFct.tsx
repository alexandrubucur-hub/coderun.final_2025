"use client";

import React, { useEffect, useState, useMemo } from "react";
import InfoCard from "@/components/ui/InfoCard";
import { DynamicGlitchText } from "@/components/ui/DynamicGlitchText";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

const CmFct: React.FC = () => {
     return (
          <section
               id="how-it-works"
               className="relative w-full overflow-hidden bg-gradient-cyberpunk py-8"
          >
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
               <CyberpunkBackground>
                    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                         <div className="w-full max-w-7xl mx-auto">
                              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-white leading-tight text-center mb-16 md:mb-24 pt-4">
                                   <span className="block FontTest text-coderun-pink-light animate-pulse text-glow">
                                        CUM FUNCTIONEAZA?
                                   </span>
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                   <InfoCard title="Ce este Coderun?">
                                        O competiție de programare intensă unde
                                        îți poți testa limitele și
                                        creativitatea. Intră în arenă și
                                        demonstrează-ți abilitățile!
                                   </InfoCard>
                                   <InfoCard title="Programul Evenimentului">
                                        De la workshop-uri de pregătire până la
                                        marea finală, descoperă calendarul
                                        complet și nu rata nicio etapă
                                        importantă.
                                   </InfoCard>
                                   <InfoCard title="Înscrie-te Acum!">
                                        Ești gata să intri în joc? Butonul de
                                        înscriere te așteaptă. Creează-ți contul
                                        și pregătește-te pentru o nouă
                                        realitate.
                                   </InfoCard>
                              </div>
                         </div>
                    </div>
               </CyberpunkBackground>
          </section>
     );
};

export default CmFct;
