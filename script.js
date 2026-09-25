document.addEventListener("DOMContentLoaded", () => {
    // Lenis smooth scrolling
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: !isMobile,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    // Only start RAF loop once
    if (!isMobile) {
        requestAnimationFrame(raf);
    }

    // Smooth anchor navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (isMobile) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                } else {
                    lenis.scrollTo(targetElement, {
                        offset: -40,
                        duration: 1.2
                    });
                }
            }
        });
    });

    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-item");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.classList.toggle("active");

            navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        // Close menu after selecting a navigation link
        navItems.forEach((item) => {
            item.addEventListener("click", () => {
                menuToggle.classList.remove("active");
                navLinks.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }
});
