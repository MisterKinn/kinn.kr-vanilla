gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray(".scroll").forEach(function (elem) {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 100%",
        end: "bottom 20%",
        markers: false,
        onEnter: function () {
            gsap.fromTo(
                elem,
                { y: 100, autoAlpha: 0 },
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto",
                }
            );
        },
        onLeave: function () {
            gsap.fromTo(
                elem,
                { autoAlpha: 1 },
                { autoAlpha: 0, overwrite: "auto" }
            );
        },
        onEnterBack: function () {
            gsap.fromTo(
                elem,
                { y: -100, autoAlpha: 0 },
                {
                    duration: 1.25,
                    y: 0,
                    autoAlpha: 1,
                    ease: "back",
                    overwrite: "auto",
                }
            );
        },
        onLeaveBack: function () {
            gsap.fromTo(
                elem,
                { autoAlpha: 1 },
                { autoAlpha: 0, overwrite: "auto" }
            );
        },
    });
});
