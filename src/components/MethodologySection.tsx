"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

interface ProcessStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
}

const METHODOLOGY_STEPS: ProcessStep[] = [
  {
    id: "01",
    title: "Diagnóstico Profundo",
    subtitle: "Entendendo Seu Negócio",
    description: "Iniciamos com uma análise completa do seu negócio, público-alvo e objetivos para criar uma estratégia personalizada.",
    details: ["Análise de Mercado", "Estudo da Concorrência", "Definição de Personas", "Mapeamento de Objetivos"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
  {
    id: "02",
    title: "Arquitetura Visual",
    subtitle: "Construindo Sua Identidade",
    description: "Desenvolvemos uma identidade visual única e estratégias de conteúdo que ressoam com seu público.",
    details: ["Design de Marca", "Estratégia de Conteúdo", "Planejamento Visual", "Tom de Voz"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
  },
  {
    id: "03",
    title: "Execução e Ajuste",
    subtitle: "Colocando em Prática",
    description: "Implementamos as estratégias com monitoramento constante e ajustes baseados em dados reais.",
    details: ["Criação de Conteúdo", "Gestão de Campanhas", "Monitoramento 24/7", "Otimização Contínua"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
  },
  {
    id: "04",
    title: "Escala com Tráfego",
    subtitle: "Crescimento Exponencial",
    description: "Amplificamos os resultados com tráfego pago estratégico e otimização de conversões.",
    details: ["Campanhas de Anúncios", "Remarketing Avançado", "Otimização de ROI", "Escala Sustentável"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
  },
];

export default function MethodologySection() {
  const [activeStep, setActiveStep] = useState(METHODOLOGY_STEPS[0].id);

  const activeStepData = METHODOLOGY_STEPS.find(step => step.id === activeStep);
  const activeIndex = METHODOLOGY_STEPS.findIndex(step => step.id === activeStep);

  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-6xl mx-auto p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center font-bold text-xl">
                E
              </div>
              <span className="text-2xl font-bold text-white">A Fórmula EngajaPro</span>
            </div>
            <div className="hidden md:flex items-center gap-2 p-1 bg-white/5 rounded-full">
              {METHODOLOGY_STEPS.map(step => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-semibold transition-all",
                    activeStep === step.id
                      ? "bg-blue-500 text-white shadow-lg"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {step.id}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {activeStepData && (
              <motion.div
                key={activeStepData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-12"
              >
                <div className="text-center max-w-3xl mx-auto">
                  <span className="text-sm font-bold text-blue-400">{activeStepData.id}</span>
                  <h2 className="text-4xl font-bold mt-2 text-white">{activeStepData.title}</h2>
                  <p className="mt-1 text-white/60">{activeStepData.subtitle}</p>
                  <p className="mt-4 text-white/80 text-lg">{activeStepData.description}</p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {activeStepData.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3 justify-center">
                        <div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <span className="text-sm text-white/80">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-12 flex justify-center">
                    <img 
                      src={activeStepData.image} 
                      alt={activeStepData.title} 
                      className="w-full max-w-md h-48 object-cover rounded-xl shadow-2xl"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Timeline */}
          <div className="mt-16">
            <div className="relative w-full h-1 bg-white/10 rounded-full">
              <motion.div
                className="absolute h-1 bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(activeIndex / (METHODOLOGY_STEPS.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-4 h-4 -top-1.5 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]"
                initial={{ left: '0%' }}
                animate={{ left: `calc(${(activeIndex / (METHODOLOGY_STEPS.length - 1)) * 100}% - 8px)` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              {METHODOLOGY_STEPS.map((step, i) => (
                <button 
                  key={step.id} 
                  onClick={() => setActiveStep(step.id)} 
                  className="text-center w-1/4"
                >
                  <span className={cn(
                    "text-sm font-semibold transition-colors",
                    i <= activeIndex ? "text-blue-400" : "text-white/40"
                  )}>
                    {step.id}
                  </span>
                  <p className={cn(
                    "text-xs mt-1 transition-colors",
                    i <= activeIndex ? "text-white/80" : "text-white/40"
                  )}>
                    {step.title.split(' ')[0]}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
