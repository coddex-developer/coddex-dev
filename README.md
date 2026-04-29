# CODDEX - Dashboard Admin

Dashboard administrativo moderno baseado em Next.js 16 com autenticação segura, gerenciamento de projetos e links.

## 🚀 Tecnologias

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19 + Tailwind CSS 4 + Radix UI + shadcn/ui
- **Autenticação**: JWT + HttpOnly Cookies
- **Validação**: Zod
- **HTTP Client**: Axios
- **Animações**: Framer Motion
- **Notificações**: Sonner
- **TypeScript**: Strict mode

## ✨ Características

- ✅ Autenticação segura com JWT e HttpOnly cookies
- ✅ Dashboard responsivo e moderno
- ✅ Gerenciamento de projetos
- ✅ Gerenciamento de links
- ✅ Validação com Zod
- ✅ Componentes reutilizáveis
- ✅ Dark/Light mode
- ✅ Acessibilidade (WCAG)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone <seu-repositorio>
cd coddex-dev
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
# Edite .env.local com suas informações
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse `http://localhost:3000`

## 📚 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento (hot reload) |
| `npm run build` | Build de produção |
| `npm run start` | Inicia servidor de produção |
| `npm run lint` | Executa ESLint com auto-fix |
| `npm run type-check` | Valida tipos TypeScript |
| `npm run format` | Formata código com Prettier |

## 🏗️ Estrutura do Projeto

```
coddex-dev/
├── app/
│   ├── api/                 # Rotas API
│   │   └── auth/
│   │       ├── login/
│   │       ├── logout/
│   │       ├── verify/
│   │       └── set-token/
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/            # Context API (Auth)
│   ├── dashboard/           # Seção protegida
│   ├── hooks/               # Hooks customizados
│   └── (pages)/             # Páginas públicas
├── components/              # Componentes UI compartilhados
├── lib/                     # Utilitários
├── public/                  # Arquivos estáticos
└── config/                  # Configuração da aplicação
```

## 🔐 Segurança

### Autenticação

O projeto implementa segurança de autenticação com:

- **JWT (JSON Web Tokens)**: Para sessões seguras
- **HttpOnly Cookies**: Tokens armazenados em cookies httpOnly (não acessíveis a JavaScript)
- **CSRF Protection**: Validação de origem
- **Protected Routes**: Verificação de autenticação em rotas sensíveis

### Headers de Segurança

Configure em produção:
- HSTS
- X-Content-Type-Options
- X-Frame-Options
- CSP

Veja `next.config.ts` para mais detalhes.

## 📖 Documentação da API

### Autenticação

#### POST `/api/auth/login`
Login com credenciais

**Request:**
```json
{
  "username": "admin",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "adminId": "user-123"
}
```

#### GET `/api/auth/verify`
Verificar autenticação atual

**Response:**
```json
{
  "token": "eyJhbGc...",
  "adminId": "user-123",
  "authenticated": true
}
```

#### POST `/api/auth/logout`
Fazer logout

**Response:**
```json
{
  "message": "Logout realizado com sucesso"
}
```

#### POST `/api/auth/set-token`
Salvar token em cookie seguro

**Request:**
```json
{
  "token": "eyJhbGc...",
  "adminId": "user-123"
}
```

### Dashboard

#### GET `/api/dashboard/overview`
Obter estatísticas gerais

#### GET `/api/dashboard/projects`
Listar todos os projetos

#### POST `/api/dashboard/projects`
Criar novo projeto

#### GET `/api/dashboard/projects/[id]`
Obter detalhes de um projeto

#### PUT `/api/dashboard/projects/[id]`
Atualizar projeto

#### DELETE `/api/dashboard/projects/[id]`
Deletar projeto

### Projetos Públicos

#### GET `/api/projects`
Listar projetos públicos

## 🎨 Temas

O projeto utiliza um sistema de tema moderno com OKLCh color space:

```tsx
// Dark theme
--background: oklch(17.6% 0.03 259.58)
--primary: oklch(74.5% 0.14 229.19)

// Light theme
--background: oklch(98.5% 0.01 259.58)
--primary: oklch(50% 0.15 249.19)
```

Altere o tema via `ThemeContext` ou navegação.

## ⚠️ Problemas Conhecidos e Correções Aplicadas

- ✅ **Segurança**: Migrado de localStorage para HttpOnly cookies
- ✅ **TypeScript**: Atualizado target para ES2022
- ✅ **ESLint**: Melhoradas regras e adicionado cache
- ✅ **Typos**: Corrigido `intex.tsx` → `index.tsx`
- ⚠️ **Testes**: A adicionar Jest + Testing Library
- ⚠️ **Documentação**: Expandida

## 📦 Dependências Principais

### Dependências de Produção
- `next`: Framework web
- `react` / `react-dom`: UI library
- `@radix-ui/themes`: Componentes primitivos
- `shadcn`: Componentes customizados
- `tailwindcss`: Utilidades CSS
- `axios`: HTTP client
- `zod`: Runtime type validation
- `sonner`: Toast notifications
- `motion`: Animações

### Dependências de Desenvolvimento
- `typescript`: Type checking
- `eslint`: Linting
- `tailwindcss`: CSS framework
- `postcss`: CSS processor

## 🚀 Deploy

### Vercel (Recomendado)

1. Push no GitHub
2. Conecte seu repositório à Vercel
3. Configure variáveis de ambiente
4. Deploy automaticamente

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next .next
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuindo

1. Faça um fork
2. Crie uma branch (`git checkout -b feature/melhoria`)
3. Commit suas mudanças (`git commit -m 'Add: melhoria'`)
4. Push para a branch (`git push origin feature/melhoria`)
5. Abra um Pull Request

## 📝 Commits

Use conventional commits:
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação
- `refactor:` Refatoração
- `perf:` Performance
- `test:` Testes
- `chore:` Manutenção

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Abra uma issue
3. Contate o time de desenvolvimento

## 📄 Licença

MIT - Veja LICENSE.md para detalhes

---

**Desenvolvido com ❤️**
