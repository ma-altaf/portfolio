import anime from "../../node_modules/animejs/lib/anime.es.js";
const cover = document.querySelector("#cover");
const namebox = cover.querySelector("#name-box");
const surname = namebox.querySelector("#surname");
const firstname = namebox.querySelector("#firstname");
const titleWords = document.querySelectorAll("#title .word");

breakWord(surname);

const coverTL = anime.timeline();
const coverRevealTimeMS = 1300;

surname.querySelectorAll(".char").forEach((el, index) => {
    const positionArrX = ["-100%", "0%", "100%", "-100%", "0%", "100%"];
    const positionArrY = ["-100%", "-100%", "-100%", "100%", "100%", "100%"];
    anime.set(el, {
        translateX: positionArrX[index],
        translateY: positionArrY[index],
        scale: 0,
    });
});

breakWord(firstname);

anime.set(cover, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
});

coverTL
    .add({
        targets: firstname.querySelectorAll(".char p"),
        translateY: ["100%", 0],
        opacity: [0, 1],
        duration: 450,
        easing: "easeOutCirc",
        delay: anime.stagger(100, { from: "center" }),
        begin: () => {
            scrollbar.updatePluginOptions("modal", { open: true });
        },
    })
    .add(
        {
            targets: "#surname .char",
            translateX: 0,
            translateY: 0,
            scale: 1,
            duration: 475,
            easing: "easeOutCirc",
            delay: anime.stagger(100, { grid: [3, 2], from: "center" }),
        },
        "-=300"
    )
    .add({
        targets: surname,
        scale: 1.75,
        duration: coverRevealTimeMS,
        easing: "easeInOutCubic",
        delay: 150,
    })
    .add(
        {
            targets: firstname.querySelectorAll(".char"),
            translateY: function () {
                return anime.random(-150, 50) + "%";
            },
            duration: coverRevealTimeMS,
            easing: "easeInOutCubic",
        },
        `-=${coverRevealTimeMS}`
    )
    .add(
        {
            targets: namebox,
            translateY: "-150%",
            duration: coverRevealTimeMS,
            easing: "easeInOutCubic",
        },
        `-=${coverRevealTimeMS}`
    )
    .add(
        {
            targets: cover,
            clipPath: [
                "polygon(0 0, 100% 0%, 100% 125%, 0 100%)",
                "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            ],
            duration: coverRevealTimeMS,
            easing: "easeInOutCubic",
            complete: (anim) => {},
        },
        `-=${coverRevealTimeMS}`
    )
    .add(
        {
            targets: "#title .word p",
            translateY: ["150%", 0],
            rotateZ: [10, 0],
            easing: "easeOutCirc",
            duration: 500,
            delay: anime.stagger(50),
            complete: function (anim) {},
        },
        `-=${coverRevealTimeMS / 3}`
    );
