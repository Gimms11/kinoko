import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CategoryCard } from './DesignSystem';

export const Pilares: React.FC = () => {
  const handleCardClick = (id: string, filter?: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (filter) {
      // Find the filter button and click it programmatically (or dispatcher if global state)
      const filterBtn = document.querySelector(`button[data-filter="${filter}"]`) as HTMLButtonElement;
      if (filterBtn) {
        filterBtn.click();
      }
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.2 } }
  };

  return (
    <section id="pilares" className="py-20 bg-white border-b-3 border-[#1C1917] select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[#FF4C4C] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="fill-current" /> ¿Qué vas a encontrar?
          </span>
          <h2 className="font-fredoka text-3xl sm:text-4xl font-black text-[#1C1917]">
            La Esencia de Kinoko
          </h2>
          <div className="h-2 w-24 bg-[#FFDE4D] border-sticker-sm rounded-full mx-auto shadow-sticker-sm"></div>
        </div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {/* Pilar 1: Market */}
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            <CategoryCard
              title="Asian Market"
              description="Navega por nuestra gran selección de snacks, papas exóticas, golosinas y dulces directamente importados de Asia."
              image="/pocky_box_sticker.png"
              color="#FFDE4D" // Yellow background
              buttonText="Ir al Market"
              onClick={() => handleCardClick('#catalogo', 'snacks')}
            />
          </motion.div>

          {/* Pilar 2: Ramen Customizer */}
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            <CategoryCard
              title="Arma tu Ramen"
              description="Sé el chef de tu propio tazón. Escoge tus fideos, agrega tus toppings favoritos y cocínalo al instante en nuestra estación."
              image="/ramen_bowl_sticker.png"
              color="#FF4C4C" // Red background
              buttonText="Armar Ramen"
              onClick={() => handleCardClick('#ramen-builder')}
            />
          </motion.div>

          {/* Pilar 3: Bubble Tea */}
          <motion.div variants={itemVariants} className="h-full flex flex-col">
            <CategoryCard
              title="Bebidas & Boba"
              description="Refréscate con nuestros Bubble Teas originales preparados con fruta y té natural, o sodas importadas como Ramune."
              image="/bubble_tea_sticker.png"
              color="#FDFBF7" // White/cream background
              buttonText="Ver Bebidas"
              onClick={() => handleCardClick('#catalogo', 'bebidas')}
            />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
