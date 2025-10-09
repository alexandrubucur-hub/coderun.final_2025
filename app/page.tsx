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

               <Footer />
          </main>
     );
}
