import { initArtistAddNewItemPage } from "./pages/artistAddNewItemPage.js";
import { initArtistItemsPage } from "./pages/artistItems.js";
import { initArtistHomePage } from "./pages/artistHomePage.js";
import { initVisitorListing } from "./pages/visitorListing.js";
import { initLandingPage } from "./pages/landingPage.js";
import { initVisitorHomePage } from "./pages/visitorHomePage.js";
import { initAuctionPage } from "./pages/auctionPage.js";

function handleRouter() {
  const hash = location.hash === "" ? "#landingPage" : location.hash;

  const allPages = document.querySelectorAll(".page");
  const allDropdownMenus = document.querySelectorAll(".nav-menu");

  allPages.forEach((page) => (page.style.display = "none"));
  allDropdownMenus.forEach((menu) => menu.classList.remove("display-menu"));

  document.querySelector(hash).style.display = "block";

  switch (hash) {
    case "#landingPage":
      initLandingPage();
      break;
    case "#visitorHomePage":
      initVisitorHomePage();
      break;
    case "#visitorListing":
      initVisitorListing();
      break;
    case "#artistHomePage":
      initArtistHomePage();
      break;
    case "#artistMenu":
      initArtistMenu();
      break;
    case "#artistItemsPage":
      initArtistItemsPage();
      break;
    case "#artistAddNewItemPage":
      initArtistAddNewItemPage();
      break;
    case "#artistCaptureImage":
      initArtistCaptureImage();
      break;
    case "#auctionPage":
      initAuctionPage();
      break;

    default:
      break;
  }
}

window.addEventListener("hashchange", handleRouter);
window.addEventListener("load", handleRouter);
