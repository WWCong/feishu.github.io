const pages = {};

var submitBtn = null;
var doneBtn = null;

$(document).ready(function () {
  replaceLogger()

  pages.mainPage = document.querySelector("div#main_page");
  pages.mainPageMenu = document.querySelector("div#menu");
  pages.cameraPage = document.querySelector("div#camera_page");
  pages.qestionPage = document.querySelector("div#quesionnaire");
  pages.donePage = document.querySelector("div#quesionnaire-done");
  submitBtn = document.querySelector(".q-submit");
  doneBtn = document.querySelector(".q-done");
  video = document.querySelector('.player');
  canvas = document.querySelector('.photo');
  ctx = canvas.getContext('2d');
  // IOS的浏览器要特殊设置，才能播放摄像头
  // Fix for iOS Safari from https://leemartin.dev/hello-webrtc-on-safari-11-e8bcb5335295
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '')

  initMainPage();
})

function replaceLogger() {
  var old = console.log;
  var logger = document.getElementById('log');
  console.log = function (...message) {
    for (let msg of message) {
      if (typeof msg == 'object') {
        logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(msg) : msg) + '<br />';
      } else {
        logger.innerHTML += msg + '<br />';
      }
    }
    old(...message)
  }
}

function show(page) {
  for (let key in pages) {
    if (key === page || page === pages[key]) {
      pages[key].style.display = "block";
    } else {
      pages[key].style.display = "none";
    }
  }
}

function initMainPage() {
  pages.mainPage.addEventListener("click", function (e) {
    let width = 1178,
      height = 2375;
    let targetX = 1083,
      targetY = 87,
      radis = 66;
    let targetLeft = (targetX - radis) / width,
      targetRight = (targetX + radis) / width;
    let targetTop = (targetY - radis) / height,
      targetBottom = (targetY + radis) / height;
    let curX = e.clientX / document.body.clientWidth,
      curY = e.clientY / document.body.clientHeight;

    if (
      targetLeft <= curX &&
      curX <= targetRight &&
      targetTop <= curY &&
      curY <= targetBottom
    ) {
      pages.mainPageMenu.style.display = "block";
    } else {
      pages.mainPageMenu.style.display = "none";
    }
    // console.log(curX, curY);
    // console.log(targetLeft, targetRight, targetTop, targetBottom);
    // console.log(e);
  });

  video.addEventListener("canplay", paintToCanvas);
  pages.mainPageMenu.addEventListener("click", function (e) {
    try {
      show(pages.cameraPage);
      getVideo();
    } catch (err) {
      alert(err)
    }
  });

  canvas.addEventListener("click", function (e) {
    for (let v of document.querySelectorAll("[name=receive-kind]")) {
      v.checked = false
    }
    for (let v of document.querySelectorAll("[name=receive-cnt]")) {
      v.checked = false
    }
    for (let v of document.querySelectorAll("textarea")) {
      v.value = ''
    }
    show(pages.qestionPage);
  });

  submitBtn.addEventListener("click", function (e) {
    show(pages.donePage);
  });

  doneBtn.addEventListener("click", function (e) {
    show(pages.mainPage);
  });
}

// 1178 2375
// 1083 87 33
