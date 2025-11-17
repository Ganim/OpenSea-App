# Implementação Dark Mode - OpenSea APP

## ✅ Implementação Oficial (shadcn/ui)

A implementação do dark mode segue **exatamente** a documentação oficial do shadcn/ui:
https://ui.shadcn.com/docs/dark-mode/next

### 📦 Pacotes Instalados

```bash
npm install next-themes
```

### 📁 Arquivos Criados/Modificados

#### 1. Theme Provider (`src/components/theme-provider.tsx`)
```tsx
'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

#### 2. Root Layout (`src/app/layout.tsx`)
- ✅ Adicionado `suppressHydrationWarning` na tag `<html>`
- ✅ Wrapped com `ThemeProvider`
- ✅ Configurado com:
  - `attribute="class"` - Usa classe `.dark` ao invés de data-theme
  - `defaultTheme="system"` - Detecta preferência do sistema
  - `enableSystem` - Permite tema do sistema
  - `disableTransitionOnChange` - Remove transições durante mudança de tema

#### 3. Theme Toggle (`src/components/ui/theme-toggle.tsx`)
- ✅ Usa `useTheme()` do `next-themes`
- ✅ Implementa hydration safety com `mounted` state
- ✅ Alterna entre `light` e `dark`
- ✅ Ícones animados (sol/lua)

#### 4. Global CSS (`src/app/globals.css`)
- ✅ Tailwind CSS v4 configurado
- ✅ Variáveis CSS para tema claro (padrão)
- ✅ Variáveis CSS para tema escuro (classe `.dark`)

### 🎨 Como Funciona

1. **next-themes** detecta o tema inicial (localStorage ou sistema)
2. Adiciona/remove a classe `.dark` no `<html>`
3. Tailwind CSS v4 aplica as variáveis CSS corretas
4. Sem flash de tema incorreto (FOUC) graças ao `suppressHydrationWarning`

### 🔧 Uso em Componentes

```tsx
'use client';

import { useTheme } from 'next-themes';

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### 🎯 Benefícios da Implementação Oficial

- ✅ **Zero Flash**: Não há flash de tema incorreto
- ✅ **SSR Safe**: Funciona perfeitamente com Server Components
- ✅ **Persistência**: Salva preferência no localStorage
- ✅ **System Aware**: Detecta preferência do sistema operacional
- ✅ **TypeScript**: Totalmente tipado
- ✅ **Performance**: Otimizado para hydration

### 🚀 Diferenças da Implementação Anterior

| Antes (Custom Hook) | Agora (next-themes) |
|---------------------|---------------------|
| ❌ Hook customizado | ✅ Biblioteca oficial |
| ❌ Possível hydration mismatch | ✅ Hydration safety built-in |
| ❌ Sem suporte a tema do sistema | ✅ Detecta preferência do SO |
| ❌ Manual localStorage | ✅ Persistência automática |
| ⚠️ Flash de tema incorreto | ✅ Zero flash (FOUC) |

### 📚 Referências

- [shadcn/ui Dark Mode - Next.js](https://ui.shadcn.com/docs/dark-mode/next)
- [next-themes GitHub](https://github.com/pacocoursey/next-themes)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)

## 🎨 Customização de Cores

Para alterar as cores do tema, edite as variáveis CSS em `src/app/globals.css`:

```css
@theme inline {
  --color-background: hsl(0 0% 100%); /* Fundo claro */
  --color-foreground: hsl(0 0% 3.9%); /* Texto claro */
  /* ... mais variáveis */
}

.dark {
  @theme inline {
    --color-background: hsl(0 0% 3.9%); /* Fundo escuro */
    --color-foreground: hsl(0 0% 98%); /* Texto escuro */
    /* ... mais variáveis */
  }
}
```

## 🐛 Troubleshooting

### Tema não muda?
- Verifique se `suppressHydrationWarning` está no `<html>`
- Confirme que `attribute="class"` está no ThemeProvider
- Verifique se o CSS tem `.dark { ... }` e não `@media (prefers-color-scheme: dark)`

### Flash de tema incorreto?
- Certifique-se de ter `suppressHydrationWarning` no `<html>`
- Use o padrão de `mounted` state no toggle component

### Tema não persiste?
- O `next-themes` automaticamente salva no localStorage
- Verifique se não há erros no console do navegador
