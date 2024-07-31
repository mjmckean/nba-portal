import type { Metadata } from "next";
import Link from 'next/link';

import "./globals.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

export const metadata: Metadata = {
  title: "NBA Portal",
  description: "Explore Stats by Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="header">
          <div>
            <Link href="/">NBA Portal</Link>
            <Link href="/players/search" style={{ fontSize: 12 }}>Players</Link>
            <Link href="/teams" style={{ fontSize: 12 }}>Teams</Link>
          </div>
          <p className="author">Michael McKean</p>
        </div>
        <div className="content">
          {children}
        </div>
      </body>
    </html>
  );
}
