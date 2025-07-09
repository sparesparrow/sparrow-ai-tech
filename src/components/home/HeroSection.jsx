import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ content }) => (
  <motion.section id="home" className="py-16 md:py-24"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >{content.hero.title}</motion.h1>
      <motion.p className="mt-6 text-lg text-slate-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >{content.hero.subtitle}</motion.p>
      <motion.p className="max-w-3xl mx-auto text-slate-500 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >{content.hero.description}</motion.p>
      <motion.div className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <a href="#portfolio" className="bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-sky-700 transition-all">View the Strategy</a>
        <a href="#tech" className="bg-white text-slate-700 font-semibold px-6 py-3 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all">Explore the Tech</a>
        <a href={`/sparrow-ai-tech/cv.pdf`} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Download CV (PDF)
        </a>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection; 