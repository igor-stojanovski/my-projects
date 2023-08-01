import { getItems, setItems } from "../../Data/data.js";
import { formatDate } from "./artistHomePage.js";
import { getCurrentBid, setCurrentBid } from "./globals.js";

const logo = document.querySelector("#auctionPage .logo");
const bidBtn = document.querySelector(".bid");
const instantBuyBtn = document.querySelector(".instant-buy-btn");

const currentBidSpan = document.querySelector(".current-bid-value");

const confirmInstantBuyBtn = document.querySelector(".btn-confirm");

let bids = Number(localStorage.getItem("bids")) ?? 0;

let timer;

let minutes = 2;
let seconds = 0;

if (localStorage.getItem("timer")) {
  const timerStorage = localStorage.getItem("timer");
  minutes = Number(timerStorage.split(" ")[0]);
  seconds = Number(timerStorage.split(" ")[1]);
  startAuctionTimer();
}

export function initAuctionPage() {
  const auctionItem = getItems().find((item) => item.isAuctioning);

  const auctionWrapper = document.querySelector(".auction-wrapper");
  auctionWrapper.innerHTML = "";

  if (!auctionItem) {
    renderNoAuctionDiv();
    bidBtn.setAttribute("disabled", "");
    instantBuyBtn.setAttribute("disabled", "");
    const bidListHistory = document.querySelector(".bidders-list");
    bidListHistory.innerHTML = "";
    currentBidSpan.textContent = `$0`;
    return;
  } else {
    bidBtn.removeAttribute("disabled");
    instantBuyBtn.removeAttribute("disabled");

    renderAuctionItem();

    const isVisitor = localStorage.getItem("user") === "visitor";

    currentBidSpan.textContent = `$${getCurrentBid()}`;
    updateBidCounter();

    if (!isVisitor) {
      bidBtn.setAttribute("disabled", "");
      instantBuyBtn.setAttribute("disabled", "");
    } else {
      bidBtn.removeAttribute("disabled");
      instantBuyBtn.removeAttribute("disabled");
    }

    if (localStorage.getItem("timer")) {
      const timerSpan = document.querySelector(".timer span");
      timerSpan.textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }
  }
}

logo.addEventListener("click", () => {
  location.hash = "landingPage";
});

bidBtn.addEventListener("click", () => {
  bidBtn.setAttribute("disabled", "");
  instantBuyBtn.setAttribute("disabled", "");

  let currBid = getCurrentBid();
  currBid += 500;
  setCurrentBid(currBid);
  bids++;
  updateBidCounter();
  currentBidSpan.textContent = `$${getCurrentBid()}`;
  if (minutes === 0) {
    minutes++;
    seconds = 0;
  }

  const bidListHistory = document.querySelector(".bidders-list");
  bidListHistory.innerHTML += `<li>
                                    <p>
                                        <span class="font-weight-bold">Igor</span> placed offer of
                                        <span class="font-weight-bold">$${getCurrentBid()}</span>
                                    </p>
                                 </li>`;

  setTimeout(() => {
    const formData = new FormData();
    formData.set("amount", currBid);

    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const isBidding = data.isBidding;
        if (isBidding) {
          const upBid = data.bidAmount;
          setCurrentBid(upBid);
          bids++;
          updateBidCounter();
          currentBidSpan.textContent = `$${getCurrentBid()}`;
          bidBtn.removeAttribute("disabled");
          instantBuyBtn.removeAttribute("disabled");

          bidListHistory.innerHTML += `<li>
                                        <p class="text-right">
                                        <span class="font-weight-bold">Anonymous</span> placed offer of
                                        <span class="font-weight-bold">$${getCurrentBid()}</span>
                                        </p>
                                    </li>`;
        } else {
          bidListHistory.innerHTML += `<li>
                                        <p class="text-right">
                                        <span class="font-weight-bold">Anonymous:</span> This is too much for me!
                                        </p>
                                    </li>`;
        }
      });
  }, 2500);
});

instantBuyBtn.addEventListener("click", () => {
  const instantBuyPrice = document.querySelector(".instant-buy-price");
  const currBid = getCurrentBid();
  instantBuyPrice.textContent = `${currBid * 10}$`;
});

confirmInstantBuyBtn.addEventListener("click", () => {
  bids++;
  const currBid = getCurrentBid();
  const instantBuyPrice = currBid * 10;
  setCurrentBid(instantBuyPrice);
  endAuction();
  clearInterval(timer);
  localStorage.removeItem("timer");
});

export function startAuctionTimer() {
  timer = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes < 0) {
      clearInterval(timer);
      endAuction();
    } else {
      updateTimer(minutes, seconds);
      localStorage.setItem("timer", `${minutes} ${seconds}`);
    }
  }, 1000);
}

function renderAuctionItem() {
  const auctionWrapper = document.querySelector(".auction-wrapper");

  const auctionItem = getItems().find((item) => item.isAuctioning);

  auctionWrapper.innerHTML = `<div class="start-info">
                                    <div class="start-price-wrapper">
                                        <p>Starting price:</p>
                                        <p class="start-price text-center">$${Math.round(
                                          auctionItem.price / 2
                                        )}</p>
                                    </div>
                                    <div class="bids-wrapper">
                                        <p>Bids:</p>
                                        <p class="bids-counter text-center">0</p>
                                    </div>
                                </div> 
                                <div class="auction-item">
                                    <img
                                        src="${auctionItem.image}"
                                        alt="auction item"
                                    />
                                    <div class="item-details-auction">
                                        <p class="item-title-auction">${
                                          auctionItem.title
                                        }</p>

                                        <p class="item-date-created">
                                        <span class="d-block small">created</span> ${formatDate(
                                          auctionItem.dateCreated
                                        )}
                                        </p>
                                        <p class="artist-name-auction">${
                                          auctionItem.artist
                                        }</p>
                                    </div>
                                </div>`;
}

function endAuction() {
  const newStateItems = getItems();
  const auctionItem = newStateItems.find((item) => item.isAuctioning);

  if (!auctionItem) {
    return;
  }

  if (bids === 0) {
    alert("Item is taken out of auction, noone bid for this item");
  } else {
    alert("Time's up! Item sold!");
    auctionItem.priceSold = getCurrentBid();
    auctionItem.dateSold = new Date().toJSON();
    localStorage.removeItem("bids");
    setCurrentBid(0);
    bids = 0;
    updateBidCounter();
    instantBuyBtn.setAttribute("disabled", "");
  }

  auctionItem.isAuctioning = false;
  bidBtn.setAttribute("disabled", "");
  updateTimer(0, 0);
  setItems(newStateItems);
}

function updateTimer(minutes, seconds) {
  const timerSpan = document.querySelector(".timer span");
  timerSpan.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function updateBidCounter() {
  const bidCounter = document.querySelector(".bids-counter");
  bidCounter.textContent = bids;
  localStorage.setItem("bids", bids);
}

export function setTimer(min, sec) {
  minutes = min;
  seconds = sec;
}

function renderNoAuctionDiv() {
  const auctionWrapper = document.querySelector(".auction-wrapper");
  auctionWrapper.innerHTML = ` <div class="no-auction-item">
                                    <h2 class="no-auction-title">
                                    There is no ongoing auction at the moment
                                    </h2>
                                </div>`;
}
