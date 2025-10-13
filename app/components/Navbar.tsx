"use client";
import React from "react";
import {
     Disclosure,
     DisclosureButton,
     DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";

const navigation = [
     { name: "Acasă", href: "#", current: false },
     { name: "Despre", href: "#about", current: false },
     { name: "Cum funcționează", href: "#how-it-works", current: false },
     { name: "Program", href: "#program", current: false },
     { name: "FAQ", href: "#faq", current: false },
     { name: "Parteneri", href: "#partners", current: false },
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
                         {/* Buton Hamburger */}
                         <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                              <DisclosureButton
                                   className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition-all duration-300 group
                     before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-coderun-pink before:to-coderun-purple before:opacity-0 before:blur before:transition-opacity before:duration-300
                     hover:before:opacity-40 hover:scale-105
                     shadow-[0_0_10px_rgba(122,11,192,0.2)] hover:shadow-[0_0_20px_rgba(250,88,182,0.5)]
                     "
                              >
                                   <span className="sr-only">
                                        Open main menu
                                   </span>
                                   <Bars3Icon
                                        aria-hidden="true"
                                        className="block h-6 w-6 group-open:hidden relative z-10 drop-shadow-[0_0_6px_rgba(250,88,182,0.6)]"
                                   />
                                   <XMarkIcon
                                        aria-hidden="true"
                                        className="hidden h-6 w-6 group-open:block relative z-10 drop-shadow-[0_0_6px_rgba(250,88,182,0.6)]"
                                   />
                              </DisclosureButton>
                         </div>

                         {/* Container Principal */}
                         <div className="flex flex-1 items-center justify-center">
                              {/* Logo Mobile */}
                              <div className="flex flex-shrink-0 items-center lg:hidden">
                                   <Link
                                        href="#"
                                        className="relative transition-transform duration-500 hover:scale-105"
                                   >
                                        <div className="absolute -inset-2 bg-gradient-to-r from-coderun-pink/20 via-coderun-purple/20 to-coderun-pink/20 opacity-0 hover:opacity-70 blur-lg rounded-2xl transition-opacity duration-500" />
                                        <Image
                                             src="/images/logo.png"
                                             alt="Coderun Logo"
                                             width={200}
                                             height={64}
                                             className="h-16 w-auto relative z-10 drop-shadow-[0_0_6px_rgba(250,88,182,0.5)]"
                                        />
                                   </Link>
                              </div>

                              {/* Layout Desktop */}
                              <div className="hidden w-full items-center justify-between lg:flex">
                                   {/* Logo Stânga */}
                                   <div className="flex flex-shrink-0 items-center">
                                        <Link
                                             href="#"
                                             className="relative transition-transform duration-500 hover:scale-105"
                                        >
                                             <div className="absolute -inset-2 bg-gradient-to-r from-coderun-pink/20 via-coderun-purple/20 to-coderun-pink/20 opacity-0 hover:opacity-70 blur-lg rounded-2xl transition-opacity duration-500" />
                                             <Image
                                                  src="/images/logo.png"
                                                  alt="Coderun Logo"
                                                  width={200}
                                                  height={64}
                                                  className="h-16 w-auto relative z-10 drop-shadow-[0_0_6px_rgba(250,88,182,0.5)]"
                                             />
                                        </Link>
                                   </div>

                                   {/* Navigare Centru - am adăugat și spațiere responsivă pentru o tranziție mai lină */}
                                   <div className="flex items-center space-x-2 xl:space-x-6">
                                        {navigation.map((item) => (
                                             <Link
                                                  key={item.name}
                                                  href={item.href}
                                                  aria-current={
                                                       item.current
                                                            ? "page"
                                                            : undefined
                                                  }
                                                  className={classNames(
                                                       "relative inline-flex items-center justify-center text-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group whitespace-nowrap", // Am adăugat whitespace-nowrap
                                                       "text-gray-300 hover:text-white",
                                                       "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-coderun-pink before:to-coderun-purple before:opacity-0 before:blur before:transition-opacity before:duration-300",
                                                       "hover:before:opacity-40 hover:scale-105",
                                                       "shadow-[0_0_10px_rgba(122,11,192,0.2)] hover:shadow-[0_0_20px_rgba(250,88,182,0.5)]"
                                                  )}
                                             >
                                                  <span className="relative z-10 drop-shadow-[0_0_6px_rgba(250,88,182,0.6)]">
                                                       {item.name}
                                                  </span>
                                             </Link>
                                        ))}
                                   </div>

                                   {/* Buton Dreapta */}
                                   <div className="flex flex-shrink-0 items-center">
                                        <Link href="#">
                                             <GradientSlideButton
                                                  className="rounded-full bg-coderun-dark text-white border-2 border-coderun-accent hover:border-coderun-purple transition-all duration-300 shadow-lg shadow-coderun-purple/20 hover:shadow-coderun-pink/30"
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

               {/* Meniu mobil */}
               <DisclosurePanel className="lg:hidden bg-coderun-dark/95 backdrop-blur-xl border-t border-coderun-purple/30">
                    <div className="space-y-1 px-8 pb-3 pt-2">
                         {navigation.map((item) => (
                              <DisclosureButton
                                   key={item.name}
                                   as={Link}
                                   href={item.href}
                                   aria-current={
                                        item.current ? "page" : undefined
                                   }
                                   className={classNames(
                                        item.current
                                             ? "bg-coderun-purple/40 text-coderun-pink border-l-4 border-coderun-accent"
                                             : "text-gray-300 hover:text-white hover:bg-coderun-purple/20 border-l-4 border-transparent hover:border-coderun-purple/50 hover:shadow-[0_0_15px_rgba(250,88,182,0.4)]",
                                        "flex justify-center rounded-md px-3 py-3 text-base font-medium transition-all duration-300"
                                   )}
                              >
                                   {item.name}
                              </DisclosureButton>
                         ))}
                         <div className="pt-6">
                              <Link href="#" className="block">
                                   <GradientSlideButton
                                        className="w-full rounded-full bg-coderun-dark text-white border-2 border-coderun-purple hover:border-coderun-pink transition-all duration-300 shadow-lg shadow-coderun-purple/20 hover:shadow-coderun-pink/30"
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
