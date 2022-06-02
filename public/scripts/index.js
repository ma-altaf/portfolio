import anime from "../../node_modules/animejs/lib/anime.es.js";
const cover = document.querySelector("#cover");
const namebox = cover.querySelector("#name-box");
const surname = namebox.querySelector("#surname");

const breakWord = (element) => {
    element.innerHTML = element.innerText.replace(
        /\S/g,
        "<div class='char'>$&</div>"
    );
};

breakWord(surname);

surname.querySelectorAll(".char").forEach((el, index) => {
    const positionArrX = ["-100%", "0%", "100%", "-100%", "0%", "100%"];
    const positionArrY = ["-100%", "-100%", "-100%", "100%", "100%", "100%"];
    anime.set(el, {
        translateX: positionArrX[index],
        translateY: positionArrY[index],
        scale: 0,
    });
});

anime({
    targets: "#surname .char",
    translateX: 0,
    translateY: 0,
    scale: 1,
    duration: 350,
    easing: "easeOutCirc",
    delay: anime.stagger(150, { grid: [3, 2], from: "center" }),
});
