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

logo.addEventListener("mouseover", () => {
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
