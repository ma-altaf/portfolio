import { aboutPageInit } from "./aboutPage";
import { contactPageInit } from "./contactPage";
import coverAnimation from "./coverAnimation";
import { homePageInit } from "./homePage";
import { initNavBar } from "./navBar";
import { initScrollbar } from "./scroll";
import { workPageInit } from "./workPage";
import barba from "@barba/core";

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
            name: "welcome",
            once: () => coverAnimation(),
            to: {
                namespace: "home",
            },
        },
    ],
    views: [
        {
            namespace: "home",
            afterEnter: () => {
                homePageInit();
                initScrollbar();
                initNavBar();
            },
        },
    ],
});

barba.hooks.after((data) => {
    initScrollbar();
    initNavBar();
    pageInit(data.next.namespace);
});

function pageInit(namespace) {
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

        default:
            break;
    }
}

export { breakIntoChar, breakIntoWord };
