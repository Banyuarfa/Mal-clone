const api = "https://api.jikan.moe/v4";

const getAnime = async () => {
  const topFetch = await fetch(`${api}/top/anime?filter=airing&&sfw=true`).then(
    (response) => response.json()
  );
  const seasonFetch = await fetch(`${api}/seasons/now`).then((response) =>
    response.json()
  );
  const upcomingFetch = await fetch(`${api}/top/anime?filter=upcoming`).then(
    (response) => response.json()
  );
  const topDatas = topFetch.data;
  const seasonDatas = seasonFetch.data;
  const upcomingDatas = upcomingFetch.data;
  console.log("🚀 ~ file: script.js:10 ~ getAnime ~ seasonDatas:", seasonDatas);
  showAnime(topDatas, seasonDatas, upcomingDatas);
};

const showAnime = (topDatas, seasonDatas, upcomingDatas) => {
  let card1 = "";
  let card2 = "";
  let card3 = "";
  topDatas.forEach((data) => {
    const cardContainer = document.querySelector("#top-anime-container");
    cardContainer.innerHTML = card1;
    return (card1 += animeUI(data));
  });
  seasonDatas.forEach((data) => {
    const cardContainer = document.querySelector("#season-anime-container");
    cardContainer.innerHTML = card2;
    return (card2 += animeUI(data));
  });
  upcomingDatas.forEach((data) => {
    const cardContainer = document.querySelector("#upcoming-anime-container");
    cardContainer.innerHTML = card3;
    return (card3 += animeUI(data));
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
getAnime();
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
horizontalScrollButton();
