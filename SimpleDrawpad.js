/* make a drawing app */
var canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
var context = canvas.getContext('2d');
var mouseDown = false;
canvas.addEventListener('mousedown', function(e) {
  mouseDown = true;
  context.beginPath();
  context.moveTo(e.clientX, e.clientY);
});
canvas.addEventListener('mouseup', function(e) {
  mouseDown = false;
});
canvas.addEventListener('mousemove', function(e) {
  if (mouseDown) {
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
  }
});
/* add buttons to change paint colors */
var colors = ['red', 'green', 'blue', 'yellow', 'black'];
var colorButtons = [];
for (var i = 0; i < colors.length; i++) {
  var colorButton = document.createElement('button');
  colorButton.innerHTML = colors[i];
  colorButton.style.backgroundColor = colors[i];
  colorButton.addEventListener('click', function(e) {
    context.strokeStyle = e.target.innerHTML;
  });
  colorButtons.push(colorButton);
  document.body.appendChild(colorButton);
}
/* add an eraser */
var eraser = document.createElement('button');
eraser.innerHTML = 'Eraser';
eraser.addEventListener('click', function(e) {
  context.strokeStyle = 'white';
});
document.body.appendChild(eraser);
/* make the eraser erase bigger */
eraser.addEventListener('click', function(e) {
  context.lineWidth += 10;
});
/* add a clear button that clears all drawing */
var clear = document.createElement('button');
clear.innerHTML = 'Clear';
clear.addEventListener('click', function(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
});
document.body.appendChild(clear);
/* add a button to save images of the canvas */
var save = document.createElement('button');
save.innerHTML = 'Save';
save.addEventListener('click', function(e) {
  var image = canvas.toDataURL();
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.style.border = '2px solid black';
  document.body.appendChild(imageElement);
});
document.body.appendChild(save);
/* add more colors to draw with */
var moreColors = ['purple', 'orange', 'pink', 'brown', 'gray'];
for (var i = 0; i < moreColors.length; i++) {
  var colorButton = document.createElement('button');
  colorButton.innerHTML = moreColors[i];
  colorButton.style.backgroundColor = moreColors[i];
  colorButton.addEventListener('click', function(e) {
    context.strokeStyle = e.target.innerHTML;
  });
  colorButtons.push(colorButton);
  document.body.appendChild(colorButton);
}
/* add a button that deletes images */
var deleteImages = document.createElement('button');
deleteImages.innerHTML = 'Delete Images';
deleteImages.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    document.body.removeChild(images[i]);
  }
});
document.body.appendChild(deleteImages);
/* group the color buttons all together */
var colorGroup = document.createElement('div');
for (var i = 0; i < colorButtons.length; i++) {
  colorGroup.appendChild(colorButtons[i]);
}
document.body.appendChild(colorGroup);
/* make a button to load images into the canvas */
var load = document.createElement('button');
load.innerHTML = 'Load';
load.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  if (images.length > 0) {
    var image = images[0];
    var imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.addEventListener('load', function(e) {
      context.drawImage(imageElement, 0, 0);
    });
  }
});
document.body.appendChild(load);
/* group the load button with the other buttons */
var buttonGroup = document.createElement('div');
buttonGroup.appendChild(load);
buttonGroup.appendChild(save);
buttonGroup.appendChild(clear);
buttonGroup.appendChild(eraser);
buttonGroup.appendChild(deleteImages);
document.body.appendChild(buttonGroup);
/* Add a title called "SimpleDrawpad" */
var title = document.createElement('h1');
title.innerHTML = 'SimpleDrawpad';
document.body.appendChild(title);
/* put a header "Saved Images" that's underlined, underneath the title */
var header = document.createElement('h2');
header.innerHTML = 'Saved Images';
header.style.textDecoration = 'underline';
document.body.appendChild(header);
/* add an input box that changes the thickness of drawing */
var thicknessInput = document.createElement('input');
thicknessInput.type = 'number';
thicknessInput.value = '10';
thicknessInput.addEventListener('change', function(e) {
  context.lineWidth = thicknessInput.value;
});
document.body.appendChild(thicknessInput);
/* move it next to the buttons */
buttonGroup.appendChild(thicknessInput);
/* label it as 'Thickness" */
var thicknessLabel = document.createElement('label');
thicknessLabel.innerHTML = 'Thickness';
document.body.appendChild(thicknessLabel);
buttonGroup.appendChild(thicknessLabel);
/* put thickness above the input box */
buttonGroup.removeChild(thicknessInput);
buttonGroup.removeChild(thicknessLabel);
buttonGroup.appendChild(thicknessInput);
buttonGroup.appendChild(thicknessLabel);
/* put normal text underneath the Title that reads "This entire website has been entirely generated using OpenAI Programs: Codex and DALL-E2! */
var text = document.createElement('p');
text.innerHTML = 'This entire website has been entirely generated using OpenAI Programs: Codex and DALL-E2!';
document.body.appendChild(text);
/* move it in between the saved images header and the title */
document.body.removeChild(text);
document.body.insertBefore(text, header);
/* make each word of the text a different color */
var words = text.innerHTML.split(' ');
text.innerHTML = '';
for (var i = 0; i < words.length; i++) {
  var word = document.createElement('span');
  word.innerHTML = words[i];
  word.style.color = colors[i % colors.length];
  text.appendChild(word);
  text.appendChild(document.createTextNode(' '));
}
/* remove the yellow color from the text */
var yellowWords = text.getElementsByTagName('span');
for (var i = 0; i < yellowWords.length; i++) {
  if (yellowWords[i].style.color == 'yellow') {
    yellowWords[i].style.color = 'black';
  }
}
/* color the black words */
var blackWords = text.getElementsByTagName('span');
for (var i = 0; i < blackWords.length; i++) {
  if (blackWords[i].style.color == 'black') {
    blackWords[i].style.color = 'red';
  }
}
/* make a timer button that makes a timer in the top right of the canvas that counts down from 60 seconds */
var timer = document.createElement('button');
timer.innerHTML = 'Timer';
timer.addEventListener('click', function(e) {
  var time = 60;
  var timerText = document.createElement('div');
  timerText.style.position = 'absolute';
  timerText.style.top = '0px';
  timerText.style.right = '0px';
  timerText.style.fontSize = '30px';
  timerText.style.fontWeight = 'bold';
  timerText.style.color = 'black';
  document.body.appendChild(timerText);
  var interval = setInterval(function() {
    time--;
    timerText.innerHTML = time;
    if (time == 0) {
      clearInterval(interval);
      document.body.removeChild(timerText);
    }
  }, 1000);
});
document.body.appendChild(timer);
/* move the button to above the colors */
document.body.removeChild(timer);
document.body.insertBefore(timer, colorGroup);
/* bold the text that says "Thickness" */
thicknessLabel.style.fontWeight = 'bold';
/* make a gray border around the canvas */
canvas.style.border = '2px solid gray';
/* make a ringing sound play for 3 seconds when the timer ends */
var audio = document.createElement('audio');
audio.src = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3';
audio.addEventListener('ended', function(e) {
  audio.currentTime = 0;
});
timer.addEventListener('click', function(e) {
  audio.play();
  setTimeout(function() {
    audio.pause();
  }, 3000);
});
/* Make small text at the bottom of the page that says "Made by Logan Schmunck 2022" */
var footer = document.createElement('div');
footer.innerHTML = 'Made by Logan Schmunck 2022';
footer.style.fontSize = '10px';
footer.style.position = 'absolute';
footer.style.bottom = '0px';
footer.style.right = '0px';
document.body.appendChild(footer);
/* move it to the bottom of the webpage */
footer.style.position = 'fixed';
/* move the watermark to the bottom right of the images */
save.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    document.body.removeChild(images[i]);
  }
  var image = canvas.toDataURL();
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.style.border = '2px solid black';
  imageElement.addEventListener('load', function(e) {
    var watermark = document.createElement('canvas');
    watermark.width = imageElement.width;
    watermark.height = imageElement.height;
    var watermarkContext = watermark.getContext('2d');
    watermarkContext.drawImage(imageElement, 0, 0);
    watermarkContext.font = '20px Arial';
    watermarkContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
    watermarkContext.fillText('SimpleDrawpad', watermark.width - 150, watermark.height - 10);
    imageElement.src = watermark.toDataURL();
  });
  document.body.appendChild(imageElement);
});
/* add a button toggle for light mode and dark mode */
var lightMode = document.createElement('button');
lightMode.innerHTML = 'Light Mode';
lightMode.addEventListener('click', function(e) {
  document.body.style.backgroundColor = 'white';
  document.body.style.color = 'black';
  canvas.style.border = '2px solid gray';
  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.backgroundColor = colors[i];
  }
  lightMode.style.backgroundColor = 'lightgray';
  darkMode.style.backgroundColor = 'white';
});
document.body.appendChild(lightMode);
var darkMode = document.createElement('button');
darkMode.innerHTML = 'Dark Mode';
darkMode.addEventListener('click', function(e) {
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  canvas.style.border = '2px solid white';
  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.backgroundColor = colors[i];
  }
  lightMode.style.backgroundColor = 'white';
  darkMode.style.backgroundColor = 'lightgray';
});
document.body.appendChild(darkMode);
/* add white as a color button with the colors */
var white = document.createElement('button');
white.innerHTML = 'white';
white.style.backgroundColor = 'white';
white.addEventListener('click', function(e) {
  context.strokeStyle = 'white';
});
colorButtons.push(white);
colorGroup.appendChild(white);
/* make all images have the watermark */
save.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    document.body.removeChild(images[i]);
  }
  var image = canvas.toDataURL();
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.style.border = '2px solid black';
  imageElement.addEventListener('load', function(e) {
    var watermark = document.createElement('canvas');
    watermark.width = imageElement.width;
    watermark.height = imageElement.height;
    var watermarkContext = watermark.getContext('2d');
    watermarkContext.drawImage(imageElement, 0, 0);
    watermarkContext.font = '20px Arial';
    watermarkContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
    watermarkContext.fillText('SimpleDrawpad', watermark.width - 150, watermark.height - 10);
    imageElement.src = watermark.toDataURL();
  });
  document.body.appendChild(imageElement);
});
/* check what time it is for the user and turn on dark mode if it is past 9:00 PM and before 6:00 AM */
var date = new Date();
var hour = date.getHours();
if (hour >= 21 || hour < 6) {
  document.body.style.backgroundColor = 'black';
  document.body.style.color = 'white';
  canvas.style.border = '2px solid white';
  for (var i = 0; i < colorButtons.length; i++) {
    colorButtons[i].style.backgroundColor = colors[i];
  }
  lightMode.style.backgroundColor = 'white';
  darkMode.style.backgroundColor = 'lightgray';
}
/* Add magenta and cyan drawing colors */
var magenta = document.createElement('button');
magenta.innerHTML = 'magenta';
magenta.style.backgroundColor = 'magenta';
magenta.addEventListener('click', function(e) {
  context.strokeStyle = 'magenta';
});
colorButtons.push(magenta);
colorGroup.appendChild(magenta);
var cyan = document.createElement('button');
cyan.innerHTML = 'cyan';
cyan.style.backgroundColor = 'cyan';
cyan.addEventListener('click', function(e) {
  context.strokeStyle = 'cyan';
});
colorButtons.push(cyan);
colorGroup.appendChild(cyan);
/* move them to inbetween yellow and black */
colorGroup.removeChild(magenta);
colorGroup.removeChild(cyan);
colorGroup.insertBefore(magenta, colorGroup.children[3]);
colorGroup.insertBefore(cyan, colorGroup.children[4]);
/* add a layer selector underneath the load button */
var layerSelector = document.createElement('select');
layerSelector.addEventListener('change', function(e) {
  var layer = layerSelector.value;
  if (layer == 'Background') {
    context.globalCompositeOperation = 'source-over';
  } else if (layer == 'Foreground') {
    context.globalCompositeOperation = 'destination-over';
  } else if (layer == 'Add') {
    context.globalCompositeOperation = 'lighter';
  } else if (layer == 'Subtract') {
    context.globalCompositeOperation = 'darker';
  } else if (layer == 'Multiply') {
    context.globalCompositeOperation = 'multiply';
  } else if (layer == 'Screen') {
    context.globalCompositeOperation = 'screen';
  } else if (layer == 'Overlay') {
    context.globalCompositeOperation = 'overlay';
  } else if (layer == 'Hard Light') {
    context.globalCompositeOperation = 'hard-light';
  } else if (layer == 'Soft Light') {
    context.globalCompositeOperation = 'soft-light';
  } else if (layer == 'Difference') {
    context.globalCompositeOperation = 'difference';
  } else if (layer == 'Exclusion') {
    context.globalCompositeOperation = 'exclusion';
  } else if (layer == 'Hue') {
    context.globalCompositeOperation = 'hue';
  } else if (layer == 'Saturation') {
    context.globalCompositeOperation = 'saturation';
  } else if (layer == 'Color') {
    context.globalCompositeOperation = 'color';
  } else if (layer == 'Luminosity') {
    context.globalCompositeOperation = 'luminosity';
  }
});
var layerOptions = ['Background', 'Foreground', 'Add', 'Subtract', 'Multiply', 'Screen', 'Overlay', 'Hard Light', 'Soft Light', 'Difference', 'Exclusion', 'Hue', 'Saturation', 'Color', 'Luminosity'];
for (var i = 0; i < layerOptions.length; i++) {
  var layerOption = document.createElement('option');
  layerOption.innerHTML = layerOptions[i];
  layerSelector.appendChild(layerOption);
}
document.body.appendChild(layerSelector);
/* add the label "layers" above the layers dropdown */
var layerLabel = document.createElement('label');
layerLabel.innerHTML = 'Layers';
document.body.appendChild(layerLabel);
/* make a image uploader that auto matically fits images into the canvas */
var upload = document.createElement('input');
upload.type = 'file';
upload.addEventListener('change', function(e) {
  var file = upload.files[0];
  var reader = new FileReader();
  reader.addEventListener('load', function(e) {
    var image = document.createElement('img');
    image.src = reader.result;
    image.addEventListener('load', function(e) {
      var scale = Math.min(canvas.width / image.width, canvas.height / image.height);
      context.drawImage(image, 0, 0, image.width * scale, image.height * scale);
    });
  });
  reader.readAsDataURL(file);
});
document.body.appendChild(upload);
/* move it to the far left */
document.body.removeChild(upload);
document.body.insertBefore(upload, document.body.children[0]);
/* center the light mode and dark mode buttons and the layers dropdown and text t the bottom */
var center = document.createElement('div');
center.style.textAlign = 'center';
center.appendChild(lightMode);
center.appendChild(darkMode);
center.appendChild(layerSelector);
center.appendChild(layerLabel);
document.body.appendChild(center);
/* change the borders around saved images to gray */
save.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    document.body.removeChild(images[i]);
  }
  var image = canvas.toDataURL();
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.style.border = '2px solid gray';
  imageElement.addEventListener('load', function(e) {
    var watermark = document.createElement('canvas');
    watermark.width = imageElement.width;
    watermark.height = imageElement.height;
    var watermarkContext = watermark.getContext('2d');
    watermarkContext.drawImage(imageElement, 0, 0);
    watermarkContext.font = '20px Arial';
    watermarkContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
    watermarkContext.fillText('SimpleDrawpad', watermark.width - 150, watermark.height - 10);
    imageElement.src = watermark.toDataURL();
  });
  document.body.appendChild(imageElement);
});
/* save saved images to the browser so that they still show up even after the tab was closed */
save.addEventListener('click', function(e) {
  var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    document.body.removeChild(images[i]);
  }
  var image = canvas.toDataURL();
  var imageElement = document.createElement('img');
  imageElement.src = image;
  imageElement.style.border = '2px solid gray';
  imageElement.addEventListener('load', function(e) {
    var watermark = document.createElement('canvas');
    watermark.width = imageElement.width;
    watermark.height = imageElement.height;
    var watermarkContext = watermark.getContext('2d');
    watermarkContext.drawImage(imageElement, 0, 0);
    watermarkContext.font = '20px Arial';
    watermarkContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
    watermarkContext.fillText('SimpleDrawpad', watermark.width - 150, watermark.height - 10);
    imageElement.src = watermark.toDataURL();
  });
  document.body.appendChild(imageElement);
  localStorage.setItem('images', JSON.stringify(document.body.innerHTML));
});