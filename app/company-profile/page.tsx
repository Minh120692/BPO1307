import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "会社概要・プライバシーポリシー | WA+CRAFT BPO",
  description:
    "WA+CRAFTの会社概要と、個人情報の取扱いに関するプライバシーポリシーをご案内します。",
};

const COMPANY_ROWS: Array<[string, React.ReactNode]> = [
  ["会社名", "WA+CRAFT"],
  [
    "所在地",
    "15 Ngo Thi Si Street, Ngu Hanh Son Ward, Da Nang City, Vietnam",
  ],
  [
    "電話番号",
    <>
      +84 91 723 1967（VN）
      <br />
      +81 70 9103 1967（JP）
    </>,
  ],
  [
    "メール",
    <a href="mailto:nomoto-t@wacraft-jp.com">nomoto-t@wacraft-jp.com</a>,
  ],
  ["ウェブサイト", "www.wacraft-jp.com"],
  ["事業内容", "BPO事業（オフショア活用による業務プロセスの最適化支援）"],
];

export default function CompanyProfilePage() {
  return (
    <main className="company-profile-page">
      <div className="company-profile-inner">
        <a href="/" className="company-profile-logo-link">
          <Image
            src="/assets/logo-removebg-preview.png"
            alt="WA+CRAFT"
            width={523}
            height={477}
            className="company-profile-logo"
            style={{ height: "auto" }}
          />
        </a>

        <section aria-labelledby="company-profile-heading">
          <p className="company-profile-eyebrow">Company Profile</p>
          <h1 id="company-profile-heading" className="company-profile-title">
            会社概要
          </h1>
          <table className="company-profile-table">
            <tbody>
              {COMPANY_ROWS.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="privacy-policy-heading">
          <p className="company-profile-eyebrow">Privacy Policy</p>
          <h2 id="privacy-policy-heading" className="company-profile-title">
            プライバシーポリシー
          </h2>
          <div className="company-profile-policy">
            <p>
              当社は、お客様、お取引先様ならびに当社ウェブサイトをご利用いただく皆様の個人情報を適切に保護することを重要な責務と考えています。
            </p>
            <p>
              取得した個人情報は、お問い合わせへの回答、ご相談・ご依頼への対応、サービス案内、お客様との連絡、業務改善、法令対応の範囲内で利用いたします。
            </p>
            <p>
              法令で認められる場合を除き、ご本人の同意なく第三者へ個人情報を提供いたしません。
            </p>
          </div>
        </section>

        <a href="/" className="company-profile-back">
          トップページへ戻る
        </a>
      </div>
    </main>
  );
}
