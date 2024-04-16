const pages = {
  mainPage: document.querySelector("div#main_page"),
  mainPageMenu: document.querySelector("div#menu"),
  cameraPage: document.querySelector("div#camera_page"),
  qestionPage: document.querySelector("div#quesionnaire"),
  donePage: document.querySelector("div#quesionnaire-done"),
};
const submitBtn = document.querySelector(".q-submit");
const doneBtn = document.querySelector(".q-done");

function show(page) {
  for (let key in pages) {
    if (key === page || page === pages[key]) {
      pages[key].style.display = "block";
    } else {
      pages[key].style.display = "none";
    }
  }
  video.pause();
}

(function () {
  // show(pages.cameraPage);
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
    show(pages.cameraPage);
    getVideo();
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
})();

// 1178 2375
// 1083 87 33
