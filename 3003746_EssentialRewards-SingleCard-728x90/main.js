var banner = {
    data: {}
}
var TIMELINE;
//////////////////////////////////////////////////////////////////////////////////

// INIT BANNER ----------------------------------
function init() {
    setBannerSize();

    gsap.set(".common, .scene", { display: "block" });
    // gsap.set(".htmlMem", { skewX: 0.01, transformOrigin: "50% 50%" });

    addListeners(onMouseOver, onMouseLeave);
    startBanner();
}

function onMouseOver() {
    document.querySelector(".cta").classList.add("over")
}
function onMouseLeave() {
    document.querySelector(".cta").classList.remove("over")
}

function startBanner() {

    gsap.set(".banner", { display: "block" });
    gsap.from(".htmlMem", { duration: 0.25, opacity: 0, ease: Power3.easeIn });

    splitText('.frame1 .heading', "lines")
    splitText('.frame2 .heading', "lines")
    splitText('.endframe .heading', "lines")

    const FRAME1 = new gsap.timeline()
        .from(".background.blue", { duration: 1.0, x: "100%", ease: Expo.easeInOut }, "+=0.3")
        .from(".logo", { y: -20, opacity: 0, ease: Power2.easeOut }, "-=0.5")
        .from(".frame1 .card, .frame1 .line", { duration: 0.4, y: -30, opacity: 0, stagger: -0.04, ease: Power2.easeOut }, "-=0.4")
        .from(".frame1 .terms", { duration: 0.4, opacity: 0, ease: Power2.easeIn }, "-=0.4")
        .fromTo(".shimmer", {x: "-270%"}, { duration: 2, x: "0", ease: Power3.easeInOut }, 0.5)

    const FRAME2 = new gsap.timeline()
        .to(".frame1 .heading, .frame1 .terms", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(".frame2 .line", { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".frame2 .terms", { duration: 0.4, opacity: 0, ease: Power2.easeIn }, "-=0.4")
        .fromTo(".shimmer", {x: "-270%"}, { duration: 2, x: "0", ease: Power3.easeInOut }, 0.5)

    const FRAME3 = new gsap.timeline()
        .to(".frame2", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(".endframe .line", { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".cta", { duration: 0.4, x: -30, opacity: 0, ease: Power2.easeOut })
        .fromTo(".shimmer", {x: "-270%"}, { duration: 2, x: "0", ease: Power3.easeInOut }, 0.5)

    const LOOPCHECK = new gsap.timeline({ onComplete: loop })
    const REPLAY = new gsap.timeline()
        .to(".fade", { duration: 0.3, opacity: 1 })



    // MASTER TIMELINE
    TIMELINE = new gsap.timeline({ repeat: 2, onUpdate: () => { banner.update ? banner.update() : null } })
        .add(FRAME1)
        .add(FRAME2, "+=1.0")
        .add(FRAME3, "+=1.0")

        .add(LOOPCHECK, "+=3")
        .addLabel("replay")
        .add(REPLAY)
        .to(".fade", { duration: 0.3, opacity: 0 }, 0)
    // .pause(6)
}


function loop() {
    TIMELINE.pause();
    // if (!banner.looped) {
    //     banner.looped = true;
    //     TIMELINE.play("replay")
    // } else {
    //     TIMELINE.pause();
    // }
}


window.addEventListener("load", init);
