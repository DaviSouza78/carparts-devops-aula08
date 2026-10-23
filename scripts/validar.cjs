const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.resolve(__dirname,'..');
const arg=process.argv[2];
const parts=arg==='all'?['apps/api','apps/portal','libs/ui','prompts']:[arg];
for(const part of parts){
 if(!['apps/api','apps/portal','libs/ui','prompts'].includes(part))throw Error('Componente inválido');
 if(part==='prompts'){
  const text=fs.readFileSync(path.join(root,part,'revisao.md'),'utf8');
  if(!text.includes('Revisão humana obrigatória'))throw Error('Falta requisito de revisão');
  console.log('PASS prompts: requisito textual presente; sem substituir revisão humana');
 }else{
  const files=fs.readdirSync(path.join(root,part)).filter(p=>p.endsWith('.cjs'));
  for(const file of files){const lint=cp.spawnSync(process.execPath,['--check',path.join(root,part,file)],{stdio:'inherit'});if(lint.status!==0)process.exit(1);}
  const test=cp.spawnSync(process.execPath,[path.join(root,part,'test.cjs')],{stdio:'inherit'});if(test.status!==0)process.exit(1);
 }
}
