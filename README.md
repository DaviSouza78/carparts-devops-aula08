# Carparts — DevOps Aula 08

Laboratório acadêmico de Davi Marcondes Paes de Souza, RA 26180842.
Monorepo demonstrativo para estudar Git, CI e ideias do Scion. Não representa
uma aplicação comercial existente nem medições históricas da empresa fictícia.

## Revisão pendente

Os arquivos são propostos por pull request. Um colega da turma deve revisar e
registrar sua aprovação antes da integração. Não integrar um PR de agente sem
essa revisão. Joaopedro0s foi convidado com acesso de escrita e está incluído no
CODEOWNERS proposto. Ele precisa aceitar o convite antes de sua aprovação contar
como aprovação de colaborador elegível. O autor não aprova o próprio PR.

Este repositório pessoal não oferece merge queue; a tentativa retornou HTTP 422.
Aqui, integrar por squash no GitHub após revisão, checks verdes e conversas
resolvidas, respeitando a proteção. O workflow suporta merge_group para eventual
repositório elegível de organização; não existe fila ativa neste laboratório.

## Executar localmente

Node.js 22 ou superior: `node scripts/validar.cjs all`.
O CI testa API, portal, UI, requisitos textuais de prompts e segredos no histórico.
O benchmark compara três checkouts completos com três rasos/esparsos do mesmo SHA.

## Conteúdo

- CONTRIBUTING.md: branches, commits, revisão e duas semanas de acompanhamento.
- .github/: responsáveis por caminho, template de PR e workflows.
- evidencias/: resultados reais, logs e laboratório Git.
- PARECER-SCION-CARPARTS.md: análise técnica com fonte primária.

O relatório individual da página da aula será entregue separadamente em TXT,
exatamente no formato produzido pelo HTML fornecido pelo professor.
