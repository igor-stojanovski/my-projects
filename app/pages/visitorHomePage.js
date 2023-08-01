import { getItems } from "../../Data/data.js";

const logo = document.querySelector("#visitorHomePage .logo");
const auctionIcon = document.querySelector("#visitorHomePage .fa-gavel");
const findMoreBtn = document.querySelector(".findMore");

export function initVisitorHomePage() {
  const newStateItems = getItems();

  const topImages = newStateItems.slice();
  const bottomImages = newStateItems.slice();

  const sliderTopContainer = document.querySelector(".top");
  const sliderBottomContainer = document.querySelector(".bottom");

  topImages.forEach((item) => {
    const { image } = item;

    sliderTopContainer.innerHTML += `<img
    src="${image}" class="shadow-md" /> `;
  });

  bottomImages.forEach((item) => {
    const { image } = item;

    sliderBottomContainer.innerHTML += `<img
    src="${image}" class="shadow-md" /> `;
  });

  const allSliderImages = document.querySelectorAll(".slider img");

  allSliderImages.forEach((img) =>
    img.addEventListener("click", () => {
      location.hash = "visitorListing";
    })
  );
}

logo.addEventListener("click", () => {
  location.hash = "landingPage";
});

auctionIcon.addEventListener("click", () => {
  location.hash = "auctionPage";
});
findMoreBtn.addEventListener("click", () => {
  location.hash = "visitorListing";
});
