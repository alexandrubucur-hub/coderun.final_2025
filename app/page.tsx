import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/home/Hero";
import Footer from "./components/Footer";
import Link from "next/link";
import React from "react";
import Despre from "./components/home/Despre";
import CmFct from "./components/home/CmFct";
import Program from "./components/home/Program";
import Faq from "./components/home/Faq";

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
