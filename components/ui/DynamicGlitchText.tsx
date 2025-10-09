// components/ui/DynamicGlitchText.tsx

"use client";

import { useState, useEffect } from "react";

// O listă de texte specifică pentru această componentă
const codeSnippets = [
     `System.out.println("Join us!");`,
     `git commit -m "Create new reality"`,
     `SELECT * FROM dreams WHERE real = true;`,
     `[Initializing consciousness upload...]`,
     `...breaking the loop...`,
     `#DEFINE REALITY 0`,
     `return new World();`,
     `System ready. Awaiting command.`,
     `Challenge everything.`,
     `// Access violation at 0x...`,
     `ping reality -t`,
     `function hackTheMatrix() {`,
     `const reality = new Simulation();`,
     `if (you.canCode()) {`,
     `while(true) { dream(); }`,
     `console.log('Welcome to CodeRun');`,
     `Array.from({length: Infinity}).map(code)`,
     `const cyberpunk = true;`,
     `export default YourFuture;`,
     `// 0x5245414C495459`,
     `System.out.println("Join us!");`,
     `git commit -m "Create new reality"`,
     `SELECT * FROM dreams WHERE real = true;`,
     `const limit = sky;`,
     `npm install future --save`,
     `[Initializing consciousness upload...]`,
     `...breaking the loop...`,
     `#DEFINE REALITY 0`,
     `return new World();`,
     `System ready. Awaiting command.`,
     `Challenge everything.`,
];

interface DynamicGlitchTextProps {
     className?: string;
     style?: React.CSSProperties;
}

// Această componentă acum afișează un singur text aleatoriu și atât.
export const DynamicGlitchText: React.FC<DynamicGlitchTextProps> = ({
     className,
     style,
}) => {
     const [glitchText, setGlitchText] = useState("");

     // Alege un text aleatoriu o singură dată, la montare
     useEffect(() => {
          const randomSnippet =
               codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          setGlitchText(randomSnippet);
     }, []);

     return (
          <div style={style} className={className}>
               {glitchText}
          </div>
     );
};
