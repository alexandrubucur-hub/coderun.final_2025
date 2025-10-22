// components/ui/StaticGlitchText.tsx

import React from "react";

const StaticGlitchContent: React.FC = () => {
     return (
          <>
               {/* Toate elementele de text care nu se mișcă sau nu se schimbă */}
               <div className="absolute top-[6%] left-[5%] text-coderun-pink font-mono text-xs opacity-40 ">{`{code: 'reality'}`}</div>
               <div className="absolute top-[12%] left-[15%] text-coderun-purple font-mono text-xs opacity-30 ">
                    export default Cyberpunk;
               </div>
               <div className="absolute top-[7%] right-[5%] text-coderun-purple font-mono text-[10px] opacity-25">
                    {"// 0xDEADBEEF"}
               </div>
               <div className="absolute top-[15%] right-[10%] text-coderun-pink font-mono text-xs opacity-35">
                    if(dream.isReal()) {`{hack();}`}
               </div>
               <div className="absolute top-[25%] left-8 font-mono text-xs opacity-30 text-coderun-purple [writing-mode:vertical-rl] tracking-widest">
                    ::SYSTEM.STATUS:ONLINE_AWAITING_INPUT::
               </div>
               <div className="absolute top-[30%] right-8 font-mono text-xs opacity-35 text-coderun-pink [writing-mode:vertical-rl] tracking-widest">
                    --REALITY_CHECKSUM_VALIDATED--//
               </div>
               <div className="absolute top-[40%] left-[8%] text-coderun-pink-light font-mono text-xs opacity-30">
                    ...system_override...
               </div>
               <div className="absolute top-[60%] right-[10%] text-coderun-accent font-mono text-xs opacity-40">
                    [initiate_protocol_7]
               </div>
               <div className="absolute top-[75%] left-[15%] text-coderun-purple font-mono text-xs opacity-25 ">
                    const matrix = new Reality();
               </div>
               <div className="absolute top-[70%] right-[15%] text-coderun-pink-light font-mono text-xs opacity-20">
                    {"// REBOOT SEQUENCE"}
               </div>
               <div className="absolute bottom-[20%] left-[10%] text-coderun-pink-light font-mono text-xs opacity-40 ">
                    while(true){`{challenge();}`}
               </div>
               <div className="absolute bottom-[45%] left-[15%] text-coderun-purple font-mono text-xs opacity-25">
                    err: reality_not_found
               </div>
               <div className="absolute bottom-[50%] right-[15%] text-coderun-accent font-mono text-xs opacity-45">
                    const future = await code();
               </div>
               <div className="absolute bottom-[18%] right-[12%] text-coderun-pink font-mono text-[10px] opacity-30">{`{> access_granted}`}</div>
               <div className="hidden lg:block absolute top-[25%] left-[30%] text-coderun-accent font-mono text-[10px] opacity-20">
                    [core_memory_unlocked]
               </div>
               <div className="hidden lg:block absolute top-[55%] right-[28%] text-coderun-purple font-mono text-xs opacity-30">
                    new Thread().start();
               </div>
               <div className="hidden lg:block absolute bottom-[30%] left-[48%] text-coderun-pink-light font-mono text-xs opacity-35">
                    ...compiling_dreams...
               </div>
               <div className="hidden lg:block absolute bottom-[35%] left-[25%] text-coderun-purple font-mono text-xs opacity-25">
                    function(){`{return dreams;}`}
               </div>
               <div className="hidden lg:block absolute top-[35%] right-[30%] text-coderun-pink font-mono text-[10px] opacity-20">
                    process.exit(0);
               </div>
               <div className="hidden lg:block absolute top-[50%] left-[35%] text-coderun-accent font-mono text-[10px] opacity-25">
                    --REALITY_CHECKSUM_VALIDATED--
               </div>
               <div className="hidden lg:block absolute bottom-[40%] right-[32%] text-coderun-pink font-mono text-xs opacity-20">
                    [initiate_protocol_7]
               </div>
               <div className="hidden lg:block absolute top-[20%] left-[48%] text-coderun-purple font-mono text-xs opacity-25">
                    ...system_override...
               </div>
               <div className="hidden lg:block absolute bottom-[25%] right-[45%] text-coderun-pink-light font-mono text-[10px] opacity-30">{`{> access_granted}`}</div>
               <div className="hidden lg:block absolute top-[68%] left-[28%] text-coderun-accent font-mono text-xs opacity-20">
                    const matrix = new Reality();
               </div>
          </>
     );
};

export const StaticGlitchText = React.memo(StaticGlitchContent);
