import { breakWord } from "./index";
import anime from "animejs";

const logo = document.querySelector("#logo");
const firstname = logo.querySelector("#logoFirstname");
const surname = logo.querySelector("#logoSurname");

breakWord(firstname);
breakWord(surname);

anime.set(surname.querySelectorAll(".char p"), {
    translateX: "110%",
});

logo.addEventListener("mouseover", () => {
    anime({
        targets: surname.querySelectorAll(".char p"),
        translateX: 0,
        easing: "easeInOutQuart",
    });
    anime({
        targets: firstname.querySelectorAll(".char p"),
        translateX: "-110%",
        easing: "easeInOutQuart",
    });
});

logo.addEventListener("mouseleave", () => {
    anime({
        targets: surname.querySelectorAll(".char p"),
        translateX: "110%",
        easing: "easeInOutQuart",
    });
    anime({
        targets: firstname.querySelectorAll(".char p"),
        translateX: 0,
        easing: "easeInOutQuart",
    });
});
