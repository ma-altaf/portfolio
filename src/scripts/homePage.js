import { breakIntoChar } from "./index";
import anime from "animejs";
import { animationTrigger, scrollbar } from "./scroll";

const navbar = document.querySelector("#navbar");
const logo = navbar.querySelector("#logo");
const aboutText = document.querySelector("#landingSect #aboutPara");
const firstname = logo.querySelector("#logoFirstname");
const surname = logo.querySelector("#logoSurname");
const floatingNav = document.getElementById("floatingNav");
const floatingNavContent = document.querySelector("#floatingNavContent");
const titleWords = document.querySelectorAll("#title .word");

const navIOb = new IntersectionObserver(toggleFloatingNav, {
    threshold: 0.5,
});

navIOb.observe(titleWords[0]);

if (window.innerWidth <= 820) {
    navIOb.disconnect();
}

let isFloatingNavVisible = true;

function toggleFloatingNav() {
    floatingNav.style.pointerEvents = isFloatingNavVisible ? "none" : "auto";

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

    isFloatingNavVisible = !isFloatingNavVisible;
}

floatingNav.addEventListener("mouseenter", () => {
    anime({
        targets: floatingNav.querySelectorAll(".material-icons"),
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 500,
        easing: "easeOutQuart",
    });
});

floatingNav.addEventListener("mouseleave", () => {
    anime({
        targets: floatingNav.querySelectorAll(".material-icons"),
        scaleX: 1,
        scaleY: 1,
        duration: 500,
        easing: "easeOutQuart",
    });
});

let isNavOpen = false;

anime.set(floatingNavContent.querySelectorAll("ul li"), {
    translateX: "50%",
});

floatingNav.addEventListener("click", () => {
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

if (window.innerWidth > 820) {
    breakIntoChar(firstname);
    breakIntoChar(surname);

    anime.set(surname.querySelectorAll(".char p"), {
        translateX: "110%",
        rotateZ: "-70deg",
    });

    logo.addEventListener("mouseenter", () => {
        anime({
            targets: surname.querySelectorAll(".char p"),
            translateX: 0,
            rotateZ: 0,
            easing: "easeInOutQuart",
        });
        anime(
            {
                targets: firstname.querySelectorAll(".char p"),
                translateX: "-110%",
                rotateZ: "-70deg",
                easing: "easeInOutQuart",
            },
            "-=1000"
        );
    });

    logo.addEventListener("mouseleave", () => {
        anime({
            targets: surname.querySelectorAll(".char p"),
            translateX: "110%",
            rotateZ: "-70deg",
            easing: "easeInOutQuart",
        });
        anime(
            {
                targets: firstname.querySelectorAll(".char p"),
                translateX: 0,
                rotateZ: 0,
                easing: "easeInOutQuart",
            },
            "-=1000"
        );
    });

    const links = navbar.querySelectorAll("#navbar #menu a");

    links.forEach((link) => {
        const text = link.querySelector("p");
        breakIntoChar(text);
        const icon = link.querySelector(".icons");
        anime.set(icon, {
            translateX: "-50%",
        });

        link.addEventListener("mouseenter", () => {
            anime({
                targets: text.querySelectorAll(".char"),
                translateY: "-100%",
                opacity: 0,
                duration: 650,
                easing: "easeOutQuart",
                delay: anime.stagger(100, { from: "center" }),
            });
            anime({
                targets: icon,
                clipPath: "circle(45.0% at 50% 50%)",
                translateY: "-50%",
                duration: 700,
                easing: "easeOutQuart",
            });

            anime({
                targets: icon.querySelector(".material-icons"),
                translateY: ["100%", 0],
                duration: 700,
                easing: "easeOutQuart",
                delay: 200,
            });
        });

        link.addEventListener("mouseleave", () => {
            anime({
                targets: text.querySelectorAll(".char"),
                translateY: 0,
                opacity: 1,
                duration: 700,
                delay: 100,
                easing: "easeInOutQuart",
                delay: anime.stagger(100, {
                    from: "center",
                    direction: "reverse",
                }),
            });
            anime({
                targets: icon,
                clipPath: "circle(0.0% at 50% 50%)",
                translateY: "-25%",
                duration: 700,
                easing: "easeInOutQuart",
                delay: 100,
            });
            anime({
                targets: icon.querySelector(".material-icons"),
                translateY: "-100%",
                duration: 600,
                easing: "easeInOutQuart",
            });
        });
    });

    animationTrigger(aboutText, 0.75, () => {
        aboutTextAnimation.play();
    });
} else {
    // mobile
    setTimeout(() => {
        aboutTextAnimation.play();
    }, 2100);
}

const aboutTextAnimation = anime({
    autoplay: false,
    targets: aboutText.querySelectorAll("div pre p"),
    translateY: ["120%", 0],
    duration: 900,
    easing: "easeOutQuad",
    delay: anime.stagger(100),
});

const footer = document.querySelector("footer");
const footerContent = footer.querySelector("#footerContent");

const footerRevealAnim = anime({
    autoplay: false,
    targets: footerContent,
    translateY: ["-50%", 0],
    translateZ: 1,
    easing: "linear",
    delay: 100,
    duration: 1000,
});

animationTrigger(footer, { end: [0, 0] }, (ratio) => {
    footerRevealAnim.seek(footerRevealAnim.duration * ratio);
});
