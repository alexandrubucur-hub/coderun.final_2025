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
               "We are HEITS Digital, a technology company built on our strong belief in the power of innovation and people. We are a team of about 100 skilled professionals working across Romania, with offices in Cluj-Napoca and Iasi, and many colleagues collaborating remotely. Together, we bring deep expertise in AI & ML, software development, and UI/UX design, with an average experience of more than 12 years. What defines us is how we place people at the center of everything we do, alongside our focus on cutting-edge technology. We nurture a culture of collaboration, creativity, and sustainable growth, and we’re proud of the strong partnerships and long-lasting client relationships we’ve built. For us, innovation means solving real problems and delivering measurable impact. We craft projects with empathy and respect, aiming to create solutions that truly make a difference for our clients and their customers. We specialize in building custom digital products for fast-growing tech companies, blending technology and human insight to deliver real value. Whether working from our offices or remotely, we share the same commitment: turning bold ideas into impactful solutions — because at HEITS, innovation always meets care for people.",
     },
     {
          name: "Sponsor 2",
          logoUrl: "/images/sponsors/logo2.png",
          websiteUrl: "https://www.sponsor2.com",
          description:
               "Ce face Sponsor 2 și de ce sprijină evenimentul nostru.",
     },
     {
          name: "Sponsor 3",
          logoUrl: "/images/sponsors/logo3.png",
          websiteUrl: "https://www.sponsor3.com",
          description: "Mulțumim Sponsor 3 pentru contribuția lor valoroasă.",
     },
     {
          name: "Sponsor 4",
          logoUrl: "/images/sponsors/logo4.png",
          websiteUrl: "https://www.sponsor4.com",
          description: "Mulțumim Sponsor 4 pentru contribuția lor valoroasă.",
     },
     {
          name: "Sponsor 5",
          logoUrl: "/images/sponsors/logo5.png",
          websiteUrl: "https://www.sponsor5.com",
          description: "Mulțumim Sponsor 5 pentru contribuția lor valoroasă.",
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
                    className="max-w-7xl mx-auto flex flex-wrap justify-center items-start gap-8 px-4"
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
