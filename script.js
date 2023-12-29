const api = "https://api.jikan.moe/v4";

const getAnime = async () => {
  const topFetch = await fetch(`${api}/top/anime?filter=airing&&sfw=true`).then(
    (response) => response.json()
  );
  const topDatas = topFetch.data;
  console.log(topDatas);
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
  return `<div id='anime-UI'>
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
