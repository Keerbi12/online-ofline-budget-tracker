if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../sw.js')
    .then((reg) => console.log('The service worker has been registered', reg))
    .catch((err) => console.log('The service worker has not been registered', err));
}