import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { MushroomLogo } from './DesignSystem';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 bg-[#FFDE4D] border-t border-[#1C1917]/20 pt-16 pb-8 rounded-t-[2.5rem] md:rounded-t-[3.5rem] select-none text-[#1C1917]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#1C1917]/10">
        
        <div className="space-y-4">
          <h3 className="font-fredoka text-2xl font-black tracking-tight flex items-center gap-3">
            <div 
              className="relative w-12 h-12 border border-[#1C1917]/15 rounded-xl flex items-center justify-center overflow-hidden shadow-sm flex-shrink-0"
              style={{ 
                backgroundImage: "url('/waves_bg.jpeg')", 
                backgroundSize: "cover", 
                backgroundPosition: "center" 
              }}
            >
              <img src="/Mascota.png" alt="Mascota Kinoko" className="w-9 h-9 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] animate-float-cute" style={{ animationDuration: '3s' }} />
            </div>
            Kinoko
          </h3>
          <p className="font-outfit text-sm font-bold opacity-80 leading-relaxed max-w-xs">
            Tu rincón asiático favorito en Ica. Vive la experiencia de la cultura pop oriental con los mejores snacks, Boba Tea natural y ramen personalizado.
          </p>
        </div>

        <div className="space-y-4 font-outfit">
          <h4 className="font-fredoka text-xs font-black tracking-widest uppercase opacity-60">Ubicación Fija</h4>
          <p className="text-sm font-bold flex items-center gap-2">
            Av. Los Tulipanes (Frente a la UTP), Ica, Perú
          </p>
          <div className="text-[10px] font-black uppercase text-stone-600">
            A un paso del campus universitario
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-fredoka text-xs font-black tracking-widest uppercase opacity-60">Comunidad</h4>
          <div className="flex gap-4">
            <motion.a
              whileHover={{ rotate: 10, scale: 1.1 }}
              href="https://wa.me/51934421442"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 bg-white text-[#1C1917] rounded-xl flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all"
            >
              <Phone size={18} />
            </motion.a>
            <motion.a
              whileHover={{ rotate: -10, scale: 1.1 }}
              href="mailto:hola@kinoko.com"
              className="w-10 h-10 bg-white text-[#1C1917] rounded-xl flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all"
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-black uppercase tracking-wider text-stone-600 gap-4">
        <span>&copy; 2026 Kinoko Asian Market. Todos los derechos reservados.</span>
        <span className="bg-white/70 px-2 py-1 rounded-md text-xs font-black uppercase tracking-wider text-stone-500">Kinoko Asian Market 🍜</span>
      </div>
    </footer>
  );
};
