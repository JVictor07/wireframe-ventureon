# JTBD: Comparar Opções de Financiamento de Forma Inteligente

## Job Statement
**Quando** preciso escolher um financiador para minha operação,  
**Eu quero** comparar todas as opções disponíveis de forma clara e objetiva,  
**Para que** eu possa selecionar a melhor alternativa e minimizar custos financeiros.

## Contexto do Job
- **Persona**: CFO ou Gerente Financeiro de empresa Sacado
- **Situação**: Operação aprovada, precisa escolher financiador
- **Frequência**: A cada operação criada
- **Importância**: Crítica - impacta diretamente o custo da operação

## Diagrama Mermaid - Fluxo JTBD

```mermaid
flowchart TD
    Start([Necessidade:<br/>Escolher melhor financiador]) --> Situacao[Situação:<br/>Operação aprovada<br/>Múltiplas opções disponíveis]
    
    Situacao --> Objetivo[Objetivo:<br/>Minimizar custo<br/>Maximizar valor líquido]
    
    Objetivo --> AcessaComparacao[Acessa tela de<br/>comparação de financiadores]
    
    AcessaComparacao --> VisualizaTabela[Visualiza tabela<br/>comparativa]
    
    VisualizaTabela --> ElementosTabela[Elementos visíveis:<br/>- Nome do financiador<br/>- Taxa mensal (%)<br/>- Valor líquido<br/>- Prazo]
    
    ElementosTabela --> SistemaDestaca[Sistema destaca<br/>MENOR TAXA<br/>automaticamente]
    
    SistemaDestaca --> Decision1{Como analisar?}
    
    Decision1 -->|Análise rápida| VerDestaque[Foca no financiador<br/>destacado pelo sistema]
    Decision1 -->|Análise detalhada| ComparaTodos[Compara todos<br/>os financiadores]
    
    VerDestaque --> VerificaMenorTaxa[Verifica:<br/>É realmente a menor taxa?]
    ComparaTodos --> VerificaMenorTaxa
    
    VerificaMenorTaxa --> CalculaMental[Calcula mentalmente<br/>ou usa calculadora]
    
    CalculaMental --> Decision2{Precisa de<br/>mais informações?}
    
    Decision2 -->|Sim| BuscaDetalhes[Busca detalhes:<br/>- Histórico com financiador<br/>- Reputação<br/>- Condições especiais]
    Decision2 -->|Não| TemConfianca[Tem confiança<br/>na decisão]
    
    BuscaDetalhes --> Decision3{Informações<br/>disponíveis?}
    
    Decision3 -->|Não| Frustracao1[Frustração:<br/>Falta de contexto]
    Decision3 -->|Sim| TemConfianca
    
    Frustracao1 --> DecisaoSemContexto[Decide baseado<br/>apenas em taxa]
    
    DecisaoSemContexto --> TemConfianca
    
    TemConfianca --> Criterios{Critério final?}
    
    Criterios -->|Menor taxa| SelecionaMenorTaxa[Seleciona financiador<br/>com menor taxa]
    Criterios -->|Relacionamento| SelecionaConhecido[Seleciona financiador<br/>conhecido]
    Criterios -->|Equilibrio| SelecionaEquilibrio[Seleciona melhor<br/>custo-benefício]
    
    SelecionaMenorTaxa --> ConfirmaSelecao[Clica em Selecionar<br/>no financiador escolhido]
    SelecionaConhecido --> ConfirmaSelecao
    SelecionaEquilibrio --> ConfirmaSelecao
    
    ConfirmaSelecao --> FeedbackVisual[Feedback visual:<br/>Badge "Selecionado"]
    
    FeedbackVisual --> ProximoPasso[Próximo passo:<br/>Marcar como financiada]
    
    ProximoPasso --> ResultadoEsperado[Resultado alcançado:<br/>✓ Melhor opção escolhida<br/>✓ Custo minimizado<br/>✓ Decisão informada]
    
    ResultadoEsperado --> MedeSucesso{Job bem-sucedido?}
    
    MedeSucesso -->|Sim| Satisfacao[Satisfação:<br/>- Comparação clara<br/>- Decisão rápida<br/>- Confiança na escolha]
    MedeSucesso -->|Não| Frustracoes[Frustrações:<br/>- Falta de contexto<br/>- Dúvidas sobre diferenças<br/>- Incerteza na decisão]
    
    Satisfacao --> FimPositivo([Job concluído<br/>com sucesso])
    Frustracoes --> Melhorias[Oportunidades:<br/>- Mais informações<br/>- Histórico de operações<br/>- Recomendações]
    Melhorias --> FimPositivo

    style Start fill:#e1f5e1
    style SistemaDestaca fill:#fff59d
    style ResultadoEsperado fill:#c8e6c9
    style Satisfacao fill:#a5d6a7
    style FimPositivo fill:#81c784
    style Frustracao1 fill:#ffcdd2
    style Frustracoes fill:#ffcdd2
```

