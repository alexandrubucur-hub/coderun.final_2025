// app/pages/Contact/page.tsx
"use client";

// --- MODIFICARE: Importăm useState și useEffect ---
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Form from "./components/Form";
// --- MODIFICARE: Importăm hook-ul de media query ---
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export default function Contact() {
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });

     // --- MODIFICARE: Logică de compromis pentru paginile fără 'onAnimationComplete' ---
     const isSmallScreen = useMediaQuery("(max-width: 1024px)");

     // Starea este 'true' (gata) pe desktop, și 'false' (așteaptă) pe mobil
     const [startAnimatedBg, setStartAnimatedBg] = useState(!isSmallScreen);

     useEffect(() => {
          let timer: NodeJS.Timeout;
          if (isInView && isSmallScreen) {
               // Pe mobil, pornește după un scurt delay pentru a lăsa animațiile din Form să ruleze
               timer = setTimeout(() => {
                    setStartAnimatedBg(true);
               }, 500); // 500ms delay estimat
          } else if (!isSmallScreen) {
               // Pe desktop, e mereu gata
               setStartAnimatedBg(true);
          } else {
               // Resetează când iese din vizor pe mobil
               setStartAnimatedBg(false);
          }
          return () => clearTimeout(timer);
     }, [isInView, isSmallScreen]);
     // --- Sfârșit modificare logică ---

     return (
          <main>
               <Navbar />
               <section
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden"
               >
                    {/* --- MODIFICARE: Trimitem prop-ul generat de logica de mai sus --- */}
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
