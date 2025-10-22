"use client";

import React, { useState, useEffect } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
     onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
     // Stare pentru a controla etapele animației
     const [animationState, setAnimationState] = useState("glowing");

     useEffect(() => {
          // 1.0s: Se adaugă 'text-glitch' și 'blinkEffect'
          const timer1 = setTimeout(() => {
               setAnimationState("effectsAdded");
          }, 1500);

          // 2.5s: Efectele (glitch + blink) se termină. Începe fade-out-ul.
          const timer2 = setTimeout(() => {
               setAnimationState("fading");
          }, 3000);

          // 3.0s: Animația de fade-out (0.5s) s-a terminat. Anunțăm părintele.
          const timer3 = setTimeout(() => {
               onLoaded();
          }, 3500);

          // Curățăm timerele
          return () => {
               clearTimeout(timer1);
               clearTimeout(timer2);
               clearTimeout(timer3);
          };
     }, [onLoaded]);

     const getContainerClass = () => {
          if (animationState === "fading") {
               return `${styles.preloaderContainer} ${styles.fadeOut}`;
          }
          return styles.preloaderContainer;
     };

     const textClasses = [styles.largeText, "FontPre"];

     if (animationState === "glowing") {
          textClasses.push("text-glow");
     } else if (
          animationState === "effectsAdded" ||
          animationState === "fading"
     ) {
          textClasses.push("text-glitch");
     }

     return (
          <div className={getContainerClass()}>
               <div className={textClasses.join(" ")} data-text="CR">
                    CodeRun
               </div>
          </div>
     );
};

export default Preloader;
