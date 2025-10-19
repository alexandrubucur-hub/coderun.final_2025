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
          if (typeof window === "undefined") {
               return;
          }

          const media = window.matchMedia(query);

          if (media.matches !== matches) {
               setMatches(media.matches);
          }

          const listener = () => {
               setMatches(media.matches);
          };

          try {
               media.addEventListener("change", listener);
          } catch (e) {
               media.addListener(listener);
          }

          return () => {
               try {
                    media.removeEventListener("change", listener);
               } catch (e) {
                    media.removeListener(listener);
               }
          };
     }, [matches, query]);

     return matches;
};
