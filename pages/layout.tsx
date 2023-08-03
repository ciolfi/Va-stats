import React from "react";
import {Providers} from "../providers";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    // className value can 'light' or 'dark' below
    <html lang="en" className='dark'>  
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}