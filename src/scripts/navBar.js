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
    scrollbar.addListener((event) => {
        if (isFloatingNavVisible) {
            if (event.offset.y > NAV_TRIGGER) {
                isFloatingNavVisible = false;

                toggleFloatingNav();
            }
        } else {
            if (event.offset.y < NAV_TRIGGER) {
                isFloatingNavVisible = true;

                toggleFloatingNav();
            }
        }
    });

    function toggleFloatingNav() {
        floatingNav.style.pointerEvents = isFloatingNavVisible
            ? "none"
            : "auto";

        anime({
            targets: floatingNav,
            clipPath: isFloatingNavVisible
                ? "circle(0% at 50% 50%)"
                : "circle(45% at 50% 50%)",
            duration: 700,
            easing: isFloatingNavVisible ? "easeInOutQuart" : "easeOutQuart",
            delay: isFloatingNavVisible ? 100 : 0,
        });

        anime({
            targets: floatingNav.querySelectorAll("div .menuBars"),
            translateY: isFloatingNavVisible ? "-1rem" : ["3rem", 0],
            duration: 700,
            easing: isFloatingNavVisible ? "easeInOutQuart" : "easeOutQuart",
            delay: anime.stagger(100),
        });
    }

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

    anime.set(floatingNavContent.querySelectorAll("ul li"), {
        translateX: "50%",
    });

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
            translateX: isNavOpen ? "50%" : ["50%", 0],
            easing: "easeOutQuart",
            duration: 700,
        });

        isNavOpen = !isNavOpen;
        scrollbar.updatePluginOptions("pause", { pause: isNavOpen });
    });
}
