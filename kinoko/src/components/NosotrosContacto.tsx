import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageCircle, Sparkles } from 'lucide-react';
import { ContactInput, MushroomLogo } from './DesignSystem';
import confetti from 'canvas-confetti';

export const NosotrosContacto: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.message) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Celebrate submission
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#FFDE4D', '#FF4C4C', '#25D366']
      });

      // Clear form
      setFormData({ name: '', contact: '', message: '' });
    }, 1200);
  };

  return (
    <>
      <section id="contacto" className="pt-20 pb-12 bg-[#FDFBF7] select-none">
        <div className="max-w-7xl mx-auto px-6">
        
        {/* ==========================================
            NOSOTROS: Historia y Galería Polaroid
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#FF4C4C] font-black uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Sparkles size={12} className="fill-current" /> CONOCE NUESTRA HISTORIA
            </span>
            <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#1C1917]">
              Sobre Kinoko Asian Market
            </h2>
            <div className="h-2 w-24 bg-[#FFDE4D] border-sticker-sm rounded-full shadow-sticker-sm"></div>
            
            <p className="font-outfit text-base font-bold text-[#1C1917]/70 leading-relaxed">
              Kinoko nació con la misión de traer la vibrante cultura pop asiática a la ciudad de Ica. Somos un espacio interactivo pensado para los amantes de los snacks importados, el Bubble Tea artesanal y el ramen.
            </p>
            <p className="font-outfit text-base font-bold text-[#1C1917]/70 leading-relaxed">
              No somos solo un market; somos una experiencia. En nuestro local puedes seleccionar tu ramen en bolsa favorito, añadirle ingredientes frescos en nuestra barra de toppings y cocinarlo tú mismo en nuestras estaciones de agua caliente guiadas. ¡La verdadera cultura de conveniencia asiática ya está aquí!
            </p>
          </div>

          {/* Polaroid mock photo gallery */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-6 relative">
            {/* Polaroid 1 */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              className="bg-white border-sticker p-3 pb-8 rounded-lg shadow-sticker rotate-[-4deg] transition-all"
            >
              <div className="h-44 bg-[#FFDE4D]/10 border-sticker-sm rounded-md overflow-hidden flex items-center justify-center p-2 select-none">
                <img src="/mascota_cooking.png" alt="Ramen station" className="max-h-full object-contain filter drop-shadow-md" />
              </div>
              <p className="font-fredoka text-center text-xs font-black text-[#1C1917] mt-3">Estación Ramen</p>
            </motion.div>

            {/* Polaroid 2 */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              className="bg-white border-sticker p-3 pb-8 rounded-lg shadow-sticker rotate-[6deg] transition-all mt-4"
            >
              <div className="h-44 bg-[#FFDE4D]/10 border-sticker-sm rounded-md overflow-hidden flex items-center justify-center p-2 select-none">
                <img src="/bubble_tea_sticker.png" alt="Bubble tea station" className="max-h-full object-contain filter drop-shadow-md" />
              </div>
              <p className="font-fredoka text-center text-xs font-black text-[#1C1917] mt-3">Boba Natural</p>
            </motion.div>

            {/* Polaroid 3 (Mascota Celebrating) */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              className="absolute w-48 bg-white border-sticker p-3 pb-6 rounded-lg shadow-sticker rotate-[-8deg] bottom-[-40px] left-1/4 z-20 transition-all hidden sm:block"
            >
              <div className="h-32 bg-[#FFDE4D]/20 border-sticker-sm rounded-md overflow-hidden flex items-center justify-center p-2 select-none">
                <img src="/mascota_celebrating.png" alt="Comunidad" className="max-h-full object-contain filter drop-shadow-md" />
              </div>
              <p className="font-fredoka text-center text-[10px] font-black text-[#1C1917] mt-2">Kinoko Comunidad</p>
            </motion.div>
          </div>
        </div>

        {/* ==========================================
            CONTACTO: Mapa, Info y Formulario
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-12 border-t-3 border-dashed border-[#1C1917]/20">
          
          {/* Info Column (Map & Location info) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-fredoka text-2xl font-black text-[#1C1917]">Visítanos en Ica</h3>
              <div className="space-y-3 font-outfit font-bold text-sm text-[#1C1917]/80">
                <p className="flex items-center gap-3">
                  <span className="p-2 bg-[#FFDE4D] border-sticker-sm rounded-xl text-[#1C1917] flex-shrink-0">
                    <MapPin size={16} />
                  </span>
                  <span>Av. Los Tulipanes (Frente a la UTP), Ica, Perú</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="p-2 bg-[#FF4C4C] border-sticker-sm rounded-xl text-white flex-shrink-0">
                    <Clock size={16} />
                  </span>
                  <span>Lun - Sáb: 11:00 AM - 10:00 PM | Dom: 2:00 PM - 9:00 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="p-2 bg-indigo-400 border-sticker-sm rounded-xl text-white flex-shrink-0">
                    <Phone size={16} />
                  </span>
                  <span>+51 934 421 442</span>
                </p>
              </div>
            </div>

            {/* Embedded Google Maps with Sticker Frame */}
            <div className="border-sticker rounded-3xl overflow-hidden shadow-sticker h-64 bg-stone-100 relative">
              <iframe
                title="Mapa de Ubicación de Kinoko"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.480036662453!2d-75.7268874!3d-14.0782352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDA0JzQxLjYiUyA3NcKwNDMnMzYuOCJX!5e0!3m2!1ses-419!2spe!4v1700000000000!5m2!1ses-419!2spe"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border-sticker rounded-3xl p-6 sm:p-8 shadow-sticker flex flex-col justify-between">
            <h3 className="font-fredoka text-2xl font-black text-[#1C1917] mb-6">Mándanos un Mensajito</h3>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <ContactInput
                    label="¿Cómo te llamas?"
                    placeholder="Escribe tu nombre aquí"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <ContactInput
                    label="Teléfono o Correo de contacto"
                    placeholder="Ej: +51 999 999 999 o boba@kinoko.com"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                  <ContactInput
                    label="¿Cuál es tu mensaje?"
                    textarea
                    placeholder="Cuéntanos tus dudas, sugerencias o felicitaciones..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 bg-[#FFDE4D] text-[#1C1917] font-black uppercase tracking-wider rounded-2xl border-sticker shadow-sticker hover:shadow-sticker-lg active:translate-x-[3px] active:translate-y-[3px] active:shadow-sticker-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-75 cursor-wait' : ''
                    }`}
                  >
                    <Send size={16} />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </motion.form>
              ) : (
                // Success message
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#25D366]/10 border-2 border-[#25D366] rounded-2xl p-6 text-center space-y-4 my-auto"
                >
                  <CheckCircle size={48} className="text-[#25D366] mx-auto animate-bounce" />
                  <h4 className="font-fredoka text-xl font-black text-[#1c1917]">¡Mensajito Recibido!</h4>
                  <p className="font-outfit text-sm font-semibold text-stone-600">
                    Muchas gracias por escribirnos. La mascota Kinoko-Chan ya llevó tu mensaje a nuestro equipo. Te responderemos volando.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 bg-white border-sticker-sm rounded-xl font-fredoka font-black text-xs uppercase tracking-wider text-[#1c1917] hover:bg-stone-50 cursor-pointer"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 bg-[#FFDE4D] border-t-3 border-[#1C1917] pt-16 pb-8 rounded-t-[2.5rem] md:rounded-t-[3.5rem] select-none text-[#1C1917]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#1C1917]/10">
          
          <div className="space-y-4">
            <h3 className="font-fredoka text-2xl font-black tracking-tight flex items-center gap-2">
              <div className="w-8 h-8 bg-white border-sticker-sm rounded-lg flex items-center justify-center p-1.5">
                <MushroomLogo className="w-full h-full" />
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
                className="w-10 h-10 bg-white border-sticker-sm text-[#1C1917] rounded-xl flex items-center justify-center shadow-sticker-sm cursor-pointer"
              >
                <Phone size={18} />
              </motion.a>
              <motion.a
                whileHover={{ rotate: -10, scale: 1.1 }}
                href="mailto:hola@kinoko.com"
                className="w-10 h-10 bg-white border-sticker-sm text-[#1C1917] rounded-xl flex items-center justify-center shadow-sticker-sm cursor-pointer"
              >
                <Mail size={18} />
              </motion.a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-black uppercase tracking-wider text-stone-600 gap-4">
          <span>&copy; 2026 Kinoko Asian Market. Todos los derechos reservados.</span>
          <span className="bg-white border-sticker-sm px-2 py-1 rounded-md shadow-sticker-sm">Diseño Sticker Style Kawaii</span>
        </div>
      </footer>

      {/* FIXED FLOATING WHATSAPP CTA WIDGET */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/51934421442"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white border-sticker p-4 rounded-2xl shadow-sticker hover:shadow-sticker-lg cursor-pointer flex items-center justify-center"
      >
        <MessageCircle size={28} className="fill-current text-white" />
      </motion.a>

    </>
  );
};
