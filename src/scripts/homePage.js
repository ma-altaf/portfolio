import { breakWord } from "./index";
import anime from "animejs";

const logo = document.querySelector("#logo");
const firstname = logo.querySelector("#logoFirstname");
const surname = logo.querySelector("#logoSurname");

breakWord(firstname);
breakWord(surname);

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
    breakWord(text);
    const icon = link.querySelector(".icons");

    link.addEventListener("mouseenter", () => {
        anime.set(icon, {
            translateX: "-50%",
        });
        anime.set(icon.querySelector(".material-icons"), {
            translateY: "100%",
        });
        anime({
            targets: text.querySelectorAll(".char"),
            translateY: "-50%",
            opacity: 0,
            duration: 700,
            easing: "easeOutQuart",
            delay: anime.stagger(100, { from: "center" }),
        });
        anime({
            targets: icon,
            clipPath: "circle(45.0% at 50% 50%)",
            translateY: "-50%",
            duration: 700,
            easing: "easeOutQuart",
            delay: 100,
        });

        anime({
            targets: icon.querySelector(".material-icons"),
            translateY: 0,
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
            easing: "easeOutQuart",
            delay: anime.stagger(100, { from: "center", direction: "reverse" }),
        });
        anime({
            targets: icon,
            clipPath: "circle(0.0% at 50% 50%)",
            translateY: 0,
            duration: 700,
            easing: "easeOutQuart",
        });
        anime({
            targets: icon.querySelector(".material-icons"),
            translateY: "100%",
            duration: 700,
            easing: "easeOutQuart",
        });
    });
});
