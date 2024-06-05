import type { Metadata } from "next";
import { UserContextProvider } from "../context/userContext"
import Navbar from "../components/navBar";

export const metadata: Metadata = {
  title: "Project 5 User Profile",
  description: "Shane Ludwig, Oregon State University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          <Navbar />
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
