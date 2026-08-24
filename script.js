/* ==========================================================
   PetCare Premium Website
   script.js
   Part 1
   ----------------------------------------------------------
   ✓ DOM Ready
   ✓ Utility Functions
   ✓ Sticky Header
   ✓ Mobile Navigation
   ✓ Smooth Scroll
   ✓ Active Navigation
   ✓ Back To Top
========================================================== */

"use strict";

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

/* ==========================================================
   App
========================================================== */

const App = {

    init() {

        Utils.cache();

        Header.init();

        Navigation.init();

        Scroll.init();

        BackToTop.init();

    }

};

/* ==========================================================
   Utility Functions
========================================================== */

const Utils = {

    body: null,

    header: null,

    navMenu: null,

    menuToggle: null,

    backToTop: null,

    cache() {

        this.body = document.body;

        this.header = document.querySelector(".header");

        this.navMenu = document.querySelector(".nav-menu");

        this.menuToggle = document.querySelector(".menu-toggle");

        this.backToTop = document.getElementById("backToTop");

    },

    debounce(func, delay = 150) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout = setTimeout(() => {

                func(...args);

            }, delay);

        };

    },

    throttle(callback, limit = 100) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            callback(...args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, limit);

        };

    }

};

/* ==========================================================
   Sticky Header
========================================================== */

const Header = {

    init() {

        this.handle();

        window.addEventListener(

            "scroll",

            Utils.throttle(() => {

                this.handle();

            }, 50),

            {

                passive: true

            }

        );

    },

    handle() {

        if (!Utils.header) return;

        if (window.scrollY > 80) {

            Utils.header.classList.add("sticky");

        }

        else {

            Utils.header.classList.remove("sticky");

        }

    }

};

/* ==========================================================
   Mobile Navigation
========================================================== */

const Navigation = {

    init() {

        if (!Utils.menuToggle || !Utils.navMenu) return;

        Utils.menuToggle.addEventListener("click", () => {

            this.toggle();

        });

        this.closeOnLink();

        this.closeOutside();

        this.escapeClose();

    },

    toggle() {

        Utils.menuToggle.classList.toggle("active");

        Utils.navMenu.classList.toggle("active");

        Utils.body.classList.toggle("menu-open");

    },

    close() {

        Utils.menuToggle.classList.remove("active");

        Utils.navMenu.classList.remove("active");

        Utils.body.classList.remove("menu-open");

    },

    closeOnLink() {

        const links = Utils.navMenu.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                this.close();

            });

        });

    },

    closeOutside() {

        document.addEventListener("click", (event) => {

            if (

                !Utils.navMenu.contains(event.target)

                &&

                !Utils.menuToggle.contains(event.target)

            ) {

                this.close();

            }

        });

    },

    escapeClose() {

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                this.close();

            }

        });

    }

};

/* ==========================================================
   Smooth Scroll
========================================================== */

