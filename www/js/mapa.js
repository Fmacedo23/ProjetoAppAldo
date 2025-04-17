let map;
let marker;

function initMap() {
  // Verifica se o dispositivo está pronto e se a geolocalização é permitida
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Cria o mapa no local especificado
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 15
      });

      // Cria um marcador na localização do usuário
      marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "Você está aqui"
      });
    }, function() {
      alert('Não foi possível obter a sua localização.');
    });
  } else {
    alert('Geolocalização não é suportada por este navegador.');
  }
}

function voltar() {
  window.location.href = "index.html"; // Ajuste a URL conforme necessário para voltar à página inicial
}
