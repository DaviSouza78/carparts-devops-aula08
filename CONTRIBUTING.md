# Contribuição — Carparts

Responsável pela proposta: Davi Marcondes Paes de Souza — RA 26180842.

## Fluxo

Usamos trunk-based development. A main representa código integrado e validado.
Branches vivem no máximo dois dias úteis, com integração diária e feature flags
para funcionalidades incompletas. Dividir tarefas que excedam esse limite.
Nomear como `feat/catalogo`, `fix/timeout`, `docs/manual` ou `chore/checkout`.
Nenhum push direto na main. Toda alteração deve passar por PR, CI e revisão humana
registrada. Limite orientativo: 200 linhas úteis por PR; justificar exceções.

Neste repositório pessoal, a merge queue não está disponível: o GitHub rejeitou
sua ativação com HTTP 422. Após revisão humana válida, checks obrigatórios verdes
e conversas resolvidas, uma pessoa com escrita integra o PR por squash no GitHub,
sem bypass das proteções. Se a main avançar, atualizar a branch compartilhada por
merge, executar novamente o CI e obter nova aprovação quando invalidada.
Não há fila simulada nem integração automática neste laboratório. Em futuro
repositório elegível de organização, exigir merge queue e validar merge_group.
Essa limitação está registrada em PROTECAO-MAIN.md.

## Commits e atualização

Conventional Commits: `tipo(escopo): descricao`, por exemplo
`feat(portal): adicionar busca`, `fix(api): corrigir total` e
`docs(prompts): explicar restricoes`. Usar `!` e rodapé BREAKING CHANGE quando aplicável.
O changelog de release agrupa feat, fix e mudanças incompatíveis dos commits
integrados; conferir o resultado antes de criar a tag.

Antes do primeiro push: `git fetch origin`, `git rebase origin/main`, resolver
conflitos, `git add`, `git rebase --continue` e executar testes. Esse rebase é
permitido somente em commits privados ainda não publicados. Depois de compartilhar
a branch, atualizar com `git merge origin/main`, preservando o histórico.
Não usar force push ou reset destrutivo em branches compartilhadas. Para desfazer
mudanças integradas, criar branch de correção e PR com `git revert HASH`.

## PRs de agentes

Informar ferramenta utilizada, objetivo, restrições, pastas afetadas, riscos,
comandos de teste e resultados. O autor humano assume a responsabilidade.
Uma pessoa elegível diferente do autor revisa e registra aprovação no GitHub.
Agentes não se aprovam nem integram seu próprio trabalho. Mudanças em prompts
exigem code owner humano e análise de instruções, dados e comportamento esperado.
Não incluir segredos, tokens ou arquivos .env em nenhum commit.
CI verde não substitui revisão; nova alteração invalida aprovação anterior.

## Validação e release

Checks obrigatórios: `ci-obrigatorio`, revisão de CODEOWNERS e conversas resolvidas.
O workflow obrigatório roda também em `merge_group` e não é omitido por paths.
O evento está preparado para uma futura fila elegível; sua presença não significa
que a merge queue esteja ativa no repositório pessoal. Davi e Joaopedro0s estão
indicados no CODEOWNERS; o colega deve aceitar o convite de escrita e aprovar
alterações de Davi. Não é permitido aprovar o próprio PR.
Testar módulos e dependentes; mudanças em libs/ui afetam portal. Homologar a tag
de release e exigir aprovação humana antes de promover para produção.

## Medição em duas semanas

Dias 1–2: inventário e três medições de base. Dias 3–5: política e CI em PR.
Dias 6–8: revisão humana, verificação da proteção e três medições otimizadas;
ativação da fila somente se houver repositório elegível de organização.
Dias 9–10: comparar métricas e corrigir gargalos. Lead time vai do início do
trabalho até produção; medir separadamente tempo de PR até merge.
Registrar checkout, duração de job, espera por revisão, conflitos por PR,
idade de branches e mediana/p95 do lead time. Meta: reduzir o lead time de
11 para 2 dias; resultado depende de observação, não é garantido pela proposta.
