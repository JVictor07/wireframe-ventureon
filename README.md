# Wireframe Project

Projeto React configurado com Vite, Tailwind CSS e Shadcn UI para validação de wireframes.

## Stack

- **React** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e dev server rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Shadcn UI** - Componentes de UI reutilizáveis e acessíveis
- **Lucide React** - Ícones modernos

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## Estrutura do Projeto

```
wireframe-project/
├── src/
│   ├── components/
│   │   └── ui/          # Componentes Shadcn UI
│   ├── lib/
│   │   └── utils.js     # Utilitários (cn helper)
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais + Tailwind
├── tailwind.config.js   # Configuração Tailwind
├── components.json      # Configuração Shadcn UI
└── vite.config.js       # Configuração Vite
```

## Adicionando Componentes Shadcn UI

Para adicionar componentes do Shadcn UI:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
# etc...
```

Os componentes serão instalados em `src/components/ui/`

## Temas

O projeto está configurado com suporte a tema claro e escuro. Para alternar entre temas, adicione a classe `dark` ao elemento `<html>`.

## Desenvolvimento

O servidor de desenvolvimento estará disponível em `http://localhost:5173/` após executar `npm run dev`.
