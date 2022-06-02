import anime from "../../node_modules/animejs/lib/anime.es.js";
const cover = document.querySelector("#cover");
const namebox = cover.querySelector("#name-box");
const surname = namebox.querySelector("#surname");
const firstname = namebox.querySelector("#firstname");

const breakWord = (element) => {
    element.innerHTML = element.innerText.replace(
        /\S/g,
        "<div class='char'><p>$&</p></div>"
    );
};

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

coverTL
    .add({
        targets: firstname.querySelectorAll(".char p"),
        translateY: ["100%", 0],
        opacity: [0, 1],
        duration: 450,
        easing: "easeOutCubic",
        delay: anime.stagger(100, { grid: [5, 1], from: "center" }),
    })
    .add({
        targets: "#surname .char",
        translateX: 0,
        translateY: 0,
        scale: 1,
        duration: 475,
        easing: "easeOutCubic",
        delay: anime.stagger(100, { grid: [3, 2], from: "center" }),
    })
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
                return anime.random(-100, 0) + "%";
            },
            duration: coverRevealTimeMS,
            easing: "linear",
        },
        `-=${coverRevealTimeMS}`
    )
    .add(
        {
            targets: cover,
            height: 0,
            duration: coverRevealTimeMS,
            easing: "easeInOutCubic",
        },
        `-=${coverRevealTimeMS}`
    );
