import { updateImage } from "./artistAddNewItemPage.js";

const captureImageBtn = document.querySelector(".capture-icon");
const liveStream = document.querySelector("#liveStream");
const canvasStream = document.querySelector("#captureStream");
const captureImagePopupBox = document.querySelector(".artistCaptureImagePopup");

export function initArtistCaptureImage() {
  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: {
          ideal: "environment",
        },
      },
    })
    .then((stream) => {
      liveStream.srcObject = stream;
    });
}

liveStream.addEventListener("canplay", function () {
  canvasStream.width = liveStream.videoWidth;
  canvasStream.height = liveStream.videoHeight;
});

captureImageBtn.addEventListener("click", function () {
  const ctx = canvasStream.getContext("2d");
  ctx.drawImage(liveStream, 0, 0);

  const imgUrl = canvasStream.toDataURL("image/png", 1.0);

  const imgContainer = document.querySelector(".captured-img-container");
  imgContainer.style.backgroundImage = `url(${imgUrl})`;
  captureImagePopupBox.classList.toggle("show-popup");

  updateImage(imgUrl);
  setTimeout(() => {
    stopStream();
  }, 500);
});

function stopStream() {
  const stream = liveStream.srcObject;
  const allTracks = stream.getTracks();
  allTracks.forEach((track) => track.stop());
}
