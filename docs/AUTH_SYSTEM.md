# 🌊 Sistema de Autenticação OpenSea

Sistema de autenticação moderno e completo com design inspirado no VisionOS, desenvolvido com Next.js 15, React 19 e TanStack Forms.

## ✨ Características

### 🎨 Design
- **Efeito Glass (Glassmorphism)**: Componentes com backdrop-blur e transparência
- **Tema Light/Dark**: Suporte completo com persistência
- **Mobile First**: Design responsivo otimizado para dispositivos móveis
- **Animações Suaves**: Transições e micro-interações fluídas
- **Paleta de Cores**: Tons de azul como cor principal

### 🔐 Funcionalidades de Autenticação

#### 1. **Login em Duas Etapas**
- **Etapa 1**: Validação de email ou nome de usuário
- **Etapa 2**: Senha com opção de recuperação
- Indicadores visuais de progresso
- Validação em tempo real

#### 2. **Recuperação de Senha**
- Processo em 3 etapas:
  1. Solicitação por email
  2. Validação de código
  3. Redefinição de senha
- Integrado com API backend
- Feedback visual em cada etapa

#### 3. **Registro de Usuário**
- Formulário completo com validações
- Confirmação de senha
- Termos de serviço
- Feedback de erros contextual

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **TanStack Forms** - Gerenciamento de formulários
- **TanStack Query** - Cache e estado servidor
- **Tailwind CSS** - Estilização
- **Framer Motion** (via Tailwind) - Animações

## 📦 Componentes Criados

### UI Components (`src/components/ui/`)

1. **GlassCard**
   - Card com efeito glass
   - Níveis de blur configuráveis
   - Gradientes e sombras

2. **GlassInput**
   - Input estilizado com glass effect
   - Suporte a ícones
   - Validação e feedback de erros
   - Estados hover/focus/disabled

3. **GlassButton**
   - 3 variantes: primary, secondary, ghost
   - 3 tamanhos: sm, md, lg
   - Estado de loading
   - Ícones left/right

4. **ThemeToggle**
   - Alternador de tema light/dark
   - Ícones animados
   - Posição fixa no canto superior

### Hooks (`src/hooks/`)

1. **useTheme**
   - Gerencia tema light/dark
   - Persistência no localStorage
   - Detecção de preferência do sistema
   - Sincronização com DOM

## 🎯 Páginas Criadas

### 1. Login (`/login`)
- URL: `src/app/(auth)/login/page.tsx`
- Duas etapas de autenticação
- Link para recuperação de senha
- Link para registro

### 2. Registro (`/register`)
- URL: `src/app/(auth)/register/page.tsx`
- Formulário completo
- Validações client-side
- Link para login

### 3. Recuperação de Senha (`/forgot-password`)
- URL: `src/app/(auth)/forgot-password/page.tsx`
- Três etapas de recuperação
- Integração completa com API
- Feedback visual de sucesso

## 🔌 Integração com API

### Endpoints Utilizados

```typescript
// Login
POST /v1/auth/login/password
Body: { email: string, password: string }

// Registro
POST /v1/auth/register/password
Body: { email, password, username, profile: { name } }

// Solicitar Reset de Senha
POST /v1/auth/send/password
Body: { email: string }

// Resetar Senha
POST /v1/auth/reset/password
Body: { token: string, newPassword: string }
```

### Hooks de API

```typescript
// src/hooks/use-auth.ts
useLogin()                 // Login
useRegister()              // Registro
useSendPasswordReset()     // Enviar código
useResetPassword()         // Resetar senha
```

## 🎨 Paleta de Cores

### Light Mode
- Background: `from-blue-50 via-white to-purple-50`
- Primary: `blue-500`
- Text: `gray-900`
- Glass: `white/70` com `backdrop-blur-lg`

### Dark Mode
- Background: `from-gray-950 via-gray-900 to-blue-950`
- Primary: `blue-400/600`
- Text: `white`
- Glass: `gray-900/70` com `backdrop-blur-lg`

## 📱 Responsividade

- **Mobile**: Design otimizado para telas pequenas
- **Tablet**: Ajustes de padding e espaçamento
- **Desktop**: Layout centralizado com max-width

## 🎭 Animações

Utilizando classes Tailwind CSS:
- `animate-in` - Entrada suave
- `fade-in` - Fade in
- `slide-in-from-*` - Slides direcionais
- `animate-pulse` - Pulsação
- Transições suaves em hover/focus

## 🚀 Como Usar

### Importar Componentes

```typescript
import {
  GlassCard,
  GlassInput,
  GlassButton,
  ThemeToggle
} from '@/components/ui';
```

### Usar Hook de Tema

```typescript
import { useTheme } from '@/hooks/use-theme';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Tema: {theme}
    </button>
  );
}
```

### Usar Hooks de Auth

```typescript
import { useLogin, useRegister } from '@/hooks/use-auth';

function LoginForm() {
  const login = useLogin();
  
  const handleLogin = async () => {
    await login.mutateAsync({
      email: 'user@email.com',
      password: 'senha'
    });
  };
}
```

## 📝 Validações Implementadas

### Login
- Email/username obrigatório (min 3 caracteres)
- Senha obrigatória

### Registro
- Nome completo obrigatório
- Username obrigatório (min 3 caracteres)
- Email válido obrigatório
- Senha obrigatória (min 6 caracteres)
- Confirmação de senha deve coincidir

### Recuperação de Senha
- Email válido obrigatório
- Código de 6 dígitos
- Nova senha (min 6 caracteres)
- Confirmação de senha deve coincidir

## 🎯 Próximos Passos

1. ✅ Adicionar autenticação social (Google, GitHub)
2. ✅ Implementar 2FA (Two-Factor Authentication)
3. ✅ Adicionar biometria para mobile
4. ✅ Logs de atividade de login
5. ✅ Notificações por email

## 🤝 Contribuindo

Este é um sistema completo e pronto para produção. Sinta-se livre para:
- Adicionar novos temas
- Criar novos componentes glass
- Melhorar animações
- Adicionar mais validações

## 📄 Licença

MIT License - Use livremente em seus projetos!

---

**Desenvolvido com ❤️ usando Next.js e TanStack**