## Critérios de Sucesso do Job

### Funcionais (O que precisa acontecer)
1. ✅ **Clareza**: Ver todas as opções em uma única tela
2. ✅ **Destaque**: Sistema identifica automaticamente a menor taxa
3. ✅ **Cálculo**: Valor líquido calculado automaticamente
4. ✅ **Comparação**: Fácil comparar taxas e valores lado a lado
5. ✅ **Seleção**: Escolher financiador em um clique

### Emocionais (Como o usuário quer se sentir)
1. 💡 **Informado**: Ter todos os dados necessários para decidir
2. 🎯 **Confiante**: Sentir que está fazendo a melhor escolha
3. ⚡ **Eficiente**: Não perder tempo analisando dados complexos
4. 🧠 **Inteligente**: Tomar decisão baseada em dados objetivos
5. 😌 **Tranquilo**: Sem arrependimento posterior

### Sociais (Como quer ser percebido)
1. 📊 **Analítico**: Demonstrar capacidade de análise financeira
2. 💰 **Econômico**: Mostrar que busca sempre o melhor custo
3. 🎓 **Competente**: Evidenciar conhecimento financeiro
4. ⚖️ **Equilibrado**: Balancear custo e outros fatores

## Obstáculos e Soluções

### Obstáculo 1: Dificuldade em identificar melhor opção
**Solução na plataforma:**
- Destaque automático da menor taxa com badge visual
- Ordenação por taxa (menor para maior)
- Cores diferenciadas para facilitar visualização

### Obstáculo 2: Falta de contexto sobre financiadores
**Solução atual:**
- Nome e tipo do financiador visíveis
**Melhoria futura:**
- Histórico de operações com cada financiador
- Rating e avaliações
- Tempo médio de liberação

### Obstáculo 3: Cálculos complexos
**Solução na plataforma:**
- Valor líquido calculado automaticamente
- Exibição clara de taxa mensal
- Sem necessidade de calculadora externa

### Obstáculo 4: Muitas opções causam paralisia
**Solução na plataforma:**
- Destaque da melhor opção
- Máximo de 5-7 financiadores por operação
- Informações essenciais apenas

### Obstáculo 5: Incerteza sobre diferenças reais
**Solução atual:**
- Comparação lado a lado
**Melhoria futura:**
- Simulador de economia
- Comparação com operações anteriores
- Recomendação baseada em perfil

## Métricas de Sucesso do Job

### Métricas de Eficiência
- ⏱️ **Tempo médio para selecionar**: < 3 minutos
- 📊 **Taxa de seleção da menor taxa**: > 70%
- 🔄 **Taxa de mudança de seleção**: < 10%

### Métricas de Satisfação
- ⭐ **Satisfação com comparação**: > 4.5/5
- 💡 **Clareza das informações**: > 4.5/5
- 🎯 **Confiança na decisão**: > 4/5

### Métricas de Impacto
- 💰 **Economia média por operação**: Mensurável
- 📈 **Uso do destaque automático**: > 60%
- ✅ **Taxa de conclusão após comparação**: > 90%

## Informações Necessárias para o Job

### Essenciais (Já disponíveis)
1. ✅ Nome do financiador
2. ✅ Taxa mensal (%)
3. ✅ Valor líquido estimado
4. ✅ Tipo de instituição

### Importantes (Futuro próximo)
1. 🔜 Prazo de liberação
2. 🔜 Histórico de operações anteriores
3. 🔜 Avaliação/rating
4. 🔜 Condições especiais

### Desejáveis (Longo prazo)
1. 💭 Reputação no mercado
2. 💭 Tempo médio de aprovação
3. 💭 Flexibilidade de negociação
4. 💭 Suporte ao cliente

## Alternativas Competitivas

### Antes da plataforma
1. ❌ Contato individual com cada banco
2. ❌ Planilha manual de comparação
3. ❌ Decisão baseada em relacionamento apenas
4. ❌ Falta de visibilidade de todas as opções

### Outras soluções
1. 🏦 Bancos: Sem comparação, apenas uma opção
2. 📊 Consultoria: Lento e caro
3. 💼 Broker: Comissões adicionais

### Vantagem da plataforma
- ✅ Comparação instantânea
- ✅ Destaque automático da melhor opção
- ✅ Cálculos automáticos
- ✅ Sem custo adicional
- ✅ Transparência total

## Evolução do Job

### MVP (Atual)
- Tabela comparativa
- Destaque da menor taxa
- Cálculo de valor líquido
- Seleção simples

### Futuro Próximo
- Histórico com cada financiador
- Recomendação personalizada
- Simulador de economia
- Filtros e ordenação avançada

### Visão de Longo Prazo
- IA para sugestão baseada em perfil
- Negociação automática de taxas
- Marketplace dinâmico
- Leilão reverso de taxas
