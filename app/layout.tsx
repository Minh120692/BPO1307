import type { Metadata } from "next";

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
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
