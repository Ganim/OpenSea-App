# Design System - StockFlow

## Sumário
- [Sistema de Cores](#sistema-de-cores)
- [Glassmorphism](#glassmorphism)
- [Componentes de Layout](#componentes-de-layout)
- [Componentes de Navegação](#componentes-de-navegação)
- [Componentes de Listagem](#componentes-de-listagem)
- [Componentes de Formulário](#componentes-de-formulário)
- [Componentes de Feedback](#componentes-de-feedback)
- [Componentes de Dados](#componentes-de-dados)
- [Componentes de Produtividade](#componentes-de-produtividade)
- [Animações e Transições](#animações-e-transições)

---

## Sistema de Cores

### Tema Light
```css
--background: #ffffff
--foreground: oklch(0.145 0 0)
--border: rgba(0, 0, 0, 0.1)
--input-background: #f3f3f5
--muted: #ececf0
--muted-foreground: #717182
--primary: #030213
--primary-foreground: oklch(1 0 0)
```

### Tema Dark
```css
--background: oklch(0.145 0 0)
--foreground: oklch(0.985 0 0)
--border: oklch(0.269 0 0)
--input: oklch(0.269 0 0)
--muted: oklch(0.269 0 0)
--muted-foreground: oklch(0.708 0 0)
--primary: oklch(0.985 0 0)
--primary-foreground: oklch(0.205 0 0)
```

### Gradientes de Módulos
- **Estoque**: `from-blue-500 to-cyan-500`
- **Vendas**: `from-purple-500 to-pink-500`
- **Análises**: `from-orange-500 to-red-500`
- **Equipe**: `from-green-500 to-emerald-500`
- **Documentos**: `from-indigo-500 to-blue-500`
- **Configurações**: `from-gray-500 to-slate-500`

---

## Glassmorphism

### Padrão Vision OS
Todos os componentes seguem o padrão Vision OS com glassmorphism:

#### Background Glassmorphism
```css
/* Tema Dark */
backdrop-blur-xl bg-white/5 border border-white/10

/* Tema Light */
backdrop-blur-xl bg-white/80 border border-gray-200
```

#### Hover States
```css
/* Dark - Elementos interativos */
hover:bg-white/10 hover:border-white/20

/* Light - Elementos interativos */
hover:bg-gray-50 hover:bg-gray-200
```

#### Seleção/Ativo
```css
/* Dark */
bg-white/10 border-white/30

/* Light */
bg-white border-gray-300
```

#### Overlays e Modais
```css
/* Background overlay */
backdrop-blur-md bg-black/60

/* Container do modal Dark */
backdrop-blur-2xl bg-gray-900/80 border-white/10

/* Container do modal Light */
backdrop-blur-2xl bg-white/80 border-gray-200
```

---

## Componentes de Layout

### 1. Portal
**Arquivo**: `/components/Portal.tsx`

**Descrição**: Componente wrapper para renderização de conteúdo em camadas superiores (modais, overlays)

**Props**:
- `children: ReactNode`
- `zIndex?: number` (default: 60)

**Estilização**:
```tsx
fixed inset-0 z-{zIndex} flex items-center justify-center
```

**Hierarquia Z-Index**:
- z-40: Background elevado
- z-50: Navbar
- z-60: Modais principais (ProductDetail, ProductForm, BulkImport, etc)
- z-70: Overlays de segundo nível
- z-90-95: ModulesOverlay
- z-100: Dropdowns, Popovers, SearchOverlay

---

## Componentes de Navegação

### 1. Navbar
**Arquivo**: `/components/Navbar.tsx`

**Descrição**: Barra de navegação superior fixa com glassmorphism, cantos arredondados e efeitos de hover

**Características**:
- Posição: Fixa no topo (`fixed top-4`)
- Centralizada horizontalmente
- Z-index: 50
- Border-radius: `rounded-3xl`
- Largura máxima: `max-w-7xl`

**Estilização Dark**:
```tsx
backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl
```

**Estilização Light**:
```tsx
backdrop-blur-xl bg-white/80 border border-gray-200 shadow-lg
```

**Elementos**:

#### Logo Button
```tsx
// Dark
bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-10 h-10
text-white

// Light
bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-10 h-10
text-white
```

#### Icon Buttons (Search, Productivity, Notifications)
```tsx
// Dark
bg-white/5 hover:bg-white/10 text-white/70 hover:text-white
rounded-2xl w-10 h-10

// Light
bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-900
rounded-2xl w-10 h-10
```

#### User Menu Button
```tsx
// Dark
bg-white/5 hover:bg-white/10 text-white
rounded-2xl px-3 py-2

// Light
bg-gray-100 hover:bg-gray-200 text-gray-900
rounded-2xl px-3 py-2
```

#### Notification Badge
```tsx
absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full
text-white text-xs
```

**Animações**:
- Transição de hover: `transition-all duration-300`
- Opacity transition: `transition-opacity hover:opacity-80`

---

### 2. ModulesOverlay
**Arquivo**: `/components/ModulesOverlay.tsx`

**Descrição**: Overlay modal para seleção de módulos do sistema

**Posição**: `fixed top-24 left-1/2 -translate-x-1/2`
**Z-index**: 
- Backdrop: 90
- Content: 95

**Animações**:
- Initial: `opacity: 0, scale: 0.95, y: -20`
- Animate: `opacity: 1, scale: 1, y: 0`
- Duration: `0.3s`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

**Estilização do Container Dark**:
```tsx
backdrop-blur-2xl bg-gray-900/80 border border-white/10 rounded-3xl p-8
shadow-2xl
```

**Estilização do Container Light**:
```tsx
backdrop-blur-2xl bg-white/80 border border-gray-200 rounded-3xl p-8
shadow-2xl
```

**Module Cards**:

Dark:
```tsx
backdrop-blur-xl bg-white/5 hover:bg-white/10
border border-white/10 hover:border-white/20
rounded-3xl p-6 shadow-2xl
```

Light:
```tsx
backdrop-blur-xl bg-white/60 hover:bg-white/90
border border-gray-200 hover:border-gray-300
rounded-3xl p-6 shadow-xl hover:shadow-2xl
```

**Icon Container**:
```tsx
w-16 h-16 rounded-2xl bg-gradient-to-br {gradient}
shadow-2xl
transform group-hover:scale-110 group-hover:rotate-6
transition-all duration-500
```

**Hover Effect**:
```tsx
// Gradient overlay
bg-gradient-to-br {gradient} opacity-0 group-hover:opacity-10

// Shine effect
bg-gradient-to-r from-transparent via-white/5 to-transparent
transform -skew-x-12 translate-x-[-200%]
group-hover:translate-x-[200%] transition-transform duration-1000
```

---

### 3. SearchOverlay
**Arquivo**: `/components/SearchOverlay.tsx`

**Descrição**: Overlay de busca global (Ctrl+K)

**Z-index**: 100

**Características**:
- Busca global em todos os módulos
- Resultados categorizados
- Atalhos de teclado

---

### 4. ProductivityOverlay
**Arquivo**: `/components/ProductivityOverlay.tsx`

**Descrição**: Acesso rápido a ferramentas de produtividade

**Características**:
- Calendário
- Todo List
- Notas
- Notificações

---

## Componentes de Listagem

### 1. GenericList
**Arquivo**: `/components/GenericList.tsx`

**Descrição**: Componente genérico para listagem com seleção ao estilo Windows (sem checkboxes)

**Características**:
- Seleção por clique direto
- Suporte a Ctrl/Cmd para seleção múltipla
- Suporte a Shift para seleção em range
- Seleção expandida por arrasto (lasso selection)
- Infinite scroll
- Toggle Grid/List view
- Ações em massa

**Ribbon de Controle**:

Contador de Seleção:
```tsx
backdrop-blur-xl bg-blue-500/90 dark:bg-blue-500/20
border border-blue-600 dark:border-blue-500/50
rounded-2xl h-10 px-4
shadow-lg shadow-blue-500/20
```

Botões de Ação:
```tsx
backdrop-blur-xl bg-white/5 border-white/10
hover:bg-white/10 hover:border-white/20
rounded-2xl h-10 w-10
```

View Mode Toggle:
```tsx
bg-gray-100 dark:bg-white/5 rounded-2xl p-1
border border-gray-200 dark:border-white/10

// Active
bg-white dark:bg-white/10 shadow-sm

// Inactive
text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white
```

**Seleção Expandida (Lasso)**:
```tsx
fixed pointer-events-none
border-2 border-blue-500 bg-blue-500/10
```

**Item States**:

Normal:
```tsx
bg-white/5 border-white/10
hover:bg-white/10 hover:border-white/20
```

Selected:
```tsx
bg-white/10 border-white/30
ring-2 ring-blue-500/50
```

**Modal de Confirmação**:
```tsx
backdrop-blur-xl bg-white dark:bg-gray-900/95
border border-gray-200 dark:border-white/10
rounded-3xl shadow-2xl
```

---

### 2. RecordsList
**Arquivo**: `/components/RecordsList.tsx`

**Descrição**: Wrapper do GenericList para listagens específicas de registros

---

## Componentes de Formulário

### 1. SearchableSelect
**Arquivo**: `/components/SearchableSelect.tsx`

**Descrição**: Select com busca integrada usando Radix UI Command

**Trigger Button**:
```tsx
h-12 w-full rounded-xl
bg-white dark:bg-white/5
border-gray-300 dark:border-white/10
hover:bg-gray-50 dark:hover:bg-white/10
```

**Dropdown Content**:
```tsx
bg-white dark:bg-gray-900
border-gray-300 dark:border-white/10
p-0
```

**Command Input**:
```tsx
h-12
text-gray-900 dark:text-white
placeholder:text-gray-500 dark:placeholder:text-white/40
```

**Items**:
```tsx
text-gray-900 dark:text-white
hover:bg-gray-100 dark:hover:bg-white/10
cursor-pointer
```

---

### 2. FilterBar
**Arquivo**: `/components/shared/FilterBar.tsx`

**Descrição**: Barra de filtros reutilizável com busca e filtros colapsáveis

**Container**:
```tsx
backdrop-blur-xl bg-white/50 dark:bg-white/5
border-b border-gray-200 dark:border-white/10
px-8 py-4
```

**Search Input Container**:
```tsx
relative flex-1
bg-white dark:bg-white/10
border-gray-200 dark:border-white/20
rounded-2xl h-12
```

**Filter Toggle Button**:
```tsx
h-12 px-6 rounded-2xl
backdrop-blur-xl bg-white dark:bg-white/10
border-gray-200 dark:border-white/20
hover:bg-gray-50 dark:hover:bg-white/20
```

**Filter Badge**:
```tsx
ml-2 bg-blue-500 text-white border-0 h-5 px-2
```

**Filters Panel (Expandido)**:
```tsx
backdrop-blur-xl bg-gray-50 dark:bg-white/5
border border-gray-200 dark:border-white/10
rounded-2xl p-4
```

**Clear Button**:
```tsx
h-11 px-4 rounded-xl
hover:bg-red-50 dark:hover:bg-red-500/10
text-red-600 dark:text-red-400
```

---

### 3. Input (Nativo com Glassmorphism)
**Localização**: Usado em formulários

**Dark**:
```tsx
backdrop-blur-xl bg-white/10
border border-white/20
text-white placeholder:text-white/40
rounded-xl
```

**Light**:
```tsx
backdrop-blur-xl bg-white
border border-gray-300
text-gray-900 placeholder:text-gray-500
rounded-xl
```

---

### 4. Textarea (Nativo com Glassmorphism)

Similar ao Input, mas com altura variável:
```tsx
min-h-[120px] resize-y
```

---

### 5. Switch (Shadcn)

**Estados**:
- Ativo: Background azul
- Inativo: Background muted

---

### 6. Checkbox (Shadcn)

Usado em contextos específicos (não em listagens)

---

## Componentes de Feedback

### 1. EmptyState
**Arquivo**: `/components/shared/EmptyState.tsx`

**Descrição**: Estado vazio para listas sem dados

**Container**:
```tsx
flex flex-col items-center justify-center py-20 px-4
```

**Icon Container**:
```tsx
w-20 h-20 rounded-3xl
bg-gradient-to-br from-gray-200 to-gray-300 dark:from-white/10 dark:to-white/5
shadow-xl
```

**Icon**:
```tsx
w-10 h-10 text-gray-400 dark:text-white/40
```

**Text**:
```tsx
// Title
text-gray-900 dark:text-white mb-2

// Description
text-gray-600 dark:text-white/60 text-center max-w-md mb-6
```

**Action Button**:
```tsx
rounded-2xl
bg-gradient-to-r from-blue-500 to-blue-600
hover:from-blue-600 hover:to-blue-700
text-white border-0 shadow-lg
```

**Animação**:
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
```

---

### 2. ConfirmDialog
**Arquivo**: `/components/shared/ConfirmDialog.tsx`

**Descrição**: Diálogo de confirmação reutilizável

**Container**:
```tsx
backdrop-blur-xl bg-white/95 dark:bg-gray-900/95
border border-gray-200 dark:border-white/10
rounded-3xl shadow-2xl p-6
```

**Icon Container**:
```tsx
w-12 h-12 rounded-2xl {bgColor}
// Variantes: bg-red-500, bg-yellow-500, bg-green-500, bg-blue-500
```

**Buttons**:

Cancel:
```tsx
h-11 rounded-xl
border-gray-200 dark:border-white/20
```

Confirm (Default):
```tsx
h-11 rounded-xl
bg-gradient-to-r from-blue-500 to-blue-600
hover:from-blue-600 hover:to-blue-700
text-white border-0
```

Confirm (Destructive):
```tsx
h-11 rounded-xl
bg-red-500 hover:bg-red-600
text-white border-0
```

---

### 3. Toast (Sonner)
**Arquivo**: `/styles/globals.css` (customização)

**Container**:
```tsx
backdrop-blur-xl bg-white/95 dark:bg-gray-900/95
border border-gray-200 dark:border-white/10
rounded-2xl p-4 shadow-2xl
```

**Icon Container**:
```tsx
w-12 h-12 rounded-xl
backdrop-blur-xl bg-white/10
border border-white/20
shadow-lg
```

**Hover Effect**:
```tsx
// Toast container
hover:border-blue-500/80
hover:shadow-[0_8px_32px_rgba(59,130,246,0.3)]

// Icon container
hover:border-blue-500/60 hover:bg-blue-500/15
```

**Animações**:
```css
@keyframes toast-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
// Duration: 0.4s cubic-bezier(0.16, 1, 0.3, 1)
```

---

### 4. LoadingSpinner
**Arquivo**: `/components/shared/LoadingSpinner.tsx`

**Descrição**: Spinner de loading animado

```tsx
animate-spin rounded-full h-8 w-8
border-b-2 border-blue-500
```

---

## Componentes de Dados

### 1. StatsCard
**Arquivo**: `/components/shared/StatsCard.tsx`

**Descrição**: Card de estatísticas com ícone e trend

**Container**:
```tsx
backdrop-blur-xl bg-white/90 dark:bg-white/5
border border-gray-200 dark:border-white/10
rounded-2xl p-4
shadow-xl hover:shadow-2xl
```

**Animação**:
```tsx
whileHover={{ scale: 1.02, y: -2 }}
transition-all duration-300
```

**Icon Container**:
```tsx
w-12 h-12 rounded-2xl
bg-gradient-to-br {color}
shadow-lg
```

**Label**:
```tsx
text-sm text-gray-600 dark:text-white/60 mb-1
```

**Value**:
```tsx
text-2xl text-gray-900 dark:text-white
```

**Trend**:
```tsx
text-xs mt-1
// Positivo
text-green-600 dark:text-green-400
// Negativo
text-red-600 dark:text-red-400
```

---

### 2. PageHeader
**Arquivo**: `/components/shared/PageHeader.tsx`

**Descrição**: Header padrão para páginas de módulos

**Container**:
```tsx
backdrop-blur-xl bg-white/80 dark:bg-white/5
border-b border-gray-200 dark:border-white/10
px-8 py-6
sticky top-20 z-10
```

**Back Button**:
```tsx
w-14 h-14 rounded-2xl
bg-white/5 dark:bg-white/5
hover:bg-white/10 dark:hover:bg-white/10
border border-gray-200 dark:border-white/10
```

**Icon Container**:
```tsx
w-14 h-14 rounded-2xl
bg-gradient-to-br from-blue-500 to-purple-500
shadow-2xl
```

**Title**:
```tsx
text-gray-900 dark:text-white mb-1
```

**Description**:
```tsx
text-gray-600 dark:text-white/60
```

---

### 3. Badge (Shadcn)

**Variantes Status**:

Em Estoque:
```tsx
bg-green-500/20 text-green-400 border-green-500/30
```

Estoque Baixo:
```tsx
bg-orange-500/20 text-orange-400 border-orange-500/30
```

Sem Estoque:
```tsx
bg-red-500/20 text-red-400 border-red-500/30
```

**Uso Geral**:
```tsx
rounded-full px-2.5 py-1 text-xs
border
```

---

## Componentes de Produtividade

### 1. CalendarEvents
**Arquivo**: `/components/CalendarEvents.tsx`

**Descrição**: Calendário integrado com lista de eventos

**Layout Responsivo**:
- Mobile: Calendário em cima, eventos embaixo (coluna)
- Desktop (≥768px): Calendário à esquerda, eventos à direita

**Calendar Container**:
```tsx
backdrop-blur-xl bg-white/5 dark:bg-white/5
border border-white/10
rounded-3xl p-6
```

**Seletores de Mês/Ano**:

Botão:
```tsx
text-2xl text-white capitalize
hover:text-blue-400
cursor-pointer
```

Dropdown:
```tsx
backdrop-blur-2xl bg-white/20
border border-white/30
rounded-2xl p-2 shadow-2xl
```

**Dias do Calendário**:

Normal:
```tsx
aspect-square rounded-xl
bg-white/5 border-white/10
hover:bg-white/10 hover:border-white/20
```

Hoje:
```tsx
bg-blue-500/30 border-blue-500
ring-2 ring-blue-500/50
```

Selecionado:
```tsx
bg-white/10 border-white/30
ring-2 ring-white/50
```

**Event Card**:
```tsx
backdrop-blur-xl border rounded-2xl p-4
bg-white/5 border-white/10
hover:bg-white/10 hover:border-white/20
```

Selecionado:
```tsx
bg-white/10 border-white/30
```

**Date Badge nos Eventos**:
```tsx
w-14 h-14 rounded-xl
bg-white/10 border border-white/20
// Mês em cima (text-xs text-white/60)
// Dia embaixo (text-lg text-white)
```

**Color Indicator**:
```tsx
w-1 h-full rounded-full {color}
// blue: bg-blue-500
// green: bg-green-500
// red: bg-red-500
// purple: bg-purple-500
// yellow: bg-yellow-500
```

**Botões Nativos (Sem Shadcn)**:
```tsx
// Primary
bg-gradient-to-r from-blue-500 to-blue-600
hover:from-blue-600 hover:to-blue-700
text-white rounded-2xl h-11 px-6

// Secondary
backdrop-blur-xl bg-white/5
border border-white/20
hover:bg-white/10
text-white rounded-2xl h-11 px-6
```

---

### 2. TodoList
**Arquivo**: `/components/TodoList.tsx`

**Descrição**: Lista de tarefas com categorização

**Características**:
- Tabs: Ativas / Arquivadas
- View modes: Lista / Kanban
- Prioridades: Low / Medium / High
- Status: Todo / In Progress / Done
- Categorias: Work / Personal / Shopping / Meeting

**Todo Card**:
```tsx
backdrop-blur-xl bg-white/5 dark:bg-white/5
border border-white/10
hover:bg-white/10 hover:border-white/20
rounded-2xl p-4
```

**Priority Badge**:

High:
```tsx
bg-red-500/20 text-red-400 border-red-500/30
```

Medium:
```tsx
bg-yellow-500/20 text-yellow-400 border-yellow-500/30
```

Low:
```tsx
bg-green-500/20 text-green-400 border-green-500/30
```

---

### 3. Notes
**Arquivo**: `/components/Notes.tsx`

**Descrição**: Notas com cores, pin e lock

**Características**:
- Cores: Yellow / Blue / Green / Pink / Purple
- Pinned notes no topo
- Locked notes com senha
- Drag and drop para reordenação

**Note Card**:
```tsx
backdrop-blur-xl bg-white/5 dark:bg-white/5
border border-white/10
hover:bg-white/10 hover:border-white/20
rounded-2xl p-4
```

Pinned:
```tsx
border-blue-500/50
ring-2 ring-blue-500/30
```

**Color Indicator**:
```tsx
w-1 h-full rounded-full
// yellow: bg-yellow-500
// blue: bg-blue-500
// green: bg-green-500
// pink: bg-pink-500
// purple: bg-purple-500
```

---

## Componentes de Detalhes e Formulários

### 1. ProductDetail
**Arquivo**: `/components/ProductDetail.tsx`

**Descrição**: Modal de detalhes do produto com tabs

**Container**:
```tsx
backdrop-blur-xl bg-white/95 dark:bg-gray-900/95
border border-gray-200 dark:border-white/10
rounded-3xl shadow-2xl
```

**Header**:
```tsx
p-6 border-b border-gray-200 dark:border-white/10
```

**Icon Container (Produto)**:
```tsx
w-16 h-16 rounded-2xl
bg-gradient-to-br {color}
```

**Tabs**:
- Overview
- Variantes
- Movimentações
- Localizações

**Action Buttons**:

Edit:
```tsx
bg-gradient-to-r from-blue-500 to-blue-600
hover:from-blue-600 hover:to-blue-700
text-white rounded-2xl
```

Delete:
```tsx
bg-red-500/10 text-red-500
hover:bg-red-500/20
rounded-2xl
```

---

### 2. ProductForm
**Arquivo**: `/components/ProductForm.tsx`

**Descrição**: Formulário completo de produto

**Tabs**:
- Geral
- Estoque
- Preços
- Imagens
- Fornecedor

**Form Container**:
```tsx
backdrop-blur-xl bg-white/95 dark:bg-gray-900/95
border border-gray-200 dark:border-white/10
rounded-3xl shadow-2xl
```

**Input Groups**:
```tsx
space-y-4
```

**Label**:
```tsx
text-gray-900 dark:text-white
```

---

## Animações e Transições

### Motion (Framer Motion)

#### Hover Animations
```tsx
whileHover={{ scale: 1.02, y: -2 }}
// ou
whileHover={{ scale: 1.05, y: -5 }}
```

#### Tap Animations
```tsx
whileTap={{ scale: 0.98 }}
```

#### Fade In
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

#### Stagger Children
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.05 }}
```

### CSS Transitions

#### Padrão
```tsx
transition-all duration-300
```

#### Hover States
```tsx
transition-colors
transition-opacity
```

#### Transform
```tsx
transform group-hover:scale-110 group-hover:rotate-6
transition-all duration-500
```

---

## Botões Padrão

### Primary Button
```tsx
// Dark e Light (mesmo estilo)
h-11 px-6 rounded-2xl
bg-gradient-to-r from-blue-500 to-blue-600
hover:from-blue-600 hover:to-blue-700
text-white border-0 shadow-lg
transition-all duration-300
```

### Secondary Button (Glassmorphism)
```tsx
h-11 px-6 rounded-2xl
backdrop-blur-xl bg-white/5 dark:bg-white/5
border border-white/10 dark:border-white/10
hover:bg-white/10 hover:border-white/20
text-gray-900 dark:text-white
transition-all duration-300
```

### Outline Button
```tsx
h-11 px-6 rounded-2xl
border border-gray-200 dark:border-white/20
bg-transparent
hover:bg-gray-50 dark:hover:bg-white/10
text-gray-900 dark:text-white
transition-all duration-300
```

### Icon Button
```tsx
w-10 h-10 rounded-2xl
backdrop-blur-xl bg-white/5 dark:bg-white/5
border border-white/10 dark:border-white/10
hover:bg-white/10 hover:border-white/20
transition-all duration-300
```

### Destructive Button
```tsx
h-11 px-6 rounded-2xl
bg-red-500 hover:bg-red-600
text-white border-0
transition-all duration-300
```

---

## Border Radius Padrão

- Botões pequenos: `rounded-xl` (12px)
- Botões normais: `rounded-2xl` (16px)
- Cards: `rounded-2xl` ou `rounded-3xl` (24px)
- Modais grandes: `rounded-3xl` (24px)
- Avatar/Icon containers: `rounded-2xl` (16px)
- Badges: `rounded-full`

---

## Espaçamentos

### Padding
- Cards pequenos: `p-4` (16px)
- Cards médios: `p-6` (24px)
- Modais: `p-6` ou `p-8` (24px ou 32px)

### Gap
- Flex/Grid gap pequeno: `gap-2` (8px)
- Flex/Grid gap médio: `gap-3` ou `gap-4` (12px ou 16px)
- Flex/Grid gap grande: `gap-6` (24px)

### Margin
- Entre seções: `mb-4` ou `mb-6` (16px ou 24px)

---

## Shadows

### Padrão
```tsx
shadow-xl // Cards normais
shadow-2xl // Modais, elementos elevados
```

### Com Cor
```tsx
shadow-lg shadow-blue-500/20 // Botões de ação
shadow-2xl shadow-{color}/30 // Hover states
```

---

## Typography

Sistema automatizado via globals.css - **NÃO usar classes de Tailwind para font-size, font-weight, line-height**

### Elementos
- h1: text-2xl, font-medium
- h2: text-xl, font-medium
- h3: text-lg, font-medium
- h4: text-base, font-medium
- p: text-base, font-normal
- label: text-base, font-medium
- button: text-base, font-medium
- input: text-base, font-normal

---

## User Select e Cursor

### Cards/Elementos Não-Selecionáveis
```tsx
user-select-none
```

### Botões
```tsx
cursor-pointer
user-select-none
```

### Tabs
```tsx
cursor-pointer
user-select-none
```

---

## Padrões de Cores por Contexto

### Status
- Sucesso: `green-500` / `green-400`
- Erro: `red-500` / `red-400`
- Aviso: `orange-500` / `orange-400`
- Info: `blue-500` / `blue-400`

### Prioridade
- Alta: `red-500`
- Média: `yellow-500`
- Baixa: `green-500`

### Categorias (TodoList)
- Work: `blue-500`
- Personal: `purple-500`
- Shopping: `green-500`
- Meeting: `orange-500`

---

## Checklist de Componente

Ao criar um novo componente, garantir:

✅ Suporte a tema dark e light  
✅ Glassmorphism (backdrop-blur-xl + transparência)  
✅ Border-radius arredondado (rounded-2xl ou rounded-3xl)  
✅ Transições suaves (transition-all duration-300)  
✅ Hover states com feedback visual  
✅ Shadows adequados ao nível de elevação  
✅ User-select apropriado  
✅ Z-index correto se for overlay/modal  
✅ Responsividade (mobile-first)  
✅ Animações com Motion se aplicável  
✅ Acessibilidade (aria-labels, roles)  

---

## Hierarquia Visual

1. **Modais e Overlays**: Maior destaque, z-index alto, shadow-2xl
2. **Navbar**: Sempre visível, z-50, shadow-xl
3. **Cards de Conteúdo**: shadow-xl, hover:shadow-2xl
4. **Elementos de Background**: backdrop-blur, transparência
5. **Textos**: Hierarquia por tamanho e peso (não customizar)

---

## Microcomponentes Reutilizáveis

### Criados
- **StatsCard**: Estatísticas com ícone e trend
- **PageHeader**: Header padrão de páginas
- **FilterBar**: Filtros com busca
- **EmptyState**: Estado vazio
- **ConfirmDialog**: Confirmação de ações
- **LoadingSpinner**: Loading animado
- **ModuleTemplate**: Template base de módulos

### A Criar Quando Necessário
- **ActionButton**: Botão de ação com gradiente
- **IconButton**: Botão só com ícone
- **StatusBadge**: Badge de status
- **PriorityBadge**: Badge de prioridade
- **ColorIndicator**: Indicador de cor vertical

---

## Considerações Finais

Este design system é baseado no **Vision OS** da Apple, priorizando:
- **Glassmorphism** em todos os elementos
- **Gradientes** para identidade visual
- **Hierarquia visual clara** através de blur, transparência e shadows
- **Animações sutis** para feedback
- **Consistência** entre temas dark e light
- **Microcomponentes** para reusabilidade

Todos os novos componentes devem seguir rigorosamente este padrão.