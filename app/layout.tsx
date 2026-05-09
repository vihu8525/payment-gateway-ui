import "./globals.css";

export const metadata = {
  title: "Payment Gateway",
  description: "Mock Payment Gateway UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}