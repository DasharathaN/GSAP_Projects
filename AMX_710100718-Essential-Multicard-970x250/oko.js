/////////////////////////////////////////////////////////
//
// Listeners
//
/////////////////////////////////////////////////////////
function addListeners(_over, _out) {
  var clickthrough = document.querySelector(".clickthrough");
  clickthrough.addEventListener("click", onClickThrough);
  clickthrough.addEventListener("mouseover", _over);
  clickthrough.addEventListener("mouseout", _out);
}

var toggle = false
function onClickThrough() {
  window.open(window.clickTag);
  // Enabler.exitOverride("Default Clickthrough", banner.data.ClickThrough_URL.Url);
  // Enabler.exit('Backgrond Clickthrough');
}


/////////////////////////////////////////////////////////
//
// Polyfills
//
/////////////////////////////////////////////////////////
ArrayFrom = function (list) {
  var array = [];
  for (i = 0; i < list.length; i++) {
    array.push(list[i]);
  }
  return array;
};

/////////////////////////////////////////////////////////
//
// META DATA EXTRACTOR
//
/////////////////////////////////////////////////////////
// returns an object with width & height of banner.
function getAdSizeMeta() {
  var content;
  var metaTags = document.getElementsByTagName("meta");
  ArrayFrom(metaTags).map(function (meta) {
    if (meta.name == "ad.size") {
      content = meta.content.split(",");
    }
  });
  var size = {
    width: parseInt(content[0].substring(6)),
    height: parseInt(content[1].substring(7))
  };
  return size;
}

// SET BANNER SIZE --------------------------------------------
function setBannerSize() {
  // check banner exists.
  if (!window.hasOwnProperty("banner")) window.banner = {};

  banner.width = getAdSizeMeta().width;
  banner.height = getAdSizeMeta().height;
  document.querySelector(".banner").style.width = banner.width + "px";
  document.querySelector(".banner").style.height = banner.height + "px";

  document.title = getAdSizeMeta().width + "x" + getAdSizeMeta().height;
}

///////////////////////////////////////////////////
//
//  Helpers
//
///////////////////////////////////////////////////
function createLines(target) {
  // var n = 0;
  var copy = document.querySelectorAll(target ? target : ".copy");
  copy.forEach(function (textBlock) {
    var lines = textBlock.innerHTML.split("<br>");
    var html = "";
    lines.map(function (line, n) {
      html += '<div class="line ' + ("line" + (n + 1)) + '">' + line + '</div>';
    })
    textBlock.innerHTML = html;
  })
}

function splitLinesToWords(target) {
  var n = 0;
  var lines = ArrayFrom(document.querySelector(target).querySelectorAll(".line"));
  lines.map(function (line, i) {
    var words = line.innerHTML.split(" ");
    words = words.map(function (word) {
      n++
      return ("<span class='word word" + n + "'>" + word + "</span>")
    })
    line.innerHTML = words.join(" ");
  });
}

function splitText(target, type) {
  const elements = document.querySelectorAll(target);
  elements.forEach(element => {
    const lines = element.innerHTML.trim().split("<br>" || "<br/>");
    let html = "";
    lines.map((line, i) => {
      // new line line
      html += `<span class='line line${i}'>`;
      if(type === "lines"){
        html += line
      } else {
        let words = line.trim().split(" ")
        words.map(word => {
          html += "<span class='word'>";
          let letters = word.split("")
          letters.map(letter => {
              html += "<span class='letter'>" + (letter === "*" ? "<sup>*</sup>" : letter) + "</span>";
          })
          html += " </span>";
        })
      }
      // close line
      html += "</span>"
    });
    element.innerHTML = html;
  })
}


// ==============================
//
// CANVAS SPRITES
// & Particle Systems
//
// ==============================
const newSprite = (imageElement, targetContext, spriteSheet, spriteVars) => {

  var imgEl = imageElement.length ? document.querySelector(imageElement) : imageElement;

  return {
      img: {
          x: (spriteSheet && spriteSheet.x) ? spriteSheet.x : 0,
          y: (spriteSheet && spriteSheet.y) ? spriteSheet.y : 0,
          width: (spriteSheet && spriteSheet.width) ? spriteSheet.width : imgEl.naturalWidth,
          height: (spriteSheet && spriteSheet.height) ? spriteSheet.height : imgEl.naturalHeight,
          src: imgEl
      },
      offset: { x: 0, y: 0, rotation: 0, scale: 1 },
      x: (spriteVars && spriteVars.x) ? spriteVars.x : 0,
      y: (spriteVars && spriteVars.y) ? spriteVars.y : 0,
      alpha: (spriteVars && spriteVars.alpha) ? spriteVars.alpha : 1,
      rotation: (spriteVars && spriteVars.rotation) ? spriteVars.rotation : 0,
      scale: (spriteVars && spriteVars.scale) ? spriteVars.scale : 1,
      scaleX: (spriteVars && spriteVars.scaleX) ? spriteVars.scaleX : null,
      scaleY: (spriteVars && spriteVars.scaleY) ? spriteVars.scaleY : null,
      isHidden: false,
      ctx: targetContext
  };
};
const drawSprite = (p) => {
  if (p && !p.isHidden && p.alpha > 0) {
      p.ctx.translate(
          p.x + p.offset.x,
          p.y + p.offset.y
      );
      p.ctx.globalAlpha = p.alpha;
      p.ctx.rotate(p.rotation + p.offset.rotation);

      if (p.scaleX || p.scaleX) {
          p.ctx.drawImage(
              // Source image element
              p.img.src,
              p.img.x,
              p.img.y,
              p.img.width,
              p.img.height,
              p.img.width * -0.5 * p.scaleX * p.offset.scale,
              p.img.height * -0.5 * p.scaleY * p.offset.scale,
              p.img.width * p.scaleX * p.offset.scale,
              p.img.height * p.scaleY * p.offset.scale
          );
      } else {
          p.ctx.drawImage(
              // Source image element
              p.img.src,
              p.img.x,
              p.img.y,
              p.img.width,
              p.img.height,
              p.img.width * -0.5 * p.scale * p.offset.scale,
              p.img.height * -0.5 * p.scale * p.offset.scale,
              p.img.width * p.scale * p.offset.scale,
              p.img.height * p.scale * p.offset.scale
          );
      }
      p.ctx.rotate(-p.rotation - p.offset.rotation);
      p.ctx.translate(
          -p.x - p.offset.x,
          -p.y - p.offset.y
      );
  }
};
const centerSprite = (sprite, target, offset) => {
  sprite.x = target.width * 0.5 + ((offset && offset.x) ? offset.x : 0)
  sprite.y = target.height * 0.5 + ((offset && offset.y) ? offset.y : 0)
}