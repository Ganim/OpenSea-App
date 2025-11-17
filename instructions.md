A interface criado ficou boa.. mas não ficou como eu queria. Eu peguei arquivos de exemplos que podemos usar. Gostaria que criasse uma interface igual aos arquivos que vou mandar, entretando usando e adaptando nossos componentes para isso. Por exemplo, os arquivos que vou mandar usam Radix.. mas nosso código deve usar nossos componentes do shadcn.. entretanto os nossos componentes devem receber as estilizações dos arquivos que vou enviar para que o design seja o mesmo (neste caso é importante atualizar o design system inteiro para que seja coerente). 

Toda implementação deve ser 100% funcional, estruturada de forma robusta;
 
Já deixe todas as interfaces criadas integradas com nossa API

O código deve ser de alta qualidade respeitando nossos principios aqui estabelecidos, sendo eles:
✅ Clean Code: Código limpo, legível e bem documentado
✅ SOLID: Princípios aplicados (Single Responsibility, Open/Closed, etc)
✅ Componentização Inteligente: Componentes reutilizáveis e compostos
✅ Performance: Hooks otimizados com useCallback, useMemo, debounce e cache
✅ Apenas componentes shadcn: Button, Card, Dialog, Input, Badge, ScrollArea
✅ Design System Respeitado: Glassmorphism, gradientes, bordas arredondadas
✅ 100% Funcional: Busca, notificações, menu de usuário, navegação
✅ Animações: Framer Motion para transições suaves
✅ Responsivo: Grid adaptativo para todos os tamanhos de tela
✅ TypeScript: Totalmente tipado e type-safe

Antes de implementar qualquer solucao analise se aquela é a melhor forma de construir aquele resultado e sempre opte pela melhor forma.

Nosso sistema é um ERP baseado em IA First com um design moderno e futurista.
A estrutura de interface da nossa ERP deve ter:
- Uma Navbar flutuante, com cantos arredondados e fundo de vidro seguindo o glassmorfismo do Vision OS.
-- Modais, alertas, e submenus da navbar devem ficar visualmente sobre a navbar.
- Temos um menu estilo vision OS, que abre submenus que acessa paginas
-- Deve ter um arquivo de condiguração dos menus e submenus para facilitar a implementação
- Temos uma modelo de pagina padrao em que temos:
-- Botao voltar
-- Header em que do lado esquerdo há o titulo, do lado direitos botoes de accoes, seguido de uma busca com filtro
-- Uma seção de estatistica resumida com possibilidade de expandir;
-- A listagem de dados que pode ser feita em forma de grid ou lista;


Nesta primeira etapa de implementação preciso que tenha implementado todo o sistema de gestão de estoque. E todas as páginas necessárias para que toda a nossa API seja minupulada por interface.


Vamos ajustar a estrutura do menu para que ela seja da seguinte forma:
- Início
- Estoque
-- Ativos
--- Templates
--- Produtos
--- Variantes
--- Itens
-- Fornecimento
--- Fornecedores
--- Marcas 
--- Solicitações
-- Armazenamento
- Financeiro (Em breve)
- Vendas (Em breve)
- Caixa (Em breve)
- Produção (Em breve)
- Usuários (Em breve)

Os itens marcados como (Em breve) deve ter um visual inativo e nao pode ser clicavel.
