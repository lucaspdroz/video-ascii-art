// Video to ASCII

/*
 Ideas from 
 https://ertdfgcvb.xyz/
The Coding Train / Daniel Shiffman
 https://thecodingtrain.com/CodingChallenges/166-ascii-image.html

 Made by Lucas Pacheco
 https://www.linkedin.com/in/lucaspdroz/
*/

// const density = "._,=-+:;$W#@Ñ";

const density = '   .-i|=+%O#@'
let video;
let asciiDiv;
let playing = false;
let button;

function setup() {
  noCanvas();
  video = createVideo(['assets/TWS-7NA.mov', 'assets/fingers.mov']);
  // video.size(64, 48);
  video.size(178, 68);
  video.hide();
  button = createButton('►');
  button.mousePressed(toggleVid);
  asciiDiv = createDiv();
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      else asciiImage += c;
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}

function toggleVid() {
  if (playing) {
    video.pause();
    button.html('►');
  } else {
    video.loop();
    button.html('■');
  }
  playing = !playing;
}