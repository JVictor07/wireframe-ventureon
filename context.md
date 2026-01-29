# context.md

## Visão Geral do Projeto

Este projeto tem como único objetivo **validar visualmente e estruturalmente os wireframes (UI)** de uma plataforma SaaS de Risco Sacado / Supply Chain Finance, concorrente de Cashforce e Saxxes.

⚠️ **IMPORTANTE — LEIA COM ATENÇÃO**

Este projeto:
- ❌ NÃO possui backend  
- ❌ NÃO possui banco de dados  
- ❌ NÃO possui APIs  
- ❌ NÃO possui integrações  
- ❌ NÃO armazena dados  
- ❌ NÃO executa regras de negócio reais  
- ❌ NÃO faz cálculos financeiros reais  

👉 **ABSOLUTAMENTE TUDO é mockado, estático ou hardcoded.**

O foco é **APENAS UI**:
- estrutura de telas  
- hierarquia de informação  
- componentes  
- layout  
- clareza visual  

Nada além disso.

---

## Objetivo do Projeto

Criar **templates de tela (wireframes de alta fidelidade)** usando **React + shadcn/ui** para validar:

- se as telas fazem sentido para um CFO
- se o fluxo visual passa governança e controle
- se a hierarquia de informação é clara
- se o produto é compreensível sem explicação

❗ Este projeto **NÃO é um MVP funcional**.  
❗ Este projeto **NÃO será usado em produção**.  
❗ Este projeto **NÃO precisa ser escalável, performático ou seguro**.

---

## Escopo Técnico (Deliberadamente Limitado)

### O que ESTE projeto DEVE fazer
- Renderizar telas estáticas
- Usar componentes do shadcn/ui
- Usar dados mockados diretamente nos componentes
- Simular estados apenas visualmente (ex: badges, textos)
- Permitir navegação visual entre telas (ex: links, tabs)

### O que ESTE projeto NÃO DEVE fazer
- ❌ Criar API routes
- ❌ Usar fetch / axios
- ❌ Criar serviços
- ❌ Usar hooks de dados
- ❌ Simular autenticação real
- ❌ Criar lógica de permissão
- ❌ Criar estados complexos
- ❌ Implementar machine de estados
- ❌ Implementar cálculos reais

👉 **Se surgir qualquer dúvida: prefira UI estática.**

---

## Contexto de Negócio (Somente para entendimento visual)

A plataforma organiza operações de **Risco Sacado**, conectando:

- Sacado (empresa compradora)
- Fornecedor (sem login)
- Financiadores (sem login)

A plataforma **NÃO empresta dinheiro** e **NÃO assume risco financeiro**.

O principal cliente é o **Sacado (CFO / Finance / Contas a Pagar)**.

A dor principal é:
- governança
- controle
- rastreabilidade
- escalabilidade operacional
- paz de espírito

⚠️ Anticipação de recebíveis **NÃO é o foco** do produto.
Ela é apenas uma consequência do processo.

---

## Perfis de Usuário (Somente para UI)

### 1. Sacado
- Usuário principal das telas
- Toma decisões (aprovar / rejeitar)
- Precisa confiar no sistema

### 2. Admin (Operador interno)
- Usuário interno da plataforma
- Executa ações manuais
- Existe apenas para viabilizar o fluxo no MVP

⚠️ **Fornecedor e Financiador NÃO possuem telas próprias neste projeto.**

---

## Estados de Operação (APENAS VISUAIS)

Os estados abaixo existem **somente como labels visuais**, badges ou textos estáticos.
Eles **não controlam lógica** nem fluxo real.

- Nota cadastrada (pré-operação)
- Operação criada
- Aguardando aprovação do sacado
- Aprovada pelo sacado
- Aguardando seleção de financiador
- Pronta para financiamento
- Financiada (mock)
- Encerrada
- Rejeitada
- Cancelada

👉 Estados podem ser simulados com:
- tabs
- selects
- páginas diferentes
- hardcoded examples

---

## Regras IMPORTANTES para a IA / Windsurf

