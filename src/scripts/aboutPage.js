import anime from "animejs";
import barba from "@barba/core";
import { breakIntoWord } from ".";

export function aboutPageInit() {
    const backBtn = document.querySelector("#aboutPage #backBtn");
    const titlePara = document.querySelector(
        "#aboutPage #titleSect #titlePara"
    );

    breakIntoWord(titlePara);

    const t1 = anime.timeline();

    t1.add({
        targets: "#aboutPage #titleSect h1 p",
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
    })
        .add(
            {
                targets: titlePara.querySelectorAll(".word p"),
                translateY: ["120%", 0],
                easing: "easeOutQuad",
                duration: 500,
                delay: anime.stagger(10),
            },
            "-=300"
        )
        .add(
            {
                targets: "#aboutPage #techSect h1 p",
                translateY: ["120%", 0],
                easing: "easeOutQuad",
                duration: 500,
            },
            "-=300"
        )
        .add(
            {
                targets: "#techBox p",
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 750,
            },
            "-=250"
        )
        .add(
            {
                targets: backBtn.querySelector("p"),
                translateY: ["120%", 0],
                easing: "easeOutQuad",
                duration: 500,
            },
            "-=500"
        );

    backBtn.addEventListener("click", () => {
        history.back();
    });
}
