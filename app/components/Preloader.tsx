// components/Preloader.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css"; // Folosim CSS Modules

interface PreloaderProps {
     onLoaded: () => void; // Funcția callback primită de la ClientLayout
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
     // Stare pentru a controla etapele animației
     const [animationState, setAnimationState] = useState("glowing"); // glowing, effectsAdded, fading

     useEffect(() => {
          // 0s - 1.0s: Textul stă doar cu 'text-glow'

          // 1.0s: Se adaugă 'text-glitch' și 'blinkEffect'
          const timer1 = setTimeout(() => {
               setAnimationState("effectsAdded");
          }, 1500); // Durata fazei "doar glow"

          // 2.5s: Efectele (glitch + blink) se termină. Începe fade-out-ul.
          const timer2 = setTimeout(() => {
               setAnimationState("fading");
          }, 3000);

          // 3.0s: Animația de fade-out (0.5s) s-a terminat. Anunțăm părintele.
          const timer3 = setTimeout(() => {
               onLoaded(); // Apelăm funcția din ClientLayout
          }, 3500);

          // Curățăm timerele
          return () => {
               clearTimeout(timer1);
               clearTimeout(timer2);
               clearTimeout(timer3);
          };
     }, [onLoaded]);

     // Funcție ajutătoare pentru a seta clasa containerului (pentru fade-out)
     const getContainerClass = () => {
          if (animationState === "fading") {
               return `${styles.preloaderContainer} ${styles.fadeOut}`;
          }
          return styles.preloaderContainer;
     };

     // --- MODIFICARE AICI ---
     // Construim dinamic lista de clase pentru elementul text
     const textClasses = [
          styles.largeText, // Clasa pentru font mare din CSS module
          "FontGradient", // Folosim fontul tău custom
     ];

     // Adăugăm clasele în funcție de stare
     if (animationState === "glowing") {
          // Faza 1: Doar 'text-glow'
          textClasses.push("text-glow");
     } else if (
          animationState === "effectsAdded" ||
          animationState === "fading"
     ) {
          // Faza 2 și 3: Eliminăm 'text-glow' și adăugăm 'blink' și 'glitch'
          textClasses.push("text-glitch");
     }
     // --- SFÂRȘIT MODIFICARE ---

     return (
          <div className={getContainerClass()}>
               <div className={textClasses.join(" ")} data-text="CR">
                    Coderun
               </div>
          </div>
     );
};

export default Preloader;
