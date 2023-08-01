import { getItems, items } from "../../Data/data.js";
import { renderingArtistsNamesInSelect } from "./globals.js";

const containerItems = document.querySelector(".container-visitor-items");
const typeSelection = document.querySelector("#typeSelection");

const visitorFilters = document.querySelector("#visitorFilters");

const openFiltersBtn = document.querySelector(".filter-icon-button");
const closeBtn = document.querySelector(".close-btn");
const applyFiltersBtn = document.querySelector(".apply-filters-btn");

const artistSelectFilterPage = document.querySelector("#artistSelection");

const logo = document.querySelector("#visitorListing .logo");
const auctionIcon = document.querySelector("#visitorListing .fa-gavel");

export function initVisitorListing() {
  const newStateItems = getItems();

  const publishedItems = newStateItems.filter((item) => item.isPublished);
  listItems(publishedItems);
}

logo.addEventListener("click", () => {
  location.hash = "";
  openFiltersBtn.style.display = "flex";
  if (visitorFilters.classList.contains("visitorFilters-visible")) {
    visitorFilters.classList.toggle("visitorFilters-visible");
  }
});
auctionIcon.addEventListener("click", () => {
  location.hash = "auctionPage";
  openFiltersBtn.style.display = "flex";
  if (visitorFilters.classList.contains("visitorFilters-visible")) {
    visitorFilters.classList.toggle("visitorFilters-visible");
  }
});

openFiltersBtn.addEventListener("click", function () {
  visitorFilters.classList.toggle("visitorFilters-visible");
  openFiltersBtn.style.display = "none";

  renderingArtistsNamesInSelect(artistSelectFilterPage);
  renderItemTypes(typeSelection);
});

closeBtn.addEventListener("click", function () {
  visitorFilters.classList.toggle("visitorFilters-visible");
  setTimeout(() => {
    openFiltersBtn.style.display = "flex";
  }, 800);
});

applyFiltersBtn.addEventListener("click", function () {
  containerItems.innerHTML = "";

  const titleFilter = document.querySelector(".filter-title input");
  const artistFilter = document.querySelector(".filter-artist select");
  const minPriceFilter = document.querySelector("#min");
  const maxPriceFilter = document.querySelector("#max");
  const typeFilter = document.querySelector(".filter-type select");

  const newStateItems = getItems();

  const filtered = newStateItems.filter((item) => {
    const { title, artist, type, price } = item;
    const minPrice = Number(minPriceFilter.value);
    const maxPrice = Number(maxPriceFilter.value);

    if (!item.isPublished) {
      return false;
    }

    if (
      titleFilter.value &&
      !title.toLowerCase().includes(titleFilter.value.toLowerCase())
    ) {
      return false;
    }

    if (artistFilter.value && artist !== artistFilter.value) {
      return false;
    }

    if (
      typeFilter.value &&
      type.toLowerCase() !== typeFilter.value.toLowerCase()
    ) {
      return false;
    }

    if (minPrice && maxPrice && price >= minPrice && price <= maxPrice) {
      return true;
    }

    if (minPriceFilter.value && price < minPrice) {
      return false;
    }

    if (maxPriceFilter.value && price > maxPrice) {
      return false;
    }

    return true;
  });

  titleFilter.value = "";
  minPriceFilter.value = "";
  maxPriceFilter.value = "";

  listItems(filtered);

  visitorFilters.classList.toggle("visitorFilters-visible");
  setTimeout(() => {
    openFiltersBtn.style.display = "flex";
  }, 800);
});

function listItems(array) {
  containerItems.innerHTML = "";
  array.forEach((item, i) => {
    containerItems.innerHTML += `
        <div class="item ${i % 2 === 0 ? "" : "item2"} section-margin">
              <div class="item-img">
                <img
                  src="${item.image}"
                  alt="item"
                />
              </div>
              <div class="item-content">
                <h2>${item.artist}</h2>
                <span class="item-price ${i % 2 === 0 ? "" : "item-price2"}">$${
      item.price
    }</span>
                <h3>${item.title}</h3>
                <p>
                  ${item.description}
                </p>
              </div>
        </div>`;
  });
}

export function renderItemTypes(whichSelectTypeOption) {
  whichSelectTypeOption.innerHTML = "";

  const uniqueTypeArray = [];

  items.forEach((item) => {
    const type = item.type;
    if (!uniqueTypeArray.includes(type)) {
      uniqueTypeArray.push(type);
    }
  });

  const option = document.createElement("option");
  option.value = "";
  option.textContent = "Choose";
  whichSelectTypeOption.appendChild(option);

  uniqueTypeArray.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    whichSelectTypeOption.appendChild(option);
  });
}
