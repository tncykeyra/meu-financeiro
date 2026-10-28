import {test} from 'node:test';import assert from 'node:assert/strict';
import {installments,totals,insights} from './finance.ts';
const base={description:'Compra',amount:10000,date:'2026-01-31',kind:'expense' as const,category:'Outros',paid:true,fixed:false,card:''};
test('Parcelas preservam centavos e ajustam mês curto',()=>{const rows=installments({...base,amount:10001},3);assert.equal(rows.reduce((s,e)=>s+e.amount,0),10001);assert.equal(rows[1].date,'2026-02-28');assert.equal(rows[2].date,'2026-03-31');assert.equal(rows[1].paid,false)});
test('Saldo usa apenas recebido e pago; previsão desconta pendentes',()=>{const rows=[{...base,id:'a',kind:'income' as const,amount:50000},{...base,id:'b',amount:10000},{...base,id:'c',amount:5000,paid:false},{...base,id:'d',kind:'income' as const,amount:100000,paid:false}];assert.deepEqual(totals(rows),{income:50000,paid:10000,pending:5000,balance:40000,forecast:35000,fixed:0,variable:15000})});
test('Análise aponta orçamento excedido e não inventa renda',()=>{const result=insights([{...base,id:'a'}],{Outros:5000});assert.ok(result.some(s=>s.includes('Não há receitas')));assert.ok(result.some(s=>s.includes('excedeu')))});
