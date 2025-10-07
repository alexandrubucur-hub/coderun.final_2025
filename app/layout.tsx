import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export const metadata: Metadata = {
     title: "CodeRun 2025",
     description:
          "Site oficial CodeRun 2025 - Cea mai mare competiție de programare din România",
     keywords: "programare, competiție, coding, hackathon",
     authors: [{ name: "BEST Cluj-Napoca" }],
     openGraph: {
          title: "CodeRun 2025",
          description: "Join the CodeRunners!",
          images: ["/images/logo.png"],
     },
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en">
               <head>
                    {/* Google Analytics */}
                    <Script
                         src="https://www.googletagmanager.com/gtag/js?id=G-JKXX9WDBB1"
                         strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                         {`
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-JKXX9WDBB1');
                         `}
                    </Script>
                    <link rel="icon" href="/images/logo.png" sizes="any" />
               </head>
               <body
                    className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black`}
               >
                    {children}
               </body>
          </html>
     );
}
