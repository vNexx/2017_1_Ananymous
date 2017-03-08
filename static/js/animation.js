var logo = document.getElementById("logo");
var logoOpacityValue = 0;
function fade() {
  logo.style.opacity = logoOpacityValue;
  logoOpacityValue += 0.1;
  if(logoOpacityValue < 0.8) {
    setTimeout(fade, 140);
  }
}
fade();

var hint = document.getElementById("hint");
var opacityValue = 0.3;
var increment = true;
function changeOpacity() {
  if(increment) {
    opacityValue += 0.1;
  } else {
    opacityValue -= 0.1;
  }
  hint.style.opacity = opacityValue;

  if(opacityValue >= 1 || opacityValue <= 0.3) {
    increment = !increment;
  }
  setTimeout(changeOpacity, 130);
}
changeOpacity();
