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
               "O scurtă descriere a companiei Sponsor 1 și implicarea lor.",
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
