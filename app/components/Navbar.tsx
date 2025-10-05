import {
     Disclosure,
     DisclosureButton,
     DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import { ShuffleButton } from "@/components/ui/shuffle-button";

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

export default function Navbar() {
     return (
          <Disclosure
               as="nav"
               className="fixed top-0 left-0 w-full z-50 bg-gray-800/50 backdrop-blur-md after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
          >
               <div className="max-w-8xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center">
                         {/* Buton Hamburger (vizibil doar pe mobil/tabletă, poziționat absolut) */}
                         <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white">
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
                                   <a href="#">
                                        <img
                                             alt="Coderun Logo"
                                             src="./images/logo.png"
                                             className="h-14 w-auto"
                                        />
                                   </a>
                              </div>

                              {/* --- LAYOUT PENTRU DESKTOP (>1024px) --- */}
                              {/* Sistem de 3 coloane egale, vizibil doar pe ecrane mari */}
                              <div className="hidden w-full items-center lg:flex">
                                   {/* Coloana 1: Logo (aliniat la stânga) */}
                                   <div className="flex-1 justify-start">
                                        <a href="#">
                                             <img
                                                  alt="Coderun Logo"
                                                  src="./images/logo.png"
                                                  className="h-14 w-auto"
                                             />
                                        </a>
                                   </div>

                                   {/* Coloana 2: Navigația (aliniată pe centru) */}
                                   <div className="flex flex-1 justify-center items-center space-x-4">
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
                                                            ? "bg-gray-950/50 text-white"
                                                            : "text-gray-300 hover:bg-white/5 hover:text-white",
                                                       "rounded-md px-3 py-2 text-md font-medium text-center"
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
                                                  className="rounded-3xl bg-black text-white border-2 border-fuchsia-500"
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
               <DisclosurePanel className="lg:hidden">
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
                                             ? "bg-gray-950/50 text-white"
                                             : "text-gray-300 hover:bg-white/5 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium text-center"
                                   )}
                              >
                                   {item.name}
                              </DisclosureButton>
                         ))}
                         <div className="px-8 pt-4">
                              <Link href="#">
                                   <GradientSlideButton
                                        className="w-full rounded-3xl bg-black text-white border-2 border-fuchsia-500"
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
}
