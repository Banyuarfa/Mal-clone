//List Data Anime
const api = "https://api.jikan.moe/v4";
let data = [];
let page = 1;
let maxPage = 1;
const numPage = document.querySelector(".page-button p");

const getAnime = async () => {
  const topFetch = await fetch(`${api}/top/anime?filter=airing&&sfw=true`);
  const seasonFetch = await fetch(`${api}/seasons/now`);
  const topJSON = await topFetch.json();
  const seasonJSON = await seasonFetch.json();
  const topDatas = topJSON.data;
  const seasonDatas = seasonJSON.data;
  showAnime(topDatas, seasonDatas);
};
const showAnime = (...datas) => {
  let card = ["", ""];
  datas[0].forEach((data) => {
    const cardContainer = document.querySelector("#top-anime-container");
    cardContainer.innerHTML = card[0];
    return (card[0] += animeUI(data));
  });
  datas[1].forEach((data) => {
    const cardContainer = document.querySelector("#season-anime-container");
    cardContainer.innerHTML = card[1];
    return (card[1] += animeUI(data));
  });
};
const animeUI = (data) => {
  return `<div class='anime-card'>
            <a href='${data.url}'>
              <img src='${data.images.jpg.image_url}'>
              <div class='title'>
                <h4>${data.title}</h4>
              </div>
            </a>
            <p>score ${score(data.score)}</p>
          </div>`;
};

const horizontalScrollButton = () => {
  const allNext = document.querySelectorAll(".next");
  const anime = document.querySelector(".anime");

  allNext.forEach((next) => {
    next.addEventListener("click", (e) => {
      e.target.previousElementSibling.previousElementSibling.scrollBy(520, 0);
    });
  });
  const allPrevious = document.querySelectorAll(".previous");
  allPrevious.forEach((previous) => {
    previous.addEventListener("click", (e) => {
      e.target.previousElementSibling.scrollBy(-520, 0);
    });
  });
};
getAnime();
horizontalScrollButton();
const score = (rate) => {
  if (rate === null) {
    return "N/A";
  } else {
    return rate;
  }
};
const currentPage = () => {
  return (numPage.textContent = `${page} of ${maxPage}`);
};
const inputPage = () => {
  const promptValue = parseInt(prompt("masukkan nomor halaman"));
  if (isNaN(promptValue)) {
    alert("lu gk masukin angka!");
  } else {
    page = promptValue;
    currentPage();
    showSearchData();
  }
};
const nextBtn = () => {
  if (data.pagination.has_next_page) {
    page++;
    currentPage();
    showSearchData();
  } else {
    alert("dah mentok");
    page = page;
  }
};
const prevBtn = () => {
  if (page <= 1) {
    page = 1;
  } else {
    page--;
    currentPage();
    showSearchData();
  }
};
const searchData = async () => {
  const searchFetch = await fetch(
    `${api}/anime?sfw=true&&page=${page}&&q=${searchAnime()}`
  );
  const searchJSON = await searchFetch.json();
  data = searchJSON;
  maxPage = searchJSON.pagination.last_visible_page;
};
const showSearchData = async () => {
  await searchData();
  let card = "";
  document.querySelector("#page-container").innerHTML = data.data
    .map(
      (data) =>
        `<div class='anime-card'>
            <a href='${data.url}'>
              <img src='${data.images.jpg.image_url}'>
              <div class='title'>
                <h4>${data.title}</h4>
              </div>
            </a>
            <p>score ${score(data.score)}</p>
          </div>`
    )
    .join("");
};
const searchAnime = () => {
  const searchBtn = document.querySelector("input[type='search']");
  return searchBtn.value;
};
numPage.addEventListener("click", inputPage);
document
  .querySelector("button[type='submit']")
  .addEventListener("click", searchAnime);
document.querySelector("#previous-page").addEventListener("click", prevBtn);
document.querySelector("#next-page").addEventListener("click", nextBtn);
showSearchData();
