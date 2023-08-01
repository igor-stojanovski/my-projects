import { getItems, setItems } from "../../Data/data.js";
import { initArtistCaptureImage } from "./captureImagePopup.js";
import {
  getCurrentArtist,
  getEditingItemId,
  setEditingItemId,
} from "./globals.js";
import { renderItemTypes } from "./visitorListing.js";

const logo = document.querySelector("#artistAddNewItemPage .logo");
const menuIcon = document.querySelector("#artistAddNewItemPage .fa-bars");
const menuDropdown = document.querySelector("#artistAddNewItemPage .nav-menu");
const cancelBtn = document.querySelector(".cancel-btn");

const form = document.querySelector(".new-edit-item-form");
const typeSelect = document.querySelector("#type");
const isPublishedCheckbox = document.querySelector("#isPublished");
const titleInput = document.querySelector("#title-input");
const description = document.querySelector("#description-input");

const price = document.querySelector("#price");
const imgUrl = document.querySelector("#img-url");

const snapshotBox = document.querySelector(".snapshot-box");
const captureImagePopupBox = document.querySelector(".artistCaptureImagePopup");

export function initArtistAddNewItemPage() {
  const navTitle = document.querySelector("#artistAddNewItemPage h1");
  const headerTitle = document.querySelector(".header-form h2");
  const addEditBtn = document.querySelector(".add-edit-item-btn");

  const currentArtist = getCurrentArtist();

  navTitle.textContent = currentArtist;

  renderItemTypes(typeSelect);

  if (!getEditingItemId()) {
    headerTitle.textContent = "Add new Item";
    addEditBtn.textContent = "Add new Item";
  } else {
    headerTitle.textContent = "Edit Item";
    addEditBtn.textContent = "Confirm Changes";

    const currItem = getItems().find((item) => item.id === getEditingItemId());

    titleInput.value = currItem.title;
    description.value = currItem.description;
    typeSelect.value = currItem.type;
    price.value = currItem.price;
    imgUrl.value = currItem.image;
    currItem.isPublished
      ? (isPublishedCheckbox.checked = true)
      : (isPublishedCheckbox.checked = false);
  }
}

logo.addEventListener("click", () => {
  location.hash = "";
});

menuIcon.addEventListener("click", () => {
  menuDropdown.classList.toggle("display-menu");
});

form.addEventListener("submit", function (e) {
  const isEditing = getEditingItemId();

  if (isEditing) {
    editItem(e);
  } else {
    addItem(e);
  }
});

cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  form.reset();
  location.hash = "#artistItemsPage";
  const imgContainer = document.querySelector(".captured-img-container");
  imgContainer.style.backgroundImage = `none`;
  setEditingItemId(undefined);
});

snapshotBox.addEventListener("click", () => {
  captureImagePopupBox.classList.toggle("show-popup");
  initArtistCaptureImage();
});

export function updateImage(imgSrc) {
  imgUrl.value = imgSrc;
  imgUrl.setAttribute("disabled", "");
}

function editItem(event) {
  event.preventDefault();
  const newStateItems = getItems();
  const currItem = newStateItems.find((item) => item.id === getEditingItemId());

  currItem.title = titleInput.value;
  currItem.description = description.value;
  currItem.type = typeSelect.value;
  currItem.price = price.value;
  currItem.image = imgUrl.value;
  currItem.isPublished = isPublishedCheckbox.checked;

  setEditingItemId(undefined);
  setItems(newStateItems);
  form.reset();
  location.hash = "artistItemsPage";
  const imgContainer = document.querySelector(".captured-img-container");
  imgContainer.style.backgroundImage = `none`;
  imgUrl.removeAttribute("disabled");
}

function addItem(event) {
  event.preventDefault();

  const currentArtist = getCurrentArtist();
  const newStateItems = getItems();
  const newID = new Date();

  newStateItems.push({
    id: newID.valueOf(),
    title: titleInput.value,
    description: description.value,
    type: typeSelect.value,
    image: imgUrl.value,
    price: price.value,
    artist: currentArtist,
    dateCreated: new Date().toJSON(),
    isPublished: isPublishedCheckbox.checked,
    isAuctioning: false,
    dateSold: undefined,
    priceSold: undefined,
  });

  setItems(newStateItems);
  location.hash = "#artistItemsPage";
  form.reset();
  const imgContainer = document.querySelector(".captured-img-container");
  imgContainer.style.backgroundImage = `none`;
  imgUrl.removeAttribute("disabled");
}
