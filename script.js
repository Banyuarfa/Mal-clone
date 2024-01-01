//List Data Anime
const api = "https://api.jikan.moe/v4";
const getAnime = async () => {
  const topFetch = await fetch(`${api}/top/anime?filter=airing&&sfw=true`);
  const seasonFetch = await fetch(`${api}/seasons/now`);
  const upcomingFetch = await fetch(`${api}/top/anime?filter=upcoming`);
  const topJSON = await topFetch.json();
  const seasonJSON = await seasonFetch.json();
  const upcomingJSON = await upcomingFetch.json();
  const topDatas = topJSON.data;
  const seasonDatas = seasonJSON.data;
  const upcomingDatas = upcomingJSON.data;
  showAnime(topDatas, seasonDatas, upcomingDatas);
  console.log("🚀 ~ file: script.js:10 ~ getAnime ~ seasonDatas:", seasonDatas);
};
const showAnime = (...datas) => {
  console.log(datas);
  let card = ["", "", ""];
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
  datas[2].forEach((data) => {
    const cardContainer = document.querySelector("#upcoming-anime-container");
    cardContainer.innerHTML = card[2];
    return (card[2] += animeUI(data));
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
const score = (rate) => {
  if (rate === null) {
    return "N/A";
  } else {
    return rate;
  }
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

const searchReset = () => {
  const button = document.querySelector("button[type='submit']");
  button.addEventListener("click", () => {
    let searchInput = document.querySelector("input[type='search']");
  });
};
searchReset();
