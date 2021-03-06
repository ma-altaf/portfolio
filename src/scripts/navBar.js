import anime from "animejs";
import { scrollbar } from "./scroll";

const NAV_TRIGGER = 250;
const floatingNav = document.getElementById("floatingNav");
const floatingNavContent = document.querySelector("#floatingNavContent");

export function initNavBar() {
    let isFloatingNavVisible = false;
    let isNavOpen = false;

    anime.set(floatingNav, {
        clipPath: "circle(0% at 50% 50%)",
    });

    anime.set(floatingNav.querySelectorAll("div .menuBars"), {
        scaleX: 1,
    });

    anime.set(floatingNavContent, {
        clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
    });

    anime.set(floatingNavContent.querySelectorAll("ul li"), {
        translateX: "50%",
    });

    // making the navbar appear/disappear based on the distance srolled
    scrollbar.addListener((event) => {
        if (isFloatingNavVisible) {
            if (event.offset.y > NAV_TRIGGER) {
                toggleFloatingNav(isFloatingNavVisible);
                isFloatingNavVisible = false;
            }
        } else {
            if (event.offset.y < NAV_TRIGGER) {
                toggleFloatingNav(isFloatingNavVisible);
                isFloatingNavVisible = true;
            }
        }
    });

    // navbar switch/ button appear/disappear animation
    function toggleFloatingNav(isFloatingNavVisible) {
        floatingNav.style.pointerEvents = isFloatingNavVisible
            ? "auto"
            : "none";

        anime({
            targets: floatingNav,
            clipPath: isFloatingNavVisible
                ? "circle(45% at 50% 50%)"
                : "circle(0% at 50% 50%)",
            duration: 700,
            easing: isFloatingNavVisible ? "easeOutQuart" : "easeInOutQuart",
            delay: isFloatingNavVisible ? 0 : 100,
        });

        anime({
            targets: floatingNav.querySelectorAll("div .menuBars"),
            translateY: isFloatingNavVisible ? ["3rem", 0] : "-1rem",
            duration: 700,
            easing: isFloatingNavVisible ? "easeOutQuart" : "easeInOutQuart",
            delay: anime.stagger(100),
        });
    }

    // floating nav switch hover animation
    floatingNav.addEventListener("mouseenter", () => {
        anime({
            targets: floatingNav,
            clipPath: "circle(49% at 50% 50%)",
        });
    });
    floatingNav.addEventListener("mouseleave", () => {
        anime({
            targets: floatingNav,
            clipPath: "circle(45% at 50% 50%)",
        });
    });

    // opening/closing floating nav
    floatingNav.addEventListener("click", () => {
        anime({
            targets: floatingNav.querySelectorAll("div .menuBars"),
            scaleX: isNavOpen ? 1 : anime.stagger([1, 0.1]),
            delay: anime.stagger(50),
        });

        anime({
            targets: floatingNavContent,
            clipPath: isNavOpen
                ? [
                      "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                  ]
                : [
                      "polygon(80% 0%, 100% 0%, 100% 100%, 100% 100%)",
                      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  ],
            easing: "easeOutQuart",
            duration: 700,
        });

        anime({
            targets: floatingNavContent.querySelectorAll("ul li"),
            translateX: isNavOpen ? [0, "50%"] : ["50%", 0],
            easing: "easeOutQuart",
            duration: 700,
        });

        isNavOpen = !isNavOpen;
        scrollbar.updatePluginOptions("pause", { pause: isNavOpen });
    });
}
