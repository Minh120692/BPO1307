// Shared CTA behavior extracted from Header's handler.
// Mobile (toggle visible): open the mobile form panel via its existing toggle,
// or scroll to it if already open. Desktop: scroll to the sidebar form and
// focus its first input.
export function scrollToContactForm(): void {
  const mobileFormToggleBtn = document.querySelector<HTMLButtonElement>(
    "[data-mobile-form-toggle]",
  );
  const mobileFormPanel = document.getElementById("mobile-form-panel");

  const mobileToggleVisible =
    mobileFormToggleBtn &&
    (mobileFormToggleBtn.checkVisibility
      ? mobileFormToggleBtn.checkVisibility()
      : mobileFormToggleBtn.offsetParent !== null);

  if (mobileToggleVisible && mobileFormPanel) {
    if (mobileFormPanel.hasAttribute("hidden")) {
      mobileFormToggleBtn.click();
    } else {
      mobileFormPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  const sidebarForm = document.querySelector(".sidebar-form-area");

  if (!sidebarForm) {
    return;
  }

  sidebarForm.scrollIntoView({ behavior: "smooth", block: "start" });

  const firstInput = sidebarForm.querySelector<HTMLElement>(
    'input:not([type="hidden"]):not([type="checkbox"]):not([disabled]), textarea',
  );

  if (firstInput) {
    firstInput.focus({ preventScroll: true });
  }
}
