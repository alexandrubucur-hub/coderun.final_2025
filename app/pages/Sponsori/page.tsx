"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import SponsorsList from "./components/SponsorList";

export default function Sponsori() {
     const sectionRef = useRef(null);

     const isInView = useInView(sectionRef, { amount: 0.2 });

     return (
          <main>
               <Navbar />
               <section
                    ref={sectionRef}
                    className="relative min-h-screen w-full overflow-hidden"
               >
                    <CyberpunkBackground isInView={isInView}>
                         <SponsorsList isInView={isInView} />
                    </CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
