# Guia de Componentes - OpenSea APP

## 📦 Componentes Shadcn Instalados

Todos os componentes foram instalados e customizados com o design system VisionOS.

### Componentes de Formulário

#### **Button**
```tsx
import { Button } from "@/components/ui/button"

// Variantes
<Button variant="default">Primary</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary (Glass)</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**Estilos aplicados:**
- Default: Gradiente azul (from-blue-500 to-blue-600)
- Secondary: Glassmorphism (backdrop-blur-xl bg-white/5)
- Border-radius: rounded-2xl (default), rounded-xl (sm)
- Altura: h-11 (default), h-9 (sm), h-12 (lg)

---

#### **Input**
```tsx
import { Input } from "@/components/ui/input"

<Input
  type="email"
  placeholder="Digite seu email"
  className="..."
/>
```

**Estilos aplicados:**
- Glassmorphism: backdrop-blur-xl bg-white dark:bg-white/10
- Border: border-gray-300 dark:border-white/20
- Border-radius: rounded-xl
- Altura: h-12
- Focus: border-blue-500

---

#### **Textarea**
```tsx
import { Textarea } from "@/components/ui/textarea"

<Textarea
  placeholder="Digite sua mensagem"
  className="min-h-[200px]"
/>
```

**Estilos aplicados:**
- Mesmos estilos do Input
- Min-height: 120px
- Resize: vertical

---

#### **Label**
```tsx
import { Label } from "@/components/ui/label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

---

#### **Checkbox**
```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox id="terms" />
<label htmlFor="terms">Aceito os termos</label>
```

---

#### **Radio Group**
```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

<RadioGroup defaultValue="option1">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label htmlFor="option1">Opção 1</Label>
  </div>
</RadioGroup>
```

---

#### **Switch**
```tsx
import { Switch } from "@/components/ui/switch"

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

#### **Select**
```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Selecione" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Opção 1</SelectItem>
    <SelectItem value="2">Opção 2</SelectItem>
  </SelectContent>
</Select>
```

---

#### **Form (com React Hook Form)**
```tsx
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const form = useForm()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@exemplo.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

---

### Componentes de Navegação

#### **Tabs**
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Conteúdo 1</TabsContent>
  <TabsContent value="tab2">Conteúdo 2</TabsContent>
</Tabs>
```

---

#### **Breadcrumb**
```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Produtos</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

#### **Pagination**
```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

### Componentes de Feedback

#### **Badge**
```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
```

**Estilos aplicados:**
- Todas variantes: rounded-full, glassmorphism
- Success: bg-green-500/20 text-green-400 border-green-500/30
- Warning: bg-orange-500/20 text-orange-400 border-orange-500/30
- Destructive: bg-red-500/20 text-red-400 border-red-500/30

---

#### **Alert**
```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

<Alert>
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription>
    Esta é uma mensagem de alerta.
  </AlertDescription>
</Alert>
```

---

#### **Toast (Sonner)**
```tsx
import { toast } from "sonner"

toast.success("Operação realizada com sucesso!")
toast.error("Erro ao processar")
toast.info("Informação importante")
toast.warning("Cuidado!")
```

**Configuração no layout.tsx:**
```tsx
import { Toaster } from "@/components/ui/sonner"

<Toaster />
```

---

#### **Progress**
```tsx
import { Progress } from "@/components/ui/progress"

<Progress value={60} />
```

---

#### **Skeleton**
```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="w-full h-12 rounded-xl" />
```

---

### Componentes de Overlay

#### **Dialog**
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
  </DialogContent>
</Dialog>
```

---

#### **Alert Dialog**
```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Deletar</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Confirmar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

#### **Sheet**
```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild>
    <Button>Abrir Painel</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Título</SheetTitle>
      <SheetDescription>Descrição</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

---

#### **Drawer**
```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild>
    <Button>Abrir Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Descrição</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Confirmar</Button>
      <DrawerClose asChild>
        <Button variant="outline">Cancelar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

---

#### **Popover**
```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>Conteúdo do popover</PopoverContent>
</Popover>
```

---

#### **Tooltip**
```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

#### **Hover Card**
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    Conteúdo do card
  </HoverCardContent>
</HoverCard>
```

---

### Componentes de Layout

#### **Card**
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo
  </CardContent>
  <CardFooter>
    Rodapé
  </CardFooter>
</Card>
```

