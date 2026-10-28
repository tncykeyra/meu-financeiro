import {readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function walk(path){const files=[];for(const item of await readdir(path,{withFileTypes:true})){const file=`${path}/${item.name}`;if(item.isDirectory())files.push(...await walk(file));else if(item.name!=='sw.js')files.push(file)}return files}
const files=await walk('dist');const urls=files.map(file=>file.slice(5));const hash=createHash('sha256');for(const file of files)hash.update(await readFile(file));const version=hash.digest('hex').slice(0,12);
await writeFile('dist/sw.js',`const CACHE='meu-financeiro-${version}';
const BASE=new URL('./',self.location.href);
const ASSETS=${JSON.stringify(urls)}.map(path=>new URL(path,BASE).href);
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('meu-financeiro-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const request=event.request;const url=new URL(request.url);if(request.method!=='GET'||url.origin!==BASE.origin||!url.pathname.startsWith(BASE.pathname)||request.headers.has('authorization'))return;
if(request.mode==='navigate'){event.respondWith(fetch(request).catch(()=>caches.match(new URL('index.html',BASE).href)));return}
if(url.search||!ASSETS.includes(url.href))return;
event.respondWith(caches.match(request).then(cached=>cached||fetch(request)))});
`);
console.log(`PWA: ${urls.length} arquivos estáticos preparados; dados de contas não entram no cache.`);
