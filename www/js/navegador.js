document.addEventListener('deviceready', () => {
    const btnIr = document.getElementById('btnIr');
    const inputUrl = document.getElementById('urlInput');
  
    btnIr.addEventListener('click', navegar);
  
    inputUrl.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        navegar();
      }
    });
  
    function navegar() {
      let url = inputUrl.value.trim();
  
      if (!url) {
        alert('Digite uma URL ou termo de pesquisa.');
        return;
      }
  
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (url.includes('.')) {
          url = 'https://' + url;
        } else {
          url = 'https://www.google.com/search?q=' + encodeURIComponent(url);
        }
      }
  
      cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    }
  });
  
  function voltar() {
    window.location.href = "index.html";
  }
  