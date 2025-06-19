const NEWS_API_KEY = "9eaa5de8147b45bd8f6face0fbbebf2b"; // Replace this

const lang = document.documentElement.lang || "en";

function getCategory() {
  if (window.location.href.includes("intl")) return "general";
  return "general";
}

async function fetchNews() {
  const category = getCategory();
  const country = "in";
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&language=${lang}&category=${category}&apiKey=${NEWS_API_KEY}`;

  const container = document.getElementById("news-container");
  container.innerHTML = lang === "te" ? "వార్తలు లోడ్ అవుతున్నాయి..." : "Loading news...";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const news = data.articles || [];

    container.innerHTML = "";
    news.slice(0, 10).forEach(article => {
      container.innerHTML += `
        <div class="card">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
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
