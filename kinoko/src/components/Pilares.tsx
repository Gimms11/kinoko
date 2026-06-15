import React from 'react';
import { motion, useAnimation } from 'framer-motion';

/* ─────────────────────────────────────────────
   DECORATIVE ELEMENTS
───────────────────────────────────────────── */

const StarKawaii = ({ size = 16, color = '#FFDE4D', style }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 2 L13.8 8.4 L20.4 8.4 L15 12.6 L16.8 19 L12 15.2 L7.2 19 L9 12.6 L3.6 8.4 L10.2 8.4 Z" />
  </svg>
);

const WaveLine = () => (
  <svg viewBox="0 0 200 20" className="w-full opacity-20" preserveAspectRatio="none">
    <path
      d="M0 10 C20 0, 40 20, 60 10 S100 0, 120 10 S160 20, 180 10 S200 0, 200 10"
      fill="none"
      stroke="#1C1917"
      strokeWidth="2"
    />
  </svg>
);

const FloatingDot = ({ color, className }: { color: string; className?: string }) => (
  <motion.div
    className={`absolute rounded-full ${className}`}
    style={{ backgroundColor: color }}
    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const StickerBadge = ({ text, color, rotate }: { text: string; color: string; rotate: number }) => (
  <motion.div
    className="absolute px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-md select-none pointer-events-none z-10"
    style={{ backgroundColor: color, rotate }}
    animate={{ y: [0, -6, 0], rotate: [rotate, rotate + 3, rotate - 3, rotate] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
  >
    {text}
  </motion.div>
);

/* ─────────────────────────────────────────────
   CARD: ARMA TU RAMEN  (Hero / Centro)
───────────────────────────────────────────── */

const RamenHeroCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.03, rotate: -0.5, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >


      {/* Card body */}
      <div
        className="relative rounded-[28px] overflow-hidden shadow-[10px_8px_rgba(230,205,58,0.35)]" 
        style={{ background: 'linear-gradient(145deg, #FFDE4D 0%, #E4CD3A 100%)' }}
      >
        {/* Badge NEW */}
        <div className="absolute top-5 right-5 z-20">
          <motion.div
            className="bg-[#FF4C4C] text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-widest"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            ⭐ Estrella
          </motion.div>
        </div>

        {/* Stiker badge flotante */}
        <StickerBadge text="Hot 🔥" color="#FF4C4C" rotate={-10} />

        {/* Imagen */}
        <motion.img
          src="/ramen_bowl_sticker.png"
          alt="Ramen Bowl"
          className="w-52 h-52 sm:w-64 sm:h-64 object-contain mx-auto mt-8 drop-shadow-lg select-none relative z-10"
          style={{ filter: 'drop-shadow(0 8px 0 rgba(28,25,23,0.15))' }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Ondas decorativas */}
        <div className="px-6 pb-0 -mt-2">
          <WaveLine />
        </div>

        {/* Texto */}
        <div className="px-7 pb-8 pt-3 text-center">
          <h3 className="font-fredoka text-4xl sm:text-5xl font-black text-[#1C1917] leading-tight">
            Arma tu<br />Ramen 🍜
          </h3>
          <p className="text-[#1C1917]/70 text-sm font-semibold mt-2 leading-snug">
            Escoge fideos · toppings · caldo<br />y sé el chef de tu tazón.
          </p>

          {/* CTA */}
          <motion.button
            className="mt-5 bg-[#1C1917] text-[#FFDE4D] font-black text-sm px-7 py-3 rounded-full shadow-lg uppercase tracking-wider"
            whileHover={{ scale: 1.07, boxShadow: '0 8px 24px rgba(28,25,23,0.3)' }}
            whileTap={{ scale: 0.96 }}
          >
            Armar mi Ramen →
          </motion.button>
        </div>

        {/* Detalles decorativos internos */}
        <div className="absolute bottom-4 left-4 opacity-30">
          <StarKawaii size={20} color="#FF4C4C" />
        </div>
        <div className="absolute top-10 left-5 opacity-20">
          <StarKawaii size={14} color="#1C1917" />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   CARD SECUNDARIA COMPACTA
───────────────────────────────────────────── */

interface SecondaryCardProps {
  title: string;
  emoji: string;
  description: string;
  image: string;
  bgColor: string;
  accentColor: string;
  buttonText: string;
  rotateDeg?: number;
  onClick: () => void;
}

const SecondaryCard = ({
  title, emoji, description, image, bgColor, accentColor, buttonText, rotateDeg = 1, onClick,
}: SecondaryCardProps) => {
  return (
    <motion.div
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05, rotate: -rotateDeg, y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >


      {/* Card */}
      <div
        className="relative rounded-[24px] overflow-hidden px-6 py-7 flex flex-col items-center text-center shadow-[8px_8px_rgba(0,0,0,0.10)]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Imagen sticker */}
        <motion.img
          src={image}
          alt={title}
          className="w-28 h-28 object-contain drop-shadow-md select-none"
          animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 1 }}
        />

        <h3 className="font-fredoka text-2xl font-black text-[#1C1917] mt-3 leading-tight">
          {emoji} {title}
        </h3>
        <p className="text-[#1C1917]/65 text-xs font-semibold mt-1.5 leading-snug max-w-[180px]">
          {description}
        </p>

        <motion.button
          className="mt-4 text-xs font-black px-5 py-2 rounded-full uppercase tracking-wider shadow-md"
          style={{ backgroundColor: accentColor, color: '#1C1917' }}
          whileHover={{ scale: 1.08, boxShadow: '0 6px 18px rgba(0,0,0,0.15)' }}
          whileTap={{ scale: 0.95 }}
        >
          {buttonText}
        </motion.button>

        {/* Estrella decorativa */}
        <div className="absolute top-3 right-3 opacity-30">
          <StarKawaii size={16} color={accentColor} />
        </div>
        <div className="absolute bottom-3 left-3 opacity-30">
          <StarKawaii size={12} color={accentColor} />
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   PILARES SECTION
───────────────────────────────────────────── */

export const Pilares: React.FC = () => {
  const handleCardClick = (id: string, filter?: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (filter) {
      const filterBtn = document.querySelector(`button[data-filter="${filter}"]`) as HTMLButtonElement;
      if (filterBtn) {
        filterBtn.click();
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { type: 'spring' as const, bounce: 0.35, duration: 0.7 }
    }
  };

  return (
    <section id="pilares" className="relative py-24 bg-white overflow-hidden select-none">

      {/* ── Fondo decorativo ── */}
      {/* Círculos grandes de fondo */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[#FFDE4D] opacity-10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-96 h-96 rounded-full bg-[#FF4C4C] opacity-8 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#F48CA8] opacity-5 pointer-events-none" />

      {/* Floating stickers decorativos */}
      <FloatingDot color="#FFDE4D" className="w-6 h-6 top-16 left-[8%]" />
      <FloatingDot color="#FF4C4C" className="w-4 h-4 top-28 right-[12%]" />
      <FloatingDot color="#F48CA8" className="w-5 h-5 bottom-20 left-[15%]" />
      <FloatingDot color="#E4CD3A" className="w-3 h-3 bottom-14 right-[8%]" />

      <motion.div
        className="absolute top-12 right-[20%] opacity-30 pointer-events-none"
        animate={{ y: [0, -12, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <StarKawaii size={28} color="#FFDE4D" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 left-[22%] opacity-25 pointer-events-none"
        animate={{ y: [0, -8, 0], rotate: [0, -12, 12, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <StarKawaii size={22} color="#FF4C4C" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-[5%] opacity-20 pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <span className="text-4xl">🌸</span>
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-[6%] opacity-20 pointer-events-none"
        animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <span className="text-3xl">✨</span>
      </motion.div>

      {/* ── Contenido ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 bg-[#FFDE4D] rounded-full px-5 py-2 mb-5 shadow-md">
            <span className="text-base">🍱</span>
            <span className="font-black text-[#1C1917] uppercase tracking-widest text-xs">
              ¿Qué vas a encontrar?
            </span>
          </div>

          <h2 className="font-fredoka text-4xl sm:text-5xl font-black text-[#1C1917] leading-tight">
            La Esencia de{' '}
            <span className="relative inline-block">
              Kinoko
              {/* Underline amarillo */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[5px] bg-[#FF4C4C] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </span>
            {' '}✨
          </h2>
          <p className="text-[#1C1917]/50 font-semibold text-sm mt-3 max-w-md mx-auto">
            Tres experiencias, un solo lugar. Tu tienda asiática favorita en Lima.
          </p>
        </motion.div>

        {/* ── Layout asimétrico ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex flex-col lg:flex-row items-stretch gap-6"
        >

          {/* Columna izquierda: Asian Market */}
          <motion.div variants={itemVariants} className="flex-1 lg:flex-[1.1] flex flex-col justify-center">
            <SecondaryCard
              title="Asian Market"
              emoji="🛒"
              description="Snacks, papas exóticas y dulces importados directo de Asia."
              image="/pocky_box_sticker.png"
              bgColor="#FDFBF7"
              accentColor="#FFDE4D"
              buttonText="Ir al Market →"
              rotateDeg={1.5}
              onClick={() => handleCardClick('#catalogo', 'snacks')}
            />
          </motion.div>

          {/* Centro: Arma tu Ramen (héroe) */}
          <motion.div variants={itemVariants} className="flex-1 lg:flex-[1.6]">
            <RamenHeroCard onClick={() => handleCardClick('#ramen-builder')} />
          </motion.div>

          {/* Columna derecha: Bebidas & Boba */}
          <motion.div variants={itemVariants} className="flex-1 lg:flex-[1.1] flex flex-col justify-center">
            <SecondaryCard
              title="Bebidas & Boba"
              emoji="🧋"
              description="Bubble tea con fruta, té natural y sodas Ramune importadas."
              image="/bubble_tea_sticker.png"
              bgColor="#FDF0F4"
              accentColor="#F48CA8"
              buttonText="Ver Bebidas →"
              rotateDeg={-1.5}
              onClick={() => handleCardClick('#catalogo', 'bebidas')}
            />
          </motion.div>

        </motion.div>

        {/* Tagline inferior */}
        <motion.div
          className="text-center mt-12 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px flex-1 max-w-[80px] bg-[#1C1917]/15 rounded-full" />
          <span className="text-[#1C1917]/40 text-xs font-bold uppercase tracking-widest">
            Frente a la UTP · Lima, Perú
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-[#1C1917]/15 rounded-full" />
        </motion.div>

      </div>
    </section>
  );
};
