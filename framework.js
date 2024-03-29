const mainPage = document.querySelector("div#main_page");
const mainPageMenu = document.querySelector("div#menu");
const cameraPage = document.querySelector("div#camera_page");

(function () {
  cameraPage.style.display = "none";

  mainPage.addEventListener("click", function (e) {
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
        mainPageMenu.style.display = "block";
    } else {
      mainPageMenu.style.display = "none";
    }
    // console.log(curX, curY);
    // console.log(targetLeft, targetRight, targetTop, targetBottom);
    // console.log(e);
  });

  mainPageMenu.addEventListener("click", function (e) {
    mainPage.style.display = "none";
    cameraPage.style.display = "block";
    getVideo();
  });
})();

// 1178 2375
// 1083 87 33
