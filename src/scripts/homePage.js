import { breakIntoChar, breakIntoWord } from "./index";
import anime from "animejs";
import { animationTrigger } from "./scroll";

function scrollAnimation() {
    const scrollText = document.querySelector("#landingSect #scroll");
    breakIntoChar(scrollText);
    const scrollChars = scrollText.querySelectorAll(".char");

    anime
        .timeline({
            loop: true,
        })
        .add({
            targets: scrollChars,
            translateY: ["100%", "0"],
            duration: "600",
            easing: "easeOutCirc",
            delay: anime.stagger(50),
        })
        .add({
            targets: scrollChars,
            translateY: ["0", "-100%"],
            duration: "600",
            easing: "easeInCirc",
            delay: anime.stagger(50),
        });
}

function homePageInit() {
    const navbar = document.querySelector("#navbar");
    const logo = navbar.querySelector("#logo");
    const aboutText = document.querySelector("#landingSect #aboutPara");
    const firstname = logo.querySelector("#logoFirstname");
    const surname = logo.querySelector("#logoSurname");

    breakIntoWord(aboutText);
    scrollAnimation();

    const aboutTextAnimation = anime({
        targets: aboutText.querySelectorAll(".word p"),
        autoplay: false,
        translateY: ["120%", 0],
        easing: "easeOutQuad",
        duration: 750,
        delay: anime.stagger(10),
    });

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

        const title = document.querySelectorAll("#title .word pre");

        title.forEach((word) => {
            breakIntoChar(word);

            const letters = word.querySelectorAll(".char p");
            letters.forEach((letter) => {
                const randomNum = () => Math.random();
                letter.addEventListener("mouseenter", () => {
                    anime({
                        targets: letter,
                        translateY: randomNum() > 0.5 ? "-100%" : "100%",
                        translateX: randomNum() > 0.5 ? "-100%" : "100%",
                        duration: 300,
                        easing: "easeInQuad",
                        complete: () => {
                            anime.set(letter, {
                                translateY:
                                    randomNum() > 0.5 ? "-100%" : "100%",
                                translateX:
                                    randomNum() > 0.5 ? "-100%" : "100%",
                            }),
                                anime({
                                    targets: letter,
                                    translateY: 0,
                                    translateX: 0,
                                    duration: 300,
                                    easing: "easeOutQuad",
                                });
                        },
                    });
                });
            });
        });

        animationTrigger(aboutText, 0.8, () => {
            aboutTextAnimation.play();
        });

        const devIcons = document.querySelectorAll("#skills #skillGrid div");

        devIcons.forEach((el) => {
            el.addEventListener("mouseenter", () => {
                el.querySelector("i").classList.add("colored");
            });

            el.addEventListener("mouseleave", () => {
                el.querySelector("i").classList.remove("colored");
            });
        });

        const projectLinks = document.querySelectorAll(".projectLink");

        projectLinks.forEach((link) => {
            const linkImg = link.querySelector("img");

            link.addEventListener("mouseenter", ({ offsetX, offsetY }) => {
                anime.set(linkImg, {
                    top: offsetY,
                    left: offsetX,
                });
                anime({
                    targets: linkImg,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    opacity: 1,
                    duration: 300,
                    easing: "easeInOutSine",
                });
            });

            link.addEventListener("mousemove", ({ offsetX, offsetY }) => {
                anime({
                    targets: linkImg,
                    top: offsetY,
                    left: offsetX,
                    easing: "easeOutQuad",
                    duration: 100,
                });
            });

            link.addEventListener("mouseleave", () => {
                anime({
                    targets: linkImg,
                    clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
                    opacity: 0,
                    easing: "easeInOutSine",
                    duration: 300,
                });
            });
        });
    } else {
        // mobile
        setTimeout(() => {
            aboutTextAnimation.play();
        }, 1500);
    }

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
}

export { homePageInit, scrollAnimation };
