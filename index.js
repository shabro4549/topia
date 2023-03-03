// var TxtType = function (el, toRotate, period) {
//   this.toRotate = toRotate;
//   this.el = el;
//   this.loopNum = 0;
//   this.period = parseInt(period, 10) || 2000;
//   this.txt = "";
//   this.tick();
//   this.isDeleting = false;
// };

// TxtType.prototype.tick = function () {
//   if (this.loopNum >= this.toRotate.length) {
//     this.el.innerHTML =
//       '<span class="end">' +
//       '<img src="images/topia-logo.png" class="topia">' +
//       "</img>" +
//       "</span>" +
//       '<span class="end">' +
//       '<a href="https://www.eventbrite.ca/" class="button">' +
//       "RSVP";
//     "</a>" + "</span>";
//     return;
//   }

//   var fullTxt = this.toRotate[this.loopNum];

//   if (this.isDeleting) {
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

//   var that = this;
//   var delta = 180 - Math.random() * 100;

//   if (this.isDeleting) {
//     delta /= 12;
//   }

//   if (!this.isDeleting && this.txt === fullTxt) {
//     delta = this.period;
//     this.isDeleting = true;
//   } else if (this.isDeleting && this.txt === "") {
//     this.isDeleting = false;
//     this.loopNum++;
//     delta = 500;
//   }

//   setTimeout(function () {
//     that.tick();
//   }, delta);
// };

// window.onload = function () {
//   var elements = document.getElementsByClassName("typewrite");
//   for (var i = 0; i < elements.length; i++) {
//     var toRotate = elements[i].getAttribute("data-type");
//     var period = elements[i].getAttribute("data-period");
//     if (toRotate) {
//       new TxtType(elements[i], JSON.parse(toRotate), period);
//     }
//   }
//   // INJECT CSS
//   var css = document.createElement("style");
//   css.type = "text/css";
//   css.innerHTML = ".typewrite > .wrap { }";
//   document.body.appendChild(css);
// };

const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = [
  "Deep in the jungle",
  "where the creatures play",
  "You are invited",
  "to dance the night away",
];

const morphTime = 1.5;
const cooldownTime = 1;

let textIndex = -1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;
var abort = false;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  if (textIndex < texts.length - 1) {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  } else {
    if (abort) {
      return;
    } else {
      console.log("done");
      // document.getElementById("but").classList.add("fade-in-image");
      document.getElementById("but").style.visibility = "visible";
      document.getElementById("but").addEventListener("click", animateTopia);
    }
  }
  // document.getElementById("overlay").style.visibility = "visible";
  // document.getElementById("jpg").style.visibility = "visible";
  // document.getElementById("logo").style.visibility = "visible";
  // document.getElementById("leaf-top").style.visibility = "visible";
  // document.getElementById("leaf-bottom").style.visibility = "visible";
}

function animateTopia() {
  console.log("Ready");

  document.getElementById("but").style.visibility = "hidden";
  document.getElementById("text1").style.visibility = "hidden";
  document.getElementById("text2").style.visibility = "hidden";
  document.getElementById("volume").style.visibility = "hidden";
  document.getElementById("skip").style.visibility = "hidden";
  // document.getElementById("it").style.visibility = "visible";
  // document.getElementById("it").classList.add("fade-in");

  document.getElementById("overlay").style.visibility = "visible";
  // document.getElementById("overlay").classList.add("fade-in");
  // document.getElementById("overlay").style.visibility = "visible";

  document.getElementById("leaf-top").classList.add("fade-leaves");
  document.getElementById("leaf-top").style.visibility = "visible";
  // document.getElementById("leaf-top-mobile").style.visibility = "visible";
  document.getElementById("leaf-bottom").classList.add("fade-leaves");
  document.getElementById("leaf-bottom").style.visibility = "visible";

  document.getElementById("jpg").classList.add("fade-logo");
  document.getElementById("presents").classList.add("fade-presents");
  document.getElementById("presents").style.visibility = "visible";
  document.getElementById("presents").style.opacity = "0";

  document.getElementById("topia-leaves").classList.add("fade-topia");
  document.getElementById("topia-leaves").style.opacity = "0";
  document.getElementById("topia-leaves").style.visibility = "visible";

  document.getElementById("host").style.display = "block";
  document.getElementById("host").classList.add("fade-collections");

  document.getElementById("description").classList.add("fade-description");
  document.getElementById("description").style.visibility = "visible";
  document.getElementById("description").style.opacity = "0";
  document.getElementById("details").classList.add("fade-details");
  document.getElementById("details").style.visibility = "visible";
  document.getElementById("details").style.opacity = "0";
  document.getElementById("input").classList.add("fade-input");
  document.getElementById("input").style.visibility = "visible";
  document.getElementById("input").style.opacity = "0";

  // document.getElementById("topia-leaves").style.bottom = "300px";
}

animate();

// "<br>" +
// "<br>" +
// "<br>" +
// "<br>" +
// "<br>" +
// '<span id="demo">' +
// "NFT NYC" +
// "<br>" +
// "Nebula" +
// "<br>" +
// "April 13th, 2023" +
// "<br>" +
// "8pm" +
// "</span>"
