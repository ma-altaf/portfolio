import anime from "animejs";
import { animationTrigger } from "./scroll";
import barba from "@barba/core";

const NUM_COLUMN = 2;
export function workPageInit() {
    const workGallery = document.querySelector("#workGallery");
    const projects = document.querySelectorAll(".projectImgs");
    const backBtn = document.querySelector("#workPage #backBtn");
    const eclip = 10;

    if (window.innerWidth > 820) {
        // display projects in 2 columns
        const columns = [];
        for (let i = 0; i < NUM_COLUMN; i++) {
            const column = document.createElement("div");
            column.classList.add(`column${i}`);
            columns.push(column);
        }

        // reduce the space between
        columns[0].style.margin = `0 -${eclip / 2}%`;
        columns[1].style.margin = `0 -${eclip / 2}%`;

        projects.forEach((project, i) => {
            columns[i % NUM_COLUMN].appendChild(project);
        });

        columns.forEach((col) => workGallery.appendChild(col));
    }

    projects.forEach((project) => {
        anime.set(project, {
            clipPath: `polygon(${eclip}% ${eclip}%, 
                ${100 - eclip}% ${eclip}%,
             ${100 - eclip}% ${100 - eclip}%,
              ${eclip}% ${100 - eclip}%)`,
        });
        const projectsAnim = anime({
            autoplay: false,
            targets: project.querySelector("img"),
            translateY: [`-${eclip}%`, `${eclip}%`],
            easing: "linear",
        });
        animationTrigger(project, {}, (ratio) => {
            projectsAnim.seek(projectsAnim.duration * ratio);
        });
    });

    // entrance animation
    anime({
        targets: backBtn.querySelector("p"),
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
        delay: 450,
    });

    anime({
        targets: "#workPage #titleSect h1 p",
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
    });

    anime({
        targets: "#workPage #titleSect h5 p",
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
        delay: 150,
    });

    anime({
        targets: workGallery,
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 700,
        delay: 600,
    });

    backBtn.addEventListener("click", () => {
        barba.go("/index.html");
    });
}
