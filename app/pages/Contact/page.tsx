// app/pages/Contact/page.tsx
"use client";

// --- MODIFICARE: Importăm useState și useEffect ---
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Form from "./components/Form";

export default function Contact() {
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });

     // --- MODIFICARE (Compromis): Folosim un timer pentru a trimite semnalul ---
     const [startAnimatedBg, setStartAnimatedBg] = useState(false);

     useEffect(() => {
          let timer: NodeJS.Timeout;
          if (isInView) {
               // Estimăm că animațiile de conținut durează 500ms
               timer = setTimeout(() => {
                    setStartAnimatedBg(true);
               }, 500); // Ajustează acest delay dacă animațiile durează mai mult
          } else {
               setStartAnimatedBg(false);
          }
          return () => clearTimeout(timer);
     }, [isInView]);

     return (
          <main>
               <Navbar />
               <section
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden"
               >
                    {/* --- MODIFICARE: Trimitem prop-ul generat de timer --- */}
                    <CyberpunkBackground
                         isInView={isInView}
                         startAnimatedBg={startAnimatedBg}
                    >
                         <Form isInView={isInView} />
                    </CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
