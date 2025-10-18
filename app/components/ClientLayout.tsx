// components/ClientLayout.tsx
"use client"; // Marcăm ca și Client Component

import { useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Preloader from "./Preloader"; // Asigură-te că calea e corectă

export default function ClientLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     // Stare pentru a controla afișarea preloader-ului
     const [isLoading, setIsLoading] = useState(true);

     // Funcție callback pe care o va apela Preloader-ul când termină animația
     const handlePreloaderLoaded = () => {
          setIsLoading(false); // Ascunde preloader-ul și afișează conținutul
     };

     return (
          <>
               {/* Afișăm Preloader-ul DOAR cât timp isLoading este true.
        În acest timp, <link rel="preload"> din layout.tsx încarcă /images/bg.png.
      */}
               {isLoading && <Preloader onLoaded={handlePreloaderLoaded} />}

               {/* Afișăm conținutul (children) DOAR DUPĂ ce isLoading este false.
        Când Hero.tsx se va randa, /images/bg.png va fi deja în cache.
      */}
               {!isLoading && (
                    <div style={{ willChange: "scroll-position" }}>
                         <LazyMotion features={domAnimation}>
                              {children}
                         </LazyMotion>
                    </div>
               )}
          </>
     );
}
