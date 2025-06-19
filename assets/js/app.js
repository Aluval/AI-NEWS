const NEWS_API_KEY = "your_newsapi_org_key";

async function fetchNews() {
  const url = `https://newsapi.org/v2/top-headlines?country=in&language=en&apiKey=${NEWS_API_KEY}`;
  const container = document.getElementById("news-container");
  container.innerHTML = "Loading...";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const articles = data.articles || [];

    container.innerHTML = "";
    articles.slice(0, 10).forEach(article => {
      container.innerHTML += `
        <div class="card">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </div>
      `;
    });
  } catch (err) {
    container.innerHTML = "Error fetching news.";
  }
}
