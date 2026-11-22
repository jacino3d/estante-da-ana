import {mkdir,readFile,writeFile,copyFile,readdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
await mkdir(dist,{recursive:true});
const files=['index.html','style.css','app.js','commerce.js','book3d.js','site-config.js','inventory-status.js','manage-inventory.html','inventory-manager.js'];
for(const file of files)await copyFile(path.join(root,file),path.join(dist,file));
// Source photographs and research are intentionally excluded from public output.
let catalog=await readFile(path.join(root,'catalog.js'),'utf8');
catalog=catalog.replace(/    sourcePhoto: `books\/\$\{\[[\s\S]*?\]\[Number\(bay\)-1\]\[Number\(shelf\)-1\]\}`,[\r\n]*/,'');
if(catalog.includes('sourcePhoto:'))throw new Error('Source-photo sanitization failed');
await writeFile(path.join(dist,'catalog.js'),catalog);
for(const folder of ['covers','collages','furniture','vendor']){
  await mkdir(path.join(dist,folder),{recursive:true});
  for(const entry of await readdir(path.join(root,folder),{withFileTypes:true})){
    if(entry.isFile()&&/\.(?:png|jpg|jpeg|webp|svg|js|txt)$/i.test(entry.name))await copyFile(path.join(root,folder,entry.name),path.join(dist,folder,entry.name));
  }
}
await mkdir(path.join(dist,'ref'),{recursive:true});
await copyFile(path.join(root,'ref/bookcase-clean-v2.png'),path.join(dist,'ref/bookcase-clean-v2.png'));
await writeFile(path.join(dist,'.nojekyll'),'');
await writeFile(path.join(dist,'404.html'),'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Página não encontrada</title><p>Página não encontrada. <a href="./">Voltar à Estante da Ana</a></p></html>');
console.log('Public site prepared in dist/; original photos and research excluded.');
