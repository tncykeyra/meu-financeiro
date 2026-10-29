import type {Entry} from './finance';
const normalize=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
const contains=(text:string,word:string)=>(' '+text+' ').includes(' '+normalize(word)+' ');
type Rule={words:string[];categories:string[]};
const expenses:Rule[]=[
 {words:['alface','pastel','pasteis','banana','tomate','batata','cebola','cenoura','fruta','frutas','verdura','verduras','legume','legumes','hortifruti','hortifrutti','feira'],categories:['Feira','Mercado e feira','Hortifruti','Alimentação','Mercado']},
 {words:['uber','uberx','uber moto','99','99pop','taxi'],categories:['Uber','Transporte','Transportes','Mobilidade']},
 {words:['mercado','supermercado','hipermercado','atacadao','assai','compra do mes'],categories:['Mercado','Mercado e feira','Supermercado','Alimentação']},
 {words:['internet','wifi','wi fi','fibra','banda larga'],categories:['Internet','Telefone e internet','Contas']},
 {words:['agua','sabesp','saneamento'],categories:['Água','Água e luz','Contas']},
 {words:['luz','energia','eletricidade','enel','cpfl'],categories:['Luz','Energia','Água e luz','Contas']},
 {words:['combustivel','gasolina','etanol','diesel','abastecimento'],categories:['Combustível','Transporte','Transportes']},
 {words:['delivery','pizza','ifood','lanche','hamburguer'],categories:['Delivery','Alimentação','Restaurantes']},
 {words:['farmacia','saude','dentista','consulta','remedio','medicamento','plano de saude'],categories:['Saúde','Farmácia','Contas']},
 {words:['escola','mensalidade escolar','material escolar','curso'],categories:['Escola','Educação']},
 {words:['pedagio','sem parar','conectcar'],categories:['Pedágio','Transporte','Transportes']},
 {words:['aluguel','condominio','moradia'],categories:['Moradia','Aluguel','Casa']},
 {words:['passeio','cinema','parque','viagem'],categories:['Passeios','Lazer','Viagem']}
];
const incomes:Rule[]=[{words:['salario','pagamento salario','holerite'],categories:['Salário','Renda']},{words:['aluguel'],categories:['Aluguel','Renda de aluguel']},{words:['venda','vendas'],categories:['Vendas','Renda extra']},{words:['freelance','freela'],categories:['Renda extra','Freelance']}];
function categoryFor(aliases:string[],categories:string[]){for(const alias of aliases){const found=categories.find(category=>normalize(category)===normalize(alias));if(found)return found}return undefined}
export function suggestedCategory(description:string,kind:Entry['kind'],categories:string[],entries:Entry[]){const text=normalize(description);const fallback=categoryFor(['Outros'],categories)||categories[0]||'';if(!text)return fallback;const previous=[...entries].reverse().find(entry=>entry.kind===kind&&normalize(entry.description)===text&&categories.includes(entry.category));
// A useful personal correction wins; an old generic fallback must not hide a recognized category.
if(previous&&normalize(previous.category)!=='outros')return previous.category;
for(const rule of kind==='expense'?expenses:incomes){if(rule.words.some(word=>contains(text,word))){const found=categoryFor(rule.categories,categories);if(found)return found}}
// Also recognizes categories the user created, without creating new ones automatically.
const named=[...categories].filter(category=>normalize(category)!=='outros').sort((a,b)=>b.length-a.length).find(category=>contains(text,category));return named||previous?.category||fallback}
export function entryDescription(description:string,category:string,kind:Entry['kind']){return description.trim()||category||(kind==='expense'?'Despesa':'Recebimento')}
