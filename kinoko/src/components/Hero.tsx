import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { ButtonPrimary, ButtonSecondary } from './DesignSystem';

export const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="inicio" className="relative py-12 md:py-24 overflow-hidden select-none bg-[#FDFBF7]">
      {/* Background waves */}
      <div 
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{ 
          backgroundImage: "url('/waves_bg.jpeg')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column (Text Content) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFDE4D] text-[#1C1917] border-sticker-sm rounded-full text-xs font-black uppercase tracking-wider shadow-sticker-sm rotate-[-1deg]">
            <Sparkles size={14} className="animate-spin text-[#FF4C4C]" style={{ animationDuration: '4s' }} />
            ¡El auténtico sabor de Asia en Ica!
          </div>

          {/* Heading */}
          <h1 className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-black text-[#1C1917] leading-[1.1] tracking-tight">
            Tu rincón asiático <br />
            favorito en <span className="bg-[#FFDE4D] border-sticker-sm rounded-2xl px-3 inline-block shadow-sticker rotate-[1deg] text-[#1C1917]">Ica</span>
          </h1>

          {/* Subtitle */}
          <p className="font-outfit text-base sm:text-lg lg:text-xl font-bold text-[#1C1917] bg-white/10 backdrop-blur-sm border border-white/0 shadow-[0_4px_24px_rgba(255,255,255,0.25)] p-4 sm:p-5 rounded-2xl max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Snacks japoneses importados, ramen personalizado para armar como un profesional, y bebidas asiáticas originales como Bubble Tea natural. ¡Visítanos frente a la UTP!
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <ButtonPrimary onClick={() => scrollToSection('#catalogo')} className="text-sm">
              Ver Catálogo
              <ArrowRight size={16} />
            </ButtonPrimary>
            <ButtonSecondary onClick={() => scrollToSection('#ramen-builder')} className="text-sm">
              Arma tu ramen
            </ButtonSecondary>
          </div>
        </motion.div>

        {/* Right Column (Interactive Mascot Showcase) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring', bounce: 0.3 }}
          className="lg:col-span-5 flex justify-center relative min-h-[360px] sm:min-h-[420px]"
        >
          {/* Main Decorative Sticker Background Circle */}
          <div className="absolute w-64 h-64 sm:w-80 sm:h-80 bg-[#FFDE4D] border-3 border-[#1C1917] rounded-full shadow-sticker -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-5deg]"></div>
          
          {/* Mascot sticker */}
          <div className="relative z-10 w-64 sm:w-80 h-auto flex items-center justify-center p-2">
            <motion.img
              src="/Mascota.png"
              alt="Mascota Oficial Kinoko"
              className="w-full object-contain filter drop-shadow-[8px_8px_0px_#1C1917]"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
          </div>

          {/* Floating Sticker 1: Bubble Tea */}
          <motion.div
            className="absolute top-4 left-6 z-20 w-16 h-16 bg-white border-sticker rounded-2xl shadow-sticker-sm p-1.5 rotate-[-12deg]"
            animate={{ y: [0, -8, 0], rotate: [-12, -8, -12] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.2 }}
          >
            <img src="/bubble_tea_sticker.png" alt="Bubble Tea" className="w-full h-full object-contain" />
          </motion.div>

          {/* Floating Sticker 2: Ramen Bowl */}
          <motion.div
            className="absolute bottom-4 right-2 z-20 w-20 h-20 bg-[#FF4C4C] border-sticker rounded-3xl shadow-sticker p-2 rotate-[15deg]"
            animate={{ y: [0, -12, 0], rotate: [15, 20, 15] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
          >
            <img src="/ramen_bowl_sticker.png" alt="Ramen" className="w-full h-full object-contain" />
          </motion.div>

          {/* Floating Sticker 3: Mochis */}
          <motion.div
            className="absolute top-10 right-4 z-20 w-14 h-14 bg-white border-sticker rounded-2xl shadow-sticker-sm p-1 rotate-[8deg]"
            animate={{ y: [0, -6, 0], rotate: [8, 4, 8] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.8 }}
          >
            <img src="/mochis_sticker.png" alt="Mochi" className="w-full h-full object-contain" />
          </motion.div>

          {/* Floating Sticker 4: Pocky Box */}
          <motion.div
            className="absolute bottom-6 left-2 z-20 w-16 h-16 bg-white border-sticker rounded-2xl shadow-sticker-sm p-1.5 rotate-[-8deg]"
            animate={{ y: [0, -10, 0], rotate: [-8, -12, -8] }}
            transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 1.1 }}
          >
            <img src="/pocky_box_sticker.png" alt="Pocky" className="w-full h-full object-contain" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
