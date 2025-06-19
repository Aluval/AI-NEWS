new Chart(document.getElementById('stateChart'), {
  type: 'bar',
  data: {
    labels: ['Telangana', 'AP', 'Maharashtra', 'Kerala', 'Delhi'],
    datasets: [{
      label: 'News Count',
      data: [120, 95, 102, 76, 90],
      backgroundColor: '#17a2b8'
    }]
  }
});

new Chart(document.getElementById('countryChart'), {
  type: 'bar',
  data: {
    labels: ['India', 'USA', 'UK', 'Germany', 'China'],
    datasets: [{
      label: 'International News',
      data: [320, 200, 180, 150, 140],
      backgroundColor: '#ffc107'
    }]
  }
});