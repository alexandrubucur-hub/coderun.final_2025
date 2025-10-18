// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "./components/ClientLayout"; // Importăm componenta client

const geistSans = Geist({
     variable: "--font-geist-sans",
     subsets: ["latin"],
});

const geistMono = Geist_Mono({
     variable: "--font-geist-mono",
     subsets: ["latin"],
});

export const metadata: Metadata = {
     metadataBase: new URL("https://coderun.bestcj.ro/"),
     title: "CodeRun 2025",
     description:
          "Site oficial CodeRun 2025 - Cea mai mare competiție de programare din România",
     keywords: "programare, competiție, coding, hackathon",
     authors: [{ name: "BEST Cluj-Napoca" }],
     openGraph: {
          title: "CodeRun 2025",
          description: "Join the CodeRunners!",
          url: "https://coderun.bestcj.ro/",
          siteName: "CodeRun",
          images: [
               {
                    url: "/images/logo.png",
                    width: 1200,
                    height: 630,
                    alt: "CodeRun 2025 Logo",
               },
          ],
          locale: "ro_RO",
          type: "website",
     },
};

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <html lang="en" data-theme="light">
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
                    <link rel="icon" href="/images/cr.png" type="image/png" />

                    {/*
                     * MODIFICARE: Pre-încărcăm imaginea de fundal a secțiunii Hero
                     * pentru a fi gata după ce preloader-ul dispare.
                     */}
                    <link rel="preload" href="/images/bg.png" as="image" />
               </head>
               <body
                    className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black `}
               >
                    {/* Folosim ClientLayout pentru a gestiona starea preloader-ului */}
                    <ClientLayout>{children}</ClientLayout>
               </body>
          </html>
     );
}
