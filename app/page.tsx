"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/home/Hero";
import Footer from "./components/Footer";

const Despre = dynamic(() => import("./components/home/Despre"));
const CmFct = dynamic(() => import("./components/home/CmFct"));
const Program = dynamic(() => import("./components/home/Program"));
const Faq = dynamic(() => import("./components/home/Faq"));

export default function Home() {
     return (
          <main>
               <Navbar />
               <Hero />
               <Despre />
               <CmFct />
               <Program />
               <Faq />
               <Footer />
          </main>
     );
}
