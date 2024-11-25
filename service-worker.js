var cacheName='petstore-v1';
var cacheFiles=[
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png'

];

self.addEventListener('install',(e)=>{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then(cache=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
            })
            );
})

self.addEventListener('fetch', function(e){
    e.respondWith(
        //check if the cache has the file
        caches.match(e.request).then(function (r)  {
            console.log('[Service Worker] Fetching resources:'
            + e.request.url);
            // r is matching file if it exits in the code
            return r
})
);

});


self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match (e.request).then(function (r){
            // download the files if it is not in the cache,
            return r || fetch(e.request).then(function (response) {
                //add the new file to cache
                return caches.open(cacheName).then(function (cache) {
                   cache.put(e.request, response.clone());
                   return response;
                   });
             });
})
        );
});