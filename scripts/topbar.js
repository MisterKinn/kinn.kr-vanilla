const topbar = document.querySelector(".topbar");

function pinTopbar() {
    if (window.scrollY < 0) {
        topbar.style.top = window.scrollY + "px";
    } else {
        topbar.style.top = "0";
    }
}

window.addEventListener("scroll", pinTopbar);

function resizeTopBar() {
    if (window.innerWidth <= 1000) {
        topbar.style.height = "5em";
    } else {
        topbar.style.height = "3em";
    }
}

window.addEventListener("load", resizeTopBar);
window.addEventListener("resize", resizeTopBar);
