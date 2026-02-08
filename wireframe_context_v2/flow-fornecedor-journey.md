# Fluxo Completo - Jornada do Fornecedor

## Descrição
Fluxo end-to-end do fornecedor, desde o recebimento de acesso até a antecipação de recebíveis.

## Diagrama Mermaid

```mermaid
flowchart TD
    Start([Sacado habilita acesso<br/>do fornecedor]) --> Credenciais[Fornecedor recebe<br/>credenciais por email]
    
    Credenciais --> Login[Fornecedor faz login<br/>na plataforma]
    
    Login --> Dashboard[Dashboard Fornecedor]
    
    Dashboard --> Decision1{O que fazer?}
    
    Decision1 -->|Ver todos recebíveis| ListaRecebiveis[Tela: Recebíveis Disponíveis]
    Decision1 -->|Ver histórico| Historico[Tela: Histórico]
    Decision1 -->|Gerenciar perfil| Perfil[Tela: Meu Perfil]
    Decision1 -->|Gerenciar equipe| Equipe[Tela: Equipe]
    
    ListaRecebiveis --> VisualizaRecebiveis[Visualiza recebíveis<br/>de múltiplos sacados]
    
    VisualizaRecebiveis --> Decision2{Encontrou recebível<br/>para antecipar?}
    
    Decision2 -->|Não| UsaFiltros[Usa filtros:<br/>- Por sacado<br/>- Por status<br/>- Por busca]
    Decision2 -->|Sim| ClicaDetalhes[Clica em Ver Detalhes]
    
    UsaFiltros --> VisualizaRecebiveis
    
    ClicaDetalhes --> DetalheRecebivel[Tela: Detalhe do Recebível]
    
    DetalheRecebivel --> VisualizaDados[Visualiza:<br/>- Dados da NF<br/>- Informações do sacado<br/>- Opções de financiadores<br/>- Comparação de taxas]
    
    VisualizaDados --> Decision3{Status do recebível?}
    
    Decision3 -->|Disponível| ComparaFinanciadores[Compara taxas<br/>dos financiadores]
    Decision3 -->|Aguardando| VerStatus[Visualiza status<br/>da solicitação]
    Decision3 -->|Antecipada| VerHistorico[Visualiza dados<br/>da antecipação]
    
    ComparaFinanciadores --> MelhorTaxa[Sistema destaca<br/>melhor taxa automaticamente]
    
    MelhorTaxa --> Decision4{Deseja solicitar?}
    
    Decision4 -->|Não| VoltaLista[Volta para lista]
    Decision4 -->|Sim| SelecionaFinanciador[Seleciona financiador<br/>preferido]
    
    SelecionaFinanciador --> ConfirmaSolicitacao[Modal de confirmação<br/>com resumo]
    
    ConfirmaSolicitacao --> EnviaSolicitacao[Solicita antecipação]
    
    EnviaSolicitacao --> AguardaAprovacao[Status: Aguardando<br/>Aprovação do Sacado]
    
    AguardaAprovacao --> Decision5{Sacado aprovou?}
    
    Decision5 -->|Não| Rejeitada[Solicitação rejeitada]
    Decision5 -->|Sim| Aprovada[Solicitação aprovada]
    
    Aprovada --> Financiada[Operação financiada]
    
    Financiada --> AtualizaHistorico[Aparece no histórico<br/>de antecipações]
    
    AtualizaHistorico --> Fim([Fim do fluxo])
    
    Rejeitada --> FimRejeicao([Fim - Rejeitada])
    VoltaLista --> Dashboard
    VerStatus --> Dashboard
    VerHistorico --> Dashboard
    Historico --> Dashboard
    Perfil --> Dashboard
    Equipe --> Dashboard

    style Start fill:#e1f5e1
    style Financiada fill:#c8e6c9
    style Fim fill:#81c784
    style Rejeitada fill:#ffcdd2
    style FimRejeicao fill:#ef5350
    style MelhorTaxa fill:#fff59d
```

## Pontos de Decisão Principais

1. **Dashboard**: Ponto central de navegação do fornecedor
2. **Visualização Consolidada**: Fornecedor vê recebíveis de TODOS os sacados
3. **Comparação de Financiadores**: Escolha informada baseada em taxas
4. **Solicitação de Antecipação**: Ação do fornecedor, aprovação do sacado
5. **Acompanhamento**: Histórico completo de operações

## Estados do Recebível (Visão do Fornecedor)

- **Disponível para Antecipar**: Recebível pronto, fornecedor pode solicitar
- **Aguardando Aprovação**: Solicitação enviada, pendente decisão do sacado
- **Antecipada**: Operação finalizada, valor recebido

## Diferencial da Jornada

- **Multi-sacado**: Fornecedor vê recebíveis de todas as empresas em um só lugar
- **Autonomia**: Fornecedor pode solicitar antecipação diretamente
- **Transparência**: Comparação clara de taxas e valores
- **Rastreabilidade**: Histórico completo de todas as operações
- **Gestão de Equipe**: Fornecedor pode gerenciar permissões de seus funcionários
