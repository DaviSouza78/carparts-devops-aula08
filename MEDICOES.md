# E4 — medições reais do GitHub Actions

Mesmo SHA em seis jobs ubuntu-latest; três amostras por configuração.
Antes: fetch-depth 0, checkout completo. Depois: fetch-depth 1, sparse de API, UI e scripts.
Mesmo comando de teste nos dois modos.

| Modo | Amostra | Checkout ms | Trabalho ms | Job total ms | Evidência |
|---|---:|---:|---:|---:|---|
| antes | 1 | 885 | 1214 | 6000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923283) |
| antes | 2 | 792 | 1047 | 6000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923670) |
| antes | 3 | 1032 | 1421 | 8000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923798) |
| depois | 1 | 1123 | 1368 | 7000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923448) |
| depois | 2 | 1233 | 1606 | 9000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923549) |
| depois | 3 | 872 | 1195 | 5000 | [job](https://github.com/DaviSouza78/carparts-devops-aula08/actions/runs/39870051060/job/120141923480) |

Média de checkout antes: 903.00 ms; depois: 1076.00 ms.
Redução calculada do checkout: -19.16% (valor negativo significa aumento).
Média do job completo antes: 6666.67 ms; depois: 7000.00 ms.

Checkout_ms inclui orquestração entre passos. Trabalho_ms vai até a coleta após os testes.
Job_total_ms vem de started_at/completed_at do GitHub e inclui os demais passos.
O repositório é novo e pequeno; variação de runners e custo fixo dominam. Três amostras
não permitem concluir ganho de capacidade nem projetar o lead time de uma empresa real.
Não houve medição longitudinal de duas semanas. Os 11 dias e a meta de dois dias vêm do enunciado.
O experimento não demonstrou redução no checkout neste laboratório. A configuração
reduz o escopo de dados solicitado, mas seu benefício de tempo não foi comprovado aqui.

## Diagnóstico e acompanhamento

O clone inicial teve 39 objetos em um pack de 22,88 KiB; a main possui somente o
README de inicialização automática e a implementação está proposta na outra branch.
A data do último commit mede atividade, não criação da branch. Por ser um laboratório
novo, não há diagnóstico retrospectivo de uma empresa real. Conflito por alteração
da mesma linha foi reproduzido com evidência no laboratório Git.

A política prevê duas semanas: dias 1–2 diagnóstico; 3–5 proposta de CI e proteção;
6–8 revisão e ajustes; 9–10 comparação. Medir conflitos por PR, espera por revisão
e lead time até produção. A meta de dois dias ainda não foi comprovada.
