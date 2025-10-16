"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import CyberpunkBackground from "@/components/ui/CyberpunkBackground";
import Form from "./components/Form";

export default function Contact() {
     return (
          <main>
               <Navbar />
               <section className="relative min-h-screen w-full overflow-hidden">
                    <CyberpunkBackground>
                         <Form />
                    </CyberpunkBackground>
               </section>
               <Footer />
          </main>
     );
}
