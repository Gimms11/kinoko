import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, MessageCircle, RefreshCw, Sparkles, Soup } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MushroomLogo } from './DesignSystem';

interface Option {
  id: string;
  name: string;
  price: number;
  weight: number;
  emoji: string; // Used internally for metadata
  detail?: string;
  color?: string; // used for soup color or ingredient specific representations
}

const BASES: Option[] = [
  { id: 'trigo', name: 'Fideos de Trigo (Ramen Clásico)', price: 6.00, weight: 150, emoji: 'trigo', detail: 'Fideos elásticos tradicionales.' },
  { id: 'arroz', name: 'Fideos de Arroz (Sin Gluten)', price: 7.00, weight: 140, emoji: 'arroz', detail: 'Textura ligera, apto para celíacos.' },
  { id: 'udon', name: 'Fideos Udon Gruesos', price: 8.00, weight: 180, emoji: 'udon', detail: 'Fideos gruesos y muy suaves.' },
];

const PROTEINAS: Option[] = [
  { id: 'chashu', name: 'Cerdo Chashu (Braseado)', price: 6.50, weight: 60, emoji: 'chashu', detail: 'Tocino de cerdo marinado y tierno.' },
  { id: 'pollo', name: 'Pollo Teriyaki', price: 5.50, weight: 60, emoji: 'pollo', detail: 'Pechuga de pollo glaseada con salsa teriyaki.' },
  { id: 'tofu', name: 'Tofu Frito (Agedashi)', price: 4.50, weight: 50, emoji: 'tofu', detail: 'Tofu frito, crocante por fuera y suave por dentro.' },
  { id: 'tempura', name: 'Langostino Tempura', price: 8.00, weight: 50, emoji: 'tempura', detail: 'Langostino rebozado frito al estilo japonés.' },
];

const TOPPINGS: Option[] = [
  { id: 'ajitama', name: 'Huevo Ajitama (Marinado)', price: 3.00, weight: 50, emoji: 'ajitama', detail: 'Huevo semicocido con yema cremosa.' },
  { id: 'naruto', name: 'Pastel Narutomaki', price: 2.50, weight: 20, emoji: 'naruto', detail: 'Famoso pastel de pescado japonés.' },
  { id: 'cebollin', name: 'Cebollín Fresco', price: 1.50, weight: 10, emoji: 'cebollin', detail: 'Aporta frescura e intensidad.' },
  { id: 'nori', name: 'Algas Nori Crujientes', price: 2.00, weight: 5, emoji: 'nori', detail: 'Hojas de alga marina tostada.' },
  { id: 'shiitake', name: 'Hongos Shiitake Cocidos', price: 3.50, weight: 30, emoji: 'shiitake', detail: 'Sabor umami tradicional.' },
  { id: 'maiz', name: 'Maíz Dulce', price: 2.00, weight: 25, emoji: 'maiz', detail: 'Toque dulce y crocante.' },
];

const SALSAS: Option[] = [
  { id: 'shoyu', name: 'Caldo Shoyu (Soja Clásica)', price: 4.00, weight: 250, emoji: 'shoyu', detail: 'Caldo ligero a base de soja y dashi.', color: 'rgba(120, 54, 4, 0.55)' },
  { id: 'tonkotsu', name: 'Caldo Tonkotsu (Cerdo Cremoso)', price: 5.00, weight: 250, emoji: 'tonkotsu', detail: 'Caldo espeso y reconfortante de cerdo.', color: 'rgba(242, 235, 222, 0.9)' },
  { id: 'miso', name: 'Caldo Miso (Pasta de Soja)', price: 4.50, weight: 250, emoji: 'miso', detail: 'Caldo fermentado de soja con gran cuerpo.', color: 'rgba(196, 153, 93, 0.7)' },
  { id: 'buldak', name: 'Caldo Spicy Buldak (Picante)', price: 5.50, weight: 250, emoji: 'buldak', detail: '¡Caldo súper picante extremo coreano!', color: 'rgba(220, 38, 38, 0.85)' },
];

// ==========================================
// CUSTOM STYLIZED SVG INGREDIENT ICONS
// ==========================================



