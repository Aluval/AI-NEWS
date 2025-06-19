const NEWS_API_KEY = "pub_309e141687284e298187739350cd3671"; // Your NewsData.io key
const lang = document.documentElement.lang || "en";

function getCategory() {
  if (window.location.href.includes("intl")) return "world";
  return "top";
}

async function fetchNews() {
  const category = getCategory();
  const url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=in&language=${lang}&category=${category}`;

  const container = document.getElementById("news-container");
  container.innerHTML = lang === "te" ? "వార్తలు లోడ్ అవుతున్నాయి..." : "Loading news...";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const news = data.results || [];

    container.innerHTML = "";
    news.slice(0, 10).forEach(article => {
      container.innerHTML += `
        <div class="card">
          <h3>${article.title || "Untitled"}</h3>
          <p>${article.description ?? "No description available."}</p>
        </div>
      `;
    });
  } catch (err) {
    container.innerHTML = lang === "te"
      ? "వార్తలను పొందలేకపోయాం."
      : "Error fetching news.";
  }
}

document.addEventListener("DOMContentLoaded", fetchNews);
