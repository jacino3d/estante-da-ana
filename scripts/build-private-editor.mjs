import {mkdir,copyFile,rm} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const output=path.join(root,'contact-gateway','admin-assets','admin');
await rm(path.join(root,'contact-gateway','admin-assets'),{recursive:true,force:true});
await mkdir(output,{recursive:true});

// Use the sanitized catalog from the public build, never the source-photo catalog.
for(const file of ['manage-inventory.html','inventory-manager.js','inventory-status.js']){
  await copyFile(path.join(root,file),path.join(output,file==='manage-inventory.html'?'index.html':file));
}
await copyFile(path.join(root,'dist','catalog.js'),path.join(output,'catalog.js'));
console.log('Private editor bundle prepared for the Cloudflare Worker.');
