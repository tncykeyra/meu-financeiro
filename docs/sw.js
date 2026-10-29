const CACHE='meu-financeiro-15dc2cbed02e';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/CategoryManager-B7lOBCxT.js","assets/CyclePanel-BvDKdX5v.js","assets/html2canvas-zRALU_B7.js","assets/index-BAdaSkVt.css","assets/index-Bwjuo1tl.js","assets/index.es-DOIYK5rD.js","assets/jsx-runtime-CkXRJ162.js","assets/pdf-C4FVQ_L8.js","assets/purify.es-Dqk5qvad.js","assets/QuickTour-DNDbbHkt.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/ThemePicker-73jXbvzH.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
const CORE=["apple-touch-icon.png","assets/index-BAdaSkVt.css","assets/index-Bwjuo1tl.js","assets/jsx-runtime-CkXRJ162.js","assets/rolldown-runtime-WkwZ5CU-.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
