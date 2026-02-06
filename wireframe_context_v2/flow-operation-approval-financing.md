# Fluxo - Aprovação e Financiamento de Operação

## Descrição
Fluxo detalhado do processo de aprovação da operação, seleção de financiador e finalização pelo Sacado.

## Diagrama Mermaid

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Detalhe da Operação]) --> VisualizaOp[Visualiza informações:<br/>- Dados da NF<br/>- Fornecedor<br/>- Valor e Vencimento]
    
    VisualizaOp --> VerificaStatus{Status da<br/>Operação?}
    
    VerificaStatus -->|Aguardando aprovação| AcoesDisponiveis[Ações disponíveis:<br/>- Aprovar<br/>- Rejeitar]
    VerificaStatus -->|Aprovada| AcoesFinanciador[Ações disponíveis:<br/>- Selecionar Financiador<br/>- Marcar como Financiada]
    VerificaStatus -->|Financiada/Encerrada| SomenteVisualizacao[Somente leitura<br/>Sem ações disponíveis]
    
    AcoesDisponiveis --> Decision1{Decisão do Sacado}
    
    Decision1 -->|Aprovar| ClicaAprovar[Clica em Aprovar]
    Decision1 -->|Rejeitar| ClicaRejeitar[Clica em Rejeitar]
    
    ClicaRejeitar --> ModalRejeicao[Modal de Confirmação:<br/>Rejeitar Operação?]
    ModalRejeicao --> Decision2{Confirma rejeição?}
    
    Decision2 -->|Não| VisualizaOp
    Decision2 -->|Sim| OpRejeitada[Operação Rejeitada<br/>Status: Rejeitada]
    OpRejeitada --> HistoricoRej[Adiciona evento<br/>ao histórico]
    HistoricoRej --> FimRejeicao([Fim - Operação<br/>não prossegue])
    
    ClicaAprovar --> ModalAprovacao[Modal de Confirmação:<br/>Aprovar Operação?]
    ModalAprovacao --> Decision3{Confirma aprovação?}
    
    Decision3 -->|Não| VisualizaOp
    Decision3 -->|Sim| OpAprovada[Operação Aprovada<br/>Status: Aprovada pelo Sacado]
    
    OpAprovada --> HistoricoApr[Adiciona evento<br/>ao histórico]
    HistoricoApr --> ExibeFinanciadores[Exibe seção:<br/>Comparação de Financiadores]
    
    ExibeFinanciadores --> TabelaFin[Tabela com:<br/>- Nome<br/>- Taxa (%)<br/>- Valor líquido estimado]
    
    TabelaFin --> DestaqueMenor[Sistema destaca<br/>MENOR TAXA<br/>com badge visual]
    
    DestaqueMenor --> AnaliseFin[Sacado analisa<br/>propostas]
    
    AnaliseFin --> Decision4{Selecionar<br/>financiador?}
    
    Decision4 -->|Não, aguardar| AguardaDecisao[Aguarda decisão]
    Decision4 -->|Sim| SelecionaFin[Clica em Selecionar<br/>no financiador escolhido]
    
    AguardaDecisao --> AnaliseFin
    
    SelecionaFin --> FinSelecionado[Financiador selecionado<br/>Badge: Selecionado]
    FinSelecionado --> HistoricoSel[Adiciona evento<br/>ao histórico]
    
    HistoricoSel --> BotaoFinanciar[Botão habilitado:<br/>Marcar como Financiada]
    
    BotaoFinanciar --> Decision5{Marcar como<br/>financiada?}
    
    Decision5 -->|Não, aguardar| AguardaFinalizacao[Aguarda finalização]
    Decision5 -->|Sim| ClicaFinanciar[Clica em<br/>Marcar como Financiada]
    
    AguardaFinalizacao --> BotaoFinanciar
    
    ClicaFinanciar --> ModalFinanciar[Modal de Confirmação:<br/>Exibe dados do financiador<br/>e valor da operação]
    
    ModalFinanciar --> Decision6{Confirma<br/>financiamento?}
    
    Decision6 -->|Não| BotaoFinanciar
    Decision6 -->|Sim| OpFinanciada[Operação Financiada<br/>Status: Financiada]
    
    OpFinanciada --> HistoricoFin[Adiciona evento<br/>ao histórico]
    HistoricoFin --> OpEncerrada[Operação Encerrada<br/>Ciclo completo]
    
    OpEncerrada --> SomenteVisualizacao
    SomenteVisualizacao --> Fim([Fim do fluxo])
    
    AcoesFinanciador --> ExibeFinanciadores

    style Start fill:#e1f5e1
    style OpAprovada fill:#b3e5fc
    style OpRejeitada fill:#ffcdd2
    style OpFinanciada fill:#c8e6c9
    style OpEncerrada fill:#a5d6a7
    style FimRejeicao fill:#ffe1e1
    style Fim fill:#e1f5e1
    style DestaqueMenor fill:#fff59d
```

## Fases do Fluxo

### Fase 1: Visualização Inicial
- Sacado acessa detalhe da operação
- Visualiza dados completos da NF
- Verifica status atual da operação

### Fase 2: Decisão de Aprovação
- **Aprovar**: Operação prossegue para seleção de financiador
- **Rejeitar**: Operação é encerrada sem financiamento
- Modal de confirmação em ambos os casos

### Fase 3: Comparação de Financiadores
- Sistema exibe tabela comparativa
- Destaque automático da menor taxa
- Sacado analisa propostas
- Valores líquidos estimados para cada opção

### Fase 4: Seleção de Financiador
- Sacado escolhe financiador desejado
- Badge visual indica seleção
- Histórico registra a escolha
- Botão "Marcar como Financiada" é habilitado

### Fase 5: Finalização
- Sacado marca operação como financiada
- Modal final confirma dados
- Operação entra em status "Financiada"
- Ciclo é encerrado

## Estados da Operação

1. **Aguardando aprovação**: Criada, pendente decisão
2. **Aprovada pelo Sacado**: Aprovada, aguardando seleção de financiador
3. **Rejeitada**: Não aprovada, encerrada
4. **Financiada**: Financiador selecionado, operação concluída
5. **Encerrada**: Ciclo completo finalizado

## Histórico de Eventos

Cada ação importante é registrada no histórico:
- Data e hora da ação
- Tipo de evento (Aprovação, Rejeição, Seleção, Financiamento)
- Usuário responsável
- Detalhes relevantes

## Validações

- **Aprovação**: Requer confirmação em modal
- **Rejeição**: Requer confirmação em modal
- **Seleção de financiador**: Apenas após aprovação
- **Marcar como financiada**: Apenas após selecionar financiador
- **Operações finalizadas**: Somente leitura

## Comportamento Visual

- **Badges de status**: Cores diferentes para cada estado
- **Destaque de menor taxa**: Badge amarelo/dourado
- **Financiador selecionado**: Badge verde "Selecionado"
- **Modais de confirmação**: Para todas as ações críticas
- **Histórico em timeline**: Ordem cronológica reversa
- **Botões contextuais**: Aparecem conforme o estado