**Estilos aplicados:**
- Glassmorphism: backdrop-blur-xl bg-white/90 dark:bg-white/5
- Border: border-gray-200 dark:border-white/10
- Border-radius: rounded-2xl
- Shadow: shadow-xl hover:shadow-2xl

---

#### **Separator**
```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

---

#### **Scroll Area**
```tsx
import { ScrollArea } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-full rounded-md border p-4">
  {/* Conteúdo */}
</ScrollArea>
```

---

#### **Accordion**
```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>
      Conteúdo do item 1
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

---

#### **Collapsible**
```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger>Toggle</CollapsibleTrigger>
  <CollapsibleContent>
    Conteúdo colapsável
  </CollapsibleContent>
</Collapsible>
```

---

### Componentes de Dados

#### **Table**
```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João</TableCell>
      <TableCell>joao@email.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

#### **Calendar**
```tsx
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
/>
```

---

### Componentes de Menu

#### **Dropdown Menu**
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Opções</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Opção 1</DropdownMenuItem>
    <DropdownMenuItem>Opção 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

#### **Context Menu**
```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger>Clique direito aqui</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copiar</ContextMenuItem>
    <ContextMenuItem>Colar</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

---

#### **Menubar**
```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Arquivo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Novo</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Sair</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

---

## 🎨 Componentes Personalizados

### **EmptyState**
```tsx
import { EmptyState } from "@/components/shared/empty-state"
import { Package } from "lucide-react"

<EmptyState
  icon={<Package />}
  title="Nenhum produto encontrado"
  description="Comece adicionando seu primeiro produto"
  actionLabel="Adicionar Produto"
  onAction={() => console.log("Add")}
/>
```

---

### **ConfirmDialog**
```tsx
import { ConfirmDialog } from "@/components/shared/confirm-dialog"
import { Trash2 } from "lucide-react"

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Confirmar exclusão"
  description="Deseja realmente excluir este item?"
  confirmLabel="Excluir"
  cancelLabel="Cancelar"
  variant="destructive"
  icon={<Trash2 />}
  onConfirm={handleDelete}
/>
```

---

### **StatsCard**
```tsx
import { StatsCard } from "@/components/shared/stats-card"
import { ShoppingCart } from "lucide-react"

<StatsCard
  label="Total de Vendas"
  value="R$ 12.450"
  icon={<ShoppingCart />}
  gradient="from-blue-500 to-cyan-500"
  trend={{ value: 12.5, isPositive: true }}
/>
```

---

### **PageHeader**
```tsx
import { PageHeader } from "@/components/shared/page-header"
import { Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

<PageHeader
  title="Produtos"
  description="Gerencie seu catálogo de produtos"
  icon={<Package />}
  gradient="from-blue-500 to-cyan-500"
  showBackButton={false}
  actions={
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Novo Produto
    </Button>
  }
/>
```

---

### **LoadingSpinner**
```tsx
import { LoadingSpinner } from "@/components/shared/loading-spinner"

<LoadingSpinner className="w-12 h-12" />
```

---

## 🎯 Padrões de Uso

### Formulário Completo
```tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
})

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.success("Formulário enviado!")
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
```

---

## 🎨 Design Tokens

### Cores
- **Primary**: Blue (500-600)
- **Success**: Green (500-400)
- **Warning**: Orange (500-400)
- **Error**: Red (500-400)
- **Secondary**: Gray/Slate (500-400)

### Glassmorphism
```css
backdrop-blur-xl
bg-white/90 dark:bg-white/5
border border-gray-200 dark:border-white/10
```

### Border Radius
- Pequeno: `rounded-xl` (12px)
- Médio: `rounded-2xl` (16px)
- Grande: `rounded-3xl` (24px)
- Badge: `rounded-full`

### Shadows
- Normal: `shadow-xl`
- Hover: `shadow-2xl`
- Icon: `shadow-lg`

### Transições
```css
transition-all duration-300
```

---

## 📝 Notas

1. Todos os componentes seguem o design system VisionOS
2. Glassmorphism aplicado consistentemente
3. Temas dark e light totalmente suportados
4. Animações suaves com Framer Motion
5. Acessibilidade com Radix UI
6. TypeScript totalmente tipado
