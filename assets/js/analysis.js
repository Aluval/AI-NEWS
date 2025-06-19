// Chart for Indian states
new Chart(document.getElementById('stateChart'), {
  type: 'bar',
  data: {
    labels: ['Telangana', 'Andhra Pradesh', 'Maharashtra', 'Delhi', 'Kerala'],
    datasets: [{
      label: 'News Count',
      data: [85, 78, 110, 90, 60],
      backgroundColor: '#17a2b8'
    }]
  },
  options: { responsive: true }
});

// Chart for global countries
new Chart(document.getElementById('countryChart'), {
  type: 'bar',
  data: {
    labels: ['India', 'USA', 'UK', 'Germany', 'China'],
    datasets: [{
      label: 'News Volume',
      data: [320, 200, 180, 150, 140],
      backgroundColor: '#ffc107'
    }]
  },
  options: { responsive: true }
});
