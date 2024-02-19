const arrow = document.querySelector(".arrow");

function scrollDown() {
    window.scrollTo({ top: 1000, behavior: "smooth" });
}

arrow.addEventListener("click", scrollDown);
