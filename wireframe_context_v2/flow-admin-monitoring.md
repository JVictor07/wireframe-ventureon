# Fluxo - Admin: Monitoramento e Impersonação

## Descrição
Fluxo do Admin (Ventureon) para monitoramento global da plataforma e suporte aos clientes através de impersonação.

## Diagrama Mermaid

```mermaid
flowchart TD
    Start([Admin faz login]) --> DashboardAdmin[Dashboard Admin<br/>Ventureon]
    
    DashboardAdmin --> VisualizaGlobal[Visualiza métricas globais:<br/>- Total de operações<br/>- Operações por status<br/>- Clientes ativos]
    
    VisualizaGlobal --> TabelaOps[Tabela de todas<br/>as operações da plataforma]
    
    TabelaOps --> FiltrosOps{Usar filtros?}
    
    FiltrosOps -->|Sim| AplicaFiltros[Filtra por:<br/>- Cliente<br/>- Status<br/>- Data<br/>- Fornecedor]
    FiltrosOps -->|Não| VisualizaTodas[Visualiza todas]
    
    AplicaFiltros --> VisualizaTodas
    
    VisualizaTodas --> Decision1{Próxima ação?}
    
    Decision1 -->|Ver detalhe de operação| VerOpAdmin[Clica em Visualizar<br/>na operação]
    Decision1 -->|Gerenciar clientes| GerenciarClientes[Acessa Gestão<br/>de Clientes]
    Decision1 -->|Continuar monitorando| DashboardAdmin
    
    VerOpAdmin --> DetalheOpAdmin[Tela: Detalhe da Operação<br/>Modo: SOMENTE LEITURA]
    
    DetalheOpAdmin --> VisualizaDados[Visualiza:<br/>- Dados da NF<br/>- Cliente<br/>- Fornecedor<br/>- Status<br/>- Histórico completo]
    
    VisualizaDados --> SemAcoes[Sem ações operacionais<br/>disponíveis]
    
    SemAcoes --> VoltaDash1[Volta ao Dashboard]
    VoltaDash1 --> DashboardAdmin
    
    GerenciarClientes --> TabelaClientes[Tela: Gestão de Clientes<br/>Tabela de Clientes]
    
    TabelaClientes --> AcoesCliente{Ação desejada?}
    
    AcoesCliente -->|Criar novo cliente| CriarCliente[Clica em<br/>Criar Cliente]
    AcoesCliente -->|Editar cliente| EditarCliente[Clica em Editar<br/>no cliente]
    AcoesCliente -->|Impersonar| Impersonar[Clica em Acessar<br/>Impersonar]
    AcoesCliente -->|Voltar| DashboardAdmin
    
    CriarCliente --> ModalCriar[Modal: Criar Cliente<br/>Formulário organizado em seções]
    ModalCriar --> PreencheDados1[Seção 1 - Dados da Empresa:<br/>- Razão Social<br/>- CNPJ<br/>- Nome do Programa<br/>- Prazo Médio]
    PreencheDados1 --> PreencheDados2[Seção 2 - Acesso:<br/>- E-mail de Acesso<br/>- Nome do Administrador<br/>Aviso: Senha enviada por e-mail]
    PreencheDados2 --> PreencheDados3[Seção 3 - Contato:<br/>- Telefone<br/>- Status Ativo/Inativo]
    PreencheDados3 --> SalvaCliente[Clica em Salvar]
    SalvaCliente --> ClienteCriado[Cliente criado<br/>Senha gerada automaticamente<br/>Toast de sucesso]
    ClienteCriado --> TabelaClientes
    
    EditarCliente --> ModalEditar[Modal: Editar Cliente<br/>Dados preenchidos]
    ModalEditar --> AlteraDados[Altera informações<br/>necessárias]
    AlteraDados --> SalvaEdicao[Clica em Salvar]
    SalvaEdicao --> ClienteAtualizado[Cliente atualizado<br/>Toast de sucesso]
    ClienteAtualizado --> TabelaClientes
    
    Impersonar --> ToastImpersona[Toast: Acessando como<br/>Nome do Cliente]
    ToastImpersona --> RedirecionaSacado[Redireciona para<br/>Dashboard do Sacado]
    
    RedirecionaSacado --> DashboardSacado[Dashboard Sacado<br/>Visão do cliente]
    
    DashboardSacado --> NavegacaoSacado[Admin navega como<br/>se fosse o cliente]
    
    NavegacaoSacado --> AcessoCompleto[Acesso completo a:<br/>- Notas Fiscais<br/>- Operações<br/>- Fornecedores<br/>- Financiadores<br/>- Configurações]
    
    AcessoCompleto --> Decision2{Finalizar<br/>impersonação?}
    
    Decision2 -->|Não| NavegacaoSacado
    Decision2 -->|Sim| VoltaAdmin[Volta para contexto<br/>Admin]
    
    VoltaAdmin --> DashboardAdmin

    style Start fill:#e1f5e1
    style DashboardAdmin fill:#e3f2fd
    style DetalheOpAdmin fill:#fff9c4
    style SemAcoes fill:#ffecb3
    style DashboardSacado fill:#f3e5f5
    style ToastImpersona fill:#ce93d8
    style ClienteCriado fill:#c8e6c9
    style ClienteAtualizado fill:#c8e6c9
```

