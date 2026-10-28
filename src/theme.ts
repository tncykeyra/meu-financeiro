export type Theme={primary:string;income:string;expense:string};
export const defaultTheme:Theme={primary:'#2563eb',income:'#86efac',expense:'#fca5a5'};
export const palette=['#2563eb','#1d4ed8','#7c3aed','#a855f7','#db2777','#ec4899','#f43f5e','#ef4444','#fca5a5','#fb923c','#f59e0b','#facc15','#84cc16','#16a34a','#86efac','#10b981','#14b8a6','#06b6d4','#38bdf8','#64748b','#334155','#111827','#ffffff','#000000'];
export function normalizeTheme(theme?:Partial<Theme>):Theme{return Object.fromEntries(Object.entries(defaultTheme).map(([key,value])=>[key,/^#[0-9a-f]{6}$/i.test(theme?.[key as keyof Theme]||'')?theme![key as keyof Theme]:value])) as Theme}
export function luminance(color:string){const rgb=color.slice(1).match(/../g)!.map(c=>parseInt(c,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722}
export function ink(color:string){return luminance(color)>.179?'#000000':'#ffffff'}
export function applyTheme(theme?:Partial<Theme>){const t=normalizeTheme(theme);for(const key of ['primary','income','expense'] as const){document.documentElement.style.setProperty('--'+key,t[key]);document.documentElement.style.setProperty('--'+key+'-ink',ink(t[key]))}}
