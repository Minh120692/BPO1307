export default function Footer() {
  return (
    <footer id="footer" className="site-footer footer dark-background">
      <div className="container footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <a href="/" className="logo d-flex align-items-center flex-column">
              <img
                src="/assets/wacrlogonew.svg"
                alt="WA+CRAFT logo"
                className="logo-img footer-brand-logo"
              />
            </a>
          </div>

          <div className="col-lg-6 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact</h4>
            <p className="contact-address">
              <i className="bi bi-geo-alt-fill me-2" aria-hidden="true"></i>15 Ngo Thi Si Street, Ngu Hanh Son Ward, Da Nang City, Vietnam
            </p>
            <p className="contact-phone mt-4">
              <i className="bi bi-telephone-fill me-2" aria-hidden="true"></i>
              <span>
                +84 91 723 1967 (VN)
                <br />
                +81 70 9103 1967 (JP)
              </span>
            </p>
            <p className="contact-email">
              <i className="bi bi-envelope-fill me-2" aria-hidden="true"></i>
              <a href="mailto:nomoto-t@wacraft-jp.com">nomoto-t@wacraft-jp.com</a>
            </p>
            <p className="contact-web">
              <i className="bi bi-globe me-2" aria-hidden="true"></i>www.wacraft-jp.com
            </p>
          </div>
        </div>
      </div>
      <div className="container copyright text-center mt-4"></div>
    </footer>
  );
}
