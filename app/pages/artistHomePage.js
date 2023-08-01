import { getItems } from "../../Data/data.js";
import { getCurrentArtist, getCurrentBid } from "./globals.js";

const logo = document.querySelector("#artistHomePage .logo");
const togglerBtn = document.querySelector("#artistHomePage .toggler-btn");
const navMenu = document.querySelector("#artistHomePage .nav-menu");
const auctioninWidget = document.querySelector(".live-auction-item");

export function initArtistHomePage() {
  const currArtistHeader = document.querySelector("#artistHomePage nav h1");

  const itemsSold = document.querySelector(".items-sold");
  const totalIncome = document.querySelector(".total-income");
  const auctionCurrentBid = document.querySelector(".auction-current-price");

  const currentArtist = getCurrentArtist();

  currArtistHeader.textContent = currentArtist;

  const newStateItems = getItems();

  const currBid = getCurrentBid();
  auctionCurrentBid.textContent = `$${currBid}`;

  const currentArtistArts = newStateItems.filter(
    (item) => item.artist.toLowerCase() === currentArtist.toLowerCase()
  );

  const soldItems = currentArtistArts.filter((item) => item.priceSold);

  const sumTotalIncome = soldItems.reduce(
    (acc, item) => acc + item.priceSold,
    0
  );

  const isAuctioning = currentArtistArts.some((item) => item.isAuctioning);

  itemsSold.textContent = `${soldItems.length}/${currentArtistArts.length}`;
  totalIncome.textContent = `$${sumTotalIncome}`;

  if (isAuctioning) {
    auctioninWidget.style.display = "block";
  } else {
    auctioninWidget.style.display = "none";
  }

  const chart = document.querySelector(".chart");
  chart.innerHTML = `<canvas id="myChart"></canvas>`;

  initChart(soldItems);
}

logo.addEventListener("click", () => {
  location.hash = "";
});

togglerBtn.addEventListener("click", function () {
  navMenu.classList.toggle("display-menu");
});

auctioninWidget.addEventListener("click", () => {
  location.hash = "auctionPage";
});

function generateDateLabels(daysAgo) {
  const labels = [];
  for (let i = 0; i < daysAgo; i++) {
    const now = new Date();

    const startDate = now.getDate();

    const currentDate = now.setDate(startDate - i);

    const formattedDate = formatDate(currentDate);

    labels.push(formattedDate);
  }

  return labels;
}

export function formatDate(dateNum) {
  const date = new Date(dateNum);

  return date
    .toLocaleDateString("en-gb")
    .replace("2023", "23")
    .replaceAll("/", ".");
}

function initChart(arraySoldItems) {
  const ctx = document.querySelector("#myChart");

  const btnsLastDays = document.querySelectorAll(".buttons button");
  const btnLast7Days = document.querySelector("#last7");

  const initialLabels = generateDateLabels(7);
  const initial7DaysData = initialLabels.map((label) => {
    return arraySoldItems.reduce((acc, currentItemSold) => {
      if (label === formatDate(currentItemSold.dateSold)) {
        return (acc += currentItemSold.priceSold);
      }
      return acc;
    }, 0);
  });

  btnsLastDays.forEach((btn) => {
    btn.classList.remove("active-chat-btn");
  });

  btnLast7Days.classList.add("active-chat-btn");

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: initialLabels,
      datasets: [
        {
          label: "Amount",
          data: initial7DaysData,
          backgroundColor: "#a26a5e",
          hoverBackgroundColor: "#d44c2e",
        },
      ],
    },
    options: {
      indexAxis: "y",
      aspectRatio: 1,
    },
  });

  btnsLastDays.forEach((btn, i) => {
    if (i === 3) {
      btn.addEventListener("click", function () {
        btnsLastDays.forEach((btn) => {
          btn.classList.remove("active-chat-btn");
        });

        btn.classList.add("active-chat-btn");

        const MONTHS = 12;

        const labels = generateMonthLabels(MONTHS);

        const chartData = labels.map((label) => {
          return arraySoldItems.reduce((acc, currentItemSold) => {
            if (label === formatMonthDate(currentItemSold.dateSold)) {
              return (acc += currentItemSold.priceSold);
            }
            return acc;
          }, 0);
        });

        myChart.data.datasets[0].data = chartData;
        myChart.data.labels = labels;
        myChart.update();
      });
      return;
    }

    let daysAgo = 7;

    if (i === 1) {
      daysAgo = 14;
    } else if (i === 2) {
      daysAgo = 30;
    }

    btn.addEventListener("click", function () {
      btnsLastDays.forEach((btn) => {
        btn.classList.remove("active-chat-btn");
      });

      btn.classList.add("active-chat-btn");

      const labels = generateDateLabels(daysAgo);

      const chartData = labels.map((label) => {
        return arraySoldItems.reduce((acc, currentItemSold) => {
          if (label === formatDate(currentItemSold.dateSold)) {
            return (acc += currentItemSold.priceSold);
          }
          return acc;
        }, 0);
      });

      myChart.data.datasets[0].data = chartData;
      myChart.data.labels = labels;
      myChart.update();
    });
  });
}

function generateMonthLabels(monthsAgo) {
  const labels = [];
  for (let i = 0; i < monthsAgo; i++) {
    const now = new Date();

    const startDate = now.getMonth();

    const currentDate = now.setMonth(startDate - i);

    const formattedDate = formatMonthDate(currentDate);

    labels.push(formattedDate);
  }

  return labels;
}

export function formatMonthDate(dateNum) {
  const date = new Date(dateNum);

  return date
    .toLocaleDateString("en-gb", {
      year: "numeric",
      month: "numeric",
    })
    .replaceAll("/", ".");
}
