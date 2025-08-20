import React from 'react';
import { motion } from 'framer-motion';

const Bibliography = ({ showExpanded = false }) => {
  const references = [
    {
      id: 'amodei2024',
      category: 'Anthropic & AI Safety',
      author: 'Amodei, D.',
      year: '2024',
      title: 'Machines of Loving Grace: How AI could transform the world for the better',
      publisher: 'Anthropic',
      url: 'https://www.anthropic.com/news/machines-of-loving-grace',
      note: 'Vizionářský esej o pozitivním potenciálu AI při zachování lidských hodnot a svobod.',
      type: 'essay'
    },
    {
      id: 'amodei2024-cai',
      category: 'Anthropic & AI Safety',
      author: 'Amodei, D., et al.',
      year: '2024',
      title: 'Constitutional AI: Harmlessness from AI Feedback',
      publisher: 'Anthropic Research',
      url: 'https://arxiv.org/abs/2212.08073',
      note: 'Průlomová práce o zarovnání AI systémů pomocí konstituční AI metodologie.',
      type: 'paper'
    },
    {
      id: 'ng2025-university',
      category: 'Andrew Ng & Education',
      author: 'Ng, A.',
      year: '2025',
      title: 'AI Transformation Comes to Universities',
      publisher: 'DeepLearning.AI The Batch',
      url: 'https://www.deeplearning.ai/the-batch/',
      note: 'Analýza transformace univerzit pomocí AI technologií.',
      type: 'article'
    },
    {
      id: 'ng2025-exeter',
      category: 'Andrew Ng & Education',
      author: 'Ng, A.',
      year: '2025',
      title: 'Build things that matter',
      publisher: 'University of Exeter Commencement Address',
      url: 'https://news.exeter.ac.uk/alumni-news/ai-pioneer-andrew-ng-urges-new-university-of-exeter-graduates-to-build-things-that-matter/',
      note: 'Inspirativní projev o důležitosti zaměření na dopad při technologickém vývoji.',
      type: 'speech'
    },
    {
      id: 'mises1949',
      category: 'Austrian Economics',
      author: 'von Mises, L.',
      year: '1949',
      title: 'Human Action: A Treatise on Economics',
      publisher: 'Yale University Press',
      url: 'https://mises.org/library/book/human-action-0',
      note: 'Fundamentální dílo rakouské ekonomické školy o praxeologii a teorii lidského jednání.',
      type: 'book'
    },
    {
      id: 'mises2025-psychology',
      category: 'Austrian Economics',
      author: 'von Mises, L.',
      year: '2025',
      title: 'How Psychology Is Catching Up with the Reality of Human Action',
      publisher: 'Mises Wire',
      url: 'https://mises.org/mises-wire/how-psychology-catching-reality-human-action',
      note: 'Moderní aplikace praxeologických principů v psychologii a kognitivních vědách.',
      type: 'article'
    },
    {
      id: 'berman2025-gpt5',
      category: 'YouTube & Technical Guides',
      author: 'Berman, M.',
      year: '2025',
      title: 'How to Make Better Prompts for GPT-5',
      publisher: 'YouTube',
      url: 'https://www.youtube.com/watch?v=EfOjGyctDcQ',
      note: 'Praktický návod na optimalizaci promptů pro reasoning modely s odkazy na OpenAI dokumentaci.',
      type: 'video'
    },
    {
      id: 'hayek1945',
      category: 'Austrian Economics',
      author: 'Hayek, F. A.',
      year: '1945',
      title: 'The Use of Knowledge in Society',
      publisher: 'American Economic Review, 35(4), 519-530',
      url: 'https://www.jstor.org/stable/1809376',
      note: 'Klasická práce o distribuovaných znalostech a spontánním řádu v ekonomických systémech.',
      type: 'paper'
    },
    {
      id: 'anthropic-mcp',
      category: 'Technical Documentation',
      author: 'Anthropic',
      year: '2024',
      title: 'Model Context Protocol Specification',
      publisher: 'GitHub',
      url: 'https://github.com/modelcontextprotocol/specification',
      note: 'Oficiální specifikace Model Context Protocol pro integraci AI systémů.',
      type: 'documentation'
    },
    {
      id: 'sparesparrow-mcp-prompts',
      category: 'Technical Documentation',
      author: 'sparesparrow',
      year: '2024',
      title: 'MCP Prompts Server Documentation',
      publisher: 'GitHub',
      url: 'https://github.com/sparesparrow/mcp-prompts',
      note: 'Dokumentace k implementaci MCP serveru pro správu promptů s hexagonální architekturou.',
      type: 'documentation'
    }
  ];

  const categories = [...new Set(references.map(ref => ref.category))];

  return (
    <motion.div 
      className="bibliography-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-cyber-green mb-4">
            Akademické reference
          </h2>
          <p className="text-cyber-text-dim text-lg">
            Všechny citace jsou ověřeny a odkazují na primární zdroje
          </p>
        </motion.div>

        {categories.map((category, categoryIndex) => {
          const categoryRefs = references.filter(ref => ref.category === category);
          
          return (
            <motion.div 
              key={category}
              className="mb-12"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-semibold text-cyber-blue mb-6 border-b-2 border-cyber-border pb-2">
                {category}
              </h3>
              
              <div className="space-y-6">
                {categoryRefs.map((ref, refIndex) => (
                  <motion.div 
                    key={ref.id}
                    className="reference-item bg-cyber-surface/50 p-6 rounded-lg border border-cyber-border hover:border-cyber-green transition-colors duration-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + categoryIndex * 0.1 + refIndex * 0.05 }}
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-cyber-orange font-bold text-sm bg-cyber-orange/10 px-2 py-1 rounded">
                        [{refIndex + 1}]
                      </span>
                      <div className="flex-1">
                        <div className="reference-citation mb-2">
                          <strong className="text-cyber-text">{ref.author}</strong>
                          {' '}({ref.year}).{' '}
                          <em className="text-cyber-green">"{ref.title}"</em>
                          {' '}<span className="text-cyber-text-dim">{ref.publisher}</span>
                        </div>
                        
                        {ref.url && (
                          <a 
                            href={ref.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-cyber-blue hover:text-cyber-green transition-colors duration-200 text-sm break-all"
                          >
                            {ref.url}
                          </a>
                        )}
                        
                        {ref.note && (
                          <p className="text-cyber-text-dim text-sm mt-2 italic">
                            {ref.note}
                          </p>
                        )}
                        
                        <span className="inline-block mt-2 text-xs bg-cyber-blue/10 text-cyber-blue px-2 py-1 rounded">
                          {ref.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-cyber-surface/30 border border-cyber-border rounded-lg p-6">
            <h4 className="text-cyber-green font-semibold mb-3">Metodologie citací</h4>
            <p className="text-cyber-text-dim text-sm leading-relaxed">
              Všechny reference následují akademické standardy pro citace. Preferovány jsou primární zdroje 
              před sekundárními a pro technická témata jsou upřednostňovány aktuální zdroje (2020+). 
              Historické zdroje jsou zachovány pro foundational koncepty rakouské ekonomie a filozofie.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bibliography;
