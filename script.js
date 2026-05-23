const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".primary-nav a");
const faqItems = document.querySelectorAll(".faq-list details");
const requiredCheckboxGroups = document.querySelectorAll("[data-require-one]");

if (header && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.removeAttribute("open");
      }
    });
  });
});

requiredCheckboxGroups.forEach((group) => {
  const checkboxes = group.querySelectorAll('input[type="checkbox"]');
  const firstCheckbox = checkboxes[0];
  if (!firstCheckbox) return;

  const updateValidity = () => {
    const hasSelection = Array.from(checkboxes).some((checkbox) => checkbox.checked);
    firstCheckbox.setCustomValidity(hasSelection ? "" : "Please select at least one service.");
  };

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateValidity);
  });

  group.closest("form")?.addEventListener("submit", updateValidity);
  updateValidity();
});
