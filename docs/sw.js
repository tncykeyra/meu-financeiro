const CACHE='meu-financeiro-e75db5e4360d';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/CategoryManager-DqNf5e7q.js","assets/CyclePanel-B91FAe1Z.js","assets/html2canvas-zRALU_B7.js","assets/index-BrkdkQ69.css","assets/index-DEEQC8vo.js","assets/index.es-DAHVMQY-.js","assets/jsx-runtime-CkXRJ162.js","assets/pdf-D8Qk7hWI.js","assets/purify.es-Dqk5qvad.js","assets/QuickTour-BwCl1UEC.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/ThemePicker-CS-Ef-ya.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
const CORE=["apple-touch-icon.png","assets/index-BrkdkQ69.css","assets/index-DEEQC8vo.js","assets/jsx-runtime-CkXRJ162.js","assets/rolldown-runtime-WkwZ5CU-.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
