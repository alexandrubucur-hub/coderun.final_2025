// app/sponsori/components/SponsorsList.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import SponsorCard from "./SponsorCard";

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

const sponsorData = [
     {
          name: "Heits Digital",
          logoUrl: "/images/sponsors/heits.svg",
          websiteUrl: "https://heits.digital/",
          description:
               "We are HEITS Digital, a technology company built on our strong belief in the power of innovation and people.\nWe are a team of about 100 skilled professionals working across Romania, with offices in Cluj-Napoca and Iasi, and many colleagues collaborating remotely. Together, we bring deep expertise in AI & ML, software development, and UI/UX design, with an average experience of more than 12 years.\nWhat defines us is how we place people at the center of everything we do, alongside our focus on cutting-edge technology. We nurture a culture of collaboration, creativity, and sustainable growth, and we’re proud of the strong partnerships and long-lasting client relationships we’ve built.\nFor us, innovation means solving real problems and delivering measurable impact. We craft projects with empathy and respect, aiming to create solutions that truly make a difference for our clients and their customers.\nWe specialize in building custom digital products for fast-growing tech companies, blending technology and human insight to deliver real value. Whether working from our offices or remotely, we share the same commitment: turning bold ideas into impactful solutions - because at HEITS, innovation always meets care for people.",
     },
     {
          name: "Cloudflight",
          logoUrl: "/images/sponsors/clf.svg",
          websiteUrl: "https://register.codingcontest.org/",
          description:
               "In short, we build custom software solutions.\nWe are committed to making a digital difference, a difference that impacts businesses and society alike, driven by our love for technology and our dedication to sparking the brightest ideas in ourselves and others.\nTogether, as an experienced team of brilliant professionals, we collaborate to create value-driven custom software solutions. Our mission goes beyond simply completing projects; we offer full support and guidance to our customers, ensuring we are true partners for them.\nThis November 14th, our beloved Cloudflight Coding Contest (CCC) celebrates its 41st edition.\nWith fresh challenges and the #data/ai track making a comeback, we’re bringing back the same excitement and energy that have fueled our continuous growth.\nRegister for free now at register.codingcontest.org and join the biggest on-site coding challenge in Europe. Don’t miss your chance to compete, connect, and code with thousands of tech enthusiasts across the globe!",
     },
     {
          name: "Uniqa",
          logoUrl: "/images/sponsors/uniqa.png",
          websiteUrl: "https://www.uniqasoftware.ro/",
          description:
               "UNIQA Software Services, founded in 2006, delivers integrated IT and software solutions exclusively for UNIQA Insurance Group, combining nearshoring agility with deep domain expertise.",
     },
     {
          name: "Deviqon Labs",
          logoUrl: "/images/sponsors/deviqon.svg",
          websiteUrl: "https://www.deviqon.com/",
          description:
               "Deviqon Labs is a software services company headquartered in Cluj-Napoca, Romania. We stand out through the quality of the software we deliver, the dedication shown while crafting it and our deep rooted respect for our clients. Our approach to software engineering combines strong technical know-how, Agile delivery methods and a blend of code quality practices and metrics. Our innate communication skills, cultural affinity and the passion of our people, enable us to deliver real value for our customers.\nDeviqon Labs was established in 2019, when a handful of software engineers working together aimed at setting up a business in new emerging fields. We believe that the future will be shaped by technologies like video streaming, IoT, automation, robotics and AI. This makes our mission clear, which is to become a truly global and fully integrated services provider for IT related needs in those fields. This focus positions us well to provide cutting-edge solutions to clients in these rapidly growing fields.\nClient-centric approach: Our emphasis on quality, dedication, and respect for clients shows a commitment to building strong relationships and delivering successful projects. Teamwork and passion: We put the spotlight on the skills and passion of our people emphasizing the importance of collaboration and dedication within our company culture.",
     },
];

interface SponsorsListProps {
     isInView: boolean;
}

export default function SponsorsList({ isInView }: SponsorsListProps) {
     return (
          <motion.div
               className="py-32"
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
                         <span
                              className={`block FontGradient text-coderun-pink-light animate-pulse ${
                                   isInView ? "text-glow" : ""
                              }`}
                         >
                              OUR SPONSORS
                         </span>
                    </h2>
                    <p className="mt-2 FontBold text-lg leading-8 text-gray-400">
                         We are grateful for the support of our partners.
                    </p>
               </motion.div>

               {/* --- Grila de Sponsori --- */}
               <motion.div
                    className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 justify-items-center items-start gap-8 px-4"
                    variants={containerVariants}
               >
                    {sponsorData.map((sponsor) => (
                         <SponsorCard
                              key={sponsor.name}
                              name={sponsor.name}
                              logoUrl={sponsor.logoUrl}
                              websiteUrl={sponsor.websiteUrl}
                              description={sponsor.description}
                              variants={itemVariants}
                         />
                    ))}
               </motion.div>
          </motion.div>
     );
}
