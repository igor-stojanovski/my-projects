import { getItems, setItems } from "../../Data/data.js";
import { formatDate } from "./artistHomePage.js";
import { setTimer, startAuctionTimer } from "./auctionPage.js";
import {
  getCurrentArtist,
  getCurrentBid,
  setCurrentBid,
  setEditingItemId,
} from "./globals.js";

const logo = document.querySelector("#artistItemsPage .logo");
const menuIcon = document.querySelector("#artistItemsPage .fa-bars");
const menuDropdown = document.querySelector("#artistItemsPage .nav-menu");

export function initArtistItemsPage() {
  const header = document.querySelector("#artistItemsPage h1");
  const currentArtist = getCurrentArtist();

  header.textContent = currentArtist;

  const newStateItems = getItems();

  const currentArtistItems = newStateItems.filter(
    (item) => item.artist === currentArtist
  );

  renderArtistItems(currentArtistItems);
}

logo.addEventListener("click", () => {
  location.hash = "";
});

menuIcon.addEventListener("click", () => {
  menuDropdown.classList.toggle("display-menu");
});

function renderArtistItems(arr) {
  const containerArtistItems = document.querySelector(".artist-items");
  containerArtistItems.innerHTML = "";

  arr.forEach((item) => {
    const { id, image, title, dateCreated, description, price } = item;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const img = document.createElement("img");
    img.src = image;

    const contentItem = document.createElement("div");
    contentItem.classList.add("content-item");

    const itemTitle = document.createElement("p");
    itemTitle.textContent = title;

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("content-date");
    dateSpan.textContent = formatDate(dateCreated);

    const desc = document.createElement("p");
    desc.classList.add("content-text");
    desc.textContent = description;

    const priceSpan = document.createElement("span");
    priceSpan.classList.add("price");
    priceSpan.textContent = `$${price}`;

    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");

    const sendToAuctionBtn = document.createElement("button");
    sendToAuctionBtn.classList.add("send-to-auction-btn");
    sendToAuctionBtn.textContent = `Send to Auction`;

    sendToAuctionBtn.addEventListener("click", () => {
      const newStateItems = getItems();
      const isAuctioning = newStateItems.some((item) => item.isAuctioning);
      const currItem = newStateItems.find((item) => item.id === id);
      const isSold = currItem.priceSold;

      if (isSold) {
        alert("This item is already sold");
        return;
      }

      if (isAuctioning) {
        alert("There is an ongoing auction already");
        return;
      } else {
        alert("Auction started!");
        const auctioningItem = newStateItems.find((item) => item.id === id);
        const currentBidSpan = document.querySelector(".auction-current-price");

        auctioningItem.isAuctioning = true;
        setCurrentBid(Math.round(auctioningItem.price / 2));
        const currentBid = getCurrentBid();
        currentBidSpan.textContent = `$${currentBid}`;
        setItems(newStateItems);
        setTimer(2, 0);
        startAuctionTimer();
      }
    });

    const unpublishBtn = document.createElement("button");
    unpublishBtn.classList.add("unpublish-btn");

    const newStateItems = getItems();
    const thisItem = newStateItems.find((item) => item.id === id);

    unpublishBtn.textContent = thisItem.isPublished ? "Unpublish" : "Publish";
    thisItem.isPublished
      ? unpublishBtn.classList.add("unpublish-btn")
      : unpublishBtn.classList.add("published-btn");

    unpublishBtn.addEventListener("click", () => {
      const newStateItems = getItems();
      const thisItem = newStateItems.find((item) => item.id === id);

      if (!thisItem.isPublished) {
        thisItem.isPublished = true;
        setItems(newStateItems);
        unpublishBtn.classList.toggle("published-btn");
        unpublishBtn.textContent = "Unpublish";
      } else {
        thisItem.isPublished = false;
        setItems(newStateItems);
        unpublishBtn.classList.toggle("published-btn");
        unpublishBtn.textContent = "Publish";
      }
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = `Remove`;

    removeBtn.addEventListener("click", () => {
      const isConfirmed = confirm("Are you sure you want to delete this item?");

      if (!isConfirmed) {
        return;
      } else {
        deleteItem(id);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = `Edit`;

    editBtn.addEventListener("click", function () {
      setEditingItemId(id);
      location.hash = "artistAddNewItemPage";
    });

    contentItem.append(itemTitle, dateSpan, desc, priceSpan);
    buttonsWrapper.append(sendToAuctionBtn, unpublishBtn, removeBtn, editBtn);
    itemDiv.append(img, contentItem, buttonsWrapper);
    containerArtistItems.appendChild(itemDiv);
  });

  const addNewItemDiv = renderAddNewItemDiv();
  containerArtistItems.appendChild(addNewItemDiv);
}

function renderAddNewItemDiv() {
  const addNewItemDiv = document.createElement("div");
  addNewItemDiv.classList.add("add-new-item");

  const innerDivNewItem = document.createElement("div");
  innerDivNewItem.classList.add("inner-div-new-item");

  const parAddNewItem = document.createElement("p");
  parAddNewItem.textContent = "+Add new Item";

  innerDivNewItem.appendChild(parAddNewItem);

  innerDivNewItem.addEventListener("click", function () {
    location.hash = "#artistAddNewItemPage";
  });

  addNewItemDiv.appendChild(innerDivNewItem);

  return addNewItemDiv;
}

function deleteItem(currItemId) {
  let newStateItems = getItems();

  newStateItems = newStateItems.filter((item) => item.id !== currItemId);

  setItems(newStateItems);

  newStateItems = newStateItems.filter(
    (item) => item.artist === getCurrentArtist()
  );

  renderArtistItems(newStateItems);
}
