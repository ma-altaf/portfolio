import anime from "animejs";
import { breakIntoWord } from ".";

export function aboutPageInit() {
    const backBtn = document.querySelector("#aboutPage #backBtn");
    const techBoxP = document.querySelectorAll("#aboutPage #techBox p");
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
                opacity: [0, 1],
                easing: "easeOutQuad",
                duration: 500,
            },
            "-=300"
        )
        .add(
            {
                targets: techBoxP,
                color: ["rgba(255, 234, 167, 0)", "rgba(0,0,0,1)"],
                easing: "easeInQuad",
                delay: anime.stagger(200, {
                    grid: [3, techBoxP.length / 3],
                    from: "center",
                }),
                duration: 500,
            },
            "-=650"
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
