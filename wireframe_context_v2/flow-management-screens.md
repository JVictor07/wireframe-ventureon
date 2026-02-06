# Fluxo - Telas de Gerenciamento do Sacado

## Descrição
Fluxo das telas de gerenciamento interno do Sacado: Empresa, Equipe, Fornecedores e Financiadores.

## Diagrama Mermaid - Gestão da Empresa

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Minha Empresa]) --> TelaEmpresa[Tela: Gestão da Empresa]
    
    TelaEmpresa --> VisualizaDados[Visualiza dados atuais:<br/>- Identificação<br/>- Endereço<br/>- Contato<br/>- Responsável Financeiro]
    
    VisualizaDados --> Decision1{Editar dados?}
    
    Decision1 -->|Não| VoltaDash[Volta ao Dashboard]
    Decision1 -->|Sim| EditaCampos[Edita campos desejados]
    
    EditaCampos --> AlteraInfo[Altera:<br/>- Razão Social<br/>- Nome Fantasia<br/>- CNPJ<br/>- Endereço<br/>- Contato]
    
    AlteraInfo --> ClicaSalvar[Clica em<br/>Salvar Alterações]
    
    ClicaSalvar --> ToastSucesso[Toast: Alterações<br/>salvas com sucesso]
    
    ToastSucesso --> DadosAtualizados[Dados atualizados<br/>na interface]
    
    DadosAtualizados --> Decision2{Continuar editando?}
    
    Decision2 -->|Sim| EditaCampos
    Decision2 -->|Não| VoltaDash
    
    VoltaDash --> Fim([Fim])

    style Start fill:#e1f5e1
    style ToastSucesso fill:#c8e6c9
    style Fim fill:#e1f5e1
```

## Diagrama Mermaid - Gestão de Equipe

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Equipe]) --> TelaEquipe[Tela: Gestão de Equipe]
    
    TelaEquipe --> TabelaMembros[Tabela de membros:<br/>- Nome<br/>- E-mail<br/>- Perfil<br/>- Status]
    
    TabelaMembros --> Decision1{Ação desejada?}
    
    Decision1 -->|Adicionar membro| BotaoAdd[Clica em<br/>Adicionar Membro]
    Decision1 -->|Editar membro| BotaoEdit[Clica em Editar<br/>no membro]
    Decision1 -->|Remover membro| BotaoRemove[Clica em Remover<br/>no membro]
    Decision1 -->|Voltar| VoltaDash[Volta ao Dashboard]
    
    BotaoAdd --> ModalAdd[Modal: Adicionar Membro]
    ModalAdd --> PreencheAdd[Preenche:<br/>- Nome<br/>- E-mail<br/>- Perfil<br/>- Status]
    
    PreencheAdd --> SelecionaPerfil[Seleciona perfil:<br/>- Admin Financeiro<br/>- Aprovador<br/>- Operador<br/>- Visualizador]
    
    SelecionaPerfil --> SalvaAdd[Clica em Salvar]
    SalvaAdd --> ToastAdd[Toast: Membro<br/>adicionado com sucesso]
    ToastAdd --> TabelaMembros
    
    BotaoEdit --> ModalEdit[Modal: Editar Membro<br/>Dados preenchidos]
    ModalEdit --> AlteraEdit[Altera informações<br/>necessárias]
    AlteraEdit --> SalvaEdit[Clica em Salvar]
    SalvaEdit --> ToastEdit[Toast: Membro<br/>atualizado com sucesso]
    ToastEdit --> TabelaMembros
    
    BotaoRemove --> ConfirmaRemove[Confirmação:<br/>Remover membro?]
    ConfirmaRemove --> Decision2{Confirma?}
    Decision2 -->|Não| TabelaMembros
    Decision2 -->|Sim| MembroRemovido[Membro removido<br/>Toast de sucesso]
    MembroRemovido --> TabelaMembros
    
    VoltaDash --> Fim([Fim])

    style Start fill:#e1f5e1
    style ToastAdd fill:#c8e6c9
    style ToastEdit fill:#c8e6c9
    style MembroRemovido fill:#c8e6c9
    style Fim fill:#e1f5e1
```

## Diagrama Mermaid - Gestão de Fornecedores

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Fornecedores]) --> TelaForn[Tela: Gestão de Fornecedores]
    
    TelaForn --> TabelaForn[Tabela de fornecedores:<br/>- Nome<br/>- CNPJ<br/>- Contato<br/>- Status]
    
    TabelaForn --> BuscaForn{Usar busca?}
    BuscaForn -->|Sim| FiltraForn[Filtra por nome<br/>ou CNPJ]
    BuscaForn -->|Não| VisualizaTodos[Visualiza todos]
    
    FiltraForn --> VisualizaTodos
    
    VisualizaTodos --> Decision1{Ação desejada?}
    
    Decision1 -->|Adicionar fornecedor| BotaoAddForn[Clica em<br/>Novo Fornecedor]
    Decision1 -->|Editar fornecedor| BotaoEditForn[Clica em Editar]
    Decision1 -->|Voltar| VoltaDash[Volta ao Dashboard]
    
    BotaoAddForn --> ModalAddForn[Modal: Novo Fornecedor]
    ModalAddForn --> PreencheForn[Preenche:<br/>- Nome<br/>- CNPJ<br/>- E-mail<br/>- Telefone]
    
    PreencheForn --> SalvaForn[Clica em Salvar]
    SalvaForn --> ToastAddForn[Toast: Fornecedor<br/>criado com sucesso]
    ToastAddForn --> TabelaForn
    
    BotaoEditForn --> ModalEditForn[Modal: Editar Fornecedor<br/>Dados preenchidos]
    ModalEditForn --> AlteraForn[Altera informações]
    AlteraForn --> SalvaEditForn[Clica em Salvar]
    SalvaEditForn --> ToastEditForn[Toast: Fornecedor<br/>atualizado com sucesso]
    ToastEditForn --> TabelaForn
    
    VoltaDash --> Fim([Fim])

    style Start fill:#e1f5e1
    style ToastAddForn fill:#c8e6c9
    style ToastEditForn fill:#c8e6c9
    style Fim fill:#e1f5e1
