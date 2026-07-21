import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Domain đang thực sự serve trang. Khi gắn custom domain (vd. wacraft-jp.com),
  // đổi URL này cho khớp.
  metadataBase: new URL("https://bpo-1307.vercel.app"),
  title: "WA+CRAFT BPO | 業務プロセスの最適化",
  description:
    "日本語対応×AI自動化×オフショアBPOソリューションで、最短1日から超高速導入。AI自動化を内製できるBPOが、お客様のビジネスを支えるパートナーとして業務プロセスの最適化をサポートします。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WA+CRAFT BPO | 業務プロセスの最適化",
    description:
      "日本語対応×AI自動化×オフショアBPOソリューションで、最短1日から超高速導入。AI自動化を内製できるBPOが、お客様のビジネスを支えるパートナーとして業務プロセスの最適化をサポートします。",
    type: "website",
    locale: "ja_JP",
    url: "/",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WA+CRAFT BPO | 業務プロセスの最適化",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* Bootstrap JS bundle intentionally omitted: the page contains no data-bs-* attributes, so nothing depends on it. */}
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