## Responsabilidades do Admin

### 1. Monitoramento Global
- **Visualização**: Acesso a todas as operações da plataforma
- **Métricas**: Dashboard com indicadores agregados
- **Filtros**: Capacidade de filtrar por cliente, status, data
- **Somente leitura**: Não pode modificar operações

### 2. Gestão de Clientes
- **Criar**: Cadastrar novos clientes (Sacados)
- **Editar**: Atualizar informações dos clientes
- **Ativar/Desativar**: Gerenciar status dos clientes
- **Visualizar**: Ver lista completa de clientes

### 3. Impersonação (Suporte)
- **Acesso como cliente**: Navegar na interface do Sacado
- **Diagnóstico**: Identificar problemas reportados
- **Suporte**: Auxiliar clientes com dúvidas
- **Sem modificações**: Não pode executar ações operacionais

## Limitações do Admin

### ❌ O que Admin NÃO pode fazer:
- Criar notas fiscais
- Criar operações
- Aprovar ou rejeitar operações
- Selecionar financiadores
- Marcar operações como financiadas
- Cadastrar fornecedores ou financiadores
- Modificar configurações do programa do cliente

### ✅ O que Admin PODE fazer:
- Visualizar todas as operações (somente leitura)
- Criar e gerenciar clientes (Sacados)
- Impersonar clientes para suporte
- Monitorar métricas globais
- Filtrar e buscar operações

## Fluxo de Impersonação

1. Admin acessa "Gestão de Clientes"
2. Identifica cliente que precisa de suporte
3. Clica em "Acessar" (Impersonar)
4. Toast confirma: "Acessando como [Nome do Cliente]"
5. Redireciona para Dashboard do Sacado
6. Admin navega como se fosse o cliente
7. Pode visualizar todas as telas do cliente
8. Não pode executar ações operacionais
9. Finaliza impersonação voltando ao contexto Admin

## Casos de Uso

### Caso 1: Monitoramento de Operações
- Admin verifica operações pendentes
- Identifica gargalos no processo
- Analisa métricas de aprovação
- Não interfere nas operações

### Caso 2: Suporte ao Cliente
- Cliente reporta problema na interface
- Admin impersona o cliente
- Navega pelas telas para reproduzir o problema
- Identifica a causa e orienta o cliente

### Caso 3: Onboarding de Novo Cliente (Detalhado)

#### Passo 1: Criação do Cliente
- Admin acessa "Gestão de Clientes"
- Clica em "Criar Cliente"
- Modal abre com formulário organizado em 3 seções

#### Passo 2: Preenchimento dos Dados

**Seção 1 - Dados da Empresa:**
- Razão Social (obrigatório)
- CNPJ (obrigatório)
- Nome do Programa (obrigatório)
- Prazo Médio de Pagamento (opcional)

**Seção 2 - Acesso à Plataforma:**
- E-mail de Acesso (obrigatório) - Será usado para login
- Nome do Administrador (obrigatório) - Pessoa responsável
- Aviso: "Senha inicial será enviada automaticamente para o e-mail cadastrado"

**Seção 3 - Contato:**
- Telefone (opcional)
- Status: Ativo/Inativo (obrigatório)

#### Passo 3: Criação e Configuração Automática
- Admin clica em "Criar Cliente"
- Sistema cria cliente no banco (mock)
- Senha inicial é gerada automaticamente
- E-mail com credenciais é enviado (mock)
- Toast confirma: "Cliente criado com sucesso!"

#### Passo 4: Primeiro Acesso do Cliente
- Cliente recebe e-mail com:
  - Link de acesso à plataforma
  - E-mail de login
  - Senha temporária
- Cliente acessa a plataforma
- Faz login com credenciais recebidas
- (Futuro) Sistema solicita troca de senha no primeiro acesso

#### Passo 5: Configuração Inicial pelo Cliente
Após primeiro login, cliente pode:
- Configurar dados da empresa (Minha Empresa)
- Adicionar membros da equipe (Equipe)
- Cadastrar fornecedores
- Cadastrar financiadores
- Configurar programa de risco sacado
- Começar a cadastrar notas fiscais

## Comportamento Visual

- **Dashboard Admin**: Tema diferenciado do Sacado
- **Badge "Admin"**: Identificação visual do contexto
- **Toast de impersonação**: Confirma mudança de contexto
- **Botões desabilitados**: Em modo impersonação, ações operacionais ficam visualmente desabilitadas
- **Indicador de contexto**: Mostra quando está impersonando
