const CACHE_NAME = 'v1_cache_BCH_PWA';

var urlsToCache = [
    './',
    './css/resume.css',
    './img/favicon.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-128.png',
    './img/favicon-256.png',
    './img/favicon-512.png',
    './img/favicon-1024.png'
];

self.addEventListener('install',e=>{
   e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache=>{
                return cache.addAll(urlsToCache)
                    .then(()=>{self.skipWaiting()});
        })
        .catch(err=>console.log('No se ha registrado el cache',err))
   ); 
});

self.addEventListener('activate',e=>{
    const cacheWhitelist = [CACHE_NAME];
    
    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            return Promise.all(
                cacheNames.map(cacheName=>{
                    if(cacheWhitelist.indexOf(cacheName)==-1){
                        return cache.delete(cacheName);
                    }
                })
            );
        })
        .then(()=>{
            self.clients.claim()
        })
    );
})

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
            .then(res=>{
                if(res){
                    return res;
                }
                return fetch(e.request);
            })
    );
});