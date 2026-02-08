# Dashboard do Fornecedor

## Objetivo da Tela
Dar ao fornecedor uma visão consolidada de todos os seus recebíveis disponíveis para antecipação, independente do sacado.

## Usuário
- Fornecedor (com acesso habilitado pelo sacado)

## Componentes

### Cards de Resumo
- **Total Disponível**: Soma de todos os recebíveis disponíveis para antecipar
- **Aguardando Aprovação**: Quantidade de solicitações pendentes
- **Total Antecipado**: Valor total já antecipado (histórico)
- **Sacados Ativos**: Quantidade de empresas compradoras relacionadas

### Tabela de Recebíveis
Colunas:
- Número da NF
- Sacado (empresa compradora)
- Valor da NF
- Data de vencimento
- Dias até vencimento
- Status (badge)
- Ações (Ver Detalhes)

### Filtros
- Busca por número de NF ou sacado
- Filtro por sacado
- Filtro por status (Disponível, Aguardando, Antecipada)

## Comportamento Visual
- Recebíveis próximos ao vencimento (≤15 dias) destacados em vermelho
- Consolidação de múltiplos sacados em uma única visão
- Navegação para detalhes do recebível ao clicar
- Dados mockados de múltiplas empresas compradoras

## Diferencial
Esta tela permite que o fornecedor veja TODOS os seus recebíveis de TODOS os sacados em um único lugar, facilitando a gestão financeira consolidada.
