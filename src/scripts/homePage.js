import { breakIntoChar } from "./index";
import anime from "animejs";
import { animationTrigger } from "./scroll";

export function homePageInit() {
    const navbar = document.querySelector("#navbar");
    const logo = navbar.querySelector("#logo");
    const aboutText = document.querySelector("#landingSect #aboutPara");
    const firstname = logo.querySelector("#logoFirstname");
    const surname = logo.querySelector("#logoSurname");

    if (window.innerWidth > 820) {
        breakIntoChar(firstname);
        breakIntoChar(surname);

        anime.set(surname.querySelectorAll(".char p"), {
            translateX: "110%",
            rotateZ: "-70deg",
        });

        logo.addEventListener("mouseenter", () => {
            anime({
                targets: surname.querySelectorAll(".char p"),
                translateX: 0,
                rotateZ: 0,
                easing: "easeInOutQuart",
            });
            anime(
                {
                    targets: firstname.querySelectorAll(".char p"),
                    translateX: "-110%",
                    rotateZ: "-70deg",
                    easing: "easeInOutQuart",
                },
                "-=1000"
            );
        });

        logo.addEventListener("mouseleave", () => {
            anime({
                targets: surname.querySelectorAll(".char p"),
                translateX: "110%",
                rotateZ: "-70deg",
                easing: "easeInOutQuart",
            });
            anime(
                {
                    targets: firstname.querySelectorAll(".char p"),
                    translateX: 0,
                    rotateZ: 0,
                    easing: "easeInOutQuart",
                },
                "-=1000"
            );
        });

        const links = navbar.querySelectorAll("#navbar #menu a");

        links.forEach((link) => {
            const text = link.querySelector("p");
            breakIntoChar(text);
            const icon = link.querySelector(".icons");
            anime.set(icon, {
                translateX: "-50%",
            });

            link.addEventListener("mouseenter", () => {
                anime({
                    targets: text.querySelectorAll(".char"),
                    translateY: "-100%",
                    opacity: 0,
                    duration: 650,
                    easing: "easeOutQuart",
                    delay: anime.stagger(100, { from: "center" }),
                });
                anime({
                    targets: icon,
                    clipPath: "circle(45.0% at 50% 50%)",
                    translateY: "-50%",
                    duration: 700,
                    easing: "easeOutQuart",
                });

                anime({
                    targets: icon.querySelector(".material-icons"),
                    translateY: ["100%", 0],
                    duration: 700,
                    easing: "easeOutQuart",
                    delay: 200,
                });
            });

            link.addEventListener("mouseleave", () => {
                anime({
                    targets: text.querySelectorAll(".char"),
                    translateY: 0,
                    opacity: 1,
                    duration: 700,
                    delay: 100,
                    easing: "easeInOutQuart",
                    delay: anime.stagger(100, {
                        from: "center",
                        direction: "reverse",
                    }),
                });
                anime({
                    targets: icon,
                    clipPath: "circle(0.0% at 50% 50%)",
                    translateY: "-25%",
                    duration: 700,
                    easing: "easeInOutQuart",
                    delay: 100,
                });
                anime({
                    targets: icon.querySelector(".material-icons"),
                    translateY: "-100%",
                    duration: 600,
                    easing: "easeInOutQuart",
                });
            });
        });

        animationTrigger(aboutText, 0.75, () => {
            aboutTextAnimation.play();
        });

        // project section only enable hover when on large enough screen
        const projectLinks = document.querySelectorAll(".projectLink");

        projectLinks.forEach((link) => {
            const linkImg = link.querySelector("img");
            const { width, height } = link.getBoundingClientRect();

            link.addEventListener("mouseleave", () => {
                anime({
                    targets: linkImg,
                    clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                    opacity: 0,
                    easing: "easeOutSine",
                    duration: 300,
                });
            });

            link.addEventListener("mouseenter", ({ offsetX, offsetY }) => {
                anime.set(linkImg, {
                    top: offsetY,
                    left: offsetX,
                });
            });

            link.addEventListener("mousemove", ({ offsetX, offsetY }) => {
                const eClip = 10;
                const xClipRatio = offsetX / width;
                const yClipRatio = offsetY / height;
                anime({
                    targets: linkImg,
                    opacity: 1,
                    top: offsetY,
                    left: offsetX,
                    easing: "easeOutQuad",
                    duration: 100,
                });

                anime({
                    targets: linkImg,
                    clipPath: `polygon(
                ${eClip * (1 - xClipRatio)}% ${eClip * (1 - yClipRatio)}%,
                 ${100 - eClip * xClipRatio}% ${eClip * (1 - yClipRatio)}%,
                  ${100 - eClip * xClipRatio}% ${100 - eClip * yClipRatio}%,
                   ${eClip * (1 - xClipRatio)}% ${100 - eClip * yClipRatio}%)`,
                    duration: 300,
                    easing: "easeOutQuad",
                });
            });
        });
    } else {
        // mobile
        setTimeout(() => {
            aboutTextAnimation.play();
        }, 2100);
    }

    const aboutTextAnimation = anime({
        autoplay: false,
        targets: aboutText.querySelectorAll("div pre p"),
        translateY: ["120%", 0],
        duration: 900,
        easing: "easeOutQuad",
        delay: anime.stagger(100),
    });

    const footer = document.querySelector("footer");
    const footerContent = footer.querySelector("#footerContent");
    const contactBtn = footerContent.querySelector("#contactBtn");

    const footerRevealAnim = anime({
        autoplay: false,
        targets: footerContent,
        translateY: ["-65%", 0],
        translateZ: 1,
        easing: "linear",
    });

    const contactBtnAnimation = anime({
        targets: contactBtn,
        translateY: ["-60%", 0],
        easing: "linear",
    });

    animationTrigger(footer, { end: [0, 0] }, (ratio) => {
        footerRevealAnim.seek(footerRevealAnim.duration * ratio);
        contactBtnAnimation.seek(contactBtnAnimation.duration * ratio);
    });

    anime.set(contactBtn.querySelector("span"), {
        translateX: "-200%",
        opacity: 0,
    });

    contactBtn.addEventListener("mouseenter", () => {
        anime({
            targets: contactBtn.querySelector("span"),
            translateX: "-100%",
            opacity: 1,
            duration: 300,
            easing: "easeOutQuad",
        });
    });
    contactBtn.addEventListener("mouseleave", () => {
        anime({
            targets: contactBtn.querySelector("span"),
            translateX: "-200%",
            opacity: 0,
            duration: 300,
            easing: "easeOutQuad",
        });
    });

    const title = document.querySelectorAll("#title .word pre");

    title.forEach((word) => {
        breakIntoChar(word);

        const letters = word.querySelectorAll(".char p");
        letters.forEach((letter, i) => {
            let colorSet = false;
            letter.addEventListener("mouseenter", () => {
                anime({
                    targets: letter,
                    translateY: "-100%",
                    translateX: "100%",
                    duration: 200,
                    easing: "easeInQuad",
                    complete: () => {
                        colorSet = !colorSet;
                        anime.set(letter, {
                            translateY: "100%",
                            translateX: "-100%",
                            // backgroundColor: colorSet ? "black" : "transparent",
                        }),
                            anime({
                                targets: letter,
                                translateY: 0,
                                translateX: 0,
                                duration: 200,
                                easing: "easeOutQuad",
                            });
                    },
                });
            });
        });
    });
}
