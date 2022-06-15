import anime from "animejs";
import barba from "@barba/core";

export function aboutPageInit() {
    const backBtn = document.querySelector("#aboutPage #backBtn");

    anime({
        targets: backBtn.querySelector("p"),
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
        delay: 450,
    });

    backBtn.addEventListener("click", () => {
        barba.go("/index.html");
    });
}
