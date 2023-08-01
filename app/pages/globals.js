let currentArtist;
let editingItemId;
let currBidValue = 0;

export function setCurrentArtist(artist) {
  currentArtist = artist;
}

export function getCurrentArtist() {
  return localStorage.getItem("currentArtist") ?? currentArtist;
}

export function setEditingItemId(id) {
  editingItemId = id;
}

export function getEditingItemId() {
  return editingItemId;
}

export function setCurrentBid(bid) {
  currBidValue = bid;
  localStorage.setItem("currentBid", currBidValue);
}

export function getCurrentBid() {
  return Number(localStorage.getItem("currentBid")) ?? currBidValue;
}

export function renderingArtistsNamesInSelect(whichSelectOption) {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      whichSelectOption.innerHTML = "";
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "Choose";
      whichSelectOption.appendChild(option);
      data.forEach((artist) => {
        const option = document.createElement("option");
        option.value = artist.name;
        option.textContent = artist.name;
        whichSelectOption.appendChild(option);
      });
    })
    .catch((error) => console.error(error));
}
