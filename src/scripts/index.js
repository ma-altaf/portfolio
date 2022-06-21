import { aboutPageInit } from "./aboutPage";
import { contactPageInit } from "./contactPage";
import coverAnimation from "./coverAnimation";
import { homePageInit } from "./homePage";
import { initNavBar } from "./navBar";
import { initScrollbar } from "./scroll";
import { workPageInit } from "./workPage";
import barba from "@barba/core";
import { workViewPageInit } from "./workViewPage";
import anime from "animejs";

console.log(
    "%cI designed and coded the website, so I probably still remember how it worked 😅.",
    "color:#ffeaa7; background-color:black; padding:0.5rem;"
);

const breakIntoChar = (element) => {
    element.innerHTML = element.innerText.replace(
        /\S/g,
        "<div class='char'><p>$&</p></div>"
    );
};

const breakIntoWord = (element) => {
    element.innerHTML = element.innerText.replace(
        /\S+/g,
        "<pre class='word'><p>$&&nbsp;</p></pre>"
    );
};

const curtain = document.querySelector("#curtain");
const curtainText = curtain.querySelector("#namespace");

barba.init({
    transitions: [
        {
            name: "default-transition",
            async leave(data) {
                const done = this.async();
                const namespace = data.next.namespace;
                curtainText.innerText = namespace.substring(
                    namespace.indexOf("/") + 1
                );
                const t1 = anime.timeline();
                t1.add({
                    targets: curtain,
                    clipPath: [
                        "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        "polygon(0% 0%, 100% 0%, 100% 125%, 0% 100%)",
                    ],
                    transformOrigin: "center bottom 0",
                    duration: 750,
                    easing: "easeInOutQuad",
                }).add(
                    {
                        targets: curtainText,
                        translateY: ["-200%", 0],
                        duration: 650,
                        easing: "easeInOutQuad",
                        complete: () => {
                            anime.set(curtain, {
                                clipPath:
                                    "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                            });
                            done();
                        },
                    },
                    "-=650"
                );
            },
            async enter() {
                const done = this.async();
                const t1 = anime.timeline();

                t1.add({
                    targets: curtainText,
                    translateY: [0, "200%"],
                    duration: 650,
                    easing: "easeInOutQuad",
                }).add(
                    {
                        begin: () => done(),
                        targets: curtain,
                        clipPath: [
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            "polygon(0% 100%, 100% 125%, 100% 100%, 0% 100%)",
                        ],
                        transformOrigin: "center top 0",
                        duration: 750,
                        easing: "easeOutQuad",
                        complete: () =>
                            anime.set(curtain, {
                                clipPath:
                                    "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                            }),
                    },
                    "-=550"
                );
            },
        },
        {
            name: "welcome",
            once: () => coverAnimation(),
            to: {
                namespace: "home",
            },
        },
    ],
    requestError: (trigger, action, url, response) => {
        // go to a custom 404 page if the user click on a link that return a 404 response status
        if (action === "click" && response.status && response.status === 404) {
            barba.go("/404.html");
        }

        return false;
    },
});

barba.hooks.after((data) => {
    pageInit(data.next.namespace);
    initScrollbar();
    initNavBar();
});

barba.hooks.once((data) => {
    pageInit(data.next.namespace);
    initScrollbar();
    initNavBar();
});

function pageInit(namespace) {
    namespace = namespace.startsWith("works/") ? "works/:wid" : namespace;

    switch (namespace) {
        case "home":
            homePageInit();
            break;
        case "work":
            workPageInit();
            break;
        case "contact":
            contactPageInit();
            break;
        case "about":
            aboutPageInit();
            break;
        case "works/:wid":
            workViewPageInit();
            break;

        default:
            break;
    }
}

export { breakIntoChar, breakIntoWord };