⚠️ **ESSAS REGRAS SÃO OBRIGATÓRIAS**

- Sempre usar **dados mockados inline**
- Nunca criar lógica condicional complexa
- Nunca criar integração fictícia
- Nunca criar backend “fake”
- Nunca tentar “resolver o negócio”
- Nunca tentar “simular o mundo real”

👉 O objetivo não é funcionar.  
👉 O objetivo é **PARECER certo visualmente**.

---

## Princípio Final

> Este projeto serve exclusivamente para validar UI, estrutura e fluxo visual.
> Qualquer coisa que não seja necessária para um wireframe NÃO deve ser construída.

---

## Diretrizes de Implementação (Baseadas no Dashboard Shadcn)

### Referência Visual
O projeto seguirá a estrutura e padrões do **dashboard-01** do Shadcn UI:
- URL: https://ui.shadcn.com/view/new-york-v4/dashboard-01
- Documentação: https://ui.shadcn.com/blocks

### Arquitetura de Componentes

#### 1. **Estrutura de Layout**
- **AppSidebar** (`app-sidebar.jsx`) - Sidebar colapsável com navegação
  - Header com logo/nome da empresa
  - Navegação principal (NavMain)
  - Seção de documentos/recursos (NavDocuments)
  - Navegação secundária (NavSecondary)
  - Footer com informações do usuário (NavUser)

- **SiteHeader** (`site-header.jsx`) - Header da aplicação
  - Breadcrumbs para navegação
  - Ações rápidas (botões, search, etc)

#### 2. **Componentes de Dados**

##### Cards de Métricas (`section-cards.jsx`)
- Grid responsivo de cards com métricas
- Estrutura de cada card:
  - Título/descrição da métrica
  - Valor principal (grande, tabular-nums)
  - Badge com tendência (TrendingUp/Down + %)
  - Footer com contexto adicional
- **Dados mockados inline** no componente
- Uso de `@container` queries para responsividade

##### Tabela de Dados (`data-table.jsx`)
- Tabela completa com funcionalidades visuais:
  - Ordenação de colunas (visual apenas)
  - Filtros e busca (UI apenas, sem lógica real)
  - Paginação (visual)
  - Seleção de linhas (checkboxes visuais)
  - Drag and drop para reordenação (usando @dnd-kit)
  - Dropdown de ações por linha
  - Sheet lateral para detalhes/edição
- **Dados vêm de arquivo JSON** (`src/app/dashboard/data.json`)
- Usa TanStack Table para estrutura (mas sem lógica complexa)

##### Gráficos (`chart-area-interactive.jsx`)
- Gráficos de área interativos usando Recharts
- Controles visuais (selects, toggles) para filtrar períodos
- **Dados hardcoded** no componente (array de objetos)
- ChartContainer do Shadcn para estilização consistente

#### 3. **Padrões de Dados Mockados**

```javascript
// ✅ CORRETO - Dados inline no componente
const mockData = [
  { id: 1, status: "Aprovada", valor: "R$ 50.000,00", ... },
  { id: 2, status: "Pendente", valor: "R$ 30.000,00", ... },
]

// ✅ CORRETO - Dados em arquivo JSON separado
// src/data/operacoes.json
[
  { "id": 1, "status": "Aprovada", ... }
]

// ❌ ERRADO - Não criar serviços ou APIs
const fetchData = async () => { ... }
```

#### 4. **Componentes UI do Shadcn Disponíveis**

Já instalados e prontos para uso:
- `Button`, `Badge`, `Card`, `Table`, `Tabs`
- `Select`, `Input`, `Checkbox`, `Label`
- `Dropdown Menu`, `Sheet`, `Drawer`, `Dialog`
- `Sidebar`, `Breadcrumb`, `Avatar`, `Skeleton`
- `Chart` (Recharts wrapper), `Tooltip`, `Separator`
- `Toggle`, `Toggle Group`

#### 5. **Padrões de Navegação**