// Map Option ID to clean Lucide / SVG Icon
const OptionIcon: React.FC<{ id: string; className?: string }> = ({ id }) => {
  let emoji = '🥣';
  switch (id) {
    // Bases
    case 'trigo':
      emoji = '🍜';
      break;
    case 'arroz':
      emoji = '🍚';
      break;
    case 'udon':
      emoji = '🥢';
      break;
    // Proteínas
    case 'chashu':
      emoji = '🥓';
      break;
    case 'pollo':
      emoji = '🍗';
      break;
    case 'tofu':
      emoji = '🧀';
      break;
    case 'tempura':
      emoji = '🍤';
      break;
    // Toppings
    case 'ajitama':
      emoji = '🥚';
      break;
    case 'naruto':
      emoji = '🍥';
      break;
    case 'cebollin':
      emoji = '🌱';
      break;
    case 'nori':
      emoji = '🍙';
      break;
    case 'shiitake':
      emoji = '🍄';
      break;
    case 'maiz':
      emoji = '🌽';
      break;
    // Salsas
    case 'shoyu':
      emoji = '🥣';
      break;
    case 'tonkotsu':
      emoji = '🍲';
      break;
    case 'miso':
      emoji = '🍵';
      break;
    case 'buldak':
      emoji = '🌶️';
      break;
  }
  return (
    <span className="text-2xl select-none" role="img" aria-label={id}>
      {emoji}
    </span>
  );
};

// ==========================================
// STEAM EFFECT COMPONENT
// ==========================================
interface SteamEffectProps {
  active: boolean;
}

