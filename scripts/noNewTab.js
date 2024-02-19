if (window.innerWidth <= 1000) {
    const links = document.querySelectorAll(".spec");
    links.forEach(function (link) {
        link.removeAttribute("target");
    });
}
