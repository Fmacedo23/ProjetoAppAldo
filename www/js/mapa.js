function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Cria o mapa centralizado na sua localização
      const map = L.map('map').setView([lat, lng], 15);

      // Carrega os tiles do OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Coloca um marcador
      L.marker([lat, lng]).addTo(map)
        .bindPopup('Você está aqui.')
        .openPopup();
    }, function(error) {
      console.error("Erro ao obter localização: ", error);
      alert('Erro ao obter sua localização: ' + error.message);
    });
  } else {
    alert('Geolocalização não é suportada por este navegador.');
  }
}

function voltar() {
  window.location.href = "index.html";
}

// Inicializa o mapa ao carregar a página
document.addEventListener("DOMContentLoaded", initMap);
