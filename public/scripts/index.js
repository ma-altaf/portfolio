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
