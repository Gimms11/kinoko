import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ButtonWhatsApp, MushroomLogo } from './DesignSystem';

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
      <header className="sticky top-0 z-40 w-full bg-[#FDFBF7] border-b-3 border-[#1C1917] py-4 px-6 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo with sticker style */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: [-3, 3, -3] }}
              className="w-12 h-12 bg-[#FFDE4D] border-2 border-[#1C1917] rounded-xl flex items-center justify-center p-1.5 shadow-sticker-sm"
            >
              <MushroomLogo className="w-full h-full" />
            </motion.div>
            <span className="font-fredoka text-2xl font-black tracking-tight text-[#1C1917] group-hover:text-[#FF4C4C] transition-colors">
              Kinoko
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 font-fredoka text-sm font-black uppercase tracking-wider text-[#1C1917]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative hover:text-[#FF4C4C] transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-[#FF4C4C] border border-[#1C1917] rounded-full transition-all group-hover:w-full"></span>
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
            className="lg:hidden p-2 border-sticker rounded-xl bg-[#FFDE4D] shadow-sticker-sm text-[#1C1917] hover:bg-[#FFDE4D]/80 transition-colors cursor-pointer"
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
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-[#FDFBF7] border-l-3 border-[#1C1917] p-8 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <span className="font-fredoka text-xl font-black text-[#1C1917]">Menú</span>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 border-sticker rounded-xl bg-white shadow-sticker-sm text-[#1C1917] cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                <nav className="flex flex-col gap-6 font-fredoka text-base font-black uppercase tracking-wider text-[#1C1917]">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="hover:text-[#FF4C4C] transition-colors py-2 border-b border-[#1C1917]/10"
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
