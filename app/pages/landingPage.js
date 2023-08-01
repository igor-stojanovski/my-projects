import { initialItemsSet } from "../../Data/data.js";
import { renderingArtistsNamesInSelect, setCurrentArtist } from "./globals.js";

const containerVisitor = document.querySelector(".container-visitor");
const chooseArtistSelect = document.querySelector("#chooseArtist");

export function initLandingPage() {
  initialItemsSet();
  renderingArtistsNamesInSelect(chooseArtistSelect);
}

chooseArtistSelect.addEventListener("change", function () {
  const selectedArtist = chooseArtistSelect.value;
  if (selectedArtist === "") {
    return;
  }

  location.hash = `#artistHomePage`;
  setCurrentArtist(selectedArtist);
  localStorage.setItem("currentArtist", selectedArtist);
  localStorage.setItem("user", "artist");
});

containerVisitor.addEventListener("click", () => {
  location.hash = "#visitorHomePage";
  localStorage.setItem("user", "visitor");
});
