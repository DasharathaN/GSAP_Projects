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

    splitText('.frame1 .copy', "lines")
    splitText('.endframe .copy', "lines")

    const FRAME1 = new gsap.timeline()
        .from(".background.blue", { duration: 1.0, y: "-=100%", ease: Expo.easeInOut }, "+=0.3")
        .from(".logo", { y: -20, opacity: 0, ease: Power2.easeOut }, "-=0.5")
        .from(".frame1 .line", { duration: 0.4, y: -30, opacity: 0, stagger: -0.04, ease: Power2.easeOut }, "-=0.4")
    // .from(".frame1 .shimmer", {duration: 2, x: "-270%", ease: Power3.easeInOut}, 0.5)


    const FRAME2 = new gsap.timeline()
        .to(".frame1", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(`
        .frame2 .heading, 
        .frame2 .card, 
        .frame2 .sub-heading,
        .frame2 .terms`, { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".frame2 .shimmer", { duration: 2, x: "-270%", ease: Power3.easeInOut }, 0.5)
		.to(".frame2 .sub-heading", { x: 50, opacity: 0, ease: Power3.easeIn })
		.from(".frame2 .sub-heading2", { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
		.to(".frame2 .sub-heading2", { x: 50, opacity: 0, delay:1, ease: Power3.easeIn })
		.from(".frame2 .sub-heading3", { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })


    const FRAME3 = new gsap.timeline()
        .to(".frame2", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(`
        .frame3 .heading, 
        .frame3 .card, 
        .frame3 .sub-heading,
        .frame3 .terms`, { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".frame3 .shimmer", { duration: 2, x: "-270%", ease: Power3.easeInOut }, 0.5)

    const FRAME4 = new gsap.timeline()
        .to(".frame3", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(`
        .frame4 .heading, 
        .frame4 .card, 
        .frame4 .sub-heading,
        .frame4 .terms`, { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".frame4 .shimmer", { duration: 2, x: "-270%", ease: Power3.easeInOut }, 0.5)

    const FRAME5 = new gsap.timeline()
        .to(".frame4", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(`
        .frame5 .heading, 
        .frame5 .card, 
        .frame5 .sub-heading,
        .frame5 .terms`, { x: -50, opacity: 0, stagger: 0.06, ease: Power3.easeOut })
        .from(".frame5 .shimmer", { duration: 2, x: "-270%", ease: Power3.easeInOut }, 0.5)

    const FRAME6 = new gsap.timeline()
        .to(".frame5", { x: 50, opacity: 0, ease: Power3.easeIn })
        .from(".endframe .line", { duration: 0.4, x: -30, opacity: 0, stagger: 0.04, ease: Power2.easeOut })
        .from(".cta", { duration: 0.4, y: -30, opacity: 0, ease: Power2.easeOut })

    const LOOPCHECK = new gsap.timeline({ onComplete: loop })
    const REPLAY = new gsap.timeline()
        .to(".fade", { duration: 0.3, opacity: 1 })



    // MASTER TIMELINE
    TIMELINE = new gsap.timeline({ repeat: 2, onUpdate: () => { banner.update ? banner.update() : null } })
        .add(FRAME1)
        .add(FRAME2, "+=1.5")
        .add(FRAME3, "+=1")
        .add(FRAME4, "+=0")
        .add(FRAME5, "+=0")
        .add(FRAME6, "+=0")

        .add(LOOPCHECK, "+=3")
        .addLabel("replay")
        .add(REPLAY)
        .to(".fade", { duration: 0.3, opacity: 0 }, 0)
    // .pause(5)
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