const SteamEffect: React.FC<SteamEffectProps> = ({ active }) => {
  if (!active) return null;
  return (
    <div
      style={{ bottom: '130px' }}
      className="absolute left-1/2 -translate-x-1/2 flex gap-8 z-[50] pointer-events-none"
    >
      {[
        { delay: 0, duration: 2.5, y: [0, -90], scale: [0.9, 1.4, 0.9] },
        { delay: 0.4, duration: 2.8, y: [10, -80], scale: [0.8, 1.3, 0.8] },
        { delay: 0.8, duration: 2.2, y: [5, -100], scale: [1.0, 1.5, 1.0] },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          animate={{ y: item.y, opacity: [0, 0.8, 0], scale: item.scale }}
          transition={{ repeat: Infinity, duration: item.duration, ease: 'easeOut', delay: item.delay }}
        >
          <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-16">
            <defs>
              <linearGradient id={`steamGrad-${idx}`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M12 48 C4 36, 20 24, 12 12 C4 0, 20 0, 12 0"
              stroke={`url(#steamGrad-${idx})`}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

// ==========================================
// SOUP GRADIENTS REGISTRATION
// ==========================================
const SoupGradDefs: React.FC = () => (
  <svg className="absolute w-0 h-0" width="0" height="0">
    <defs>
      <linearGradient id="soup-shoyu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8B4513" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#4A2206" stopOpacity="0.95" />
      </linearGradient>
      <linearGradient id="soup-tonkotsu" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F9F6F0" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#E3D6C5" stopOpacity="0.98" />
      </linearGradient>
      <linearGradient id="soup-miso" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CF9F64" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#8E5E2C" stopOpacity="0.98" />
      </linearGradient>
      <linearGradient id="soup-buldak" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#851313" stopOpacity="0.98" />
      </linearGradient>
    </defs>
  </svg>
);

// ==========================================
// BOILING SOUP BUBBLES & OIL DROPS
// ==========================================
const SoupBubbles: React.FC = () => {
  return (
    <div className="absolute bottom-16 left-[15%] right-[15%] h-12 z-[13] overflow-hidden pointer-events-none">
      {/* Burbujas que suben y explotan */}
      <motion.div
        animate={{
          y: [25, -15],
          x: [0, 6, -6, 2],
          scale: [0.4, 1, 1.2, 0],
          opacity: [0, 0.6, 0.8, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeOut', delay: 0.1 }}
        className="w-2.5 h-2.5 rounded-full bg-white/40 border border-white/20 absolute left-6 bottom-0"
      />
      <motion.div
        animate={{
          y: [25, -20],
          x: [0, -4, 5, -2],
          scale: [0.3, 0.8, 1.0, 0],
          opacity: [0, 0.5, 0.7, 0],
        }}
        transition={{ repeat: Infinity, duration: 2.3, ease: 'easeOut', delay: 0.7 }}
        className="w-2 h-2 rounded-full bg-white/30 border border-white/10 absolute right-12 bottom-0"
      />
      <motion.div
        animate={{
          y: [25, -18],
          x: [0, 4, -4, 0],
          scale: [0.5, 1.0, 1.3, 0],
          opacity: [0, 0.7, 0.9, 0],
        }}
        transition={{ repeat: Infinity, duration: 3.1, ease: 'easeOut', delay: 1.3 }}
        className="w-3 h-3 rounded-full bg-white/45 border border-white/20 absolute left-1/2 bottom-0"
      />
      {/* Gotitas de grasa/aceite de ramen */}
      <motion.div
        animate={{
          scale: [0.9, 1.05, 0.9, 1.05],
          x: [0, 2, -2, 0],
          y: [0, 1, -1, 0]
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        className="w-4.5 h-3 rounded-full bg-[#FFDE4D]/25 absolute left-12 bottom-2"
      />
      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95, 1.1],
          x: [0, -2, 2, 0],
          y: [0, -1, 1, 0]
        }}
        transition={{ repeat: Infinity, duration: 5.2, ease: 'easeInOut', delay: 0.6 }}
        className="w-3.5 h-2.5 rounded-full bg-[#FFDE4D]/20 absolute right-18 bottom-4"
      />
      <motion.div
        animate={{
          scale: [0.85, 1.0, 0.85, 1.0],
          x: [0, 1.5, -1.5, 0]
        }}
        transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 1.2 }}
        className="w-3 h-2 rounded-full bg-[#FFDE4D]/15 absolute left-1/3 bottom-5"
      />
    </div>
  );
};

export const RamenBuilder: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<Option | null>(null);
  const [selectedProteina, setSelectedProteina] = useState<Option | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Option[]>([]);
  const [selectedSalsa, setSelectedSalsa] = useState<Option | null>(null);

  // Calculate current price and weight
  const basePrice = selectedBase?.price || 0;
  const proteinaPrice = selectedProteina?.price || 0;
  const toppingsPrice = selectedToppings.reduce((sum, item) => sum + item.price, 0);
  const salsaPrice = selectedSalsa?.price || 0;
  const totalPrice = basePrice + proteinaPrice + toppingsPrice + salsaPrice;

  const baseWeight = selectedBase?.weight || 0;
  const proteinaWeight = selectedProteina?.weight || 0;
  const toppingsWeight = selectedToppings.reduce((sum, item) => sum + item.weight, 0);
  const salsaWeight = selectedSalsa?.weight || 0;
  const totalWeight = baseWeight + proteinaWeight + toppingsWeight + salsaWeight;

  const isComplete = selectedBase && selectedProteina && selectedToppings.length > 0 && selectedSalsa;

  const hasIngredients = !!(selectedBase || selectedProteina || selectedToppings.length > 0 || selectedSalsa);

  const bowlStyle: React.CSSProperties = hasIngredients ? {
    maskImage: 'radial-gradient(circle at 50% -70%, transparent 50%, black 80%)',
    WebkitMaskImage: 'radial-gradient(circle at 50% -70%, transparent 50%, black 80%)',
    opacity: 0.9,
    transition: 'all 0.5s ease-in-out'
  } : {
    opacity: 1,
    transition: 'all 0.5s ease-in-out'
  };

  const handleToggleTopping = (topping: Option) => {
    if (selectedToppings.some(item => item.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(item => item.id !== topping.id));
    } else {
      if (selectedToppings.length < 3) {
        setSelectedToppings([...selectedToppings, topping]);
      }
    }
  };

  const handleReset = () => {
    setSelectedBase(null);
    setSelectedProteina(null);
    setSelectedToppings([]);
    setSelectedSalsa(null);
    setStep(1);
  };

  const handleOrderWhatsApp = () => {
    if (!isComplete) return;

    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.65 }
    });

    const toppingsStr = selectedToppings.map(t => `${t.name}`).join(', ');
    const msg = `¡Hola! Acabo de armar mi tazón de Ramen personalizado en la web de Kinoko:\n\n` +
      `- Base de Fideos: ${selectedBase.name}\n` +
      `- Proteína: ${selectedProteina.name}\n` +
      `- Toppings: ${toppingsStr}\n` +
      `- Caldo/Salsa: ${selectedSalsa.name}\n\n` +
      `- Peso estimado: ${totalWeight}g\n` +
      `- Precio final: S/ ${totalPrice.toFixed(2)}\n\n` +
      `¡Por favor, confírmenme el pedido!`;

    const url = `https://wa.me/51934421442?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const nextStep = () => {
    if (step === 1 && !selectedBase) return;
    if (step === 2 && !selectedProteina) return;
    if (step === 3 && selectedToppings.length === 0) return;
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Determine current choices list based on step
  const renderStepChoices = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-black font-fredoka text-[#1C1917] mb-2">Paso 1: Elige tu Base de Fideos</h3>
            <div className="grid grid-cols-1 gap-3">
              {BASES.map((opt) => (
                <motion.div
                  key={opt.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedBase(opt)}
                  className={`p-4 border-sticker-sm rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                    selectedBase?.id === opt.id
                      ? 'bg-[#FFDE4D] shadow-sticker-sm translate-x-[-2px] translate-y-[-2px]'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FDFBF7] border-2 border-[#1C1917] rounded-xl flex items-center justify-center p-1.5 shadow-sticker-sm">
                      <OptionIcon id={opt.id} className="w-full h-full text-[#1C1917]" />
                    </div>
                    <div>
                      <h4 className="font-fredoka font-black text-sm text-[#1C1917]">{opt.name}</h4>
                      <p className="text-xs text-[#1C1917]/60">{opt.detail}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-black text-[#FF4C4C] block">+S/ {opt.price.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-stone-400 block">{opt.weight}g</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-black font-fredoka text-[#1C1917] mb-2">Paso 2: Elige tu Proteína</h3>
            <div className="grid grid-cols-1 gap-3">
              {PROTEINAS.map((opt) => (
                <motion.div
                  key={opt.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedProteina(opt)}
                  className={`p-4 border-sticker-sm rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                    selectedProteina?.id === opt.id
                      ? 'bg-[#FFDE4D] shadow-sticker-sm translate-x-[-2px] translate-y-[-2px]'
                      : 'bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FDFBF7] border-2 border-[#1C1917] rounded-xl flex items-center justify-center p-1 shadow-sticker-sm">
                      <OptionIcon id={opt.id} className="w-full h-full" />
                    </div>
                    <div>
                      <h4 className="font-fredoka font-black text-sm text-[#1C1917]">{opt.name}</h4>
                      <p className="text-xs text-[#1C1917]/60">{opt.detail}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-black text-[#FF4C4C] block">+S/ {opt.price.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-stone-400 block">{opt.weight}g</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-black font-fredoka text-[#1C1917]">Paso 3: Toppings (Elige hasta 3)</h3>
              <span className="text-xs font-black bg-stone-900 text-[#FFDE4D] px-3 py-1 rounded-xl shadow-sticker-sm">
                {selectedToppings.length}/3 elegidos
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPPINGS.map((opt) => {
                const isSelected = selectedToppings.some(item => item.id === opt.id);
                const isDisabled = !isSelected && selectedToppings.length >= 3;
                return (
                  <motion.div
                    key={opt.id}
                    whileHover={!isDisabled ? { y: -2 } : {}}
                    onClick={() => !isDisabled && handleToggleTopping(opt)}
                    className={`p-4 border-sticker-sm rounded-2xl transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FFDE4D] shadow-[0_4px_14px_rgba(228,205,58,0.35)] border-[#E4CD3A]'
                        : isDisabled
                          ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200'
                          : 'bg-white hover:bg-stone-50 cursor-pointer border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-[#FDFBF7] border border-stone-200 rounded-xl flex items-center justify-center p-1 shadow-sm">
                        <OptionIcon id={opt.id} className="w-full h-full" />
                      </div>
                      <div>
                        <h4 className="font-fredoka font-black text-sm text-[#1C1917]">{opt.name}</h4>
                        <p className="text-[10px] text-[#1C1917]/60 leading-tight">{opt.detail}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1 border-t border-[#1C1917]/10 pt-2">
                      <span className="text-xs font-black text-[#FF4C4C]">+S/ {opt.price.toFixed(2)}</span>
                      <span className="text-[10px] font-bold text-stone-400">{opt.weight}g</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-black font-fredoka text-[#1C1917] mb-2">Paso 4: Elige tu Caldo / Salsa</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SALSAS.map((opt) => (
                  <motion.div
                    key={opt.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelectedSalsa(opt)}
                    className={`p-4 border border-stone-200 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                      selectedSalsa?.id === opt.id
                        ? 'bg-[#FFDE4D] shadow-[0_4px_14px_rgba(228,205,58,0.35)] border-[#E4CD3A]'
                        : 'bg-white hover:bg-stone-50 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#FDFBF7] border border-stone-200 rounded-xl flex items-center justify-center p-1.5 shadow-sm">
                        <OptionIcon id={opt.id} className="w-full h-full text-[#1C1917]" />
                      </div>
                      <div>
                        <h4 className="font-fredoka font-black text-sm text-[#1C1917]">{opt.name}</h4>
                        <p className="text-[10px] text-[#1C1917]/60 leading-tight">{opt.detail}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <span className="text-xs font-black text-[#FF4C4C] block">+S/ {opt.price.toFixed(2)}</span>
                      <span className="text-[9px] font-bold text-stone-400 block">{opt.weight}g</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ESTADO FINAL: Receipt Ticket shown in the selector panel when complete */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50/50 border border-stone-200 p-5 rounded-2xl relative border-t-4 border-t-[#FF4C4C] shadow-[0_4px_20px_rgba(0,0,0,0.06)] font-mono text-xs text-[#1C1917] space-y-3 mt-4"
              >
                <div className="absolute top-2 right-2 rotate-[6deg]">
                  <Sparkles size={16} className="text-[#FFDE4D] fill-[#FFDE4D]" />
                </div>
                
                <div className="text-center space-y-1">
                  <div className="font-fredoka font-black uppercase text-sm tracking-wider flex items-center justify-center gap-1">
                    <MushroomLogo className="w-5 h-5" />
                    Kinoko Ramen House
                  </div>
                  <div className="text-[9px] opacity-60 uppercase">Av. Los Tulipanes - Frente a la UTP</div>
                </div>

                <div className="border-b border-dashed border-[#1C1917]/25 pb-2 pt-1 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>DETALLE</span>
                    <span>PRECIO</span>
                  </div>
                </div>

                <div className="space-y-1.5 opacity-90 text-[11px]">
                  <div className="flex justify-between">
                    <span>1x Fideos ({selectedBase.name.split(' (')[0]})</span>
                    <span>S/ {selectedBase.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1x Proteína ({selectedProteina.name.split(' (')[0]})</span>
                    <span>S/ {selectedProteina.price.toFixed(2)}</span>
                  </div>
                  {selectedToppings.map(t => (
                    <div key={t.id} className="flex justify-between pl-2">
                      <span>+ {t.name.split(' (')[0]}</span>
                      <span>S/ {t.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between">
                    <span>1x Caldo ({selectedSalsa.name.split(' (')[0]})</span>
                    <span>S/ {selectedSalsa.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-[#1C1917]/25 pt-2 flex justify-between font-fredoka font-black text-sm text-[#FF4C4C]">
                  <span>TOTAL ESTIMADO:</span>
                  <span>S/ {totalPrice.toFixed(2)}</span>
                </div>

                {/* Simulated barcode */}
                <div className="pt-2 flex justify-center items-center gap-0.5 opacity-40 select-none">
                  <div className="w-1.5 h-7 bg-black"></div>
                  <div className="w-0.5 h-7 bg-black"></div>
                  <div className="w-2.5 h-7 bg-black"></div>
                  <div className="w-1 h-7 bg-black"></div>
                  <div className="w-0.5 h-7 bg-black"></div>
                  <div className="w-2 h-7 bg-black"></div>
                  <div className="w-0.5 h-7 bg-black"></div>
                  <div className="w-1.5 h-7 bg-black"></div>
                </div>
              </motion.div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="ramen-builder" className="pt-20 pb-32 md:pb-44 bg-transparent select-none">
      <SoupGradDefs />
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#FFDE4D] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Soup size={14} className="fill-current" /> Experiencia Ramen Builder
          </span>
          <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-white">
            Configurador de Ramen
          </h2>
          <div className="h-1 w-16 bg-[#FFDE4D] rounded-full mx-auto"></div>
        </div>

        {/* Builder Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch ">
          
          {/* Left Column: Visual Bowl Simulator */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-stone-300 rounded-3xl p-6 shadow-[8px_8px_rgba(0,0,0,0.10)] relative">
            <h3 className="font-fredoka text-base font-black text-[#1C1917] text-center mb-6 uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Soup size={16} /> Tu Tazón de Ramen
            </h3>

            {/* BOWL SIMULATOR AREA */}
            <div className="relative h-72 sm:h-96 w-full flex items-center justify-center border-2 border-dashed border-[#1C1917]/10 rounded-2xl mb-6 bg-[#FDFBF7] overflow-hidden">
              <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#1c1917_2px,transparent_2px)] [background-size:12px_12px]"></div>

              {/* ESTADO VACÍO (Empty State inside the bowl) */}
              {!selectedBase && !selectedProteina && selectedToppings.length === 0 && !selectedSalsa && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 space-y-4">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="bg-[#FFDE4D] border border-[#E4CD3A] p-4 rounded-2xl shadow-[0_4px_16px_rgba(228,205,58,0.3)] font-fredoka font-bold text-xs text-[#1C1917] relative rotate-[-2deg]"
                  >
                    ¡Tu tazón está vacío! <br />
                    Elige la base de fideos para empezar.
                    <div className="absolute w-3 h-3 bg-[#FFDE4D] border-r border-b border-[#E4CD3A] bottom-[-7px] left-1/2 -translate-x-1/2 rotate-[45deg]"></div>
                  </motion.div>
                  <img src="/mascota_waving.png" alt="Mascota" className="w-28 h-28 object-contain filter drop-shadow-[3px_3px_0px_#1C1917] animate-float-cute" />
                </div>
              )}

              {/* ESTADO FINAL: Complete banner overlay */}
              {isComplete && (
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: -4 }}
                  className="absolute top-4 left-4 z-[35] bg-[#FFDE4D] border border-[#E4CD3A] px-3 py-1.5 rounded-xl shadow-[0_4px_12px_rgba(228,205,58,0.35)] font-fredoka font-bold text-[10px] tracking-wider uppercase flex items-center gap-1 text-[#1C1917]"
                >
                  <Sparkles size={10} className="fill-current" /> SERVIDO
                </motion.div>
              )}

              {/* Nori Sheet at the back (z-5) */}
              <AnimatePresence>
                {selectedToppings.some(t => t.id === 'nori') && (
                  <motion.div
                    key="nori"
                    initial={{ y: -150, opacity: 0, rotate: -15 }}
                    animate={{ y: 0, opacity: 1, rotate: -8 }}
                    exit={{ y: -150, opacity: 0 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="absolute bottom-28 left-[18%] z-[5]"
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 5,
                        ease: "easeInOut"
                      }}
                      className="bg-[#1C1917] border border-stone-700 w-16 h-20 rounded-md shadow-md flex items-center justify-center text-stone-500 font-bold select-none"
                    >
                      <div className="w-12 h-16 border border-dashed border-white/20 rounded flex flex-col justify-around p-1 opacity-60">
                        <div className="h-0.5 bg-white/10 w-full rounded"></div>
                        <div className="h-0.5 bg-white/10 w-3/4 rounded"></div>
                        <div className="h-0.5 bg-white/10 w-5/6 rounded"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Soup Layer (sitting inside the bowl, fills dynamically with wavy liquid surface) */}
              <AnimatePresence>
                {selectedSalsa && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute bottom-15.75 left-[8%] right-[8%] h-18 w-[84%] rounded-b-[2.2rem] origin-bottom z-[12] overflow-hidden"
                  >
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full block">
                      <motion.path
                        d="M0,10 Q25,5 50,10 T100,10 L100,30 L0,30 Z"
                        fill={`url(#soup-${selectedSalsa.id})`}
                        animate={{
                          d: [
                            "M0,10 Q25,6 50,10 T100,10 L100,30 L0,30 Z",
                            "M0,10 Q25,12 50,9 T100,10 L100,30 L0,30 Z",
                            "M0,10 Q25,6 50,10 T100,10 L100,30 L0,30 Z"
                          ]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Soup highlight lines (glimmering fat/broth lines) */}
                      <motion.path
                        d="M0,10 Q25,5 50,10 T100,10"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="0.8"
                        fill="none"
                        animate={{
                          d: [
                            "M0,10 Q25,6 50,10 T100,10",
                            "M0,10 Q25,12 50,9 T100,10",
                            "M0,10 Q25,6 50,10 T100,10"
                          ]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 4,
                          ease: "easeInOut"
                        }}
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Soup Bubbles (gurgling when soup is active) */}
              {selectedSalsa && <SoupBubbles />}

              {/* Wavy Noodles Layer (Custom SVG path representation) */}
              <AnimatePresence>
                {selectedBase && (
                  <motion.div
                    key={`noodles-${selectedBase.id}`}
                    initial={{ y: -200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -200, opacity: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="absolute bottom-16 left-[14%] right-[14%] w-[72%] h-20 z-[15] select-none pointer-events-none"
                  >
                    <motion.div
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4.2,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full"
                    >
                      <svg viewBox="0 0 200 80" className="w-full h-full fill-none">
                        <path d="M 10 30 Q 30 10 50 30 T 90 30 T 130 30 T 170 30" stroke="#FFDE4D" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M 15 40 Q 35 20 55 40 T 95 40 T 135 40 T 175 40" stroke="#FFD034" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M 20 50 Q 40 30 60 50 T 100 50 T 140 50 T 180 50" stroke="#FFC000" strokeWidth="4.5" strokeLinecap="round" />
                        <path d="M 8 20 Q 28 0 48 20 T 88 20 T 128 20 T 168 20" stroke="#FFDE4D" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />
                        <path d="M 25 35 Q 45 15 65 35 T 105 35 T 145 35 T 185 35" stroke="#FFE885" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Protein Layer (Sticker framed round badge) */}
              <AnimatePresence>
                {selectedProteina && (
                  <motion.div
                    key={`protein-${selectedProteina.id}`}
                    initial={{ y: -220, opacity: 0, rotate: -30 }}
                    animate={{ y: 0, opacity: 1, rotate: -12 }}
                    exit={{ y: -220, opacity: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 100 }}
                    className="absolute bottom-22 left-[18%] z-[20] select-none"
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                        rotate: [0, -3, 3, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.8,
                        ease: "easeInOut"
                      }}
                      className="w-14 h-14 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-md filter drop-shadow-md"
                    >
                      <OptionIcon id={selectedProteina.id} className="w-10 h-10" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toppings Layer (Circular sticker frames, positioned distinctively) */}
              <AnimatePresence>
                {selectedToppings.filter(t => t.id !== 'nori').map((top, index) => {
                  const positions = [
                    { className: 'bottom-24 right-[16%]', rotate: 12 },
                    { className: 'bottom-28 left-[40%]', rotate: -6 },
                    { className: 'bottom-18 right-[36%]', rotate: 22 },
                    { className: 'bottom-22 left-[30%]', rotate: 8 },
                    { className: 'bottom-20 right-[22%]', rotate: -15 },
                  ];
                  const pos = positions[index % positions.length];

                  return (
                    <motion.div
                      key={top.id}
                      initial={{ y: -250, opacity: 0, scale: 0.5, rotate: pos.rotate }}
                      animate={{ y: 0, opacity: 1, scale: 1, rotate: pos.rotate }}
                      exit={{ y: -250, opacity: 0 }}
                      transition={{ type: 'spring', damping: 10, delay: index * 0.08 }}
                      className={`absolute z-[25] select-none ${pos.className}`}
                    >
                      <motion.div
                        animate={{
                          y: [0, -4, 0],
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3 + index * 0.5,
                          ease: "easeInOut",
                          delay: index * 0.2
                        }}
                        className="w-12 h-12 bg-white border border-stone-200 rounded-full flex items-center justify-center shadow-sm filter drop-shadow-sm"
                      >
                        <OptionIcon id={top.id} className="w-8 h-8" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Ramen Bowl Shape Sticker with Japanese design */}
              <div
                style={bowlStyle}
                className="absolute bottom-6 left-[8%] right-[8%] h-28 border border-stone-200 rounded-b-[4.5rem] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-[30] flex flex-col justify-end pb-3 items-center overflow-hidden"
              >
                {/* Decorative border checker striping */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-[#FF4C4C] flex justify-around items-center overflow-hidden">
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                  <div className="w-4 h-full bg-[#FFDE4D] rotate-12"></div>
                </div>

                <div className="w-full border-t-2 border-dashed border-[#FF4C4C]/50 pt-2 text-center font-fredoka text-[15px] font-black tracking-widest text-[#1C1917]/60 z-[10]">
                  KINOKO RAMEN HOUSE
                </div>
              </div>

              {/* Steam bubbles */}
              <SteamEffect active={!!selectedSalsa} />
            </div>

            {/* WEIGHT & PRICE INDICATORS */}
            <div className="grid grid-cols-2 gap-4 border-t border-dashed border-stone-200 pt-4 font-fredoka">
              <div className="p-3 bg-stone-100 border border-stone-300 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Peso Estimado</span>
                <span className="text-xl font-black text-[#1C1917]">{totalWeight}g</span>
              </div>
              <div className="p-3 bg-[#FFDE4D]/10 border border-[#E4CD3A]/30 rounded-2xl text-center">
                <span className="text-[10px] font-bold text-stone-400 block uppercase">Precio Total</span>
                <span className="text-xl font-black text-[#FF4C4C]">S/ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Steps Control */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-stone-300 rounded-3xl p-6 shadow-[8px_8px_rgba(0,0,0,0.10)] relative">
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center mb-8 border-b-2 border-[#1C1917]/10 pb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full border border-stone-200 font-fredoka font-bold flex items-center justify-center text-xs transition-colors shadow-sm ${
                      step === s
                        ? 'bg-[#FFDE4D] text-[#1C1917]'
                        : step > s
                          ? 'bg-[#25D366] text-white'
                          : 'bg-stone-100 text-[#1C1917]/40'
                    }`}
                  >
                    {step > s ? <Check size={14} className="stroke-[3px]" /> : s}
                  </div>
                  <span
                    className={`hidden sm:inline font-fredoka text-xs font-black uppercase tracking-wider ${
                      step === s ? 'text-[#1C1917]' : 'text-[#1C1917]/40'
                    }`}
                  >
                    {s === 1 ? 'Fideos' : s === 2 ? 'Proteína' : s === 3 ? 'Toppings' : 'Caldo'}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Choices Area */}
            <div className="flex-grow min-h-[300px] mb-8">
              {renderStepChoices()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between border-t-2 border-[#1C1917]/10 pt-4">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-stone-200 rounded-xl bg-white hover:bg-stone-50 shadow-sm font-fredoka font-medium text-xs uppercase tracking-wider text-[#1C1917] cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft size={14} /> Atrás
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 border border-stone-200 rounded-xl bg-stone-100 hover:bg-stone-200 shadow-sm font-fredoka font-medium text-xs uppercase tracking-wider text-stone-600 cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw size={14} /> Reiniciar
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={(step === 1 && !selectedBase) || (step === 2 && !selectedProteina) || (step === 3 && selectedToppings.length === 0)}
                  className={`px-5 py-2.5 border rounded-xl font-fredoka font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5 transition-all ${
                    ((step === 1 && !selectedBase) || (step === 2 && !selectedProteina) || (step === 3 && selectedToppings.length === 0))
                      ? 'bg-stone-200 text-stone-400 border-stone-200 shadow-none cursor-not-allowed'
                      : 'bg-[#FFDE4D] text-[#1C1917] border-[#E4CD3A] shadow-[0_4px_12px_rgba(228,205,58,0.35)] hover:shadow-[0_6px_18px_rgba(228,205,58,0.45)]'
                  }`}
                >
                  Siguiente <ArrowRight size={14} />
                </button>
              ) : (
                <button
                  onClick={handleOrderWhatsApp}
                  disabled={!isComplete}
                  className={`px-6 py-3 border rounded-2xl font-fredoka font-bold text-sm uppercase tracking-wider cursor-pointer flex items-center gap-2 transition-all ${
                    !isComplete
                      ? 'bg-stone-200 text-stone-400 border-stone-200 shadow-none cursor-not-allowed'
                      : 'bg-[#25D366] text-white border-[#1fa855] shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)]'
                  }`}
                >
                  <MessageCircle size={18} className="fill-current" />
                  Pedir por WhatsApp
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
