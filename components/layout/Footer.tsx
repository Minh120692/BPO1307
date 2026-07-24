import Image from "next/image";

type BiIconProps = {
  className?: string;
  children: React.ReactNode;
};

/** Inline replacement for a bootstrap-icons <i class="bi bi-*"> glyph (SVG paths from Bootstrap Icons, MIT). */
function BiIcon({ className, children }: BiIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className ? `bi ${className}` : "bi"}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const BI_PATHS = {
  geoAltFill:
    "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
  telephoneFill:
    "M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z",
  envelopeFill:
    "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z",
  globe:
    "M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z",
} as const;

export default function Footer() {
  return (
    <footer id="footer" className="site-footer footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <a href="/" className="logo d-flex align-items-center flex-column">
              <Image
                src="/assets/wacrlogonew.svg"
                alt="WA+CRAFT logo"
                className="logo-img footer-brand-logo" width={558} height={750} unoptimized style={{ height: "auto" }} />
            </a>
          </div>

          <div className="col-lg-6 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact</h4>
            <p className="contact-address">
              <BiIcon className="me-2"><path d={BI_PATHS.geoAltFill} /></BiIcon>15 Ngo Thi Si Street, Ngu Hanh Son Ward, Da Nang City, Vietnam
            </p>
            <p className="contact-phone mt-4">
              <BiIcon className="me-2"><path d={BI_PATHS.telephoneFill} /></BiIcon>
              <span>
                +84 91 723 1967 (VN)
                <br />
                +81 70 9103 1967 (JP)
              </span>
            </p>
            <p className="contact-email">
              <BiIcon className="me-2"><path d={BI_PATHS.envelopeFill} /></BiIcon>
              {/* wbr: chỉ được ngắt sau @; domain bọc nowrap để không gãy giữa chừng */}
              <a href="mailto:nomoto-t@wacraft-jp.com" className="no-anywhere">
                nomoto-t@<wbr /><span className="nb">wacraft-jp.com</span>
              </a>
            </p>
            <p className="contact-web no-anywhere">
              <BiIcon className="me-2"><path d={BI_PATHS.globe} /></BiIcon>
              {/* bọc 1 span để inline-flex gap của <p> không chen khoảng hở giữa www. và domain */}
              <span>www.<wbr /><span className="nb">wacraft-jp.com</span></span>
            </p>
          </div>
        </div>
      </div>
      <div className="container copyright text-center mt-4"></div>
    </footer>
  );
}
