import anime from "animejs";
import { animationTrigger } from "./scroll";
import barba from "@barba/core";
import { breakIntoWord } from "./index";

function workViewPageInit() {
    const topSect = document.querySelector(".workViewPage #topSect");
    const summary = topSect.querySelector("#summary");
    const websiteBtn = topSect.querySelector("#website");

    breakIntoWord(summary);

    const t1 = anime.timeline();
    t1.add({
        targets: topSect.querySelector("h1 p"),
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
    })
        .add(
            {
                targets: summary.querySelectorAll(".word p"),
                translateY: ["120%", 0],
                easing: "easeOutQuad",
                duration: 500,
                delay: anime.stagger(10),
            },
            "-=300"
        )
        .add(
            {
                targets: websiteBtn,
                clipPath: ["circle(0% at 50% 50%)", "circle(50% at 50% 50%)"],
                easing: "easeInOutQuad",
                duration: 700,
                begin: () => {
                    anime({
                        targets: websiteBtn.querySelectorAll("p"),
                        translateY: ["100%", 0],
                        opacity: [0, 1],
                        duration: 700,
                        easing: "easeInOutQuad",
                        delay: anime.stagger(100),
                    });
                },
            },
            "-=500"
        )

        .add({
            targets: backBtn.querySelector("p"),
            translateY: ["120%", 0],
            easing: "easeOutQuad",
            duration: 500,
        });

    backBtn.addEventListener("click", () => {
        history.back();
    });
}

export { workViewPageInit };
