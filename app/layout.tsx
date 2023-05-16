import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Chat App",
  description:
    "Im Debug and this is my first full stack app and im happy i started this",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
