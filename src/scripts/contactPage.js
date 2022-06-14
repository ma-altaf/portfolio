import anime from "animejs";
import { breakIntoChar } from "./index";
import barba from "@barba/core";

export function contactPageInit() {
    const bgColorArr = ["#EA4335", "#333", "#0a66c2"];
    const contactLinks = document.querySelectorAll("#contactList a");
    const backBtn = document.querySelector("#contactPage #backBtn");
    const linkTransitionTime = 450;

    anime({
        targets: "#contactList span",
        scaleX: [0, 1],
        easing: "easeOutQuad",
        duration: 800,
        delay: anime.stagger(100),
    });

    anime({
        targets: backBtn.querySelector("p"),
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 500,
        delay: 800,
    });

    backBtn.addEventListener("click", () => {
        barba.go("/index.html");
    });

    contactLinks.forEach((el, i) => {
        const webname = el.querySelector(".webname");
        const username = el.querySelector(".username");

        breakIntoChar(webname);
        breakIntoChar(username);
        const webnameChar = webname.querySelectorAll(".char p");
        const usernameChar = username.querySelectorAll(".char p");

        anime.set(usernameChar, {
            translateX: "100%",
        });

        anime.set(webname, {
            translateY: "200%",
        });

        setTimeout(() => {
            anime({
                targets: webname,
                translateY: 0,
                easing: "easeOutQuad",
                duration: 800,
                complete: () => setHoverAnimation(),
            });
        }, 100 * i);

        function setHoverAnimation() {
            el.addEventListener("mouseenter", () => {
                anime({
                    targets: webnameChar,
                    translateX: "-100%",
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });

                anime({
                    targets: usernameChar,
                    translateX: 0,
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });

                anime({
                    targets: "#contactPage",
                    backgroundColor: bgColorArr[i],
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });
            });

            el.addEventListener("mouseleave", () => {
                anime({
                    targets: webnameChar,
                    translateX: 0,
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });

                anime({
                    targets: usernameChar,
                    translateX: "100%",
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });

                anime({
                    targets: "#contactPage",
                    backgroundColor: "#f5f5f0",
                    duration: linkTransitionTime,
                    easing: "easeInOutQuad",
                });
            });
        }
    });
}
