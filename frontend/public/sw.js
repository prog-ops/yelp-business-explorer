self.addEventListener('fetch', event => {
    if (event.request.url.includes('/api/yelp')) {
        event.respondWith(
            caches.match(event.request).then(cached => {
                return cached || fetch(event.request).then(response => {
                    const clone = response.clone();
                    caches.open('api-cache').then(cache => cache.put(event.request, clone));
                    return response;
                });
            })
        );
    }
});
