/** @jsx React.createElement */
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ content }) => (
  <motion.section
    id="home"
    className="py-16 md:py-24"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: 'easeOut' }}
  >
    <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
      <motion.h1
        className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        {content.hero.title}
      </motion.h1>
      <motion.p
        className="mt-6 text-lg text-slate-600"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {content.hero.subtitle}
      </motion.p>
      <motion.p
        className="mx-auto mb-8 max-w-3xl text-slate-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {content.hero.description}
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <a
          href="#portfolio"
          className="rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-sky-700"
        >
          View the Strategy
        </a>
        <a
          href="#tech"
          className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-100"
        >
          Explore the Tech
        </a>
        <a
          href={`/sparrow-ai-tech/cv.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Download CV (PDF)
        </a>
      </motion.div>
    </div>
  </motion.section>
);

export default HeroSection;
