// app/pages/Contact/page.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Form from "./components/Form";

import { useMediaQuery } from "@/lib/hooks/use-media-query";

export default function Contact() {
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.2 });

     const isSmallScreen = useMediaQuery("(max-width: 1024px)");

     const [startAnimatedBg, setStartAnimatedBg] = useState(!isSmallScreen);

     useEffect(() => {
          let timer: NodeJS.Timeout;
          if (isInView && isSmallScreen) {
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
