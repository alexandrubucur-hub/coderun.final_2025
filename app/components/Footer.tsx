import React from "react";
import Link from "next/link";
import {
     Code2,
     Mail,
     Phone,
     MapPin,
     Facebook,
     Twitter,
     Instagram,
     Linkedin,
} from "lucide-react";

const Footer = () => {
     const footerLinks = {
          evenimente: [
               { name: "Despre CodeRun", href: "/despre" },
               { name: "Cum funcționează", href: "/cum-functioneaza" },
               { name: "Program", href: "/program" },
               { name: "Premii", href: "/premii" },
          ],
          participanti: [
               { name: "Înscriere", href: "/inscriere" },
               { name: "Guidelines", href: "/cum-functioneaza/guidelines" },
               { name: "FAQ", href: "/faq" },
               { name: "Regulament", href: "/cum-functioneaza/regulament" },
          ],
          contact: [
               { name: "Contact", href: "/contact" },
               { name: "Parteneri", href: "/parteneri" },
               { name: "Suport", href: "/contact" },
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
               {/* Linia delimitatoare față de conținut */}
               <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="border-t border-gray-700 mb-6"></div>
               </div>

               <footer className="bg-coderun-dark text-white">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                              {/* Brand Section */}
                              <div className="lg:col-span-1">
                                   <Link
                                        href="/"
                                        className="flex justify-center items-center space-x-2 mb-4"
                                   >
                                        <Code2 className="h-8 w-8 text-coderun-accent" />
                                        <span className="text-xl font-bold">
                                             CodeRun
                                        </span>
                                   </Link>
                                   <p className="text-gray-300 mb-6 leading-relaxed">
                                        Evenimentul tech care îți testează
                                        limitele și îți oferă șansa să te
                                        conectezi cu cei mai buni developeri.
                                   </p>
                                   <div className="flex justify-center space-x-4">
                                        {socialLinks.map((social) => (
                                             <a
                                                  key={social.name}
                                                  href={social.href}
                                                  className="text-gray-400 hover:text-coderun-accent transition-colors"
                                                  aria-label={social.name}
                                             >
                                                  <social.icon className="h-5 w-5" />
                                             </a>
                                        ))}
                                   </div>
                              </div>

                              {/* Evenimente */}
                              <div>
                                   <h3 className="text-lg font-semibold mb-4">
                                        Evenimente
                                   </h3>
                                   <ul className="space-y-3">
                                        {footerLinks.evenimente.map((link) => (
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
                                   <h3 className="text-lg font-semibold mb-4">
                                        Participanți
                                   </h3>
                                   <ul className="space-y-3">
                                        {footerLinks.participanti.map(
                                             (link) => (
                                                  <li key={link.name}>
                                                       <Link
                                                            href={link.href}
                                                            className="text-gray-300 hover:text-white transition-colors"
                                                       >
                                                            {link.name}
                                                       </Link>
                                                  </li>
                                             )
                                        )}
                                   </ul>
                              </div>

                              {/* Contact */}
                              <div>
                                   <h3 className="text-lg font-semibold mb-4">
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
                                             <span>+40 123 456 789</span>
                                        </div>
                                        <div className="flex justify-center items-center space-x-2">
                                             <MapPin className="h-4 w-4" />
                                             <span>Cluj-Napoca, România</span>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         {/* Linia înainte de © */}
                         <div className="border-t border-gray-700 mt-12 pt-6">
                              <div className="flex flex-col items-center justify-center space-y-4">
                                   <p className="text-gray-400 text-sm text-center">
                                        © 2025 CodeRun. Toate drepturile
                                        rezervate.
                                   </p>
                              </div>
                         </div>
                    </div>
               </footer>
          </>
     );
};

export default Footer;
