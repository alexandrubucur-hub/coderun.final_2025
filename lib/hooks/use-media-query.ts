// lib/hooks/use-media-query.ts
"use client";

import { useState, useEffect } from "react";

/**
 * Hook custom pentru a verifica un media query CSS.
 * Returnează `true` dacă query-ul se potrivește, `false` altfel.
 * Este 'safe' pentru SSR (Server-Side Rendering) - va returna `false` pe server.
 * @param query String-ul media query (ex: '(max-width: 768px)')
 */
export const useMediaQuery = (query: string): boolean => {
     const [matches, setMatches] = useState(false);

     useEffect(() => {
          // Asigură-te că rulează doar pe client, unde 'window' există
          if (typeof window === "undefined") {
               return;
          }

          const media = window.matchMedia(query);

          // Setează starea inițială
          if (media.matches !== matches) {
               setMatches(media.matches);
          }

          // Listener pentru schimbări (ex: redimensionare, rotire)
          const listener = () => {
               setMatches(media.matches);
          };

          // Adaugă noul listener (metoda modernă)
          try {
               media.addEventListener("change", listener);
          } catch (e) {
               // Fallback pentru browsere mai vechi
               media.addListener(listener);
          }

          // Curăță listener-ul la unmount
          return () => {
               try {
                    media.removeEventListener("change", listener);
               } catch (e) {
                    // Fallback pentru browsere mai vechi
                    media.removeListener(listener);
               }
          };
     }, [matches, query]);

     return matches;
};
