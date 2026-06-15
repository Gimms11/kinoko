import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchInput, ProductCard } from './DesignSystem';
import { ShoppingBag, Soup, CupSoda, Cookie, Candy, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'ramen' | 'bebidas' | 'snacks' | 'dulces';
  image: string;
  tag?: 'nuevo' | 'popular' | 'importado' | 'oferta';
}

export const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'todos' | 'ramen' | 'bebidas' | 'snacks' | 'dulces'>('todos');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Ramen Buldak Carbonara', price: 13.50, category: 'ramen', tag: 'popular', image: '/ramen_bowl_sticker.png' },
    { id: 2, name: 'Ramen Shin Ramyun Red', price: 11.50, category: 'ramen', tag: 'nuevo', image: '/ramen_bowl_sticker.png' },
    { id: 3, name: 'Bubble Tea Matcha Green Tea', price: 15.00, category: 'bebidas', tag: 'popular', image: '/bubble_tea_sticker.png' },
    { id: 4, name: 'Bubble Tea Taro Milk Tea', price: 14.50, category: 'bebidas', image: '/bubble_tea_sticker.png' },
    { id: 5, name: 'Pocky Matcha Green Tea', price: 8.50, category: 'snacks', tag: 'importado', image: '/pocky_box_sticker.png' },
    { id: 6, name: 'Pocky Strawberry Classic', price: 8.50, category: 'snacks', image: '/pocky_box_sticker.png' },
    { id: 7, name: 'Mochis Surtidos Frutales', price: 12.00, category: 'dulces', tag: 'oferta', image: '/mochis_sticker.png' },
    { id: 8, name: 'Mochi de Chocolate Trufa', price: 14.00, category: 'dulces', image: '/mochis_sticker.png' },
    { id: 9, name: 'Soda de Melón Sangaria', price: 9.50, category: 'bebidas', image: '/bubble_tea_sticker.png' },
    { id: 10, name: 'Ramune Original Soda', price: 12.50, category: 'bebidas', tag: 'popular', image: '/bubble_tea_sticker.png' },
    { id: 11, name: 'Chips de Camote Miel Coreano', price: 7.50, category: 'snacks', image: '/pocky_box_sticker.png' },
    { id: 12, name: 'Pepero Almendras Choco', price: 9.00, category: 'snacks', tag: 'nuevo', image: '/pocky_box_sticker.png' },
    { id: 13, name: 'Gelatina Konjac de Lichi', price: 6.50, category: 'dulces', image: '/mochis_sticker.png' },
    { id: 14, name: 'Ramen Nissin Yakisoba U.F.O.', price: 14.00, category: 'ramen', image: '/ramen_bowl_sticker.png' },
    { id: 15, name: 'Bebida Té Oolong Chino', price: 8.00, category: 'bebidas', image: '/bubble_tea_sticker.png' },
    { id: 16, name: 'Galletas Koala No March Lotte', price: 7.00, category: 'snacks', tag: 'popular', image: '/pocky_box_sticker.png' },
    { id: 17, name: 'Calpis Water Soda Japonesa', price: 11.00, category: 'bebidas', image: '/bubble_tea_sticker.png' },
    { id: 18, name: 'Papas Alga Nori Lays Asia', price: 9.50, category: 'snacks', tag: 'nuevo', image: '/pocky_box_sticker.png' },
    { id: 19, name: 'Ramen Jin Spicy Cup', price: 10.50, category: 'ramen', image: '/ramen_bowl_sticker.png' },
    { id: 20, name: 'Gomitas de Uva Kasugai', price: 9.00, category: 'dulces', tag: 'importado', image: '/mochis_sticker.png' },
  ];

  const handleOrderNotification = () => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFDE4D', '#FF4C4C', '#25D366']
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFDE4D', '#FF4C4C', '#25D366']
    });
  };

  const categories: Array<{ id: typeof activeCategory; name: string }> = [
    { id: 'todos', name: 'TODOS' },
    { id: 'ramen', name: 'RAMEN' },
    { id: 'bebidas', name: 'BEBIDAS' },
    { id: 'snacks', name: 'SNACKS' },
    { id: 'dulces', name: 'DULCES' },
  ];

  const getCategoryIcon = (catId: typeof activeCategory) => {
    const iconSize = 14;
    switch (catId) {
      case 'todos':
        return <ShoppingBag size={iconSize} />;
      case 'ramen':
        return <Soup size={iconSize} />;
      case 'bebidas':
        return <CupSoda size={iconSize} />;
      case 'snacks':
        return <Cookie size={iconSize} />;
      case 'dulces':
        return <Candy size={iconSize} />;
      default:
        return null;
    }
  };

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'todos' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section id="catalogo" className="pt-24 pb-36 md:pb-44 bg-transparent select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4 text-center md:text-left">
            <span className="text-[#FF4C4C] font-black uppercase tracking-widest text-xs flex items-center justify-center md:justify-start gap-1.5 mb-1">
              <ShoppingBag size={14} className="fill-current" /> EXPLORA NUESTRO STOCK
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#1C1917]">
              Favoritos del Market
            </h2>
            <div className="h-1 w-16 bg-[#FFDE4D] rounded-full mx-auto md:mx-0 mt-6"></div>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-80">
            <SearchInput
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Buscar snacks, ramen..."
            />
          </div>
        </div>

        {/* Filter categories buttons */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              data-filter={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-5 py-2 text-sm font-bold rounded-full border transition-all tracking-wide flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-[#FFDE4D] text-[#1C1917] border-[#FFDE4D] shadow-[0_4px_12px_rgba(255,222,77,0.3)]'
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-100 hover:text-stone-800 hover:border-stone-300 cursor-pointer shadow-sm'
              }`}
            >
              {getCategoryIcon(cat.id)}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="popLayout">
          {paginatedProducts.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {paginatedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      category={product.category}
                      image={product.image}
                      tag={product.tag}
                      onOrder={handleOrderNotification}
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Controles de Paginación */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-3 mt-12 select-none">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2.5 text-sm font-fredoka font-bold rounded-2xl border transition-all flex items-center gap-1.5 ${
                      currentPage === 1
                        ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300 cursor-pointer shadow-sm hover:scale-102 active:scale-98'
                    }`}
                  >
                    <ChevronLeft size={16} strokeWidth={3} />
                    <span>Anterior</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center text-sm font-fredoka font-bold rounded-2xl border transition-all ${
                          currentPage === page
                            ? 'bg-[#FFDE4D] text-[#1C1917] border-[#FFDE4D] shadow-[0_4px_12px_rgba(255,222,77,0.3)] scale-105'
                            : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-stone-800 hover:border-stone-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2.5 text-sm font-fredoka font-bold rounded-2xl border transition-all flex items-center gap-1.5 ${
                      currentPage === totalPages
                        ? 'bg-stone-50 text-stone-300 border-stone-100 cursor-not-allowed'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50 hover:border-stone-300 cursor-pointer shadow-sm hover:scale-102 active:scale-98'
                    }`}
                  >
                    <span>Siguiente</span>
                    <ChevronRight size={16} strokeWidth={3} />
                  </button>
                </div>
              )}
            </>
          ) : (
            // Empty State (Kawaii speech bubble styling)
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col items-center justify-center py-16 text-center max-w-md mx-auto"
            >
              <div className="relative mb-6">
                {/* Speech bubble */}
                <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-lg font-fredoka font-bold text-sm text-[#1C1917] relative mb-6">
                  ¡Ups! No encontramos ningún producto... <br />
                  <span className="text-stone-400 font-medium">¿Probamos con otra palabra?</span>
                  <div className="absolute w-4 h-4 bg-white border-r border-b border-stone-200 bottom-[-9px] left-1/2 -translate-x-1/2 rotate-[45deg]"></div>
                </div>
                {/* Mascot waving sticker */}
                <img src="/mascota_waving.png" alt="Mascota" className="w-40 h-40 object-contain mx-auto filter drop-shadow-xl" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
