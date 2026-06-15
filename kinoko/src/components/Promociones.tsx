import React from 'react';
import { motion } from 'framer-motion';
import { Check, MessageCircle, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Promo {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  badge: string;
  color: string;
  textColor: string;
  items: string[];
  image: string;
  whatsappMessage: string;
}

export const Promociones: React.FC = () => {
  const promos: Promo[] = [
    {
      id: 'combo-anime',
      name: 'Combo Anime',
      price: 24.90,
      originalPrice: 29.50,
      badge: 'EL FAVORITO',
      color: '#FFDE4D', // Yellow
      textColor: '#1C1917',
      items: [
        '1 Ramen instantáneo premium coreano/japonés',
        '1 Bebida refrescante oriental de lata',
        '1 Caja de galletas Pocky clásicas (Fresa/Matcha)'
      ],
      image: '/pocky_box_sticker.png',
      whatsappMessage: '¡Hola! Me interesa pedir el "Combo Anime" (Ramen + Bebida + Pocky) por S/ 24.90.'
    },
    {
      id: 'combo-kawaii',
      name: 'Combo Kawaii',
      price: 19.90,
      originalPrice: 25.00,
      badge: 'SUPER CUTE',
      color: '#F48FB1', // Pink
      textColor: '#1C1917',
      items: [
        '1 Bubble Tea grande de Taro o Matcha natural',
        '1 Delicioso Mochi tradicional de fruta',
        '1 Bolsa de snacks crujientes asiáticos'
      ],
      image: '/bubble_tea_sticker.png',
      whatsappMessage: '¡Hola! Me interesa pedir el "Combo Kawaii" (Bubble Tea + Mochi + Snack) por S/ 19.90.'
    },
    {
      id: 'ramen-lovers',
      name: 'Ramen Lovers',
      price: 39.90,
      originalPrice: 48.00,
      badge: 'PARA DOS',
      color: '#FF4C4C', // Red
      textColor: '#FFFFFF',
      items: [
        '2 Tazones de Ramen personalizados (armados en mesa)',
        '2 Bebidas tradicionales de lata chinas o japonesas',
        '¡Diversión y experiencia de cocina compartida!'
      ],
      image: '/ramen_bowl_sticker.png',
      whatsappMessage: '¡Hola! Me interesa pedir la promoción "Ramen Lovers" para dos personas por S/ 39.90.'
    }
  ];

  const handleOrder = (msg: string) => {
    // Confetti effect!
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFDE4D', '#FF4C4C', '#25D366', '#ffffff']
    });

    const url = `https://wa.me/51934421442?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="promociones" className="py-20 bg-[#FDFBF7] border-b-3 border-[#1C1917] select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#FF4C4C] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Gift size={14} /> Promociones Exclusivas
          </span>
          <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#1C1917]">
            Combos del Mes
          </h2>
          <div className="h-2 w-24 bg-[#FFDE4D] border-sticker-sm rounded-full mx-auto shadow-sticker-sm"></div>
        </div>

        {/* Promos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {promos.map((promo) => (
            <motion.div
              key={promo.id}
              whileHover={{ y: -6, rotate: promo.id === 'combo-kawaii' ? -1 : 1 }}
              className="border-sticker rounded-3xl p-6 shadow-sticker hover:shadow-sticker-lg transition-all relative flex flex-col justify-between"
              style={{ backgroundColor: promo.color, color: promo.textColor }}
            >
              {/* Badge sticker style */}
              <span className="absolute -top-3 right-4 bg-white text-[#1C1917] font-black text-[10px] uppercase tracking-widest px-3 py-1.5 border-sticker-sm rounded-full shadow-sticker-sm rotate-[3deg]">
                {promo.badge}
              </span>

              {/* Title & Image */}
              <div>
                <div className="flex justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-fredoka text-2xl font-black mb-1">{promo.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-fredoka font-black">
                        S/ {promo.price.toFixed(2)}
                      </span>
                      <span className="text-sm line-through opacity-60">
                        S/ {promo.originalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-white border-sticker-sm rounded-2xl p-1.5 flex-shrink-0 flex items-center justify-center">
                    <img src={promo.image} alt={promo.name} className="w-full h-full object-contain animate-float-cute" />
                  </div>
                </div>

                {/* Items list */}
                <ul className="space-y-3 font-outfit text-sm font-semibold opacity-90 border-t border-[#1C1917]/20 pt-4 mb-6">
                  {promo.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="bg-white text-[#1C1917] border-sticker-sm rounded-full p-0.5 flex-shrink-0 mt-0.5">
                        <Check size={10} className="stroke-[4px]" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={() => handleOrder(promo.whatsappMessage)}
                className="w-full py-3 bg-white text-[#1C1917] font-black uppercase tracking-wider rounded-2xl border-sticker shadow-sticker-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} className="fill-emerald-500 text-emerald-500" />
                Pedir Combo por WhatsApp
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
