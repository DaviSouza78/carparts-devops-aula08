const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.resolve(__dirname,'..'),repo=path.join(root,'laboratorio-reproduzido');
if(fs.existsSync(repo))throw Error('Laboratório já existe; não sobrescrever.');
fs.mkdirSync(repo);let log=[];
function note(t){log.push('\n# '+t);}
function git(args,expected=0,env={}){const r=cp.spawnSync('git',args,{cwd:repo,encoding:'utf8',env:{...process.env,...env}});log.push('$ git '+args.join(' '),(r.stdout||'')+(r.stderr||''),'[exit '+r.status+']');if(r.status!==expected)throw Error(log.slice(-3).join('\n'));return r.stdout.trim();}
function write(p,s){fs.mkdirSync(path.dirname(path.join(repo,p)),{recursive:true});fs.writeFileSync(path.join(repo,p),s);}
function commit(msg){git(['add','.']);git(['commit','-m',msg]);return git(['rev-parse','HEAD']);}
note('Ambiente sintético local, criado para a atividade. Nenhum remoto configurado ou push executado.');
git(['init','-b','main']);git(['config','user.name','Davi Marcondes Paes de Souza']);git(['config','user.email','26180842@aluno.invalid']);git(['config','core.autocrlf','false']);
write('apps/api/config.json','{"timeout":30,"retries":1}\n');
write('apps/api/preco.cjs','module.exports=(preco,quantidade)=>preco*quantidade;\n');
write('scripts/teste.cjs',"const assert=require('node:assert/strict');const total=require('../apps/api/preco.cjs');assert.equal(total(10,3),30);assert.equal(total(5,0),0);console.log('PASS: total de pecas correto');\n");
write('apps/portal/README.md','# Portal Carparts\n');write('libs/ui/README.md','# Biblioteca UI\n');write('prompts/revisao.md','Revisar requisitos e resultados dos testes.\n');
const base=commit('chore: iniciar laboratorio Carparts');
note('Branches privadas ainda não publicadas: duas mudanças na mesma linha provocam conflito real.');
git(['switch','-c','feat/retries']);write('apps/api/config.json','{"timeout":30,"retries":3}\n');commit('feat(api): aumentar tentativas');
git(['switch','main']);git(['switch','-c','fix/timeout']);write('apps/api/config.json','{"timeout":60,"retries":1}\n');commit('fix(api): ampliar timeout');git(['switch','main']);git(['merge','--ff-only','fix/timeout']);
git(['switch','feat/retries']);git(['rebase','main'],1);
note('Conflito resolvido combinando timeout 60 e retries 3; não escolher cegamente um lado.');
write('apps/api/config.json','{"timeout":60,"retries":3}\n');git(['add','apps/api/config.json']);git(['-c','core.editor=true','rebase','--continue']);
const test=cp.spawnSync(process.execPath,['scripts/teste.cjs'],{cwd:repo,encoding:'utf8'});log.push('$ node scripts/teste.cjs',test.stdout+'[exit '+test.status+']');if(test.status!==0)throw Error('Teste falhou');
git(['switch','main']);git(['merge','--ff-only','feat/retries']);
note('Revert de commit que já integra a main local: novo commit inverso preserva o histórico.');
git(['switch','-c','feat/banner']);write('apps/portal/banner.txt','Campanha de outubro\n');const banner=commit('feat(portal): incluir banner');git(['switch','main']);git(['merge','--ff-only','feat/banner']);git(['switch','-c','fix/reverter-banner']);git(['revert','--no-edit',banner]);git(['switch','main']);git(['merge','--ff-only','fix/reverter-banner']);
if(fs.existsSync(path.join(repo,'apps/portal/banner.txt')))throw Error('Revert não removeu banner');
note('Busca binária: teste retorna 0 para versão boa e 1 para regressão.');
const good=git(['rev-parse','HEAD']);git(['switch','-c','feat/cenario-bisect']);
write('apps/portal/descricao.txt','Catálogo de peças\n');commit('docs(portal): descrever catalogo');
write('apps/api/preco.cjs','module.exports=(preco,quantidade)=>preco+quantidade;\n');const bug=commit('test(api): inserir regressao intencional no total');
write('libs/ui/cores.txt','azul\n');commit('style(ui): definir cor');write('prompts/criterios.txt','Validar regra de negocio.\n');commit('docs(prompts): definir criterio');
git(['switch','main']);git(['merge','--ff-only','feat/cenario-bisect']);const bad=git(['rev-parse','HEAD']);
git(['bisect','start',bad,good]);git(['bisect','run','node','scripts/teste.cjs']);const found=git(['rev-parse','refs/bisect/bad']);git(['bisect','log']);if(found!==bug)throw Error('Bisect encontrou hash incorreto');git(['bisect','reset']);
note('Recuperação final por revert da regressão encontrada.');git(['switch','-c','fix/remover-regressao']);git(['revert','--no-edit',bug]);git(['switch','main']);git(['merge','--ff-only','fix/remover-regressao']);
const finalTest=cp.spawnSync(process.execPath,['scripts/teste.cjs'],{cwd:repo,encoding:'utf8'});log.push('$ node scripts/teste.cjs',finalTest.stdout+'[exit '+finalTest.status+']');if(finalTest.status!==0)throw Error('Falha final');
git(['log','--graph','--all','--oneline']);git(['status','--short']);git(['fsck','--full']);
const diag=['AMBIENTE: laboratório sintético local; não é o remoto real da Carparts.','Tamanho e objetos:',git(['count-objects','-vH']),'Branches (data é último commit, não criação):',git(['for-each-ref','--format=%(refname:short) | %(committerdate:iso8601) | %(subject)','refs/heads']),'Remotos:',git(['remote','-v']),'Conflito reproduzido: apps/api/config.json; ambas as branches alteram a mesma linha.','Tempo médio de checkout CI: não medido; GitHub Actions ainda não executado.'];
fs.writeFileSync(path.join(root,'evidencias/diagnostico-local.txt'),diag.join('\n'));
git(['bundle','create','../evidencias/laboratorio.bundle','--all']);git(['bundle','verify','../evidencias/laboratorio.bundle']);
fs.writeFileSync(path.join(root,'evidencias/laboratorio-git.log'),log.join('\n'));
fs.writeFileSync(path.join(root,'evidencias/laboratorio-resultado.json'),JSON.stringify({base,bugInserido:bug,bugEncontrado:found,bisectCorreto:found===bug,testeFinal:finalTest.status,remoto:false},null,2));
console.log(JSON.stringify({base,bug,found,status:'PASS'},null,2));
