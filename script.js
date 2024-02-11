//List Data Anime
const api = "https://api.jikan.moe/v4";
let data = [];
let allData = [];
let page = 1;
let maxPage = 1;
const numPage = document.querySelector(".page-button p");

const getTopAnime = async () => {
  try {
    const res = await fetch(`${api}/top/anime?filter=airing&&sfw=true`);
    const datas = await res.json();
    data = datas.data;
    switch (res.status) {
      case 429:
        throw new Error(res.statusText);
        break;

      default:
        throw new Error("bad response");
        break;
    }
  } catch (error) {
    document.querySelector("#top-anime-container").innerHTML = error;
  }
};

const showTopAnime = async () => {
  await getTopAnime();
  document.querySelector("#top-anime-container").innerHTML = data
    .map(
      (data) => `
    <div class='anime-card'>
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
showTopAnime();
const getSeasonAnime = async () => {
  try {
    const res = await fetch(`${api}/seasons/now`);
    const datas = await res.json();
    data = datas.data;
    console.log(res.status);
    switch (res.status) {
      case 429:
        throw new Error(res.statusText);
        break;

      default:
        throw new Error("bad response");
        break;
    }
  } catch (error) {
    const err = error;
    document.querySelector("#season-anime-container").innerHTML = err;
  }
};
const showSeasonAnime = async () => {
  await getSeasonAnime();
  document.querySelector("#season-anime-container").innerHTML = data
    .map(
      (data) => `
    <div class='anime-card'>
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
const errHandle = (err) => {};
showSeasonAnime();
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
  if (allData.pagination.has_next_page) {
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
  try {
    const res = await fetch(
      `${api}/anime?sfw=true&&page=${page}&&q=${searchAnime()}`
    );
    const datas = await res.json();
    allData = datas;
    maxPage = datas.pagination.last_visible_page;
    switch (res.status) {
      case 429:
        throw new Error(res.statusText);
        break;

      default:
        throw new Error("bad response");
        break;
    }
  } catch (error) {
    document.querySelector("#page-container").innerHTML = error;
  }
};
const showSearchData = async () => {
  await searchData();
  let card = "";
  document.querySelector("#page-container").innerHTML = allData.data
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
