"use client";
import React from "react";
import {
     Disclosure,
     DisclosureButton,
     DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";

const navigation = [
     { name: "Acasă", href: "#", current: false },
     { name: "Despre", href: "#about", current: false },
     { name: "Cum funcționează", href: "#how-it-works", current: false },
     { name: "Program", href: "#program", current: false },
     { name: "Parteneri", href: "#partners", current: false },
     { name: "Premii", href: "#awards", current: false },
     { name: "FAQ", href: "#faq", current: false },
     { name: "Contact", href: "#contact", current: false },
];

function classNames(...classes: string[]) {
     return classes.filter(Boolean).join(" ");
}

const Navbar: React.FC = () => {
     return (
          <Disclosure
               as="nav"
               className="fixed top-0 left-0 w-full z-50 bg-coderun-dark/70 backdrop-blur-xl border-b border-coderun-purple/20 shadow-lg shadow-coderun-purple/10"
          >
               <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center">
                         {/* Buton Hamburger (vizibil doar pe mobil/tabletă, poziționat absolut) */}
                         <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-coderun-purple/20 hover:text-coderun-pink transition-all duration-300 focus:ring-2 focus:ring-inset focus:ring-coderun-accent">
                                   <span className="absolute -inset-0.5" />
                                   <span className="sr-only">
                                        Open main menu
                                   </span>
                                   <Bars3Icon
                                        aria-hidden="true"
                                        className="block h-6 w-6 group-open:hidden"
                                   />
                                   <XMarkIcon
                                        aria-hidden="true"
                                        className="hidden h-6 w-6 group-open:block"
                                   />
                              </DisclosureButton>
                         </div>

                         {/* Container Principal pentru layout - ocupă toată lățimea */}
                         <div className="flex flex-1 items-center justify-center">
                              {/* --- LAYOUT PENTRU MOBIL & TABLETĂ (<1024px) --- */}
                              {/* Logo centrat, vizibil doar pe ecrane mici */}
                              <div className="flex flex-shrink-0 items-center lg:hidden">
                                   <a
                                        href="#"
                                        className="transition-transform duration-300 hover:scale-105"
                                   >
                                        <img
                                             alt="Coderun Logo"
                                             src="./images/logo.png"
                                             className="h-16 w-auto filter drop-shadow-lg"
                                        />
                                   </a>
                              </div>

                              {/* --- LAYOUT PENTRU DESKTOP (>1024px) --- */}
                              {/* Sistem de 3 coloane egale, vizibil doar pe ecrane mari */}
                              <div className="hidden w-full items-center lg:flex">
                                   {/* Coloana 1: Logo (aliniat la stânga) */}
                                   <div className="flex-1 justify-start">
                                        <a
                                             href="#"
                                             className="transition-transform duration-300 hover:scale-105"
                                        >
                                             <img
                                                  alt="Coderun Logo"
                                                  src="./images/logo.png"
                                                  className="h-16 w-auto filter drop-shadow-lg"
                                             />
                                        </a>
                                   </div>

                                   {/* Coloana 2: Navigația (aliniată pe centru) */}
                                   <div className="flex flex-1 justify-center items-center space-x-6">
                                        {navigation.map((item) => (
                                             <a
                                                  key={item.name}
                                                  href={item.href}
                                                  aria-current={
                                                       item.current
                                                            ? "page"
                                                            : undefined
                                                  }
                                                  className={classNames(
                                                       item.current
                                                            ? "bg-coderun-purple/30 text-coderun-pink border-b-2 border-coderun-accent"
                                                            : "text-gray-300 hover:bg-coderun-purple/20 hover:text-coderun-pink-light border-b-2 border-transparent hover:border-coderun-purple/50",
                                                       "rounded-lg px-4 py-2 text-sm font-medium text-center transition-all duration-300 backdrop-blur-sm"
                                                  )}
                                             >
                                                  {item.name}
                                             </a>
                                        ))}
                                   </div>

                                   {/* Coloana 3: Buton (aliniat la dreapta) */}
                                   <div className="flex flex-1 justify-end items-center min-w-0">
                                        <Link href="#">
                                             <GradientSlideButton
                                                  className="rounded-full bg-black text-white border-2 border-coderun-accent hover:border-coderun-pink transition-all duration-300 shadow-lg shadow-coderun-purple/20 hover:shadow-coderun-pink/30"
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

               {/* --- Meniul mobil (Sidebar) --- */}
               <DisclosurePanel className="lg:hidden bg-coderun-dark/95 backdrop-blur-xl border-t border-coderun-purple/30">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                         {navigation.map((item) => (
                              <DisclosureButton
                                   key={item.name}
                                   as="a"
                                   href={item.href}
                                   aria-current={
                                        item.current ? "page" : undefined
                                   }
                                   className={classNames(
                                        item.current
                                             ? "bg-coderun-purple/40 text-coderun-pink border-l-4 border-coderun-accent"
                                             : "text-gray-300 hover:bg-coderun-purple/20 hover:text-coderun-pink-light border-l-4 border-transparent hover:border-coderun-purple/50",
                                        "block rounded-md px-3 py-3 text-base font-medium text-center transition-all duration-300"
                                   )}
                              >
                                   {item.name}
                              </DisclosureButton>
                         ))}
                         <div className="px-8 pt-6">
                              <Link href="#">
                                   <GradientSlideButton
                                        className="w-full rounded-full bg-black text-white border-2 border-coderun-accent hover:border-coderun-pink transition-all duration-300 shadow-lg shadow-coderun-purple/20"
                                        colorFrom="#FA58B6"
                                        colorTo="#7A0BC0"
                                   >
                                        Înscrie-te
                                   </GradientSlideButton>
                              </Link>
                         </div>
                    </div>
               </DisclosurePanel>
          </Disclosure>
     );
};

export default Navbar;
