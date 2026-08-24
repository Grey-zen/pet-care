(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const header = $("#siteHeader");
  const menuToggle = $(".menu-toggle");
  const nav = $(".main-nav");
  const backToTop = $("#backToTop");

  // Header state
  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 20);
    backToTop?.classList.toggle("show", window.scrollY > 650);
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Mobile menu
  menuToggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  $$(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open menu");
    });
  });

  document.addEventListener("click", event => {
    if (!nav?.classList.contains("open")) return;
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
      nav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Smooth anchor scrolling with sticky-header offset
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const offset = (header?.offsetHeight || 0) + 12;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
    });
  });

  // Active navigation
  const sections = $$("main section[id]");
  const links = $$(".nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));

  // Reveal animations
  const revealItems = $$(".feature-card,.service-card,.insight-card,.newsletter-wrap,.gallery img,.contact-card");
  revealItems.forEach(item => item.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Newsletter forms
  $$("form").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const input = $('input[type="email"]', form);
      if (!input) return;
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
      input.setCustomValidity(valid ? "" : "Please enter a valid email address.");
      if (!valid) {
        input.reportValidity();
        return;
      }
      const button = $("button", form);
      const original = button?.textContent || "Subscribe";
      if (button) button.textContent = "Subscribed ✓";
      input.value = "";
      setTimeout(() => { if (button) button.textContent = original; }, 2500);
    });
  });

  // Back to top
  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Keyboard escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      nav?.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }
  });

  // Pause decorative floating motion when tab is hidden.
  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("page-hidden", document.hidden);
  });

  console.log("Pet Care website ready.");
})();
