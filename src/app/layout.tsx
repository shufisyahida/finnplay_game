import "./globals.css";
import { Prompt } from "next/font/google";

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prompt",
});

export const metadata = {
  title: "Finnplay Games",
  description: "Finnplay Games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={prompt.className}>{children}</body>
    </html>
  );
}
