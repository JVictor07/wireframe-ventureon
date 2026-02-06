# Fluxo - Cadastro de NF e Criação de Operação

## Descrição
Fluxo específico do processo de cadastro de nota fiscal e criação de operação pelo Sacado.

## Diagrama Mermaid

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Cadastrar NF]) --> FormNF[Formulário de Cadastro]
    
    FormNF --> SelecionaForn[Seleciona Fornecedor<br/>do dropdown]
    SelecionaForn --> PreencheNum[Preenche Número da NF]
    PreencheNum --> PreencheValor[Preenche Valor]
    PreencheValor --> PreencheVenc[Preenche Data de Vencimento]
    
    PreencheVenc --> Decision1{Todos os campos<br/>preenchidos?}
    
    Decision1 -->|Não| Aviso[Mensagem de erro:<br/>Campos obrigatórios]
    Aviso --> FormNF
    
    Decision1 -->|Sim| ClicarSalvar[Clica em Salvar NF]
    
    ClicarSalvar --> SalvaNF[NF registrada no sistema<br/>Status: Cadastrada]
    SalvaNF --> MensagemSucesso[Toast: NF cadastrada<br/>com sucesso]
    
    MensagemSucesso --> RedirecionaDash[Redireciona para Dashboard]
    
    RedirecionaDash --> Dashboard[Dashboard Sacado]
    
    Dashboard --> Decision2{Próxima ação?}
    
    Decision2 -->|Cadastrar outra NF| Start
    Decision2 -->|Ver NFs cadastradas| ListaNF[Acessa Notas Fiscais]
    Decision2 -->|Outras ações| OutrasAcoes[Outras funcionalidades]
    
    ListaNF --> TabelaNF[Visualiza tabela<br/>de NFs cadastradas]
    
    TabelaNF --> BuscaNF{Usar busca?}
    BuscaNF -->|Sim| FiltraNF[Filtra por número<br/>ou fornecedor]
    BuscaNF -->|Não| VisualizaTodas[Visualiza todas as NFs]
    
    FiltraNF --> VisualizaTodas
    
    VisualizaTodas --> IdentificaNF[Identifica NF desejada<br/>Status: Cadastrada]
    
    IdentificaNF --> ClicaCriarOp[Clica em<br/>Criar Operação]
    
    ClicaCriarOp --> SistemaCriaOp[Sistema cria operação<br/>baseada na NF]
    
    SistemaCriaOp --> AtualizaStatus[Status da NF muda para:<br/>Com Operação]
    
    AtualizaStatus --> RedirecionaOp[Redireciona automaticamente<br/>para Detalhe da Operação]
    
    RedirecionaOp --> DetalheOp[Tela: Detalhe da Operação<br/>Status: Aguardando aprovação]
    
    DetalheOp --> ProximaFase([Continua no fluxo<br/>de aprovação])
    
    OutrasAcoes --> Dashboard

    style Start fill:#e1f5e1
    style SalvaNF fill:#fff9c4
    style AtualizaStatus fill:#fff9c4
    style DetalheOp fill:#b3e5fc
    style ProximaFase fill:#e1f5e1
    style Aviso fill:#ffcdd2
```

## Detalhes do Fluxo

### Fase 1: Cadastro da Nota Fiscal
1. Sacado acessa menu "Cadastrar NF"
2. Preenche formulário com dados obrigatórios
3. Sistema valida campos
4. NF é salva com status "Cadastrada"
5. Usuário retorna ao Dashboard

### Fase 2: Visualização de NFs
1. Sacado acessa "Notas Fiscais"
2. Visualiza lista de todas as NFs cadastradas
3. Pode usar busca para filtrar
4. Identifica NFs com status "Cadastrada"

### Fase 3: Criação de Operação
1. Sacado clica em "Criar Operação" na NF desejada
2. Sistema cria operação automaticamente
3. Status da NF muda para "Com Operação"
4. Usuário é redirecionado para tela de detalhe
5. Operação entra em status "Aguardando aprovação"

## Validações

- **Campos obrigatórios**: Fornecedor, Número, Valor, Vencimento
- **Status da NF**: Apenas NFs "Cadastrada" podem criar operação
- **Fornecedor**: Deve estar cadastrado e ativo no sistema

## Comportamento Visual

- **Toast de sucesso**: Após salvar NF
- **Mudança de badge**: Status muda visualmente na tabela
- **Botão contextual**: "Criar Operação" só aparece para NFs sem operação
- **Redirecionamento automático**: Após criar operação
