// One module per business: each owns its composition, illustration, favicon and index poster.
import {readdirSync} from 'node:fs';
import path from 'node:path';

const dir = path.join(import.meta.dirname, 'pages');
export const pages = {};
for (const file of readdirSync(dir).filter(f => f.endsWith('.mjs'))) pages[file.slice(0, -4)] = (await import('./pages/' + file)).default;
