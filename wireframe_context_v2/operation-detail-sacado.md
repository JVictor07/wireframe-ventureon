# Operation Detail — Sacado

Operation lifecycle view.
# Detalhe da Operação

## Objetivo da Tela
Ser a principal tela de decisão e governança do Sacado.
Aqui o CFO precisa confiar totalmente no que está vendo.

## Usuário
- Sacado

## Componentes
### Cabeçalho
- ID da operação
- Status atual (badge)

### Seção: Dados da Nota
- Fornecedor
- Número da nota
- Valor
- Vencimento

### Seção: Comparação de Financiadores
Tabela:
- Nome do financiador
- Taxa
- Valor líquido estimado
- Destaque visual para menor taxa

### Seção: Histórico
- Linha do tempo com eventos da operação

### Ações (dependem do estado — apenas visual)
- Aprovar
- Rejeitar
- Selecionar financiador
- Marcar como financiada (mock)

## Comportamento Visual
- Cada ação abre modal de confirmação
- Estados finais são somente leitura