var video = null;
var canvas = null;
var ctx = null;
// const strip = document.querySelector('.strip');
// const snap = document.querySelector('.snap');

const constraints = {
  audio: false,
  video: {
    facingMode: 'environment'
  }
}

function getVideo() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(localMediaStream => {
      console.log(localMediaStream);

      //  DEPRECIATION : 
      //       The following has been depreceated by major browsers as of Chrome and Firefox.
      //       video.src = window.URL.createObjectURL(localMediaStream);
      //       Please refer to these:
      //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
      console.dir(video);
      if ('srcObject' in video) {
        video.srcObject = localMediaStream;
      } else {
        video.src = URL.createObjectURL(localMediaStream);
      }
      // video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      alert(`getVideo error: ` + err);
    });
}

function paintToCanvas() {
  const width = pages.cameraPage.clientWidth;
  const height = pages.cameraPage.clientHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

// function takePhoto() {
//   // played the sound
//   snap.currentTime = 0;
//   snap.play();

//   // take the data out of the canvas
//   const data = canvas.toDataURL('image/jpeg');
//   const link = document.createElement('a');
//   link.href = data;
//   link.setAttribute('download', 'handsome');
//   link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
//   strip.insertBefore(link, strip.firstChild);
// }

// function redEffect(pixels) {
//   for (let i = 0; i < pixels.data.length; i+=4) {
//     pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
//     pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
//     pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
//   }
//   return pixels;
// }

// function rgbSplit(pixels) {
//   for (let i = 0; i < pixels.data.length; i+=4) {
//     pixels.data[i - 150] = pixels.data[i + 0]; // RED
//     pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
//     pixels.data[i - 550] = pixels.data[i + 2]; // Blue
//   }
//   return pixels;
// }

// function greenScreen(pixels) {
//   const levels = {};

//   document.querySelectorAll('.rgb input').forEach((input) => {
//     levels[input.name] = input.value;
//   });

//   for (i = 0; i < pixels.data.length; i = i + 4) {
//     red = pixels.data[i + 0];
//     green = pixels.data[i + 1];
//     blue = pixels.data[i + 2];
//     alpha = pixels.data[i + 3];

//     if (red >= levels.rmin
//       && green >= levels.gmin
//       && blue >= levels.bmin
//       && red <= levels.rmax
//       && green <= levels.gmax
//       && blue <= levels.bmax) {
//       // take it out!
//       pixels.data[i + 3] = 0;
//     }
//   }

//   return pixels;
// }
