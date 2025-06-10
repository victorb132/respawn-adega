# DrinkShop - Loja de Bebidas Online

## Descrição do Projeto

A DrinkShop é um site completo de e-commerce para uma loja de bebidas, desenvolvido com Next.js 15, TypeScript e Tailwind CSS. O projeto apresenta um design moderno, responsivo e funcional, com catálogo de produtos, sistema de busca e filtros.

## Tecnologias Utilizadas

- **Next.js 15** - Framework React para desenvolvimento web
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React** - Biblioteca para interfaces de usuário

## Funcionalidades Implementadas

### 🏠 Página Inicial
- Hero section atrativo com call-to-action
- Seção de categorias de produtos
- Seção de benefícios da empresa
- Design responsivo para mobile e desktop

### 📱 Header e Navegação
- Logo da empresa
- Menu de navegação responsivo
- Ícone de carrinho de compras
- Menu mobile com hamburger

### 🛍️ Catálogo de Produtos
- Grid responsivo de produtos
- Sistema de busca em tempo real
- Filtros por categoria e preço
- Ordenação por nome, preço e avaliação
- Cards de produtos com informações detalhadas
- Badges de destaque e desconto
- Sistema de avaliações com estrelas

### 🏢 Página Sobre
- História da empresa
- Valores e missão
- Estatísticas da empresa
- Apresentação da equipe

### 📞 Página de Contato
- Informações de contato completas
- Formulário funcional de contato
- Seção de perguntas frequentes
- Links para redes sociais

### 🎨 Design e UX
- Paleta de cores âmbar/laranja
- Animações e transições suaves
- Efeitos hover interativos
- Tipografia moderna e legível
- Layout responsivo para todos os dispositivos

## Estrutura do Projeto

```
src/
├── app/                    # Páginas do Next.js App Router
│   ├── catalogo/          # Página do catálogo
│   ├── sobre/             # Página sobre a empresa
│   ├── contato/           # Página de contato
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes reutilizáveis
│   ├── Header.tsx         # Cabeçalho do site
│   ├── Footer.tsx         # Rodapé do site
│   ├── ProductCard.tsx    # Card de produto
│   └── Loading.tsx        # Componente de loading
├── data/                  # Dados mock
│   └── products.ts        # Produtos e categorias
└── types/                 # Tipos TypeScript
    └── index.ts           # Interfaces e tipos
```

## Produtos Disponíveis

O catálogo inclui 12 produtos divididos em 4 categorias:

### 🍺 Cervejas
- Cerveja IPA Artesanal Hoppy
- Cerveja Pilsen Premium
- Cerveja Weiss Tradicional

### 🍷 Vinhos
- Vinho Tinto Cabernet Sauvignon
- Vinho Branco Chardonnay
- Espumante Brut Rosé

### 🥃 Destilados
- Whisky Single Malt 12 Anos
- Gin Premium London Dry
- Cachaça Artesanal Envelhecida

### 🥤 Sem Álcool
- Água Mineral Premium
- Suco Natural de Laranja
- Energético Premium

## Como Executar o Projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acessar o site:**
   Abra [http://localhost:3000](http://localhost:3000) no navegador

## Funcionalidades Testadas

✅ Navegação entre páginas
✅ Sistema de busca de produtos
✅ Filtros por categoria e preço
✅ Ordenação de produtos
✅ Responsividade mobile
✅ Formulário de contato
✅ Animações e transições
✅ Performance e carregamento

## Melhorias Futuras

- Sistema de carrinho de compras funcional
- Integração com gateway de pagamento
- Sistema de autenticação de usuários
- Painel administrativo
- Integração com APIs de entrega
- Sistema de avaliações de usuários
- Wishlist de produtos
- Comparação de produtos

## Autor

Projeto desenvolvido como demonstração de habilidades em desenvolvimento web moderno com Next.js, TypeScript e Tailwind CSS.

