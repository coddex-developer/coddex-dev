# Dashboard Admin - Documentação

## 📋 Estrutura Criada

### Contextos
- **AuthContext**: Gerencia autenticação, token e adminId com persistência em localStorage

### Componentes
- **ProtectedRoute**: HOC para proteger rotas que requerem autenticação
- **DashboardSidebar**: Menu lateral do dashboard com navegação
- **DashboardHeader**: Header com informações do admin

### Hooks
- **useFetch**: Hook customizado para requisições GET com autenticação automática
- **apiFetch**: Função para requisições POST/PUT/DELETE

### Rotas de API (Proxy)
```
/api/auth/login                      - Login (POST)
/api/dashboard/overview              - Estatísticas (GET)
/api/dashboard/projects              - CRUD de projetos
/api/dashboard/links                 - CRUD de links
/api/dashboard/config                - CRUD de config
/api/dashboard/admin/password/[id]   - Alterar senha
/api/dashboard/admin/profile/[id]    - Alterar perfil
```

### Páginas
- **/dashboard** - Overview com estatísticas
- **/dashboard/projects** - Gerenciar projetos
- **/dashboard/links** - Gerenciar links de contato
- **/dashboard/settings** - Configurações (website + senha)

## 🔐 Fluxo de Autenticação

1. Usuário faz login em `/login`
2. Token é enviado para `/api/auth/login` (proxy)
3. Token e adminId são armazenados em localStorage via `AuthContext`
4. AuthProvider valida e mantém sessão
5. ProtectedRoute bloqueia acesso a `/dashboard/*` sem token
6. Todas as requisições do dashboard incluem token automaticamente

## 🚀 Como Usar

### Login
```typescript
const { login } = useAuth();
login(token, adminId); // Autentica e salva session
```

### Fazer Requisições
```typescript
// GET com useFetch hook
const { data, isLoading, error } = useFetch("/api/dashboard/projects");

// POST/PUT/DELETE com apiFetch
await apiFetch("/api/dashboard/projects", "POST", projectData, token);
```

### Logout
```typescript
const { logout } = useAuth();
logout(); // Limpa token e redireciona para login
```

## 🔧 Token JWT

No login, o token JWT é decodificado para extrair o `adminId`:
```typescript
const payload = JSON.parse(atob(data.token.split('.')[1]));
const adminId = payload.sub || payload.id;
```

**Importante**: Certifique-se que seu backend retorna `sub` ou `id` no payload JWT.

## 📱 Responsividade

- Sidebar fixo em desktop
- Menu mobile com hamburger em mobile
- Layout adaptativo para todos os tamanhos

## 🎨 Estilo

Todos os componentes usam Tailwind CSS com tema consistente (cyan/blue).

## ⚠️ Próximas Melhorias

- [ ] Upload de imagens
- [ ] Paginação de projetos/links
- [ ] Filtros e busca
- [ ] Confirmações antes de deletar
- [ ] Validação de formulários mais robusta
- [ ] Dark mode persistente no dashboard
- [ ] Analytics de visualizações
