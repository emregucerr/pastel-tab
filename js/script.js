var col;
var hex;
var clip;
var auto;
var speed;
var looping = false;
var lightness = "95%";

document.addEventListener('DOMContentLoaded', function() {
    setupCopy();
    setDefaultValues();
    setupStoredVariables();
    handleEvents();
    clock();
});

function clock() {
  document.querySelector('#clock').innerHTML = moment().format('h:mm A');
  setTimeout(function() { clock(); }, 500);
}

function updateButtons() {
  if (!auto) {
    document.querySelector('#auto-check').innerHTML = '';
    document.querySelector('#gen').innerHTML = 'generate';
  } else {
    $('#auto-check').html('check');

    setSpeedBars();

    //start loop
    if (!looping) {
      looping = true;
      changeColor();
    }
  }
}

function setSpeedBars() {
  var sbars = "|";
  sbars = sbars.repeat(speed);
  $('#gen').html('speed: ' + sbars);
}

function setValues() {
  chrome.storage.sync.set({'auto': auto });
  chrome.storage.sync.set({'speed': speed });
}

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsl(' + col + ', 100%, ' + lightness + ')'); //set color

  hex = '#' + tinycolor('hsl(' + col + ', 100%, ' + lightness + ')').toHex(); //translate to hex
  document.querySelector('#text').innerHTML = hex; //set text
  document.querySelector('#text').classList.remove('copied');

  //auto-generate colors is option is enabled
  if (auto) {
    setTimeout(function() {

      if (auto) {
        changeColor();
      } else {
        looping = false;
      }

    }, (6 - speed)*1000);
  } else {
    looping = false;
  }
}
