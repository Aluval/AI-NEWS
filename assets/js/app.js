const API_KEY = "pub_309e141687284e298187739350cd3671";

async function fetchNews() {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=top`);
  const data = await res.json();
  const news = data.results || [];

  const container = document.getElementById("news-container");
  container.innerHTML = "";

  news.slice(0, 10).forEach(article => {
    const title = article.title || "";
    const desc = article.description || "";

    container.innerHTML += `
      <div class="card">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    `;
  });
}

fetchNews();
document.getElementById('lang-select').addEventListener('change', e => {
  const lang = e.target.value;
  fetch(`assets/lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("title").innerText = data.title;
    });
});