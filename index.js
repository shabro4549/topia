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
      document.getElementById("but").style.visibility = "visible";
      document.getElementById("but").addEventListener("click", animateTopia);
    }
  }
}

function animateTopia() {
  console.log("Ready");

  document.getElementById("but").style.visibility = "hidden";
  document.getElementById("text1").style.visibility = "hidden";
  document.getElementById("text2").style.visibility = "hidden";
  document.getElementById("skip").style.visibility = "hidden";

  document.getElementById("overlay").style.visibility = "visible";

  document.getElementById("leaf-top").classList.add("fade-leaves");
  document.getElementById("leaf-top").style.visibility = "visible";

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
}

animate();
