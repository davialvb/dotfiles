const iframe = document.getElementById('externalVideo');
const url = decodeURIComponent(window.location.search.replace('?url=', ''));
iframe.src = url;
