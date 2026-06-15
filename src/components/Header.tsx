import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ButtonWhatsApp } from './DesignSystem';

export const Header: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Propuesta', href: '#pilares' },
    { name: 'Promos', href: '#promociones' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Ramen Builder', href: '#ramen-builder' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-[#1C1917]/8 py-3.5 px-6 select-none shadow-[0_1px_16px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with sticker style */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-[0_2px_8px_rgba(228,205,58,0.35)] border border-stone-200"
            >
              <div 
                className="absolute inset-0 z-0 opacity-80"
                style={{ 
                  backgroundImage: "url('/waves_bg.jpeg')", 
                  backgroundSize: "cover", 
                  backgroundPosition: "center" 
                }}
              />
              <img src="/Mascota.png" alt="Kinoko Logo" className="w-[85%] h-[85%] object-contain relative z-10" />
            </motion.div>
            <span className="font-fredoka text-xl font-bold tracking-tight text-[#1C1917] group-hover:text-[#FF4C4C] transition-colors duration-200">
              Kinoko
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 font-outfit text-sm font-medium tracking-wide text-[#1C1917]/70">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative hover:text-[#1C1917] transition-colors duration-200 py-1 group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#FF4C4C] rounded-full transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <ButtonWhatsApp href="https://wa.me/51934421442" target="_blank" rel="noreferrer" className="text-sm px-4 py-2">
              WhatsApp
            </ButtonWhatsApp>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 border border-stone-200 rounded-xl bg-white shadow-sm text-[#1C1917] hover:bg-stone-50 transition-colors cursor-pointer"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white border-l border-black/8 p-8 flex flex-col justify-between shadow-[-8px_0_32px_rgba(0,0,0,0.08)]"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-fredoka text-lg font-bold text-[#1C1917]">Menú</span>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 border border-stone-200 rounded-xl bg-stone-50 shadow-sm text-[#1C1917] cursor-pointer hover:bg-stone-100 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-1 font-outfit text-sm font-medium tracking-wide text-[#1C1917]/70">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="hover:text-[#1C1917] hover:bg-stone-50 transition-all duration-150 py-3 px-3 rounded-xl border-b border-stone-100 last:border-0"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <ButtonWhatsApp
                  href="https://wa.me/51934421442"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center"
                >
                  WhatsApp
                </ButtonWhatsApp>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
