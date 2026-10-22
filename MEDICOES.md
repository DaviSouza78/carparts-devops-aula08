# E1/E4 — protocolo de coleta

Status: nenhuma execução de GitHub Actions foi feita; não há média ou ganho medido.
Os 11 dias e 40 PRs/semana são dados do enunciado, não observações desta execução.
Os componentes fornecidos são um exemplo mínimo executável, não o sistema real.

1. No remoto correto, guardar `git count-objects -vH`, branches e PRs abertos.
2. Aprovar o workflow de benchmark em PR com revisão humana. Informar SHA completo.
3. Executar benchmark: produz três amostras de antes e três de depois, todas em
   ubuntu-latest, com os mesmos testes de API e SHA; a ordem não é garantia de
   aleatoriedade. Guardar os seis CSVs, URLs dos jobs e versão do runner.
4. A medida checkout_ms inclui custo de orquestração entre os passos. trabalho_ms
   cobre checkout e teste até a coleta; não é a duração total do job.
   Obter também started_at/completed_at dos jobs no GitHub e calcular a duração
   total incluindo setup e upload. Registrar fila de espera separadamente.
5. Calcular média antes = soma dos três tempos/3; média depois analogamente.
   Ganho percentual = 100*(antes-depois)/antes. Comparar dispersão e cache;
   três amostras atendem ao mínimo, sem comprovar significância estatística.
6. Medir CI obrigatório completo também: o scan de histórico mantém fetch-depth 0
   por uma necessidade distinta e pode limitar o ganho global.
7. Priorizar conflitos por frequência observada: branches antigas, mesma região
   de arquivo, mudanças extensas e dependências compartilhadas. Atribuir causas
   após examinar os PRs, não presumir que os exemplos são a medição real.

| Modo | Amostra | Checkout ms | Trabalho ms | Job total ms | URL |
|---|---|---|---|---|---|
| Antes | 1 | pendente | pendente | pendente | pendente |
| Antes | 2 | pendente | pendente | pendente | pendente |
| Antes | 3 | pendente | pendente | pendente | pendente |
| Depois | 1 | pendente | pendente | pendente | pendente |
| Depois | 2 | pendente | pendente | pendente | pendente |
| Depois | 3 | pendente | pendente | pendente | pendente |
