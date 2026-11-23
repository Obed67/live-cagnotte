import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cagnotte live · Gala des 10 ans · I AM Foundation",
  description:
    "Levée de fonds en direct du Gala des 10 ans de la I AM Foundation.",
};

export const viewport: Viewport = {
  themeColor: "#161616",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
