import type { Metadata } from "next";
import { AppProvider } from "@/lib/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
    title: {
    default: "NEXUSCORE | Enterprise ERP Platform",
    template: "%s | NEXUSCORE",
  },
  description:
    "NEXUSCORE is an integrated enterprise platform for HR, finance, inventory, fleet, drilling, project management, reporting, GIS, and AI-powered insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var l=window.localStorage.getItem("nexus-locale");if(l==="ar"||l==="fr"||l==="en"){document.documentElement.setAttribute("lang",l);document.documentElement.setAttribute("dir",l==="ar"?"rtl":"ltr");}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
