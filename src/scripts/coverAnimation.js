import { breakWord } from "./index";
import anime from "animejs/lib/anime.es.js";

const cover = document.querySelector("#cover");
const namebox = cover.querySelector("#name-box");
const surname = namebox.querySelector("#surname");
const firstname = namebox.querySelector("#firstname");
const titleWords = document.querySelectorAll("#title .word");

const COVER_ANIMATION_TIME = 1000;

const coverAnimation = () => {
    const coverTL = anime.timeline();
    breakWord(surname);
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

    breakWord(firstname);

    anime.set(cover, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    });

    coverTL
        .add({
            targets: firstname.querySelectorAll(".char p"),
            translateY: ["100%", 0],
            opacity: [0, 1],
            duration: 450,
            easing: "easeOutCirc",
            delay: anime.stagger(100, { from: "center" }),
        })
        .add(
            {
                targets: "#surname .char",
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 450,
                easing: "easeOutCirc",
                delay: anime.stagger(100, { grid: [3, 2], from: "center" }),
            },
            "-=225"
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
                complete: (anim) => {},
            },
            `-=${COVER_ANIMATION_TIME}`
        )
        .add(
            {
                targets: "#title .word p",
                translateY: ["150%", 0],
                rotateZ: [10, 0],
                easing: "easeOutCirc",
                duration: 500,
                delay: anime.stagger(50),
                complete: function (anim) {},
            },
            `-=${COVER_ANIMATION_TIME / 3}`
        );
};

coverAnimation(); // TODO: re-enable
