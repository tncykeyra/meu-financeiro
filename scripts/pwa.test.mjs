import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const source=await readFile('dist/sw.js','utf8');
function worker(){const listeners={};const self={location:{href:'https://example.test/meu-financeiro/sw.js'},addEventListener:(name,callback)=>{listeners[name]=callback}};vm.runInNewContext(source,{self,URL,caches:{match:async()=>({shell:true})},fetch:async()=>{throw Error('offline')}});return listeners}
test('Service worker não intercepta autenticação nem dados de outras origens',()=>{for(const url of ['https://hjmwdjmfetlfwrfgrols.supabase.co/rest/v1/finance_data','https://accounts.google.com/']){let intercepted=false;worker().fetch({request:{url,method:'GET',mode:'cors',headers:new Headers()},respondWith:()=>{intercepted=true}});assert.equal(intercepted,false)}});
test('Requisições autenticadas do próprio domínio não entram no cache',()=>{let intercepted=false;worker().fetch({request:{url:'https://example.test/meu-financeiro/index.html',method:'GET',mode:'navigate',headers:new Headers({authorization:'Bearer test'})},respondWith:()=>{intercepted=true}});assert.equal(intercepted,false)});
test('Sem internet, navegação recebe apenas a interface estática',async()=>{let response;worker().fetch({request:{url:'https://example.test/meu-financeiro/',method:'GET',mode:'navigate',headers:new Headers()},respondWith:value=>{response=value}});assert.equal((await response).shell,true)});
