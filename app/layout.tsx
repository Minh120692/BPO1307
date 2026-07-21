import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EC Support Match | Get Optimal Call Center Solution Within 1 Business Day",
  description:
    "We provide free comparison and introduction of call centers that handle customer inquiries, CRM, and churn prevention for EC businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Bootstrap + icons are @imported at the top of globals.css so they
            cascade BEFORE our rules, matching the original stylesheet order. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Bootstrap JS bundle intentionally omitted: the page contains no data-bs-* attributes, so nothing depends on it. */}
      <body>{children}</body>
    </html>
  );
}
