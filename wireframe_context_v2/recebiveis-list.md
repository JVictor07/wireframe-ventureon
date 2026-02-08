# Listagem de Recebíveis - Fornecedor

## Objetivo da Tela
Exibir todos os recebíveis do fornecedor com filtros avançados para facilitar a busca e gestão.

## Usuário
- Fornecedor

## Componentes

### Tabela Completa de Recebíveis
Colunas:
- Número da NF
- Sacado (nome e CNPJ)
- Valor da NF
- Data de emissão
- Data de vencimento
- Dias até vencimento
- Status (badge colorido)
- Ações (Ver Detalhes)

### Filtros Avançados
- Busca por número de NF ou nome do sacado
- Filtro por sacado específico
- Filtro por status da operação

### Contador
- Mostra quantidade de recebíveis filtrados vs total

## Status Possíveis
- **Disponível para Antecipar**: Recebível pronto para solicitar antecipação (verde)
- **Aguardando Aprovação**: Solicitação enviada, pendente aprovação do sacado (amarelo)
- **Antecipada**: Operação já finalizada (azul)

## Comportamento Visual
- Dias até vencimento destacados em vermelho quando ≤15 dias
- Informações do sacado (nome + CNPJ) agrupadas
- Navegação para detalhes ao clicar em "Ver Detalhes"
- Responsivo e otimizado para visualização de muitos registros
