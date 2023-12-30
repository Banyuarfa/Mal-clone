const api = "https://api.jikan.moe/v4";

const getAnime = () => {
  topAnime()
};
const topAnime = async () => {
    const topFetch = await fetch(
      `${api}/top/anime?filter=airing&&sfw=true`
    ).then((response) => response.json());
    const topDatas = topFetch.data;
    showAnime(topDatas);
};
const showAnime = (topDatas) => {
  let card = "";
  topDatas.forEach((data) => {
    return (card += animeUI(data));
  });
  const cardContainer = document.querySelector("#top-anime-container");
  cardContainer.innerHTML = card;
};
const animeUI = (data) => {
  return `<div id='anime-card'>
            <a href='${data.url}'>
              <img src='${data.images.jpg.image_url}'>
              <div class='title'>
                <h4>${data.title}</h4>
              </div>
            </a>
            <p>score ${data.score}</p>
          </div>`;
};
getAnime();
const horizontalScrollButton = () => {
  const allNext = document.querySelectorAll(".next");
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
