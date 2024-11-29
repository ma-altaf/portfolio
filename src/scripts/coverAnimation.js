import { breakIntoChar } from "./index";
import anime from "animejs/lib/anime.es.js";
import { initScrollbar } from "./scroll";
import { initNavBar } from "./navBar";

const COVER_ANIMATION_TIME = 1100;

const coverAnimation = () => {
    const cover = document.querySelector("#cover");
    const namebox = cover.querySelector("#name-box");
    const surname = namebox.querySelector("#surname");
    const firstname = namebox.querySelector("#firstname");

    const coverTL = anime.timeline();
    breakIntoChar(surname);
    surname.querySelectorAll(".char").forEach((el, index) => {
        const positionArrX = ["-100%", "0%", "100%", "-100%", "0%", "100%"];
        const positionArrY = [
            "-100%",
            "-100%",
            "-100%",
            "100%",
            "100%",
            "100%",
        ];
        anime.set(el, {
            translateX: positionArrX[index],
            translateY: positionArrY[index],
            scale: 0,
        });
    });

    breakIntoChar(firstname);

    anime.set(cover, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    coverTL
        .add({
            targets: firstname.querySelectorAll(".char p"),
            translateY: ["100%", 0],
            opacity: [0, 1],
            duration: 500,
            easing: "easeOutCirc",
            delay: anime.stagger(100, { from: "center" }),
        })
        .add(
            {
                targets: "#surname .char",
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 575,
                easing: "easeOutCirc",
                delay: anime.stagger(100, { grid: [3, 2], from: "center" }),
            },
            "-=200"
        )
        .add({
            targets: surname,
            scale: 1.75,
            duration: COVER_ANIMATION_TIME,
            easing: "easeInOutCubic",
            delay: 150,
        })
        .add(
            {
                targets: firstname.querySelectorAll(".char"),
                translateY: function () {
                    return anime.random(-150, 50) + "%";
                },
                duration: COVER_ANIMATION_TIME,
                easing: "easeInOutCubic",
            },
            `-=${COVER_ANIMATION_TIME}`
        )
        .add(
            {
                targets: namebox,
                translateY: "-150%",
                duration: COVER_ANIMATION_TIME,
                easing: "easeInOutCubic",
            },
            `-=${COVER_ANIMATION_TIME}`
        )
        .add(
            {
                targets: cover,
                clipPath: [
                    "polygon(0 0, 100% 0%, 100% 125%, 0 100%)",
                    "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                ],
                duration: COVER_ANIMATION_TIME,
                easing: "easeInOutCubic",
            },
            `-=${COVER_ANIMATION_TIME}`
        )
        .add(
            {
                targets: "#title .word pre",
                translateY: ["150%", 0],
                rotateZ: [10, 0],
                easing: "easeOutCirc",
                duration: 650,
                delay: anime.stagger(100),
            },
            `-=${COVER_ANIMATION_TIME / 3}`
        )
        .add(
            {
                targets: "#location span",
                translateY: ["100%", 0],
                easing: "easeOutCirc",
                duration: 300,
            },
            `-=300`
        )
        .add(
            {
                targets: "#location p",
                translateY: ["100%", 0],
                easing: "easeOutCirc",
                duration: 300,
            },
            `-=200`
        )
        .add(
            {
                targets: ["#logo #logoFirstname", "#logo #logoSurname"],
                translateY: ["150%", 0],
                easing: "easeOutCirc",
                duration: 485,
            },
            `-=300`
        )
        .add(
            {
                targets: "#menu a",
                opacity: [0, 1],
                color: "red",
                translateY: ["100%", 0],
                easing: "easeOutCirc",
                duration: 485,
                delay: anime.stagger(100),
            },
            `-=150`
        );
};

export default coverAnimation;
