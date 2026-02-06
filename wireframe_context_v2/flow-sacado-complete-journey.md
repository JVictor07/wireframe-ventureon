# Fluxo Completo - Jornada do Sacado

## Descrição
Fluxo end-to-end completo do Sacado, desde o cadastro de nota fiscal até a finalização da operação financiada.

## Diagrama Mermaid

```mermaid
flowchart TD
    Start([Sacado faz login]) --> Dashboard[Dashboard Sacado]
    
    Dashboard --> Decision1{O que fazer?}
    
    Decision1 -->|Cadastrar NF| CadastroNF[Tela: Cadastrar NF]
    Decision1 -->|Ver NFs| ListaNF[Tela: Notas Fiscais]
    Decision1 -->|Ver Operações| VerOps[Ver operações existentes]
    Decision1 -->|Gerenciar| Gerenciar[Empresa/Equipe/Fornecedores]
    
    CadastroNF --> PreencheNF[Preenche dados da NF:<br/>- Fornecedor<br/>- Número<br/>- Valor<br/>- Vencimento]
    PreencheNF --> SalvaNF[Clica em Salvar]
    SalvaNF --> NFSalva[NF registrada<br/>Status: Cadastrada]
    NFSalva --> VoltaDash1[Volta ao Dashboard]
    VoltaDash1 --> Dashboard
    
    ListaNF --> VisualizaNFs[Visualiza tabela de NFs]
    VisualizaNFs --> Decision2{NF tem operação?}
    
    Decision2 -->|Não - Cadastrada| BotaoCriar[Botão: Criar Operação]
    Decision2 -->|Sim - Com Operação| BotaoVer[Botão: Ver Operação]
    
    BotaoCriar --> CriaOp[Sistema cria operação<br/>baseada na NF]
    CriaOp --> RedirecionaOp[Redireciona para<br/>Detalhe da Operação]
    
    BotaoVer --> RedirecionaOp
    
    RedirecionaOp --> DetalheOp[Tela: Detalhe da Operação]
    
    DetalheOp --> VisualizaOp[Visualiza:<br/>- Dados da NF<br/>- Comparação de Financiadores<br/>- Histórico]
    
    VisualizaOp --> Decision3{Decisão do Sacado}
    
    Decision3 -->|Aprovar| AprovaOp[Clica em Aprovar]
    Decision3 -->|Rejeitar| RejeitaOp[Clica em Rejeitar]
    
    RejeitaOp --> ConfirmaRejeicao[Modal de confirmação]
    ConfirmaRejeicao --> OpRejeitada[Operação Rejeitada<br/>Status: Rejeitada]
    OpRejeitada --> FimRejeicao([Fim do fluxo])
    
    AprovaOp --> ConfirmaAprovacao[Modal de confirmação]
    ConfirmaAprovacao --> OpAprovada[Operação Aprovada<br/>Status: Aprovada pelo Sacado]
    
    OpAprovada --> ComparaFin[Visualiza comparação<br/>de financiadores]
    ComparaFin --> MenorTaxa[Sistema destaca<br/>menor taxa]
    
    MenorTaxa --> Decision4{Selecionar financiador?}
    
    Decision4 -->|Sim| SelecionaFin[Clica em Selecionar<br/>no financiador escolhido]
    Decision4 -->|Não| AguardaSelecao[Aguarda decisão]
    
    SelecionaFin --> FinSelecionado[Financiador selecionado<br/>Badge visual]
    
    FinSelecionado --> Decision5{Marcar como financiada?}
    
    Decision5 -->|Sim| MarcaFinanciada[Clica em<br/>Marcar como Financiada]
    Decision5 -->|Não| AguardaFinalizacao[Aguarda finalização]
    
    MarcaFinanciada --> ConfirmaFinanciada[Modal de confirmação<br/>com dados do financiador]
    ConfirmaFinanciada --> OpFinanciada[Operação Financiada<br/>Status: Financiada]
    
    OpFinanciada --> OpEncerrada[Operação Encerrada]
    OpEncerrada --> Fim([Fim do fluxo])
    
    VerOps --> DetalheOp
    Gerenciar --> Dashboard
    AguardaSelecao --> Decision4
    AguardaFinalizacao --> Decision5

    style Start fill:#e1f5e1
    style Fim fill:#ffe1e1
    style FimRejeicao fill:#ffe1e1
    style OpFinanciada fill:#c8e6c9
    style OpRejeitada fill:#ffcdd2
    style NFSalva fill:#fff9c4
    style OpAprovada fill:#b3e5fc
```

## Pontos de Decisão Principais

1. **Dashboard**: Ponto central de navegação
2. **Cadastro vs Visualização**: Sacado pode cadastrar nova NF ou ver NFs existentes
3. **Criar Operação**: Ação manual do Sacado na lista de NFs
4. **Aprovar/Rejeitar**: Decisão crítica de governança
5. **Selecionar Financiador**: Escolha entre propostas
6. **Marcar como Financiada**: Finalização do processo

## Estados da Operação

- **Cadastrada** (NF): Nota fiscal registrada, sem operação
- **Com Operação** (NF): Operação criada para a NF
- **Aguardando aprovação**: Operação criada, pendente decisão
- **Aprovada pelo Sacado**: Operação aprovada, aguardando seleção de financiador
- **Financiada**: Operação concluída
- **Rejeitada**: Operação não aprovada pelo Sacado
- **Encerrada**: Ciclo completo finalizado
