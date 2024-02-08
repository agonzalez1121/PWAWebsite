if('serviceWorker' in navigator){
    console.log("Puedes usar el service worker");
    navigator.serviceWorker.register('./serviceWorker.js')
                            .then(res=>console.log('SW cargado correctamente', res))
                            .catch(err=>console.log('service Worker no se ha podido registrar',err));
}
else{
    console.log("No se puede encontrar el Service worker");
}