import React from 'react';
import PrimaryButton from './ui/PrimaryButton';

const HeroSection = ({ translations }) => (
  <section id="hero" className="bg-stone-100 py-20 text-center dark:bg-slate-800 md:py-32">
    <div className="container mx-auto px-6">
      <h1 
        className="mb-4 text-4xl font-extrabold leading-tight text-stone-800 dark:text-stone-100 md:text-6xl"
        dangerouslySetInnerHTML={{ __html: translations.hero_title_html || 'Welcome to Sparrow AI Tech' }} 
      />
      <p className="mx-auto mb-8 max-w-3xl text-lg text-stone-600 dark:text-stone-300 md:text-xl">
        {translations.hero_subtitle || 'AI-powered tools and interactive infographics'}
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/sparrow-ai-tech/todo" target="_blank" rel="noopener noreferrer">
          <button className="rounded-lg bg-sky-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105">
            View Project TODOs
          </button>
        </a>
        <PrimaryButton onClick={() => window.location.hash = '#about'}>
          {translations.cta_quick_analysis_hero || 'Learn More'}
        </PrimaryButton>
      </div>
    </div>
  </section>
);

const AboutSection = ({ translations }) => {
  const benefits = [
    { title: translations.about_benefit1_title || 'AI Integration', description: 'Advanced AI tools' },
    { title: translations.about_benefit2_title || 'Interactive Design', description: 'Engaging user experience' },
    { title: translations.about_benefit3_title || 'Modern Stack', description: 'Latest technologies' }
  ];

  return (
    <section id="about" className="py-20 dark:bg-slate-900 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 md:text-4xl">
          {translations.about_title || 'About Our Platform'}
        </h2>
        <div className="mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="rounded-xl bg-stone-50 p-8 text-center dark:bg-slate-800">
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = ({ translations = {}, language = 'en' }) => {
  return (
    <div className="bg-white text-stone-800 dark:bg-slate-900 dark:text-stone-100">
      <HeroSection translations={translations} />
      <AboutSection translations={translations} />
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">Current Language: {language}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Platform configured for {language === 'en' ? 'English' : 'Czech'} content
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
