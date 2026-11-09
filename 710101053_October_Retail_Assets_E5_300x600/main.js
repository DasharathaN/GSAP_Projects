//////  INIT  ////////
function startAd() {
	hideElement(car);
	hideElement(txt2);
	hideElement(txt3);
	hideElement(txt4);
	hideElement(endFrame);
	hideElement(cta);

	  TweenMax.set(".lgArt",{transformOrigin: "left top", scale:.5});
	  TweenMax.delayedCall(0,intro);
}

//////  START ANIMATION  ////////

intro = function() {
	TweenMax.delayedCall(0,revealAd);
	TweenMax.delayedCall(0.3,scene1);
	TweenMax.delayedCall(3.0,scene2);
	TweenMax.delayedCall(5.5,scene3);
	TweenMax.delayedCall(8.5,scene4);
	
}

revealAd = function() {

	TweenMax.to(cover,.5,{alpha: 0});
}

scene1 = function() {
	showElement(car);
	showElement(txt2);
	

	TweenMax.to(car, 1, { y:-600, x:0, ease:Quad.easeOut, rotation:0.01, delay: 0});
    TweenMax.to(txt2, 1.2, { y:300, x:0, opacity:1, ease:Quad.easeOut, rotation:0.01, delay: .5});
}

scene2 = function() {
	showElement(txt3);

    TweenMax.to(txt2, .5, { opacity:0, ease:Quad.easeOut, rotation:0.01, delay: .0});
	TweenMax.to(txt3, 1.2, { y:300, x:0, opacity:1, ease:Quad.easeOut, rotation:0.01, delay: .2});
}

scene3 = function() {
	showElement(txt4);

    TweenMax.to(txt3, .5, { opacity:0, ease:Quad.easeOut, rotation:0.01, delay: .0});
	TweenMax.to(txt4, 1.2, { y:300, x:0, opacity:1, ease:Quad.easeOut, rotation:0.01, delay: .2});
}


scene4 = function() {
	showElement(endFrame);
	showElement(cta);
	

	TweenMax.to(endFrame, .5, { y:600, x:0, ease:Quad.easeOut, rotation:0.01, delay: 0});
	TweenMax.from(cta, 1, { y:50, opacity:0, ease:Quad.easeOut, rotation:0.01, delay: .3});
}


showElement = function(e){
  e.style.visibility = 'visible';
}

hideElement = function(e){
  e.style.visibility = 'hidden';
}
