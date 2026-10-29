const CACHE='meu-financeiro-3fa1b8e8a036';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/CategoryManager-w7JG0r2J.js","assets/CyclePanel-tAKrPfr5.js","assets/html2canvas-zRALU_B7.js","assets/index-3Cn02-Sa.css","assets/index-Dc3L7ZwK.js","assets/index.es-2dkHbV29.js","assets/jsx-runtime-CkXRJ162.js","assets/pdf-7lolQjNO.js","assets/purify.es-Dqk5qvad.js","assets/QuickTour-RVrvU77u.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/ThemePicker-CjOZsy90.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
const CORE=["apple-touch-icon.png","assets/index-3Cn02-Sa.css","assets/index-Dc3L7ZwK.js","assets/jsx-runtime-CkXRJ162.js","assets/rolldown-runtime-WkwZ5CU-.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
