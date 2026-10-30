const CACHE='meu-financeiro-e1de6038c18c';
const BASE=new URL('./',self.location.href);
const ASSETS=["apple-touch-icon.png","assets/CategoryManager-g3DHcGuB.js","assets/CyclePanel-C2Qn5Nfe.js","assets/html2canvas-zRALU_B7.js","assets/index-CLTHTfT-.css","assets/index-CvFpBepK.js","assets/index.es-B6RbPIkJ.js","assets/jsx-runtime-CkXRJ162.js","assets/pdf-Dx8gekb4.js","assets/purify.es-Dqk5qvad.js","assets/QuickTour-xoYCjNnQ.js","assets/rolldown-runtime-WkwZ5CU-.js","assets/ThemePicker-_CMfvgYH.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
const CORE=["apple-touch-icon.png","assets/index-CLTHTfT-.css","assets/index-CvFpBepK.js","assets/jsx-runtime-CkXRJ162.js","assets/rolldown-runtime-WkwZ5CU-.js","icon-192.png","icon-512.png","icon-maskable.png","icon.svg","index.html","manifest.webmanifest"].map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
