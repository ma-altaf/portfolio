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