```javascript
// ✅ Navegação visual com links âncora
const navItems = [
  { title: "Dashboard", url: "#", icon: LayoutDashboardIcon },
  { title: "Operações", url: "#", icon: ListIcon },
]

// ✅ Tabs para alternar visualizações
<Tabs defaultValue="todas">
  <TabsList>
    <TabsTrigger value="todas">Todas</TabsTrigger>
    <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
  </TabsList>
</Tabs>
```

#### 6. **Estados Visuais com Badges**

```javascript
// ✅ Estados como badges visuais
const statusBadge = {
  "Aprovada": <Badge variant="success">Aprovada</Badge>,
  "Pendente": <Badge variant="warning">Pendente</Badge>,
  "Rejeitada": <Badge variant="destructive">Rejeitada</Badge>,
}
```

### Regras de Implementação Específicas

#### ✅ SEMPRE FAZER:
1. Usar componentes do Shadcn UI instalados
2. Dados mockados inline ou em arquivos `.json`
3. Estrutura de pastas clara:
   - `/src/components/` - Componentes reutilizáveis
   - `/src/components/ui/` - Componentes Shadcn
   - `/src/data/` - Arquivos JSON com dados mock
   - `/src/pages/` ou `/src/app/` - Páginas/telas
4. Usar ícones do Lucide React
5. Manter responsividade com Tailwind classes
6. Usar `@container` queries quando apropriado
7. Seguir padrão de nomenclatura do Shadcn (kebab-case para arquivos)

#### ❌ NUNCA FAZER:
1. Criar hooks customizados complexos (exceto `use-mobile` que já existe)
2. Implementar lógica de negócio real
3. Criar context providers para estado global
4. Usar bibliotecas de gerenciamento de estado (Redux, Zustand, etc)
5. Implementar validação de formulários real (apenas UI)
6. Criar funções de cálculo financeiro
7. Simular chamadas de API com setTimeout/Promise

### Estrutura de Arquivos Esperada

```
src/
├── components/
│   ├── ui/                    # Componentes Shadcn (já instalados)
│   ├── app-sidebar.jsx        # Sidebar principal
│   ├── nav-main.jsx           # Navegação principal
│   ├── nav-documents.jsx      # Navegação de documentos
│   ├── nav-secondary.jsx      # Navegação secundária
│   ├── nav-user.jsx           # Componente de usuário
│   ├── site-header.jsx        # Header do site
│   ├── section-cards.jsx      # Cards de métricas
│   ├── data-table.jsx         # Tabela de dados
│   └── chart-area-interactive.jsx  # Gráficos
├── data/
│   └── *.json                 # Dados mockados
├── hooks/
│   └── use-mobile.jsx         # Hook de detecção mobile (já existe)
├── lib/
│   └── utils.js               # Utilitários (cn helper)
├── App.jsx                    # App principal
└── main.jsx                   # Entry point
```

### Exemplo de Implementação de Tela

```javascript
// src/pages/DashboardSacado.jsx
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SectionCards } from "@/components/section-cards"
import { DataTable } from "@/components/data-table"
import { SidebarProvider } from "@/components/ui/sidebar"

export function DashboardSacado() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SiteHeader />
        <div className="p-6">
          <SectionCards />
          <DataTable />
        </div>
      </main>
    </SidebarProvider>
  )
}
```

### Princípios de Design

1. **Hierarquia Visual Clara** - Métricas importantes em destaque
2. **Densidade de Informação Balanceada** - Não sobrecarregar
3. **Feedback Visual Imediato** - Badges, cores, ícones
4. **Consistência** - Seguir padrões do Shadcn
5. **Acessibilidade** - Componentes Shadcn já são acessíveis
6. **Responsividade** - Mobile-first com Tailwind

---

## Resumo Executivo para IA

**Ao implementar telas:**
1. Copie a estrutura do dashboard-01 do Shadcn
2. Adapte os dados mockados para o contexto de Risco Sacado
3. Use os componentes já instalados
4. Mantenha tudo estático e visual
5. Foque em clareza e governança (CFO mindset)
6. Nunca implemente lógica real
