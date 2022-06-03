Scrollbar.init(document.querySelector("main"), {
    damping: 0.07,
});

const breakWord = (element) => {
    element.innerHTML = element.innerText.replace(
        /\S/g,
        "<div class='char'><p>$&</p></div>"
    );
};
