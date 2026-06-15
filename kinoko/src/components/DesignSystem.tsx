import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Search, Plus, Minus, MessageCircle, Sparkles, Flame, Globe, Gift, Tag, ArrowRight } from 'lucide-react';

// ==========================================
// 0. LOGO (Custom Kawaii Mushroom)
// ==========================================
export const MushroomLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Stem (pie) */}
      <path
        d="M35 55 C35 75, 40 85, 50 85 C60 85, 65 75, 65 55"
        fill="#FDFBF7"
        stroke="#1C1917"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Mushroom Cap (sombrero) */}
      <path
        d="M15 55 C15 25, 85 25, 85 55 C85 58, 75 58, 50 58 C25 58, 15 58, 15 55 Z"
        fill="#FF4C4C"
        stroke="#1C1917"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Yellow spots (motas) */}
      <circle cx="35" cy="38" r="7" fill="#FFDE4D" stroke="#1C1917" strokeWidth="4" />
      <circle cx="65" cy="38" r="6" fill="#FFDE4D" stroke="#1C1917" strokeWidth="4" />
      <circle cx="50" cy="48" r="5" fill="#FFDE4D" stroke="#1C1917" strokeWidth="4" />
      {/* Cute eyes */}
      <circle cx="43" cy="70" r="3" fill="#1C1917" />
      <circle cx="57" cy="70" r="3" fill="#1C1917" />
      {/* Smile */}
      <path d="M48 74 Q50 76 52 74" stroke="#1C1917" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// ==========================================
// 1. BADGES (Stickers)
// ==========================================
interface BadgeProps {
  type: 'nuevo' | 'popular' | 'importado' | 'oferta';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  const styles = {
    nuevo: 'bg-[#FF4C4C] text-white rotate-[-3deg]',
    popular: 'bg-[#FFDE4D] text-[#1C1917] rotate-[2deg]',
    importado: 'bg-indigo-400 text-white rotate-[-2deg]',
    oferta: 'bg-emerald-500 text-white rotate-[3deg]',
  };

  const icons = {
    nuevo: <Sparkles size={10} className="fill-current inline" />,
    popular: <Flame size={10} className="fill-current inline" />,
    importado: <Globe size={10} className="inline" />,
    oferta: <Gift size={10} className="inline" />,
  };

