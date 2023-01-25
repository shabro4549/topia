var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  if (this.loopNum >= this.toRotate.length) {
    this.el.innerHTML =
      '<span class="end">' +
      "JUNGLE" +
      "<br>" +
      "</span>" +
      '<span id="demo">' +
      "NFT NYC" +
      "<br>" +
      "Nebula" +
      "<br>" +
      "April 13th, 2023" +
      "<br>" +
      "8pm" +
      "</span>" +
      '<img src="images/naru.png" alt="naru" class="naru">' +
      "</img>" +
      '<img src="images/clay.png" alt="clay" class="clay">' +
      "</img>" +
      '<img src="images/kong.png" alt="kong" class="kong">' +
      "</img>";
    return;
  }

  var fullTxt = this.toRotate[this.loopNum];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 180 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 8;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  // var x = document.getElementById("myAudio");
  // x.play();
  // console.log("x is...");
  // console.log(x);
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { }";
  document.body.appendChild(css);
};
