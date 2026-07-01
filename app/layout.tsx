import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Splash from "@/components/Splash";
import ConciergeChat from "@/components/ConciergeChat";

// Exécuté avant l'hydratation React : si le splash a déjà été vu dans cette
// session, on le masque immédiatement (CSS) pour éviter qu'il ne clignote
// à l'écran lors d'un rechargement.
const SKIP_SPLASH_SCRIPT = `
try {
  if (sessionStorage.getItem("croatie-2026-splash-seen")) {
    document.documentElement.classList.add("splash-skip");
  }
} catch (e) {}
`;

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: "Croatie 2026",
  title: "Croatie 2026",
  description: "Notre voyage en Croatie — 1-8 juillet 2026",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Croatie 2026",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#08121c",
  width: "device-width",
  initialScale: 1,
  // Zoom laissé actif : le bloquer nuit à l'accessibilité (lecture).
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <head>
        <Script id="skip-splash" strategy="beforeInteractive">
          {SKIP_SPLASH_SCRIPT}
        </Script>
      </head>
      <body>
        <Splash />
        <div className="app-shell min-h-dvh pb-24">
          <main className="px-4 pt-5">{children}</main>
        </div>
        <BottomNav />
        <ConciergeChat />
      </body>
    </html>
  );
}
