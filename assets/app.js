const API_KEY = "pub_309e141687284e298187739350cd3671";

async function fetchNews() {
  const res = await fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&language=en&category=top`);
  const data = await res.json();
  const news = data.results || [];

  const categoryCounts = {};
  const keywordCounts = {};
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  news.slice(0, 10).forEach(article => {
    const title = article.title || "";
    const desc = article.description || "";
    const category = article.category || "general";
    const words = (title + " " + desc).toLowerCase().split(/\W+/);

    categoryCounts[category] = (categoryCounts[category] || 0) + 1;

    words.forEach(word => {
      if (word.length > 4) keywordCounts[word] = (keywordCounts[word] || 0) + 1;
    });

    container.innerHTML += `
      <div class="card">
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    `;
  });

  drawChart("categoryChart", Object.keys(categoryCounts), Object.values(categoryCounts), "News by Category");
  const topKeywords = Object.entries(keywordCounts).sort((a,b) => b[1]-a[1]).slice(0, 10);
  drawChart("keywordChart", topKeywords.map(k => k[0]), topKeywords.map(k => k[1]), "Top Keywords");
}

function drawChart(canvasId, labels, data, labelTitle) {
  new Chart(document.getElementById(canvasId), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: labelTitle,
        data: data,
        backgroundColor: '#17a2b8'
      }]
    }
  });
}

fetchNews();
setInterval(fetchNews, 60000);