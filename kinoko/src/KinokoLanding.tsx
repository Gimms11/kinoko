import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pilares } from './components/Pilares';
import { Promociones } from './components/Promociones';
import { Catalog } from './components/Catalog';
import { RamenBuilder } from './components/RamenBuilder';
import { NosotrosContacto } from './components/NosotrosContacto';

export default function KinokoLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917] selection:bg-[#FFDE4D] selection:text-[#1C1917]">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Pillars (Nuestra Esencia) */}
      <Pilares />

      {/* 4. Promociones */}
      <Promociones />

      {/* 5. Product Catalog */}
      <Catalog />

      {/* 6. Custom Ramen Builder */}
      <RamenBuilder />

      {/* 7. About & Contact Form & Footer */}
      <NosotrosContacto />
    </div>
  );
}