import { breakIntoChar } from "./index";
import anime from "animejs";
import { animationTrigger } from "./scroll";

const logo = document.querySelector("#logo");
const aboutText = document.querySelector("#landingSect #aboutPara");
const firstname = logo.querySelector("#logoFirstname");
const surname = logo.querySelector("#logoSurname");

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

    const links = document.querySelectorAll("#navbar #menu a");

    links.forEach((link) => {
        const text = link.querySelector("p");
        breakIntoChar(text);
        const icon = link.querySelector(".icons");
        anime.set(icon, {
            translateX: "-50%",
        });
        anime.set(icon.querySelector(".material-icons"), {
            translateY: "100%",
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
}

const animation = anime({
    autoplay: false,
    targets: aboutText.querySelectorAll("div pre p"),
    translateY: ["150%", 0],
    duration: 850,
    easing: "easeOutQuad",
    delay: anime.stagger(100),
});

animationTrigger(aboutText, 0.75, () => {
    animation.play();
});