```

## Diagrama Mermaid - Gestão de Financiadores

```mermaid
flowchart TD
    Start([Sacado acessa<br/>Financiadores]) --> TelaFin[Tela: Gestão de Financiadores]
    
    TelaFin --> TabelaFin[Tabela de financiadores:<br/>- Nome<br/>- Tipo<br/>- Taxa Base<br/>- Prazo Máximo<br/>- Status]
    
    TabelaFin --> BuscaFin{Usar busca?}
    BuscaFin -->|Sim| FiltraFin[Filtra por nome<br/>ou tipo]
    BuscaFin -->|Não| VisualizaTodos[Visualiza todos]
    
    FiltraFin --> VisualizaTodos
    
    VisualizaTodos --> InfoImportante[Info: Apenas financiadores<br/>ATIVOS aparecem nas<br/>comparações de operações]
    
    InfoImportante --> Decision1{Ação desejada?}
    
    Decision1 -->|Adicionar financiador| BotaoAddFin[Clica em<br/>Novo Financiador]
    Decision1 -->|Editar financiador| BotaoEditFin[Clica em Editar]
    Decision1 -->|Voltar| VoltaDash[Volta ao Dashboard]
    
    BotaoAddFin --> ModalAddFin[Modal: Novo Financiador]
    ModalAddFin --> PreencheFin[Preenche:<br/>- Nome<br/>- Tipo de Instituição<br/>- Taxa Base<br/>- Prazo Máximo<br/>- Contato<br/>- Status]
    
    PreencheFin --> SelecionaTipo[Seleciona tipo:<br/>- Banco<br/>- Financeira<br/>- Fintech<br/>- Cooperativa]
    
    SelecionaTipo --> DefineTaxa[Define taxa base<br/>mensal (%)]
    DefineTaxa --> DefineStatus[Define status:<br/>- Ativo<br/>- Inativo]
    
    DefineStatus --> SalvaFin[Clica em Salvar]
    SalvaFin --> ToastAddFin[Toast: Financiador<br/>criado com sucesso]
    ToastAddFin --> TabelaFin
    
    BotaoEditFin --> ModalEditFin[Modal: Editar Financiador<br/>Dados preenchidos]
    ModalEditFin --> AlteraFin[Altera informações<br/>necessárias]
    AlteraFin --> AlteraStatus{Alterar status?}
    
    AlteraStatus -->|Sim| AvisoStatus[Aviso: Status afeta<br/>comparações futuras]
    AlteraStatus -->|Não| SalvaEditFin[Clica em Salvar]
    
    AvisoStatus --> SalvaEditFin
    SalvaEditFin --> ToastEditFin[Toast: Financiador<br/>atualizado com sucesso]
    ToastEditFin --> TabelaFin
    
    VoltaDash --> Fim([Fim])

    style Start fill:#e1f5e1
    style InfoImportante fill:#fff9c4
    style AvisoStatus fill:#ffecb3
    style ToastAddFin fill:#c8e6c9
    style ToastEditFin fill:#c8e6c9
    style Fim fill:#e1f5e1
```

## Perfis de Acesso (Equipe)

### Admin Financeiro
- Acesso completo a todas as funcionalidades
- Pode gerenciar equipe
- Pode configurar empresa e programa

### Aprovador
- Pode aprovar/rejeitar operações
- Pode selecionar financiadores
- Pode marcar como financiada

### Operador
- Pode cadastrar notas fiscais
- Pode criar operações
- Pode visualizar operações

### Visualizador
- Somente leitura
- Pode visualizar todas as telas
- Não pode executar ações

## Regras de Negócio

### Fornecedores
- **Obrigatório**: Nome e CNPJ
- **Opcional**: E-mail e telefone
- **Vinculação**: Associado ao Sacado
- **Uso**: Aparece no select de cadastro de NF

### Financiadores
- **Obrigatório**: Nome, tipo, taxa base, prazo, status
- **Status Ativo**: Aparece nas comparações de operações
- **Status Inativo**: Não aparece em novas operações
- **Taxa Base**: Usada para cálculo de propostas (mock)

### Empresa
- **Dados cadastrais**: Razão social, CNPJ, IE
- **Endereço completo**: Cidade, estado, logradouro
- **Contato**: Nome, e-mail, telefone
- **Responsável financeiro**: Pessoa de contato principal

### Equipe
- **Perfis predefinidos**: 4 níveis de acesso
- **Status**: Ativo ou Inativo
- **E-mail único**: Não permite duplicação
- **Remoção**: Confirmação obrigatória

## Comportamento Visual

- **Modais**: Todas as criações/edições em modais
- **Toasts**: Confirmação de sucesso em todas as ações
- **Badges de status**: Cores diferentes para Ativo/Inativo
- **Busca em tempo real**: Filtragem instantânea
- **Tabelas responsivas**: Adaptam-se ao tamanho da tela
- **Validação de campos**: Feedback visual imediato