const Scroll = {

    init() {

        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {

            link.addEventListener("click", (event) => {

                const targetID = link.getAttribute("href");

                if (targetID === "#") return;

                let target = null;

                try {
                    target = document.querySelector(targetID);
                } catch {
                    return;
                }

                if (!target) return;

                event.preventDefault();

                const offset = Utils.header

                    ? Utils.header.offsetHeight

                    : 0;

                window.scrollTo({

                    top: target.offsetTop - offset,

                    behavior: "smooth"

                });

            });

        });

        this.activeLinks();

        window.addEventListener(

            "scroll",

            Utils.throttle(() => {

                this.activeLinks();

            }),

            {

                passive: true

            }

        );

    },

    activeLinks() {

        const sections = document.querySelectorAll("section[id]");

        const navLinks = document.querySelectorAll(".nav-menu a");

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${current}`) {

                link.classList.add("active");

            }

        });

    }

};

/* ==========================================================
   Back To Top
========================================================== */

const BackToTop = {

    init() {

        if (!Utils.backToTop) return;

        this.visibility();

        window.addEventListener(

            "scroll",

            Utils.throttle(() => {

                this.visibility();

            }),

            {

                passive: true

            }

        );

        Utils.backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    },

    visibility() {

        if (window.scrollY > 600) {

            Utils.backToTop.classList.add("show");

        }

        else {

            Utils.backToTop.classList.remove("show");

        }

    }

};
/* ==========================================================
   PetCare Premium Website
   script.js
   Part 2
   ----------------------------------------------------------
   ✓ Reveal on Scroll
   ✓ Animated Counters
   ✓ Hero Floating Animation
   ✓ Mouse Parallax
   ✓ Scroll Progress Indicator
========================================================== */

/* ==========================================================
   Initialize Part 2
========================================================== */

App.init = ((original) => () => {
    original();

    Reveal.init();
    Counter.init();
    HeroEffects.init();
    ProgressBar.init();

})(App.init);

/* ==========================================================
   Reveal Animation
========================================================== */

const Reveal = {

    observer: null,

    init() {

        const elements = document.querySelectorAll(
            ".feature-card,\
             .service-card,\
             .category-card,\
             .health-card,\
             .stat-card,\
             .testimonial-card,\
             .blog-card,\
             .instagram-item,\
             .cta-card"
        );

        if (!("IntersectionObserver" in window)) {

            elements.forEach(el => el.classList.add("revealed"));

            return;

        }

        this.observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("revealed");

                    this.observer.unobserve(entry.target);

                });

            },

            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px"
            }

        );

        elements.forEach(el => this.observer.observe(el));

    }

};

/* ==========================================================
   Animated Counter
========================================================== */

const Counter = {

    started: false,

    init() {

        const section = document.querySelector("#statistics");

        if (!section) return;

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    if (this.started) return;

                    this.started = true;

                    this.start();

                });

            },

            {

                threshold: 0.3

            }

        );

        observer.observe(section);

    },

    start() {

        const counters = document.querySelectorAll(".counter");

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            if (!target) return;

            let current = 0;

            const duration = 1800;

            const increment = target / (duration / 16);

            const update = () => {

                current += increment;

                if (current >= target) {

                    current = target;

                }

                counter.textContent = this.format(current, target);

                if (current < target) {

                    requestAnimationFrame(update);

                }

            };

            update();

        });

    },

    format(value, target) {

        value = Math.floor(value);

        if (target >= 100000) {

            return Math.floor(value / 1000) + "K+";

        }

        if (target >= 1000) {

            return value.toLocaleString() + "+";

        }

        if (target === 98) {

            return value + "%";

        }

        return value + "+";

    }

};

/* ==========================================================
   Hero Floating Effect
========================================================== */

const HeroEffects = {

    init() {

        this.floatCards();

        this.parallax();

    },

    floatCards() {

        const cards = document.querySelectorAll(".floating-card");

        cards.forEach((card, index) => {

            const speed = 1 + (index * 0.2);

            const offset = index * 25;

            const animate = () => {

                const time = Date.now() / 1000;

                const y = Math.sin(time * speed) * 8 + offset;

                card.style.setProperty("--float-y", `${y}px`);

                requestAnimationFrame(animate);

            };

            animate();

        });

    },

    parallax() {

        const hero = document.querySelector(".hero");

        if (!hero) return;

        hero.addEventListener("mousemove", event => {

            const x = (event.clientX / window.innerWidth - 0.5) * 20;

            const y = (event.clientY / window.innerHeight - 0.5) * 20;

            document.querySelectorAll(

                ".hero-ring,\
                 .hero-blob,\
                 .hero-paw"

            ).forEach(item => {

                item.style.transform =
                    `translate(${x}px, ${y}px)`;

            });

        });

        hero.addEventListener("mouseleave", () => {

            document.querySelectorAll(

                ".hero-ring,\
                 .hero-blob,\
                 .hero-paw"

            ).forEach(item => {

                item.style.transform = "";

            });

        });

    }

};

/* ==========================================================
   Scroll Progress Bar
========================================================== */

const ProgressBar = {

    bar: null,

    init() {

        this.create();

        this.update();

        window.addEventListener(

            "scroll",

            Utils.throttle(() => {

                this.update();

            }),

            {

                passive: true

            }

        );

    },

    create() {

        this.bar = document.createElement("div");

        this.bar.className = "scroll-progress";

        document.body.appendChild(this.bar);

    },

    update() {

        const scrollTop =
            document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = height > 0
            ? Math.min(100, Math.max(0, (scrollTop / height) * 100))
            : 0;

        this.bar.style.width = progress + "%";

    }

};
/* ==========================================================
   PetCare Premium Website
   script.js
   Part 3
   ----------------------------------------------------------
   ✓ Newsletter Validation
   ✓ Footer Newsletter Validation
   ✓ Ripple Effect
   ✓ Lazy Loading
   ✓ Reduced Motion Support
   ✓ Page Visibility
   ✓ Performance Optimization
   ✓ Final Production Initialization
========================================================== */

/* ==========================================================
   Extend App
========================================================== */

App.init = ((original) => () => {

    original();

    Forms.init();

    Ripple.init();

    LazyImages.init();

    Accessibility.init();

    Performance.init();

})(App.init);

/* ==========================================================
   Forms
========================================================== */

const Forms = {

    init() {

        document
            .querySelectorAll(
                ".newsletter-form,.footer-newsletter-form"
            )
            .forEach(form => {

                form.addEventListener(
                    "submit",
                    this.submit.bind(this)
                );

            });

    },

    submit(event) {

        event.preventDefault();

        const input = event.target.querySelector(
            'input[type="email"]'
        );

        if (!input) return;

        const email = input.value.trim();

        if (!this.validate(email)) {

            input.classList.add("error");

            input.focus();

            alert("Please enter a valid email address.");

            return;

        }

        input.classList.remove("error");

        event.target.reset();

        alert("Thank you for subscribing.");

    },

    validate(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }

};

/* ==========================================================
   Ripple Effect
========================================================== */

const Ripple = {

    init() {

        document

            .querySelectorAll(".btn")

            .forEach(button => {

                button.addEventListener(

                    "click",

                    event => {

                        const ripple =
                            document.createElement("span");

                        ripple.className = "ripple";

                        const rect =
                            button.getBoundingClientRect();

                        ripple.style.left =
                            event.clientX - rect.left + "px";

                        ripple.style.top =
                            event.clientY - rect.top + "px";

                        button.appendChild(ripple);

                        setTimeout(() => {

                            ripple.remove();

                        }, 600);

                    }

                );

            });

    }

};

/* ==========================================================
   Lazy Loading Images
========================================================== */

const LazyImages = {

    init() {

        const images =
            document.querySelectorAll("img");

        images.forEach(image => {

            image.loading = "lazy";

            image.decoding = "async";

        });

    }

};

/* ==========================================================
   Accessibility
========================================================== */

const Accessibility = {

    init() {

        if (

            window.matchMedia(

                "(prefers-reduced-motion: reduce)"

            ).matches

        ) {

            document.documentElement.classList.add(

                "reduced-motion"

            );

        }

    }

};

/* ==========================================================
   Performance
========================================================== */

const Performance = {

    init() {

        this.pageVisibility();

        this.preloadFonts();

    },

    pageVisibility() {

        document.addEventListener(

            "visibilitychange",

            () => {

                if (document.hidden) {

                    document.body.classList.add(

                        "page-hidden"

                    );

                }

                else {

                    document.body.classList.remove(

                        "page-hidden"

                    );

                }

            }

        );

    },

    preloadFonts() {

        if ("fonts" in document) {

            document.fonts.ready.then(() => {

                document.body.classList.add(

                    "fonts-loaded"

                );

            });

        }

    }

};

/* ==========================================================
   Global Error Protection
========================================================== */

window.addEventListener(

    "error",

    event => {

        console.error(

            "[PetCare]",

            event.message

        );

    }

);

window.addEventListener(

    "unhandledrejection",

    event => {

        console.error(

            "[PetCare Promise]",

            event.reason

        );

    }

);

/* ==========================================================
   Production Ready
========================================================== */

console.log(

    "%cPetCare Website Ready",

    "color:#10b981;font-size:14px;font-weight:bold"

);

console.log(

    "%cVersion 1.0.0",

    "color:#3b82f6;font-size:12px"

);

console.log(

    "%cMade with ❤️ for Pet Lovers",

    "color:#ec4899;font-size:12px"

);
