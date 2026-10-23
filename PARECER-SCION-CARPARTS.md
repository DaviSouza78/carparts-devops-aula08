# E6 — Parecer técnico: Scion e Carparts

Davi Marcondes Paes de Souza — RA 26180842 — 22/10/2026

O Scion responde a uma carga excepcional de controle de versão. A Anthropic
relata crescimento de aproximadamente 2.500 para mais de 30 mil mudanças
integradas por dia e uma infraestrutura com cerca de 25 milhões de checkouts
diários de CI. O custo de transferir repositórios e manter espelhos tornou-se
um gargalo. Esses valores são relatos da empresa, não medições deste trabalho.
[Fonte primária, publicada em 13/10/2026 e atualizada em 15/10/2026](https://www.anthropic.com/research/redesigning-source-control).

Changesets criados no servidor, objetos imutáveis e busca sob demanda permitem
reduzir o trabalho local. A hierarquia daemon no nó, cache regional e servidor
autoritativo reaproveita os objetos. O Antique complementa o sistema com revisão
e critérios de aprovação que consideram o significado da alteração.

A Carparts tem quatro desenvolvedores, um designer e aproximadamente 40 PRs por
semana segundo o enunciado. Essa escala não justifica reconstruir controle de
versão, busca, revisão e CI. A própria Anthropic afasta o Scion como substituto
geral do Git e descreve sua infraestrutura como altamente específica.
Continuar com Git e GitHub atende às restrições e preserva o ecossistema existente.

A proposta adota três ideias. Primeiro, buscar e materializar menos dados:
checkout raso e esparso nos testes por componente, medindo checkout e job em três
execuções antes e três depois. Segundo, reduzir divergência: branches com até
dois dias úteis, mudanças pequenas e integração diária por PR, acompanhando
idade de branches e conflitos por PR. Terceiro, concentrar revisão nos riscos:
CODEOWNERS por pasta, responsável humano para prompts e aprovação registrada,
acompanhando espera por revisão e defeitos após integração. CODEOWNERS não
replica a análise semântica do Antique.

A fila de merge do GitHub permanece apropriada nesta escala; merge_group valida
a composição antes da integração. Testes posteriores complementam os gates.
O plano dura duas semanas e usa o lead time de 11 dias como base declarada,
buscando dois dias. O repositório acadêmico criado teve proteção ativada e CI aprovado. Três amostras
por modo mediram checkout médio de 903 ms antes e 1.076 ms depois: este laboratório
pequeno não demonstrou ganho de tempo. A revisão fica para um colega; a API rejeitou
a fila no repositório pessoal. Não houve acompanhamento de duas semanas nem
comprovação da meta de lead time.

A matéria da [Heise indicada no enunciado](https://www.heise.de/en/news/Scion-Anthropic-s-lean-Git-alternative-for-agentic-workflows-11489274.html)
não ficou acessível nesta consulta. As conclusões técnicas acima se apoiam
na fonte primária, sem atribuir à notícia conteúdo não verificado.
