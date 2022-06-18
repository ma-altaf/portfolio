import anime from "animejs";
import { animationTrigger } from "./scroll";
import barba from "@barba/core";
import { breakIntoWord } from "./index";

function workViewPageInit() {
    const t1 = anime.timeline();

    t1.add({
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
