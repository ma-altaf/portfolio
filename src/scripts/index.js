import barba from "@barba/core";
import coverAnimation from "./coverAnimation";
import { homeInit } from "./homePage";
import { initNavBar } from "./navBar";
import { initScrollbar, scrollbar } from "./scroll";

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
        "<pre class='word'><p>$&</p></pre>"
    );
};

barba.init({
    transitions: [
        {
            name: "homeOnce",
            to: {
                namespace: "home",
            },
            once: () => coverAnimation(),
        },
    ],
    views: [
        {
            namespace: "home",
            beforeEnter: () => homeInit(),
        },
    ],
});

barba.hooks.after(() => {
    initScrollbar();
    initNavBar();
});

export { breakIntoChar, breakIntoWord };
