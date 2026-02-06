# Gestão de Clientes (Admin – Ventureon)

## Objetivo da Tela
Permitir à Ventureon cadastrar e gerenciar os clientes da plataforma, incluindo configuração completa de acesso.

## Usuário
- Admin (Ventureon)

## Componentes
### Tabela de Clientes
- Razão social
- CNPJ
- Programa
- Prazo médio
- Status (badge)

### Ações
- Criar cliente
- Editar cliente
- Impersonar cliente

## Modal: Criar/Editar Cliente

### Seção 1: Dados da Empresa
- **Razão Social** * (obrigatório)
- **CNPJ** * (obrigatório)
- **Nome do Programa** * (obrigatório)
  - Identifica o programa de risco sacado
- **Prazo Médio de Pagamento** (opcional)
  - Ex: "30 dias"

### Seção 2: Acesso à Plataforma
- **E-mail de Acesso** * (obrigatório)
  - Será usado para login na plataforma
  - Validação de formato de e-mail
- **Nome do Administrador** * (obrigatório)
  - Pessoa responsável que terá acesso inicial
- **Aviso (apenas criação):**
  - "Senha inicial será enviada automaticamente para o e-mail cadastrado"

### Seção 3: Contato
- **Telefone** (opcional)
  - Para suporte e comunicação
- **Status** * (obrigatório)
  - Ativo / Inativo
  - Define se cliente pode acessar a plataforma

## Fluxo de Onboarding

1. Admin clica em "Criar Cliente"
2. Preenche dados da empresa
3. Define e-mail de acesso e nome do administrador
4. Sistema cria cliente com status "Ativo"
5. Senha inicial é gerada automaticamente (mock)
6. Cliente pode fazer login com e-mail e senha recebida
7. No primeiro acesso, cliente deve trocar a senha (futuro)

## Comportamento Visual
- Criar/editar abre modal com seções organizadas
- Campos obrigatórios marcados com *
- Aviso destacado sobre senha inicial (apenas criação)
- Impersonar entra na UI do cliente (mock)
- Toast de confirmação após salvar

## Validações
- E-mail deve ter formato válido
- CNPJ deve ter formato válido
- Campos obrigatórios devem estar preenchidos
- Status define se cliente pode acessar plataforma