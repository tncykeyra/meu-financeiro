import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function walk(path){const files=[];for(const item of await readdir(path,{withFileTypes:true})){const file=`${path}/${item.name}`;if(item.isDirectory())files.push(...await walk(file));else if(item.name!=='sw.js')files.push(file)}return files}
const files=(await walk('dist')).filter(file=>!file.includes('/.vite/'));const urls=files.map(file=>file.slice(5));const hash=createHash('sha256');for(const file of files)hash.update(await readFile(file));const version=hash.digest('hex').slice(0,12);
const manifest=JSON.parse(await readFile('dist/.vite/manifest.json','utf8'));const critical=new Set();function include(key){const entry=manifest[key];if(!entry||critical.has(entry.file))return;critical.add(entry.file);for(const css of entry.css||[])critical.add(css);for(const imported of entry.imports||[])include(imported)}include('index.html');const core=urls.filter(url=>!url.endsWith('.js')||critical.has(url));
await writeFile('dist/sw.js',`const CACHE='meu-financeiro-${version}';
const BASE=new URL('./',self.location.href);
const ASSETS=${JSON.stringify(urls)}.map(path=>new URL(path,BASE).href);
const CORE=${JSON.stringify(core)}.map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)))}return response})))});
`);
console.log(`PWA: ${urls.length} arquivos estáticos disponíveis; ${core.length} essenciais no primeiro cache; dados de contas não entram no cache.`);
