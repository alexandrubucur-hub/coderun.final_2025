"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InfoCard from "@/components/ui/InfoCard";

const Despre: React.FC = () => {
     const [isLogoVisible, setIsLogoVisible] = useState(false);
     const logoRef = React.useRef<HTMLDivElement | null>(null);

     useEffect(() => {
          const observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach((entry) =>
                         setIsLogoVisible(entry.isIntersecting)
                    );
               },
               { threshold: 0.5 }
          );
          if (logoRef.current) observer.observe(logoRef.current);
          return () => observer.disconnect();
     }, []);

     return (
          <section className="relative min-h-screen w-full overflow-hidden bg-coderun-dark">
               <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-coderun-dark to-transparent pointer-events-none z-30" />
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

export default Despre;
