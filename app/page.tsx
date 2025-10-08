import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import Link from "next/link";
import React from "react";

export default function Home() {
     return (
          <main>
               <Navbar />
               <Hero />
               <div className="flex flex-col items-center justify-center pt-32 px-16">
                    <h2 className="text-5xl font-bold text-center text-white mb-12">
                         Join the CodeRunners!
                    </h2>
                    <Link href="#">
                         <GradientSlideButton
                              className="px-12 py-6 text-2xl rounded-3xl bg-black text-white border-2 border-fuchsia-500 text-glitch hover:scale-110 hover:shadow-lg hover:shadow-coderun-pink/30 active:scale-95"
                              colorFrom="#FA58B6"
                              colorTo="#7A0BC0"
                         >
                              Înscrie-te
                         </GradientSlideButton>
                    </Link>
               </div>
               <Footer />
          </main>
     );
}
