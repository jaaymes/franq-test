# FRANQ-VUE

<div align="center">
  <img src="public/logo.svg" alt="Logo Franq" width="180" />
  <br />
  <h3>Plataforma moderna para análise e gestão financeira</h3>
</div>

## 📋 Sobre o Projeto

Franq-Vue é uma aplicação web moderna para acompanhamento e gestão financeira, desenvolvida com o ecossistema Vue 3 e as mais recentes tecnologias frontend para oferecer uma experiência de usuário fluida e responsiva.

## 🚀 Tecnologias

Este projeto utiliza as seguintes tecnologias:

- [Vue 3](https://vuejs.org/) - Framework progressivo para construção de interfaces
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [Vite](https://vitejs.dev/) - Build tool ultrarrápida para desenvolvimento moderno
- [Pinia](https://pinia.vuejs.org/) - Gerenciamento de estado para Vue
- [Vue Router](https://router.vuejs.org/) - Roteamento oficial para Vue.js
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Shadcn-Vue](https://www.shadcn-vue.com/) - Componentes reutilizáveis e acessíveis
- [Axios](https://axios-http.com/) - Cliente HTTP baseado em Promises
- [Vee-Validate](https://vee-validate.logaretm.com/) - Validação de formulários
- [Zod](https://zod.dev/) - Validação de esquema TypeScript-first
- [JWT](https://jwt.io/) - JSON Web Tokens para autenticação
- [Lightweight Charts](https://www.tradingview.com/lightweight-charts/) - Biblioteca de gráficos financeiros
- [Vue Sonner](https://vue-sonner.vercel.app/) - Sistema de notificações toast
- [Lucide Icons](https://lucide.dev/) - Conjunto de ícones consistentes

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/franq-vue.git

# Entre no diretório
cd franq-vue

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Inicie o servidor de desenvolvimento
pnpm dev
```

## 📦 Scripts Disponíveis

- `pnpm dev` - Inicia o servidor de desenvolvimento
- `pnpm build` - Compila e minifica para produção
- `pnpm preview` - Visualiza a build de produção localmente
- `pnpm clean` - Remove diretórios node_modules, dist e pnpm-lock.yaml
- `pnpm lint` - Executa o linter nos arquivos .js, .ts e .vue
- `pnpm format` - Formata o código usando Prettier

## 🧩 Estrutura do Projeto

```
franq-vue/
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens e recursos
│   ├── components/      # Componentes reutilizáveis
│   ├── interfaces/      # Interfaces TypeScript
│   ├── lib/             # Bibliotecas e configurações
│   ├── pages/           # Componentes de página
│   ├── routes/          # Definições de rota
│   ├── services/        # Serviços de API
│   ├── stores/          # Stores Pinia
│   ├── styles/          # Estilos globais
│   ├── types/           # Tipos TypeScript
│   ├── utils/           # Funções utilitárias
│   ├── App.vue          # Componente raiz
│   └── main.ts          # Ponto de entrada da aplicação
├── .env                 # Variáveis de ambiente (local)
├── .env.example         # Exemplo de variáveis de ambiente
├── vite.config.ts       # Configuração do Vite
└── tsconfig.json        # Configuração do TypeScript
```

## 🔒 Autenticação

O sistema utiliza autenticação JWT (JSON Web Tokens) para gerenciar sessões de usuário de forma segura e eficiente.

## 📊 Visualização de Dados

A aplicação conta com visualizações interativas para dados financeiros usando Lightweight Charts, proporcionando gráficos responsivos e de alta performance.

## 🌐 Comunicação com API

A comunicação com o backend é feita através do Axios, com serviços organizados para facilitar a manutenção e testabilidade.

## 📱 Responsividade

A interface foi desenvolvida com foco em dispositivos móveis (mobile-first) através do Tailwind CSS, garantindo uma experiência consistente em diferentes tamanhos de tela.

## 🧪 Testes

O projeto utiliza Vitest para testes unitários e de componentes.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
