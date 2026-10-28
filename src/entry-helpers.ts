export function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
export function parseAmount(value:string){const v=value.trim().replace(/\s|R\$/g,'');const normalized=v.includes(',')?v.replace(/\./g,'').replace(',','.'):v;return /^\d+(\.\d{1,2})?$/.test(normalized)?Math.round(Number(normalized)*100):NaN}
