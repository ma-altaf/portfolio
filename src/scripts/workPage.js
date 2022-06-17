import anime from "animejs";
import { animationTrigger } from "./scroll";
import barba from "@barba/core";
import { breakIntoWord } from ".";

const NUM_COLUMN = 2;
export function workPageInit() {
    const workGallery = document.querySelector("#workGallery");
    const projects = document.querySelectorAll(".projectImgs");
    const backBtn = document.querySelector("#workPage #backBtn");
    const titlePara = document.querySelector("#workPage #titleSect h5");
    let eclip = 10;

    if (window.innerWidth > 820) {
        // cover a greater amount of the image to accentuate the parallax effect
        eclip = 12;
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

        project.addEventListener("mouseenter", () => {
            anime({
                targets: project,
                clipPath: `polygon(${eclip * 1.1}% ${eclip * 1.1}%, 
                    ${100 - eclip * 1.1}% ${eclip * 1.1}%,
                 ${100 - eclip * 1.1}% ${100 - eclip * 1.1}%,
                  ${eclip * 1.1}% ${100 - eclip * 1.1}%)`,
                duration: 350,
                easing: "easeInOutQuad",
            });

            anime({
                targets: project.querySelector("h1"),
                letterSpacing: "0.1rem",
                duration: 350,
                easing: "easeInOutQuad",
            });
        });
        project.addEventListener("mouseleave", () => {
            anime({
                targets: project,
                clipPath: `polygon(${eclip}% ${eclip}%, 
                    ${100 - eclip}% ${eclip}%,
                 ${100 - eclip}% ${100 - eclip}%,
                  ${eclip}% ${100 - eclip}%)`,
                duration: 350,
                easing: "easeInOutQuad",
            });

            anime({
                targets: project.querySelector("h1"),
                letterSpacing: "0",
                duration: 350,
                easing: "easeInOutQuad",
            });
        });

        project.addEventListener("click", () => {
            const link = project.dataset.link;
            barba.go(link);
        });
    });

    breakIntoWord(titlePara);
    const t1 = anime.timeline();
    // entrance animation
    t1.add({
        targets: "#workPage #titleSect h1 p",
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
                targets: projects,
                opacity: [0, 1],
                easing: "easeInOutQuad",
                duration: 750,
                delay: anime.stagger(250),
            },
            "-=100"
        )
        .add(
            {
                targets: backBtn.querySelector("p"),
                translateY: ["120%", 0],
                easing: "easeOutQuad",
                duration: 500,
            },
            "-=700"
        );

    backBtn.addEventListener("click", () => {
        barba.go("/index.html");
    });
}
