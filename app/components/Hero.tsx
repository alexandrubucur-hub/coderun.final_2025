"use client";
/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";

const HeroSection: React.FC = () => {
     const [glitchText, setGlitchText] = useState("");
     const [isLogoVisible, setIsLogoVisible] = useState(false);
     const logoRef = React.useRef<HTMLDivElement | null>(null);

     useEffect(() => {
          const observer = new IntersectionObserver(
               (entries) => {
                    entries.forEach((entry) =>
                         setIsLogoVisible(entry.isIntersecting)
                    );
               },
               { threshold: 0.5 }
          );
          if (logoRef.current) observer.observe(logoRef.current);
          return () => observer.disconnect();
     }, []);

     useEffect(() => {
          const codeSnippets = [
               `function hackTheMatrix() {`,
               `const reality = new Simulation();`,
               `if (you.canCode()) {`,
               `while(true) { dream(); }`,
               `console.log('Welcome to CodeRun');`,
               `Array.from({length: Infinity}).map(code)`,
               `const cyberpunk = true;`,
               `export default YourFuture;`,
          ];

          const interval = setInterval(() => {
               const randomSnippet =
                    codeSnippets[
                         Math.floor(Math.random() * codeSnippets.length)
                    ];
               setGlitchText(randomSnippet);
               setTimeout(() => setGlitchText(""), 1500);
          }, 2500);

          return () => clearInterval(interval);
     }, []);

     return (
          <section className="relative min-h-screen w-full overflow-hidden bg-gradient-cyberpunk">
               {/* Background Image with Overlay */}
               <div className="absolute inset-0 z-0">
                    <div
                         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                         style={{
                              backgroundImage: 'url("/images/bg.png")',
                         }}
                    />
                    <div
                         className="absolute inset-0 bg-gradient-to-b from-coderun-dark/90 via-coderun-dark-purple/70 to-coderun-dark/90"
                         style={{ opacity: 0.2 }}
                    />
               </div>

               {/* Glitch Code Overlay */}
               <div className="absolute inset-0 z-10 pointer-events-none text-glitch">
                    <div className="absolute top-10 left-10 text-coderun-pink font-mono text-xs opacity-40 ">
                         {"{"}code: "reality"{"}"}
                    </div>
                    <div className="absolute top-32 right-20 text-coderun-purple font-mono text-xs opacity-35 ">
                         function(){`{return dreams;}`}
                    </div>
                    <div className="absolute bottom-40 left-32 text-coderun-pink-light font-mono text-xs opacity-40 ">
                         while(true){`{challenge();}`}
                    </div>
                    <div className="absolute bottom-20 right-10 text-coderun-accent font-mono text-xs opacity-45">
                         const future = await code();
                    </div>
                    <div className="absolute top-1/4 right-1/3 text-coderun-pink font-mono text-xs opacity-35">
                         if(dream.isReal()) {`{hack();}`}
                    </div>
                    <div className="absolute top-3/4 left-1/4 text-coderun-purple font-mono text-xs opacity-30 ">
                         const matrix = new Reality();
                    </div>
                    <div className="absolute top-1/3 left-1/2 text-coderun-pink-light font-mono text-xs opacity-25 ">
                         console.log('Neo awakens');
                    </div>
                    <div className="absolute bottom-1/3 right-1/4 text-coderun-accent font-mono text-xs opacity-40 ">
                         Array.from(∞).forEach(code)
                    </div>
                    <div className="absolute top-20 right-1/2 text-coderun-pink font-mono text-xs opacity-35 ">
                         export default Cyberpunk;
                    </div>
                    <div className="absolute bottom-1/2 left-10 text-coderun-purple font-mono text-xs opacity-30 ">
                         const future = true;
                    </div>

                    {glitchText && (
                         <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 text-coderun-pink font-mono text-sm opacity-50 ">
                              {glitchText}
                         </div>
                    )}
               </div>

               {/* Main Content */}
               <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pt-16">
                    <div className="w-full max-w-7xl mx-auto">
                         {/* Desktop Layout */}
                         <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center lg:justify-items-center">
                              <div className="flex justify-center lg:justify-end">
                                   <div className="relative group">
                                        <Image
                                             src="/images/code.png"
                                             alt="Code"
                                             width={400}
                                             height={200}
                                             className="w-auto h-56 xl:h-72 2xl:h-80 transition-all duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute -inset-4 bg-gradient-to-r from-coderun-pink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                   </div>
                              </div>

                              <div className="flex justify-center">
                                   <div className="relative">
                                        <Image
                                             src="/images/fatacr.PNG"
                                             alt="CodeRun Mascot"
                                             width={700}
                                             height={800}
                                             className="w-auto h-[450px] xl:h-[550px] 2xl:h-[650px] animate-float animate-glow-pulse"
                                        />
                                        <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/30 via-coderun-purple/20 to-transparent opacity-60 blur-2xl animate-pulse" />
                                        <div className="absolute -inset-8 bg-gradient-to-r from-coderun-accent/10 via-coderun-purple/10 to-coderun-pink/10 blur-3xl opacity-80" />
                                   </div>
                              </div>

                              <div className="flex justify-center lg:justify-start">
                                   <div className="relative group">
                                        <Image
                                             src="/images/run.png"
                                             alt="Run"
                                             width={400}
                                             height={200}
                                             className="w-auto h-56 xl:h-72 2xl:h-80 transition-all duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute -inset-4 bg-gradient-to-l from-coderun-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                   </div>
                              </div>
                         </div>

                         {/* Mobile Layout */}
                         <div className="lg:hidden flex flex-col items-center justify-center pt-8">
                              <div className="flex justify-center">
                                   <div
                                        className="relative transition-transform duration-500 ease-out"
                                        style={{
                                             transform: isLogoVisible
                                                  ? "scale(1.25)"
                                                  : "scale(1)",
                                        }}
                                   >
                                        <Image
                                             src="/images/fatacr.PNG"
                                             alt="CodeRun Mascot"
                                             width={350}
                                             height={490}
                                             className="w-auto h-80 sm:h-96 animate-float animate-glow-pulse"
                                        />
                                        <div className="absolute inset-0 bg-gradient-radial from-coderun-pink/40 via-coderun-purple/20 to-transparent opacity-70 blur-xl animate-pulse" />
                                        <div className="absolute -inset-6 bg-gradient-to-r from-coderun-accent/15 via-coderun-purple/15 to-coderun-pink/15 blur-2xl opacity-90" />
                                   </div>
                              </div>

                              <div
                                   ref={logoRef}
                                   className="flex justify-center pt-6"
                              >
                                   <div className="relative group">
                                        <Image
                                             src="/images/logo.png"
                                             alt="CodeRun"
                                             width={400}
                                             height={160}
                                             className="w-auto h-44 sm:h-60 transition-all duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute -inset-4 bg-gradient-to-r from-coderun-pink/10 via-coderun-purple/10 to-coderun-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                                   </div>
                              </div>
                         </div>

                         <div className="flex justify-center mt-12 lg:mt-16">
                              <div className="text-center space-y-6">
                                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                        <span className="block text-coderun-pink-light animate-pulse">
                                             JOIN THE CODERUNNERS
                                        </span>
                                   </h1>
                                   <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 pb-16">
                                        <Link href="#">
                                             <GradientSlideButton
                                                  className="px-12 py-6 text-4xl rounded-3xl bg-black text-white border-2 border-coderun-accent text-glitch hover:scale-110 hover:shadow-lg hover:shadow-coderun-pink/30 active:scale-95"
                                                  colorFrom="#FA58B6"
                                                  colorTo="#7A0BC0"
                                             >
                                                  Înscrie-te
                                             </GradientSlideButton>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coderun-dark to-transparent pointer-events-none z-30" />
          </section>
     );
};

export default HeroSection;
