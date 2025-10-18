// page.tsx (în folderul de contact)
"use client";

import React, { useRef } from "react"; // MODIFICARE: Adăugăm useRef
import { useInView } from "framer-motion"; // MODIFICARE: Adăugăm useInView
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Form from "./components/Form";

export default function Contact() {
     // --- MODIFICARE: Adăugăm detectarea vizibilității ---
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { amount: 0.1 });
     // --- SFÂRȘIT MODIFICARE ---

     return (
          <main>
               <Navbar />
               <section
                    ref={sectionRef} // MODIFICARE: Adăugăm ref-ul
                    className="relative min-h-screen w-full overflow-hidden pt-16"
               >
                    {/* MODIFICARE: Trimitem 'isInView' către fundal */}
                    <CyberpunkBackground isInView={isInView}>
                         {/* MODIFICARE: Trimitem 'isInView' către formular */}
                         <Form isInView={isInView} />
                    </CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