  const labels = {
    nuevo: 'NUEVO',
    popular: 'POPULAR',
    importado: 'IMPORTADO',
    oferta: 'OFERTA',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black tracking-wider uppercase rounded-full shadow-sm ${styles[type]} ${className}`}
      style={{ transform: `scale(0.95)` }}
    >
      {icons[type]}
      <span>{labels[type]}</span>
    </span>
  );
};

// ==========================================
// 2. BUTTONS
// ==========================================
interface ButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
}

export const ButtonPrimary: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ y: -3, x: -3 }}
      whileTap={{ y: 1, x: 1 }}
      className={`px-6 py-3 bg-[#FFDE4D] text-[#1C1917] font-black uppercase tracking-wider rounded-2xl border-sticker shadow-sticker transition-shadow duration-150 hover:shadow-sticker-lg cursor-pointer inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const ButtonSecondary: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.button
      whileHover={{ y: -3, x: -3 }}
      whileTap={{ y: 1, x: 1 }}
      className={`px-6 py-3 bg-white text-[#1C1917] font-black uppercase tracking-wider rounded-2xl border-sticker shadow-sticker transition-shadow duration-150 hover:shadow-sticker-lg cursor-pointer inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

interface ButtonWhatsAppProps extends HTMLMotionProps<'a'> {
  children: React.ReactNode;
}

export const ButtonWhatsApp: React.FC<ButtonWhatsAppProps> = ({ children, className = '', ...props }) => {
  return (
    <motion.a
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      whileHover={{ y: -3, x: -3 }}
      whileTap={{ y: 1, x: 1 }}
      className={`px-5 py-2.5 bg-[#25D366] text-white font-bold tracking-wide rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)] cursor-pointer inline-flex items-center justify-center gap-2 transition-shadow duration-200 ${className}`}
      {...props}
    >
      <MessageCircle size={16} className="fill-current" />
      {children}
    </motion.a>
  );
};

// ==========================================
// 3. QUANTITY SELECTOR
// ==========================================
interface QuantitySelectorProps {
  value: number;
  onChange: (val: number) => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 bg-stone-50 border border-stone-200 rounded-xl px-2 py-1 select-none ${className}`}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-6 h-6 flex items-center justify-center bg-white border border-stone-200 rounded-lg hover:bg-stone-100 active:scale-95 cursor-pointer text-[#1C1917] shadow-sm"
      >
        <Minus size={12} strokeWidth={3} />
      </button>
      <span className="font-fredoka font-bold text-sm w-4 text-center text-[#1C1917]">{value}</span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="w-6 h-6 flex items-center justify-center bg-white border border-stone-200 rounded-lg hover:bg-stone-100 active:scale-95 cursor-pointer text-[#1C1917] shadow-sm"
      >
        <Plus size={12} strokeWidth={3} />
      </button>
    </div>
  );
};

// ==========================================
// 4. INPUTS
// ==========================================
interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = 'Buscar...', className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-white font-outfit font-medium text-sm text-[#1C1917] placeholder-[#1C1917]/40 border border-stone-200 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] focus:outline-none focus:ring-0 focus:border-stone-300 focus:shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-all"
      />
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C1917]/50" size={16} strokeWidth={3} />
    </div>
  );
};

interface ContactInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  required?: boolean;
  className?: string;
}

export const ContactInput: React.FC<ContactInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  textarea = false,
  required = false,
  className = ''
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-fredoka text-sm font-black text-[#1C1917] flex items-center gap-1.5">
        {label}
        {required && <span className="text-[#FF4C4C]">*</span>}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
          className="w-full px-4 py-3 bg-white font-outfit font-bold text-sm text-[#1C1917] placeholder-[#1C1917]/40 border-sticker rounded-2xl shadow-sticker focus:outline-none focus:ring-0 focus:shadow-sticker-lg transition-all resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 bg-white font-outfit font-bold text-sm text-[#1C1917] placeholder-[#1C1917]/40 border-sticker rounded-2xl shadow-sticker focus:outline-none focus:ring-0 focus:shadow-sticker-lg transition-all"
        />
      )}
    </div>
  );
};

// ==========================================
// 5. PRODUCT CARD
// ==========================================
interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  tag?: 'nuevo' | 'popular' | 'importado' | 'oferta';
  onOrder: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  category,
  image,
  tag,
  onOrder
}) => {
  const [qty, setQty] = React.useState(1);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white border border-stone-100 rounded-[28px] p-5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between h-full relative select-none"
    >
      {/* Sticker Badge */}
      {tag && (
        <div className="absolute top-2 left-2 z-10">
          <Badge type={tag} />
        </div>
      )}

      {/* Image frame */}
      <div className="bg-[#FDFBF7] border border-stone-100 rounded-[20px] p-4 h-48 flex items-center justify-center relative overflow-hidden mb-5 select-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] [background-size:12px_12px]"></div>
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform group-hover:scale-105 transition-transform duration-300 animate-float-cute"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4C4C] flex items-center gap-1 mb-1">
            <Tag size={10} className="fill-current" /> {category}
          </span>
          <h3 className="font-fredoka text-lg font-bold text-[#1C1917] leading-tight hover:text-[#FF4C4C] transition-colors line-clamp-2">
            {name}
          </h3>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          {/* Price & Quantity */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-fredoka font-bold text-[#FF4C4C]">
              S/ {price.toFixed(2)}
            </span>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              onOrder();
              const text = `¡Hola! Me gustaría pedir ${qty} unidad(es) de "${name}" (S/ ${(price * qty).toFixed(2)}) de Kinoko Market.`;
              const url = `https://wa.me/51934421442?text=${encodeURIComponent(text)}`;
              window.open(url, '_blank');
            }}
            className="w-full py-2.5 bg-[#FFDE4D] text-[#1C1917] text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_4px_12px_rgba(255,222,77,0.4)] hover:shadow-[0_6px_16px_rgba(255,222,77,0.5)] active:translate-y-[1px] active:shadow-sm transition-all cursor-pointer text-center"
          >
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 6. CATEGORY CARD
// ==========================================
interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  color: string;
  buttonText?: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  color,
  buttonText = "Ver más",
  onClick
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="border-sticker rounded-3xl p-6 shadow-sticker hover:shadow-sticker-lg transition-all flex flex-col justify-between h-full w-full cursor-pointer select-none"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="w-16 h-16 bg-white border-sticker rounded-2xl flex items-center justify-center p-2 flex-shrink-0 shadow-sticker-sm">
          <img src={image} alt={title} className="max-w-full max-h-full object-contain animate-float-cute" />
        </div>
        <div className="flex-grow">
          <h3 className="font-fredoka text-xl font-black text-[#1C1917] mb-1">{title}</h3>
          <p className="text-sm font-medium text-[#1C1917]/70 leading-snug">{description}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <div className="inline-flex items-center gap-2 px-4 py-2 border-sticker-sm rounded-xl bg-white text-[#1C1917] font-fredoka font-black text-xs uppercase tracking-wider shadow-sticker-sm hover:shadow-sticker active:translate-x-[1px] active:translate-y-[1px] transition-all">
          <span>{buttonText}</span>
          <ArrowRight size={14} className="stroke-[3px]" />
        </div>
      </div>
    </motion.div>
  );
};
