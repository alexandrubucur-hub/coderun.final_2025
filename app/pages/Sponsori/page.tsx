"use client";

// MODIFICARE: Am adăugat useRef
import React, { useRef } from "react";
// MODIFICARE: Am adăugat useInView
import { useInView } from "framer-motion";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

export default function Sponsori() {
     // --- MODIFICARE: Adăugăm detectarea vizibilității ---
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.4 });
     // --- SFÂRȘIT MODIFICARE ---

     return (
          <main>
               <Navbar />
               {/* MODIFICARE: Adăugăm ref-ul aici */}
               <section
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden"
               >
                    {/* MODIFICARE: Trimitem prop-ul isInView */}
                    <CyberpunkBackground isInView={isInView}>
                         Test
                    </CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
