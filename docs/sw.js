const CACHE='meu-financeiro-685190eb13f3';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/CategoryManager-BwQ7SdCV.js","assets/CyclePanel-B5uwoRAV.js","assets/html2canvas-zRALU_B7.js","assets/index-CIt-Py3r.css","assets/index-CtCT4F2L.js","assets/index.es-BUFVWKPB.js","assets/jsx-runtime-CkXRJ162.js","assets/pdf-DbiGvzgg.js","assets/purify.es-Dqk5qvad.js","assets/QuickTour-DQeRSmvk.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/ThemePicker--sIRXFq7.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
const CORE=["apple-touch-icon.png","assets/index-CIt-Py3r.css","assets/index-CtCT4F2L.js","assets/jsx-runtime-CkXRJ162.js","assets/rolldown-runtime-WkwZ5CU-.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
