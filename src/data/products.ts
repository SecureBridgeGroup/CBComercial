// src/data/products.ts
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;   // R$
  image: string;
  category: string;
  slug?: string;
  unidade?: string;
  peso?: string;
  marca?: string;
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

// helper para montar o caminho correto considerando o BASE_URL (ex.: /CBComercial/)
const img = (n: number) => `${import.meta.env.BASE_URL}product/produto${n}.jpg`;

export const productsSeed: Product[] = [
  {
    id: 'arroz-5kg',
    name: 'Arroz Branco Tipo 1 5kg',
    description: 'Arroz grão longo, rende bem e solto.',
    price: 25.99,
    image: img(1),
    category: 'Mercearia',
    unidade: 'Pacote',
    peso: '5kg',
    marca: 'Cereal Bom',
  },
  {
    id: 'feijao-1kg',
    name: 'Feijão Carioca 1kg',
    description: 'Grãos selecionados, cozimento uniforme.',
    price: 12.99,
    image: img(2),
    category: 'Mercearia',
    unidade: 'Pacote',
    peso: '1kg',
    marca: 'Sabor Real',
  },
  {
    id: 'oleo-soja-900',
    name: 'Óleo de Soja 900ml',
    description: 'Refinado, ideal para preparo diário.',
    price: 8.99,
    image: img(3),
    category: 'Mercearia',
    unidade: 'Garrafa',
    peso: '900ml',
    marca: 'NutriVida',
  },
  {
    id: 'acucar-5kg',
    name: 'Açúcar Refinado 5kg',
    description: 'Açúcar refinado de alta qualidade.',
    price: 22.5,
    image: img(4),
    category: 'Mercearia',
    unidade: 'Pacote',
    peso: '5kg',
    marca: 'Doce Lar',
  },
  {
    id: 'cafe-500',
    name: 'Café Torrado e Moído 500g',
    description: 'Blend equilibrado, torra média.',
    price: 15.9,
    image: img(5),
    category: 'Bebidas/Quentes',
    unidade: 'Pacote',
    peso: '500g',
    marca: 'Serra Alta',
  },
  {
    id: 'agua-500',
    name: 'Água Mineral 500ml (c/ 12un)',
    description: 'Sem gás, embalagem econômica.',
    price: 18.0,
    image: img(6),
    category: 'Bebidas',
    unidade: 'Fardo',
    peso: '12x500ml',
    marca: 'Fonte Pura',
  },
  {
    id: 'refrigerante-2l',
    name: 'Refrigerante Cola 2L',
    description: 'Sabor cola, linha econômica.',
    price: 7.5,
    image: img(7),
    category: 'Bebidas',
    unidade: 'Garrafa',
    peso: '2L',
    marca: 'ColaMix',
  },
  {
    id: 'sabao-po-5kg',
    name: 'Sabão em Pó 5kg',
    description: 'Limpeza profunda, rende muito.',
    price: 38.9,
    image: img(8),
    category: 'Limpeza',
    unidade: 'Pacote',
    peso: '5kg',
    marca: 'Brilho',
  },
  {
    id: 'detergente-500',
    name: 'Detergente Neutro 500ml',
    description: 'Não agride as mãos, alto rendimento.',
    price: 3.49,
    image: img(9),
    category: 'Limpeza',
    unidade: 'Frasco',
    peso: '500ml',
    marca: 'LimpMax',
  },
  {
    id: 'papel-higienico-12',
    name: 'Papel Higiênico 12 rolos',
    description: 'Folha dupla, macio e resistente.',
    price: 21.9,
    image: img(10),
    category: 'Higiene',
    unidade: 'Fardo',
    peso: '12 rolos',
    marca: 'Comforto',
  },
];

// helpers
export const allProducts = productsSeed.map(p => ({ ...p, slug: p.slug ?? slugify(p.name) }));
export const listCategories = () => Array.from(new Set(allProducts.map(p => p.category)));
export const getBySlug = (slug: string) => allProducts.find(p => p.slug === slug);
export const getByCategorySlug = (catSlug: string) =>
  allProducts.filter(p => slugify(p.category) === catSlug);
