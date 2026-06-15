import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pilares } from './components/Pilares';
import { Promociones } from './components/Promociones';
import { Catalog } from './components/Catalog';
import { RamenBuilder } from './components/RamenBuilder';
import { NosotrosContacto } from './components/NosotrosContacto';

interface WaveDividerProps {
  fillColor: string;
  type: number;
}

function WaveDivider({ fillColor, type }: WaveDividerProps) {
  // 5 diseños de ondas/olas diferentes para cada transición
  const paths: Record<number, string> = {
    // Ola 1 (Hero -> Pilares): Curva senoidal suave y elegante
    1: "M0,50 C360,95 720,5 1080,95 C1260,95 1380,65 1440,50 L1440,100 L0,100 Z",
    // Ola 2 (Pilares -> Promociones): Ondas redondeadas consecutivas tipo "nubes/burbujas" muy kawaii
    2: "M0,60 Q120,30 240,60 Q360,30 480,60 Q600,30 720,60 Q840,30 960,60 Q1080,30 1200,60 Q1320,30 1440,60 L1440,100 L0,100 Z",
    // Ola 3 (Promociones -> Catálogo): Doble curva asimétrica dinámica
    3: "M0,50 C360,100 720,0 1080,50 C1260,70 1380,30 1440,50 L1440,100 L0,100 Z",
    // Ola 4 (Catálogo -> RamenBuilder): Gran deslizamiento diagonal líquido/caldo
    4: "M0,20 C480,100 960,0 1440,80 L1440,100 L0,100 Z",
    // Ola 5 (RamenBuilder -> NosotrosContacto): Ondas orgánicas con alturas variables
    5: "M0,40 C240,10 480,80 720,50 C960,20 1200,90 1440,40 L1440,100 L0,100 Z",
  };

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none -translate-y-[99%] overflow-hidden z-10">
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 lg:h-28 block"
        style={{ filter: "drop-shadow(0px -8px 8px rgba(28, 25, 23, 0.04))" }}
      >
        <path d={paths[type]} fill={fillColor} />
      </svg>
    </div>
  );
}

interface SectionWrapperProps {
  children: React.ReactNode;
  bg: string;
  zIndex: number;
  className?: string;
  waveType?: number;
  waveColor?: string;
}

function SectionWrapper({ children, bg, zIndex, className = '', waveType, waveColor }: SectionWrapperProps) {
  return (
    <div
      className={`relative ${bg} ${className}`}
      style={{ zIndex }}
    >
      {waveType && waveColor && (
        <WaveDivider fillColor={waveColor} type={waveType} />
      )}
      {children}
    </div>
  );
}

export default function KinokoLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1C1917] selection:bg-[#FFDE4D] selection:text-[#1C1917] overflow-x-hidden">

      {/* 1. Header Navigation — fixed, siempre encima */}
      <Header />

      {/* 2. Hero — base de la pila, sin wrapper */}
      <Hero />

      {/* 3. Pilares — blanco puro, apila sobre Hero con ola tipo 1 */}
      <SectionWrapper bg="bg-white" zIndex={10} waveType={1} waveColor="#FFFFFF">
        <Pilares />
      </SectionWrapper>

      {/* 4. Promociones — amarillo suave, apila sobre Pilares con ola tipo 2 */}
      <SectionWrapper bg="bg-[#FFFCEB]" zIndex={20} waveType={2} waveColor="#FFFCEB">
        <Promociones />
      </SectionWrapper>

      {/* 5. Catálogo — blanco limpio, apila sobre Promociones con ola tipo 3 */}
      <SectionWrapper bg="bg-white" zIndex={30} waveType={3} waveColor="#FFFFFF">
        <Catalog />
      </SectionWrapper>

      {/* 6. Ramen Builder — oscuro dramático, apila sobre Catálogo con ola tipo 4 */}
      <SectionWrapper bg="bg-[#1C1917]" zIndex={40} waveType={4} waveColor="#1C1917">
        <RamenBuilder />
      </SectionWrapper>

      {/* 7. Nosotros, Contacto y Footer — crema cálida, apila sobre RamenBuilder con ola tipo 5 */}
      <SectionWrapper bg="bg-[#FDFBF7]" zIndex={50} waveType={5} waveColor="#FDFBF7">
        <NosotrosContacto />
      </SectionWrapper>

    </div>
  );
}