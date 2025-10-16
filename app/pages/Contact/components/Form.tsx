"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Definirea variantelor pentru animatie
const containerVariants: Variants = {
     hidden: { opacity: 0 },
     visible: {
          opacity: 1,
          transition: {
               staggerChildren: 0.2,
          },
     },
};

const itemVariants: Variants = {
     hidden: { opacity: 0, y: 50 },
     visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
     },
};

export default function ContactForm() {
     const form = useRef<HTMLFormElement>(null);
     const [status, setStatus] = useState<string>("");

     const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setStatus("Sending...");

          if (form.current) {
               emailjs
                    .sendForm(
                         "service_o23eu4i", // Service ID
                         "template_ud750gu", // Template ID
                         form.current,
                         "NTzw3WQNN5PX1Hwe-" // Public Key
                    )
                    .then(
                         (result) => {
                              console.log("SUCCESS!", result.text);
                              setStatus("Message sent successfully!");
                              form.current?.reset();
                              setTimeout(() => setStatus(""), 3000);
                         },
                         (error) => {
                              console.log("FAILED...", error.text);
                              setStatus("Failed to send. Try again.");
                              setTimeout(() => setStatus(""), 3000);
                         }
                    );
          }
     };

     return (
          <motion.div
               className="py-24 sm:py-32"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
          >
               <motion.div
                    className="text-center mb-16 px-4"
                    variants={itemVariants}
               >
                    <h2 className="text-4xl sm:text-5xl">
                         <span className="block FontGradient text-coderun-pink-light animate-pulse text-glow">
                              CONTACT US
                         </span>
                    </h2>
                    <p className="mt-2 FontBold text-lg leading-8 text-gray-400">
                         Have a question? We'd love to hear from you.
                    </p>
               </motion.div>

               <motion.div
                    className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 px-4 items-stretch"
                    variants={containerVariants} // Container secundar pentru a anima cardurile
               >
                    {/* --- Formularul de Contact --- */}
                    <motion.div
                         className="group lg:col-span-3"
                         variants={itemVariants}
                    >
                         <div className="relative h-full isolate bg-coderun-dark/40 backdrop-blur-sm p-8 rounded-2xl border border-coderun-purple transition-all duration-300 shadow-[0_0_15px_rgba(122,11,192,1)] group-hover:border-coderun-pink group-hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]">
                              <form
                                   ref={form}
                                   onSubmit={sendEmail}
                                   className="flex flex-col h-full"
                              >
                                   <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 flex-grow">
                                        <div>
                                             <label
                                                  htmlFor="first-name"
                                                  className="block text-sm FontBold leading-6 text-gray-200"
                                             >
                                                  First name
                                             </label>
                                             <div className="mt-2.5">
                                                  <input
                                                       id="first-name"
                                                       name="from_first_name"
                                                       type="text"
                                                       autoComplete="given-name"
                                                       required
                                                       className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-coderun-purple/50 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-coderun-pink sm:text-sm sm:leading-6"
                                                  />
                                             </div>
                                        </div>
                                        <div>
                                             <label
                                                  htmlFor="last-name"
                                                  className="block text-sm FontBold leading-6 text-gray-200"
                                             >
                                                  Last name
                                             </label>
                                             <div className="mt-2.5">
                                                  <input
                                                       id="last-name"
                                                       name="from_last_name"
                                                       type="text"
                                                       autoComplete="family-name"
                                                       required
                                                       className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-coderun-purple/50 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-coderun-pink sm:text-sm sm:leading-6"
                                                  />
                                             </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                             <label
                                                  htmlFor="email"
                                                  className="block text-sm FontBold leading-6 text-gray-200"
                                             >
                                                  Email
                                             </label>
                                             <div className="mt-2.5">
                                                  <input
                                                       id="email"
                                                       name="reply_to"
                                                       type="email"
                                                       autoComplete="email"
                                                       required
                                                       className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-coderun-purple/50 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-coderun-pink sm:text-sm sm:leading-6"
                                                  />
                                             </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                             <label
                                                  htmlFor="message"
                                                  className="block text-sm FontBold leading-6 text-gray-200"
                                             >
                                                  Message
                                             </label>
                                             <div className="mt-2.5">
                                                  <textarea
                                                       id="message"
                                                       name="message"
                                                       rows={4}
                                                       required
                                                       className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-coderun-purple/50 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-coderun-pink sm:text-sm sm:leading-6"
                                                       defaultValue={""}
                                                  />
                                             </div>
                                        </div>
                                   </div>
                                   <div className="mt-10">
                                        <GradientSlideButton
                                             type="submit"
                                             className="w-full FontBold rounded-md bg-coderun-dark text-white border-2 border-coderun-purple hover:border-coderun-pink transition-all duration-300 shadow-lg shadow-coderun-purple/20 hover:shadow-coderun-pink/30"
                                             colorFrom="#FA58B6"
                                             colorTo="#7A0BC0"
                                        >
                                             {status || "Let's talk"}
                                        </GradientSlideButton>
                                   </div>
                              </form>
                         </div>
                    </motion.div>

                    {/* --- Cardul de Contact --- */}
                    <motion.div
                         className="group lg:col-span-2"
                         variants={itemVariants}
                    >
                         <div className="relative h-full isolate bg-coderun-dark/40 backdrop-blur-sm p-8 rounded-2xl border border-coderun-purple transition-all duration-300 shadow-[0_0_15px_rgba(122,11,192,1)] group-hover:border-coderun-pink group-hover:shadow-[0_0_25px_rgba(250,88,182,0.7)]">
                              <div className="flex flex-col justify-center items-center h-full text-center">
                                   <h3 className="text-3xl FontBold text-coderun-pink-light mb-8 text-glow">
                                        Get in Touch
                                   </h3>
                                   <div className="space-y-6 inline-flex flex-col items-start">
                                        <a
                                             href="mailto:cluj@best-eu.org"
                                             className="flex items-center gap-4 group/item"
                                        >
                                             <Mail className="w-6 h-6 text-coderun-pink group-hover/item:text-coderun-pink-light transition-colors" />
                                             <span className="text-gray-300 FontBold group-hover/item:text-white transition-colors">
                                                  cluj@best-eu.org
                                             </span>
                                        </a>
                                        <div className="flex items-center gap-4">
                                             <Phone className="w-6 h-6 text-coderun-pink" />
                                             <span className="text-gray-300 FontBold">
                                                  +40 123 456 789
                                             </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                             <MapPin className="w-6 h-6 text-coderun-pink" />
                                             <span className="text-gray-300 FontBold">
                                                  Cluj-Napoca, Romania
                                             </span>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </motion.div>
               </motion.div>
          </motion.div>
     );
}
