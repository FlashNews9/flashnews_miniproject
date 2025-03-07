
const API_TOKEN = "b0017dbcaa4542c0ad71018d25f41447";
const BASE_URL = "https://newsapi.org/v2/everything?q=";

document.addEventListener("DOMContentLoaded", () => retrieveNews("Technology"));

async function retrieveNews(topic) {
    try {
        const response = await fetch(`${BASE_URL}${topic}&apiKey=${API_TOKEN}`);
        const result = await response.json();
        displayArticles(result.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayArticles(articles) {
    const newsContainer = document.getElementById("newsSection");
    const template = document.getElementById("news-template");
    
    newsContainer.innerHTML = "";
    
    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const newsClone = template.content.cloneNode(true);
        populateCard(newsClone, article);
        newsContainer.appendChild(newsClone);
    });
}

function populateCard(newsClone, article) {
    const imageElement = newsClone.querySelector("#image");
    const titleElement = newsClone.querySelector("#headline");
    const sourceElement = newsClone.querySelector("#source");
    const descriptionElement = newsClone.querySelector("#description");

    imageElement.src = article.urlToImage;
    titleElement.textContent = `${article.title.slice(0, 60)}...`;
    descriptionElement.textContent = `${article.description.slice(0, 150)}...`;
    
    const formattedDate = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    sourceElement.textContent = `${article.source.name} · ${formattedDate}`;
    
    newsClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let activeNav = null;
function handleNavClick(topic) {
    retrieveNews(topic);
    const selectedNav = document.getElementById(topic);
    activeNav?.classList.remove("active-link");
    activeNav = selectedNav;
    activeNav.classList.add("active-link");
}

const searchBtn = document.getElementById("go-search");
const searchInput = document.getElementById("query");

searchBtn.addEventListener("click", () => {
    const topic = searchInput.value.trim();
    if (!topic) return;
    retrieveNews(topic);
    activeNav?.classList.remove("active-link");
    activeNav = null;
});
