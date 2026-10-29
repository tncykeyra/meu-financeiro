const CACHE='meu-financeiro-cd2f1b29e0a7';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/html2canvas-B7aSgPx2.js","assets/index-DhC8nm8O.css","assets/index-D_gvRr5u.js","assets/index.es-BFlv8YAv.js","assets/pdf-DyBF6H38.js","assets/purify.es-Dqk5qvad.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request)))});
