//////  INIT  ////////
function startAd() {
	hideElement(txt1a);
	hideElement(txt1b);
	hideElement(txt2a);
	hideElement(txt2b);
	hideElement(txt3a);
	hideElement(txt4a);
	hideElement(txt5a);
	hideElement(txt6a);
	hideElement(txt7a);
	hideElement(bg_top_layer);
	hideElement(CTA);

	TweenMax.set(".lgArt", { transformOrigin: "left top", scale: 0.5 });
	TweenMax.delayedCall(0, intro);
}

//////  START ANIMATION  ////////

intro = function () {
	TweenMax.delayedCall(0, revealAd);
	TweenMax.delayedCall(0, scene1);
	TweenMax.delayedCall(1.5, scene2);
	TweenMax.delayedCall(3.5, scene3);
	TweenMax.delayedCall(5.5, scene4);
	TweenMax.delayedCall(7.5, scene5);
	TweenMax.delayedCall(9.5, scene6);
	TweenMax.delayedCall(11.5, scene7);
}

revealAd = function () {
	TweenMax.to(cover, 0.5, { alpha: 0 });
}

scene1 = function () {
	showElement(bg_top_layer);
	showElement(txt1a);
	showElement(txt1b);

	TweenMax.to(txt1a, 0.5, { y: -300, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
	TweenMax.to(txt1b, 1.0, { y: -300, ease: Quad.easeOut, rotation: 0.01, delay: 0.2 });
}

scene2 = function () {
	showElement(txt2a);
	showElement(txt2b);

	TweenMax.to(txt2a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
	TweenMax.to(txt2b, 0.5, { y: -100, ease: Quad.easeOut, rotation: 0.01, delay: 0.2 });
}

scene3 = function () {
	showElement(txt3a);
	hideElement(txt2a);

	TweenMax.to(txt3a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
}

scene4 = function () {
	hideElement(txt3a);
	showElement(txt4a);

	TweenMax.to(txt4a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
}

scene5 = function () {
	hideElement(txt4a);
	showElement(txt5a);

	TweenMax.to(txt5a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
}

scene6 = function () {
	hideElement(txt5a);
	showElement(txt6a);

	TweenMax.to(txt6a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
}

scene7 = function () {
	showElement(txt7a);
	showElement(CTA);

	TweenMax.to(txt7a, 0.5, { y: 100, ease: Quad.easeOut, rotation: 0.01, delay: 0 });
	TweenMax.to(CTA, 1.0, { y: -500, ease: Quad.easeOut, rotation: 0.01, delay: 0.2 });
}

showElement = function (e) {
	e.style.visibility = 'visible';
}

hideElement = function (e) {
	e.style.visibility = 'hidden';
}
