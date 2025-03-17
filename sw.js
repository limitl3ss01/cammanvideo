const CACHE_NAME = 'cammanvideo-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/szkolenia.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/profile.png',
    '/icons/icon-192x192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'
];

// Instalacja Service Workera
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Obsługa żądań sieciowych
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - zwróć odpowiedź z cache
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    (response) => {
                        // Sprawdź czy odpowiedź jest poprawna
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Sklonuj odpowiedź
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Aktualizacja Service Workera
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
}); 