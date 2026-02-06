# Cadastro de Nota Fiscal (Pré-operação)

## Objetivo da Tela
Permitir que o Sacado registre notas fiscais que podem futuramente
virar operações de risco sacado.

## Usuário
- Sacado

## Importante
- NÃO cria operação
- NÃO solicita antecipação

## Componentes
- Select: Fornecedor
- Input: Número da nota
- Input: Valor
- Input: Data de vencimento
- Botão: Salvar nota (mock)

## Comportamento Visual
- Exibe confirmação estática ao salvar
- Após salvar, usuário pode acessar "Notas Fiscais" para criar operação

## Próximos Passos
1. Nota fiscal é registrada no sistema
2. Usuário acessa "Notas Fiscais" para visualizar
3. Clica em "Criar Operação" na lista
4. Sistema redireciona para detalhe da operação