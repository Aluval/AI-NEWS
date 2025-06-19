async function loadDashboard() {
  const res = await fetch('/api/stats');
  const data = await res.json();

  // Sentiment Chart
  const ctx = document.getElementById('sentimentChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Positive', 'Neutral', 'Negative'],
      datasets: [{
        label: 'Sentiment Count',
        data: [
          data.sentiment.positive || 0,
          data.sentiment.neutral || 0,
          data.sentiment.negative || 0
        ],
        backgroundColor: ['#28a745', '#6c757d', '#dc3545']
      }]
    }
  });

  // Keywords
  const keywordDiv = document.getElementById('keywords');
  keywordDiv.innerHTML = '<h3>🔍 Top Keywords</h3>' + data.keywords.map(k => `<span style="padding: 5px 10px; background: #ffc107; margin: 5px; display: inline-block;">${k}</span>`).join('');

  // News Cards
  const newsDiv = document.getElementById('news-container');
  newsDiv.innerHTML = '';
  data.top_news.forEach(n => {
    newsDiv.innerHTML += `
      <div class="card">
        <h3>${n.title}</h3>
        <p>${n.summary}</p>
        <strong>Sentiment:</strong> ${n.sentiment}
      </div>
    `;
  });
}

loadDashboard();
setInterval(loadDashboard, 60000);