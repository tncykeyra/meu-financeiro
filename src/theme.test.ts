import test from 'node:test';
import assert from 'node:assert/strict';
import {palette,ink,luminance,normalizeTheme,defaultTheme} from './theme.ts';
test('Paleta e cores livres mantêm contraste mínimo para valores e botões',()=>{for(const color of [...palette,'#123456','#abcdef']){const text=ink(color),a=luminance(color),b=luminance(text);assert.ok((Math.max(a,b)+.05)/(Math.min(a,b)+.05)>=4.5,color)}});
test('Preferências incompletas e cores inválidas usam os padrões seguros',()=>{assert.deepEqual(normalizeTheme(),defaultTheme);assert.deepEqual(normalizeTheme({primary:'url(example)',income:'#123456',expense:'red'}),{...defaultTheme,income:'#123456'})});
