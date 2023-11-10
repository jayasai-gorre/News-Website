const API_KEY = "2f19e372386346048ecf8d0f5318e5b0";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");


    cardsContainer.innerHTML = ""; //find why

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);//New line understand it very imp line
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone)
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US" , {
        timeZome: "Asia/Jakarta" // Search in internet
    }); //Inbuilt library to convert from tz format to string

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => { //new
        window.open(article.url, "__blank");
    })
}

let curSelectedNav = null; //new
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.class.remove('active'); //new
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    let newsInp = document.getElementById("search-text");
    newsInp.value = "";
}

let newsInp = document.getElementById("search-text");
let search = document.getElementById("search-button");

search.addEventListener('click', () => {
    const query = newsInp.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

newsInp.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const query = newsInp.value;
        if(!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});

