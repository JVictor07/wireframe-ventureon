# Listagem de Notas Fiscais

## Objetivo da Tela
Permitir que o Sacado visualize todas as notas fiscais cadastradas
e crie operações baseadas nelas.

## Usuário
- Sacado

## Componentes
### Tabela de Notas Fiscais
Colunas:
- ID da NF
- Número da nota
- Fornecedor
- Valor
- Data de vencimento
- Status (badge)

### Status Possíveis
- **Cadastrada**: NF registrada, sem operação vinculada
- **Com Operação**: Já existe operação criada para esta NF

### Ações por Linha
- **Criar Operação**: Para NFs com status "Cadastrada"
  - Redireciona para tela de detalhe da operação criada
- **Ver Operação**: Para NFs com status "Com Operação"
  - Redireciona para tela de detalhe da operação existente

### Botão Principal
- "Cadastrar Nova NF"
  - Redireciona para tela de cadastro de nota fiscal

### Busca
- Campo de busca por número da NF ou fornecedor

## Comportamento Visual
- Tabela com filtro de busca
- Status destacados com badges coloridos
- Botões de ação contextuais baseados no status da NF

## Fluxo
1. Sacado visualiza lista de NFs cadastradas
2. Para NFs sem operação, clica em "Criar Operação"
3. Sistema redireciona para tela de detalhe da operação
4. Sacado pode aprovar, selecionar financiador e finalizar
