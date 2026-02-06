# Jobs to be Done - Plataforma Ventureon

## Sobre Jobs to be Done (JTBD)

Jobs to be Done é um framework que foca nas necessidades e objetivos dos usuários, não apenas nas funcionalidades do produto. Cada "job" representa uma tarefa que o usuário está tentando realizar em um contexto específico.

## Estrutura dos Fluxogramas JTBD

Cada arquivo nesta pasta documenta um Job específico com:

1. **Job Statement**: Declaração clara do objetivo do usuário
2. **Contexto**: Persona, situação, frequência e importância
3. **Fluxograma Mermaid**: Visualização completa do fluxo
4. **Critérios de Sucesso**: Funcionais, emocionais e sociais
5. **Obstáculos e Soluções**: Problemas e como a plataforma resolve
6. **Métricas de Sucesso**: Como medir se o job foi bem-sucedido
7. **Alternativas Competitivas**: Como usuários faziam antes
8. **Evolução**: MVP atual, futuro próximo e visão de longo prazo

## Jobs Documentados

### Para Sacado (Cliente)

#### 1. Antecipar Recebíveis com Segurança e Transparência
**Arquivo:** `jtbd-antecipar-recebiveis.md`

**Job Statement:** Quando tenho notas fiscais a receber, eu quero antecipar esses recebíveis de forma rápida e transparente, para que eu possa melhorar meu fluxo de caixa.

**Principais Critérios:**
- Velocidade: < 5 minutos para criar operação
- Transparência: Conhecer custo total antes de aprovar
- Controle: Poder aprovar ou rejeitar a qualquer momento

---

#### 2. Comparar Opções de Financiamento de Forma Inteligente
**Arquivo:** `jtbd-comparar-opcoes-financiamento.md`

**Job Statement:** Quando preciso escolher um financiador, eu quero comparar todas as opções de forma clara e objetiva, para que eu possa selecionar a melhor alternativa.

**Principais Critérios:**
- Clareza: Ver todas as opções em uma única tela
- Destaque: Sistema identifica automaticamente a menor taxa
- Comparação: Fácil comparar taxas e valores lado a lado

---

#### 3. Gerenciar Fornecedores de Forma Centralizada
**Arquivo:** `jtbd-gerenciar-fornecedores.md`

**Job Statement:** Quando preciso organizar meu cadastro de fornecedores, eu quero ter uma base centralizada e fácil de gerenciar, para que eu possa criar operações rapidamente.

**Principais Critérios:**
- Rapidez: Cadastrar fornecedor em < 2 minutos
- Busca: Encontrar fornecedor existente rapidamente
- Validação: CNPJ validado automaticamente

---

#### 4. Começar a Usar a Plataforma Rapidamente
**Arquivo:** `jtbd-onboarding-rapido.md`

**Job Statement:** Quando recebo acesso pela primeira vez, eu quero entender rapidamente como funciona, para que eu possa começar a operar sem perder tempo.

**Principais Critérios:**
- Login: Acessar com credenciais recebidas
- Orientação: Entender o que fazer primeiro
- Primeira operação: Criar e concluir em < 30 minutos

---

#### 5. Rastrear Status de Operações em Andamento
**Arquivo:** `jtbd-rastrear-status-operacao.md`

**Job Statement:** Quando tenho operações em andamento, eu quero acompanhar o status e histórico facilmente, para que eu possa ter controle sobre o processo.

**Principais Critérios:**
- Visão geral: Ver resumo de todas as operações
- Histórico: Rastrear todos os eventos
- Status claro: Entender em que estágio cada operação está

---

### Para Admin (Ventureon)

#### 6. Monitorar Operações de Clientes Eficientemente
**Arquivo:** `jtbd-monitorar-operacoes-admin.md`

**Job Statement:** Quando preciso acompanhar operações de todos os clientes, eu quero ter visibilidade global e ferramentas de suporte eficientes, para que eu possa garantir o bom funcionamento da plataforma.

**Principais Critérios:**
- Visibilidade: Ver todas as operações em uma tela
- Filtros: Localizar operações específicas rapidamente
- Impersonação: Navegar como cliente para diagnóstico

---

## Como Usar Estes Fluxogramas

### Para Designers
- Use os critérios emocionais e sociais para guiar decisões de UX
- Identifique pontos de fricção nos fluxos
- Priorize soluções que atendam múltiplos critérios

### Para Desenvolvedores
- Entenda o contexto por trás de cada funcionalidade
- Priorize implementações que resolvam obstáculos críticos
- Use as métricas para validar implementações

### Para Product Managers
- Use os jobs para priorizar roadmap
- Identifique gaps entre MVP atual e futuro próximo
- Valide se novas features atendem jobs reais

### Para Stakeholders
- Entenda o valor entregue aos usuários
- Veja como a plataforma resolve problemas reais
- Acompanhe evolução através das métricas

---

## Metodologia JTBD

### Estrutura de um Job Statement

```
Quando [situação/contexto],
Eu quero [motivação/objetivo],
Para que [resultado esperado/benefício].
```

### Tipos de Critérios de Sucesso

1. **Funcionais**: O que precisa acontecer tecnicamente
2. **Emocionais**: Como o usuário quer se sentir
3. **Sociais**: Como quer ser percebido por outros

### Evolução dos Jobs

Cada job documenta 3 estágios:
1. **MVP (Atual)**: O que está implementado hoje
2. **Futuro Próximo**: Próximas melhorias (3-6 meses)
3. **Visão de Longo Prazo**: Visão ideal (1-2 anos)

---

## Importação em Ferramentas

Todos os fluxogramas usam **Mermaid** e podem ser importados em:

- **Mermaid Live Editor**: https://mermaid.live
- **GitHub/GitLab**: Renderização automática
- **Notion**: Suporte nativo a Mermaid
- **Draw.io**: Import → Mermaid
- **Confluence**: Plugin Mermaid

---

## Próximos Jobs a Documentar

### Sacado
- [ ] Configurar programa de risco sacado
- [ ] Gerenciar equipe e permissões
- [ ] Exportar relatórios financeiros
- [ ] Negociar taxas com financiadores

### Admin
- [ ] Cadastrar novos clientes
- [ ] Analisar performance da plataforma
- [ ] Gerenciar financiadores parceiros
- [ ] Resolver problemas técnicos

---

## Contribuindo

Para adicionar um novo Job:

1. Crie arquivo `jtbd-[nome-do-job].md`
2. Use a estrutura padrão dos jobs existentes
3. Inclua fluxograma Mermaid completo
4. Documente todos os critérios de sucesso
5. Adicione métricas mensuráveis
6. Atualize este README

---

## Referências

- **Jobs to be Done Framework**: Clayton Christensen
- **Mermaid Documentation**: https://mermaid.js.org
- **JTBD Resources**: https://jtbd.info

---

**Última atualização:** Janeiro 2026  
**Versão:** 1.0  
**Mantido por:** Equipe Ventureon
