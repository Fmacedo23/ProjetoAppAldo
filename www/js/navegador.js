document.addEventListener('DOMContentLoaded', () => {
  const btnIr = document.getElementById('btnIr');
  const inputUrl = document.getElementById('urlInput');
  const navegadorIframe = document.getElementById('navegadorIframe');

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

    navegadorIframe.src = url;
  }
});
