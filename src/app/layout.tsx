import "./globals.css";
import { Prompt } from "next/font/google";
import { getUser } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finnplay Frontend Task",
};

const prompt = Prompt({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prompt",
});

export default async function RootLayout({
  login,
  dashboard,
}: {
  children: React.ReactNode;
  login: React.ReactNode;
  dashboard: React.ReactNode;
}) {
  const username = await getUser();

  return (
    <html lang="en">
      <body className={prompt.className}>{username ? dashboard : login}</body>
    </html>
  );
}
