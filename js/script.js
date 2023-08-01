let myFilterCoding = document.querySelector("#filter-coding");
let myFilterMarketing = document.querySelector("#filter-marketing");
let myFilterDesign = document.querySelector("#filter-design");

let myLabelCoding = document.querySelector(".label-coding");
let myLabelMarketing = document.querySelector(".label-marketing");
let myLabelDesign = document.querySelector(".label-design");

let cards = document.querySelectorAll(".col");
let myLoadBtn = document.querySelector("#load");
let screenWidth = screen.width;

myFilterCoding.addEventListener("change", filterCoding);
myFilterMarketing.addEventListener("change", filterMarketing);
myFilterDesign.addEventListener("change", filterDesign);

function hideAllCards() {
  cards.forEach((card) => {
    card.style.display = "none";
  });
}

function showAllCards() {
  if (screenWidth < 576) {
    $(function () {
      $(".col").slice(0, 6).show();
      $("#load").click(function (e) {
        e.preventDefault();
        $(".col:hidden").slice(0, 6).show();
        if ($(".col:hidden").length == 0) {
          myLoadBtn.style.display = "none";
        }
      });
    });
    myLoadBtn.style.display = "block";
  } else {
    cards.forEach((card) => {
      card.style.display = "block";
    });
  }
}

function filterCoding() {
  hideAllCards();
  myLoadBtn.style.display = "none";

  if (myFilterCoding.checked) {
    myLabelCoding.classList.add("colorChange");

    const codingCards = document.querySelectorAll(".coding");

    codingCards.forEach((card) => {
      card.style.display = "block";
    });

    myFilterDesign.checked = false;
    myFilterMarketing.checked = false;
    myLabelDesign.classList.remove("colorChange");
    myLabelMarketing.classList.remove("colorChange");
  } else {
    myLabelCoding.classList.remove("colorChange");
    showAllCards();
  }
}

function filterMarketing() {
  hideAllCards();
  myLoadBtn.style.display = "none";

  if (myFilterMarketing.checked) {
    myLabelMarketing.classList.add("colorChange");

    const marketingCards = document.querySelectorAll(".marketing");

    marketingCards.forEach((card) => {
      card.style.display = "block";
    });

    myFilterCoding.checked = false;
    myFilterDesign.checked = false;
    myLabelCoding.classList.remove("colorChange");
    myLabelDesign.classList.remove("colorChange");
  } else {
    myLabelMarketing.classList.remove("colorChange");
    showAllCards();
  }
}

function filterDesign() {
  hideAllCards();
  myLoadBtn.style.display = "none";

  if (myFilterDesign.checked) {
    myLabelDesign.classList.add("colorChange");

    const designCards = document.querySelectorAll(".design");

    designCards.forEach((card) => {
      card.style.display = "block";
    });

    myFilterCoding.checked = false;
    myFilterMarketing.checked = false;
    myLabelCoding.classList.remove("colorChange");
    myLabelMarketing.classList.remove("colorChange");
  } else {
    myLabelDesign.classList.remove("colorChange");
    showAllCards();
  }
}
$(function () {
  $(".col").slice(0, 6).show();
  $("#load").click(function (e) {
    e.preventDefault();
    $(".col:hidden").slice(0, 6).show();
    if ($(".col:hidden").length == 0) {
      myLoadBtn.style.display = "none";
    }
  });
});
