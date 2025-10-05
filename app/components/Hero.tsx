import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Trophy } from "lucide-react";

const Hero = () => {
     return (
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-coderun-dark via-slate-900 to-coderun-secondary">
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
               </div>

               {/* Animated Background Elements */}
               <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-coderun-accent/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-coderun-primary/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-coderun-accent/10 rounded-full blur-2xl animate-ping" />
               </div>

               <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                         {/* Main Heading */}
                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                              Testează-ți limitele în
                              <span className="bg-gradient-to-r from-coderun-accent to-coderun-primary bg-clip-text text-transparent">
                                   {" "}
                                   CodeRun!
                              </span>
                         </h1>

                         {/* Subtitle */}
                         <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                              Evenimentul tech care îți aduce cele mai mari
                              provocări de programare și șansa să te conectezi
                              cu cei mai buni developeri din România.
                         </p>

                         {/* Quick Info Pills */}
                         <div className="flex flex-wrap justify-center gap-4 mb-10">
                              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                   <Calendar className="h-5 w-5 text-coderun-accent" />
                                   <span className="text-sm font-medium">
                                        15-16 Mai 2024
                                   </span>
                              </div>
                              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                   <MapPin className="h-5 w-5 text-coderun-accent" />
                                   <span className="text-sm font-medium">
                                        București
                                   </span>
                              </div>
                              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white">
                                   <Trophy className="h-5 w-5 text-coderun-accent" />
                                   <span className="text-sm font-medium">
                                        Premii 50.000 RON
                                   </span>
                              </div>
                         </div>

                         {/* CTA Buttons */}
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                              <Link
                                   href="/inscriere"
                                   className="group inline-flex items-center space-x-2 bg-coderun-primary hover:bg-coderun-secondary text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                              >
                                   <span>Înscrie-te acum</span>
                                   <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                              </Link>

                              <Link
                                   href="/despre"
                                   className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 border border-white/20 hover:border-white/30"
                              >
                                   <span>Află mai multe</span>
                              </Link>
                         </div>

                         {/* Stats */}
                         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                              <div>
                                   <div className="text-3xl md:text-4xl font-bold text-coderun-accent mb-2">
                                        500+
                                   </div>
                                   <div className="text-gray-300">
                                        Participanți
                                   </div>
                              </div>
                              <div>
                                   <div className="text-3xl md:text-4xl font-bold text-coderun-accent mb-2">
                                        24h
                                   </div>
                                   <div className="text-gray-300">
                                        De provocări
                                   </div>
                              </div>
                              <div>
                                   <div className="text-3xl md:text-4xl font-bold text-coderun-accent mb-2">
                                        20+
                                   </div>
                                   <div className="text-gray-300">
                                        Parteneri
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Scroll Indicator */}
               <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                         <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
                    </div>
               </div>
          </section>
     );
};

export default Hero;
