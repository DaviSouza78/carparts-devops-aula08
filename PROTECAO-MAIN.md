# E3 — configuração a aplicar e comprovar no GitHub

Atualização: repositório criado em https://github.com/DaviSouza78/carparts-devops-aula08.
Proteção ativada e verificada pela API: PR obrigatório, uma aprovação, code owner,
descarte de aprovações antigas, aprovação da última alteração por pessoa distinta,
conversas resolvidas e ci-obrigatorio. Administradores seguem a regra; force push
e exclusão bloqueados; histórico linear obrigatório.

O CODEOWNERS está proposto no PR e suas regras por pasta passarão a valer após
existir na main. Antes do primeiro merge, adicionar o colega com acesso de escrita
como responsável. Revisão humana fica pendente, conforme orientação do professor.
A main contém só o README inicial criado automaticamente pelo GitHub. Nenhum
código da atividade foi integrado sem revisão.

Tentativa de merge queue rejeitada: HTTP 422, regra merge_queue inválida no
repositório pessoal. A conta não possui organizações. O workflow escuta
merge_group, mas não existe fila ativa. Abaixo está a especificação desejada.

Criar regra/ruleset para o nome exato `main`, sem wildcard. Exigir PR, pelo menos
uma aprovação, revisão de CODEOWNERS, descarte de aprovações após novos commits,
aprovação da última alteração por pessoa diferente do autor e resolução de conversas.
Exigir o status `ci-obrigatorio`, proibir exclusão/force push e evitar bypass de
administradores ou bots. Exigir merge queue, squash e concorrência inicial de 1;
usar timeout de 15 minutos e somente PRs aprovados e sem falhas.

CODEOWNERS define responsabilidade por caminho, não análise semântica. A regra
de branch deve explicitamente exigir aprovação de code owners. Definir humanos
reais para portal, API, UI e prompts e verificar acesso de escrita. Mais de um
owner na mesma linha significa que qualquer um pode aprovar; não exige todos.
Quando Davi for autor do PR, outro humano elegível deverá ser owner/revisor.

A documentação consultada limita merge queue a repositórios públicos de
organizações ou privados de organizações em GitHub Enterprise Cloud. Um
repositório pessoal novo não resolve essa exigência. Verificar elegibilidade,
sem afirmar que serialização por concurrency equivale a merge queue.

Evidências: github-protecao-main.json registra a configuração efetiva;
github-merge-queue-tentativa.json registra a rejeição. Revisão humana e passagem
por fila elegível permanecem pendentes. Nenhum print ilustrativo substitui isso.

Fonte: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue
