// components/Footer.tsx (sau calea ta specifică)
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
     Code2,
     Mail,
     Phone,
     MapPin,
     Facebook,
     Instagram,
     Linkedin,
} from "lucide-react";

const Footer = () => {
     const footerLinks = {
          eveniment: [
               { name: "About CodeRun", href: "/#about" },
               { name: "How It Works", href: "/#how-it-works" },
               { name: "Schedule", href: "/#program" },
          ],
          participanti: [
               {
                    name: "Registration",
                    href: "https://docs.google.com/forms/d/e/1FAIpQLSfx3XtM1F7L18XAbPUoHPy0rUSa3Z-Bo3YX-oV9guX-8hf_1Q/viewform?usp=dialog",
               },
               { name: "FAQ", href: "/#faq" },

               { name: "Rules", href: "/documents/regulament.pdf" },
          ],
          contact: [
               { name: "Contact", href: "/pages/Contact" },
               { name: "Partners", href: "/pages/Sponsori" },
          ],
     };

     const socialLinks = [
          {
               name: "Facebook",
               icon: Facebook,
               href: "https://www.facebook.com/BESTcluj/",
          },
          {
               name: "Instagram",
               icon: Instagram,
               href: "https://www.instagram.com/best_clujnapoca?utm_source=ig_web_button_share_sheet&igsh=MTZyaGlyNTloNDM1aA==",
          },
          {
               name: "LinkedIn",
               icon: Linkedin,
               href: "https://www.linkedin.com/company/best-cluj-napoca/",
          },
     ];

     return (
          <>
               <footer className="bg-coderun-dark FontTest text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                         <div className="border-t border-gray-700 mb-6"></div>
                    </div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                              {/* Brand Section */}
                              <div className="lg:col-span-1">
                                   <Link
                                        href="/"
                                        className="flex justify-center items-center space-x-2 mb-4"
                                   >
                                        <Image
                                             src="/images/cdrun.png"
                                             alt="Coderun"
                                             width={0}
                                             height={0}
                                             sizes="100vw"
                                             className=" h-auto w-32 sm:w-38 md:w-40 lg:w-48 hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(250,88,182,0.5)] will-change-transform"
                                        />
                                   </Link>
                                   <p className="text-gray-300 mb-6 leading-relaxed">
                                        A programming challenge that tests your
                                        skills and sparks new connections.
                                   </p>
                                   <div className="flex justify-center space-x-4">
                                        {socialLinks.map((social) => (
                                             <Link
                                                  key={social.name}
                                                  href={social.href}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-gray-400 hover:text-coderun-accent transition-colors"
                                                  aria-label={social.name}
                                             >
                                                  <social.icon className="h-5 w-5" />
                                             </Link>
                                        ))}
                                   </div>
                              </div>

                              {/* Evenimente */}
                              <div>
                                   <h3 className="text-lg FontBold mb-4">
                                        Event
                                   </h3>
                                   <ul className="space-y-3">
                                        {footerLinks.eveniment.map((link) => (
                                             <li key={link.name}>
                                                  <Link
                                                       href={link.href}
                                                       className="text-gray-300 hover:text-white transition-colors"
                                                  >
                                                       {link.name}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>
                              </div>

                              {/* Participanți */}
                              <div>
                                   <h3 className="text-lg FontBold mb-4">
                                        Participants
                                   </h3>
                                   <ul className="space-y-3">
                                        {footerLinks.participanti.map(
                                             (link) => (
                                                  <li key={link.name}>
                                                       {/* --- MODIFICARE --- */}
                                                       {/* Verificăm dacă linkul este cel pentru 'Rules' */}
                                                       {link.name ===
                                                       "Rules" ? (
                                                            <a // Folosim <a> în loc de <Link>
                                                                 href={
                                                                      link.href
                                                                 }
                                                                 target="_blank" // Deschide în tab nou
                                                                 rel="noopener noreferrer"
                                                                 className="text-gray-300 hover:text-white transition-colors"
                                                            >
                                                                 {link.name}
                                                            </a>
                                                       ) : (
                                                            // Pentru celelalte linkuri, folosim <Link> normal
                                                            <Link
                                                                 href={
                                                                      link.href
                                                                 }
                                                                 // Adaugă target="_blank" și rel="..." dacă e link extern (ex: Registration)
                                                                 {...(link.href.startsWith(
                                                                      "http"
                                                                 )
                                                                      ? {
                                                                             target: "_blank",
                                                                             rel: "noopener noreferrer",
                                                                        }
                                                                      : {})}
                                                                 className="text-gray-300 hover:text-white transition-colors"
                                                            >
                                                                 {link.name}
                                                            </Link>
                                                       )}
                                                  </li>
                                             )
                                        )}
                                   </ul>
                              </div>

                              {/* Contact */}
                              <div>
                                   <h3 className="text-lg FontBold mb-4">
                                        Contact
                                   </h3>
                                   <ul className="space-y-3 mb-6">
                                        {footerLinks.contact.map((link) => (
                                             <li key={link.name}>
                                                  <Link
                                                       href={link.href}
                                                       className="text-gray-300 hover:text-white transition-colors"
                                                  >
                                                       {link.name}
                                                  </Link>
                                             </li>
                                        ))}
                                   </ul>

                                   <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex justify-center items-center space-x-2">
                                             <Mail className="h-4 w-4" />
                                             <span>cluj@best-eu.org</span>
                                        </div>
                                        <div className="flex justify-center items-center space-x-2">
                                             <Phone className="h-4 w-4" />
                                             <span>+40 740 151 222</span>
                                        </div>
                                        <div className="flex justify-center items-center space-x-2">
                                             <MapPin className="h-4 w-4" />
                                             <span>Cluj-Napoca, Romania</span>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Linia înainte de © */}
                         <div className="border-t border-gray-700 mt-12 pt-6">
                              <div className="flex flex-col items-center justify-center space-y-4">
                                   <p className="text-gray-400 text-sm text-center">
                                        Copyright © 2025 BEST Cluj-Napoca | All
                                        Rights Reserved
                                   </p>
                              </div>
                         </div>
                    </div>
               </footer>
          </>
     );
};

export default Footer;
