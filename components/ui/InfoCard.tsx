import React from "react";

type InfoCardProps = {
     title: string;
     children: React.ReactNode;
};

const InfoCard = ({ title, children }: InfoCardProps) => {
     return (
          <div
               className="
                    bg-[#1A1A40]/40
                    border border-[#270082] 
                    rounded-2xl
                    p-6 
                    max-w-sm 
                    mx-auto 
                    backdrop-blur-sm
                    fallback-bg
                    transition-all 
                    duration-300 
                    text-white   
                    shadow-[0_0_15px_rgba(122,11,192,1)]
                    hover:border-[#FA58B6] 
                    hover:shadow-[0_0_25px_rgba(250,88,182,0.7)] 
                "
          >
               <h3 className="text-2xl FontBold mb-4 text-[#FC9BD3]">
                    {title}
               </h3>
               <p className="text-gray-300 leading-relaxed">{children}</p>
          </div>
     );
};

export default InfoCard;
