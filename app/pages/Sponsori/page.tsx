"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";

export default function Sponsori() {
     return (
          <main>
               <Navbar />
               <section className="relative min-h-screen w-full overflow-hidden">
                    <CyberpunkBackground>Test</CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
