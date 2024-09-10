import type { Metadata } from "next";
import Image from "next/image";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Notetaking",
  description: "A simple notetaking app",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black relative text-white">
        <header className='bg-neutral-600 w-full sticky top-0 p-4 flex items-center gap-1'>
          <Image src='/favicon.ico' alt='logo' width={32} height={32} className="invert" />
			    <span className='text-xl font-semibold'>Notetaking</span>
			  </header>
        <main className="p-4 space-y-4">
          {children}
        </main>
      </body>
    </html>
  );
}
