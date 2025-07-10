import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DecorativeDivider from './ui/DecorativeDivider.jsx';
import decorativeTexts from '../data/decorativeTexts.json';
import { useI18n } from '../i18n';
import ReactMarkdown from 'react-markdown';
import Modal from './ui/Modal.jsx';
import PropTypes from 'prop-types';
import Card from './ui/Card.jsx';
import PrimaryButton from './ui/PrimaryButton.jsx';
import SecondaryButton from './ui/SecondaryButton.jsx';
import SkeletonLoader from './ui/SkeletonLoader.jsx';
import PortfolioProjectsTable from './PortfolioProjectsTable';

// Example props:
// translations: { ... } (from cs.json/en.json)
// language: 'en' | 'cs'
// onLanguageChange: (lang) => void
// prompts: [string, ...]

const PauseBlock = ({ text }) => (
  <div className="my-12 flex justify-center">
    <div className="max-w-2xl w-full bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded shadow text-yellow-900 text-center italic text-lg dark:bg-yellow-900 dark:text-yellow-100">
      <span className="block mb-2 text-yellow-700 font-bold dark:text-yellow-300">Pause</span>
      {text}
    </div>
  </div>
);

// Add PauseSeparator and PromptBlock components at the top
const PauseSeparator = () => (
  <div className="flex items-center justify-center my-8" aria-label="Pause separator" role="separator">
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg animate-pulse">
      <span className="text-3xl text-white font-bold" aria-hidden="true">…</span>
    </div>
  </div>
);

const PromptBlock = ({ prompt }) => (
  <div className="max-w-2xl mx-auto my-8 p-6 bg-slate-800 border-l-4 border-blue-500 rounded shadow-lg transition-shadow hover:shadow-2xl focus-within:shadow-2xl dark:bg-slate-800 dark:border-blue-600 dark:hover:bg-slate-700 dark:focus-within:bg-slate-700">
    <p className="text-lg text-slate-100 dark:text-stone-200 italic whitespace-pre-line" tabIndex={0}>{prompt}</p>
  </div>
);

// Hero Section
const HeroSection = ({ translations }) => (
  <section id="hero" className="w-full min-h-screen flex items-center bg-white dark:bg-slate-900 pt-20 transition-colors duration-300" data-cy="hero-section">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-stone-800 dark:text-stone-100 leading-tight mb-4" dangerouslySetInnerHTML={{ __html: translations.hero_title_html }} />
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-stone-600 dark:text-stone-300 mb-8">{translations.hero_subtitle}</p>
      <img
        src={`/sparrow-ai-tech/assets/images/claude4-system-card-img-003.png`}
        alt="Abstract AI system card visual, suitable for hero section"
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
        loading="eager"
      />
      <div className="flex gap-4 mt-6">
        <a
          href="/todo"
          className="inline-block"
          data-cy="todo-dashboard-cta"
        >
          <button className="px-6 py-3 rounded bg-green-600 text-white font-semibold text-lg shadow hover:bg-green-700 focus:outline-none">
            View Project TODOs
          </button>
        </a>
        <PrimaryButton onClick={() => {}}>{translations.cta_quick_analysis_hero}</PrimaryButton>
      </div>
      <a href="/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.md" data-cy="test-article-link" className="block mt-4 text-sky-700 dark:text-sky-300 hover:underline">Test Article</a>
      <a href="/sparrow-ai-tech/infographics/Infographic1.html" data-cy="test-infographic-link" className="block mt-2 text-sky-700 dark:text-sky-300 hover:underline">Test Infographic</a>
    </div>
  </section>
);

// Services Section
const ServicesSection = ({ translations }) => {
  const tabs = [
    { key: 'ai', label: translations.service_tab_ai, content: translations.service_tab_ai_content },
    { key: 'security', label: translations.service_tab_security, content: translations.service_tab_security_content },
    { key: 'linux', label: translations.service_tab_linux, content: translations.service_tab_linux_content },
    { key: 'software', label: translations.service_tab_software, content: translations.service_tab_software_content },
    { key: 'modernization', label: translations.service_tab_modernization, content: translations.service_tab_modernization_content },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const active = tabs.find(tab => tab.key === activeTab);
  return (
    <section id="services" className="py-20 md:py-32" data-cy="services-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{translations.services_title}</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">{translations.services_subtitle}</p>
        </div>
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {tabs.map(tab => (
            <PrimaryButton
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 rounded-full font-semibold border transition-colors duration-200 ${activeTab === tab.key ? 'bg-sky-600 text-white border-sky-600 dark:bg-sky-700 dark:text-white dark:border-sky-600' : 'bg-white text-sky-700 border-sky-300 dark:bg-slate-800 dark:text-sky-300 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </PrimaryButton>
          ))}
        </div>
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow text-lg text-stone-700 dark:text-stone-200 min-h-[120px]">
          {active?.content}
        </div>
      </div>
    </section>
  );
};

// Articles Section
const ArticlesSection = ({ translations }) => {
  // Example hardcoded articles by category (replace with dynamic import if needed)
  const categories = [
    {
      name: 'Getting Started',
      articles: [
        { title: 'MCP Ecosystem Overview', url: '/sparrow-ai-tech/articles/mcp-ecosystem-overview.md' },
        { title: 'Hexagonal Architecture in MCP', url: '/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.md' },
      ]
    },
    {
      name: 'Guides',
      articles: [
        { title: 'Human Action in AI', url: '/sparrow-ai-tech/articles/human-action.md' },
        { title: 'Liberty', url: '/sparrow-ai-tech/articles/liberty.md' },
      ]
    },
    {
      name: 'Tutorials',
      articles: [
        { title: 'Getting Started with MCP Prompts', url: '/sparrow-ai-tech/articles/mcp-prompts.md' },
        { title: 'MCP in Practice', url: '/sparrow-ai-tech/articles/mcp-in-practice.en.md' },
      ]
    },
    {
      name: 'Reference',
      articles: [
        { title: 'MCP Contributions', url: '/sparrow-ai-tech/articles/mcp-contributions.en.md' },
        { title: 'Cursor Rules', url: '/sparrow-ai-tech/articles/cursor-rules.md' },
      ]
    }
  ];
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUrl, setModalUrl] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');
  return (
    <section id="articles" className="py-20 md:py-32 bg-stone-100 dark:bg-slate-900" data-cy="articles-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{translations.articles_title || 'Articles & Documentation'}</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">{translations.articles_subtitle || 'Explore categorized articles, guides, and references.'}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.name} className="mb-10">
              <h3 className="text-2xl font-semibold text-sky-700 dark:text-sky-300 mb-4">{cat.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.articles.map((article, i) => (
                  <Card
                    key={i}
                    title={article.title}
                    onClick={() => { setModalUrl(article.url); setModalTitle(article.title); setModalOpen(true); }}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open article: ${article.title}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ArticleModal open={modalOpen} onClose={() => setModalOpen(false)} articleUrl={modalUrl} title={modalTitle} />
    </section>
  );
};

// Infographics Section
const InfographicsSection = () => {
  const infographics = [
    {
      title: 'MCP Ecosystem',
      description: 'How the sparesparrow open-source toolchain revolutionizes AI agent development.',
      url: '/sparrow-ai-tech/infographics/1.html',
    },
    {
      title: 'Human-in-the-Loop AI',
      description: 'The indispensable partnership between human intuition and artificial intelligence.',
      url: '/sparrow-ai-tech/infographics/2.html',
    },
    {
      title: 'Hexagonal Architecture',
      description: 'How the Ports & Adapters pattern protects your application core.',
      url: '/sparrow-ai-tech/infographics/3.html',
    },
    {
      title: 'ElevenLabs Widget Demo',
      description: 'Live demo of the ElevenLabs voice widget integration.',
      url: '/sparrow-ai-tech/infographics/elevenlabs-widget.html',
    },
  ];
  return (
    <section id="infographics" className="py-20 md:py-32 bg-white dark:bg-slate-900" data-cy="infographics-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 dark:text-sky-300">Infographics</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">Explore interactive and visual guides to key concepts and architectures.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {infographics.map((info, idx) => (
            <Card
              key={idx}
              title={info.title}
              description={info.description}
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View infographic: ${info.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Research Highlights Section
const ResearchHighlightsSection = () => {
  const images = [
    {
      src: '/sparrow-ai-tech/assets/images/2212.08073v1-img-002.png',
      alt: 'Diagram showing the hexagonal architecture of the MCP server.',
      caption: 'MCP Server: Hexagonal Architecture Diagram',
      source: '',
    },
    {
      src: '/sparrow-ai-tech/assets/images/2401.05566v3-img-055.png',
      alt: 'Benchmark results chart from MCP research.',
      caption: 'MCP Research: Benchmark Results',
      source: '',
    },
    {
      src: '/sparrow-ai-tech/assets/images/claude4-system-card-img-008.png',
      alt: 'Claude 4 System Card: Benchmark Performance',
      caption: 'Claude 4 System Card: Benchmark Performance',
      source: 'https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf',
    },
    {
      src: '/sparrow-ai-tech/assets/images/2401.05566v3-img-019.png',
      alt: 'Data flow diagram for agentic workflows.',
      caption: 'Agentic Workflow: Data Flow Diagram',
      source: '',
    },
    {
      src: '/sparrow-ai-tech/assets/images/claude4-system-card-img-007.png',
      alt: 'Claude 4: Agentic Coding Workflow',
      caption: 'Claude 4: Agentic Coding Workflow',
      source: 'https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf',
    },
    {
      src: '/sparrow-ai-tech/assets/images/2401.05566v3-img-008.jpg',
      alt: 'Abstract conceptual visual from MCP research.',
      caption: 'MCP Research: Conceptual Visual',
      source: '',
    },
  ];
  return (
    <section id="research-highlights" className="py-20 md:py-32 bg-stone-50 dark:bg-slate-900" data-cy="research-highlights-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-300">Research Highlights</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">Key diagrams and benchmarks from leading AI agent research and MCP experiments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((img, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={img.src.startsWith('http') || img.src.startsWith('/sparrow-ai-tech/') ? img.src : `/sparrow-ai-tech/${img.src.replace(/^\/+/, '')}`} alt={img.alt} className="max-h-64 w-auto object-contain mb-4 rounded border" loading="lazy" />
              <div className="text-sm text-stone-700 dark:text-stone-200 text-center mb-2">{img.caption}</div>
              {img.source && <a href={img.source} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 dark:text-blue-300 underline">Source</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Add after ArticlesSection, before AboutSection
const PopularReposSection = () => {
  const [sortBy, setSortBy] = React.useState('stars');
  const [repos, setRepos] = React.useState([
    {
      url: 'https://github.com/sparesparrow/mcp-prompts',
      name: 'mcp-prompts',
      stars: 0,
      forks: 0,
    },
    {
      url: 'https://github.com/sparesparrow/cursor-rules',
      name: 'cursor-rules',
      stars: 0,
      forks: 0,
    },
    {
      url: 'https://github.com/sparesparrow/mcp-project-orchestrator',
      name: 'mcp-project-orchestrator',
      stars: 0,
      forks: 0,
    },
    {
      url: 'https://github.com/sparesparrow/mcp-router',
      name: 'mcp-router',
      stars: 0,
      forks: 0,
    },
    {
      url: 'https://github.com/sparesparrow/hard-coder',
      name: 'hard-coder',
      stars: 0,
      forks: 0,
    },
  ]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all(repos.map(async (repo) => {
      try {
        const res = await fetch(`https://api.github.com/repos/sparesparrow/${repo.name}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        return { ...repo, stars: data.stargazers_count, forks: data.forks_count };
      } catch {
        return repo;
      }
    })).then(updated => {
      setRepos(updated);
      setLoading(false);
    }).catch(() => setError('Failed to load repo data'));
  }, []);
  const sorted = [...repos].sort((a, b) => sortBy === 'stars' ? b.stars - a.stars : b.forks - a.forks);
  return (
    <section id="popular-repos" className="py-20 md:py-32 bg-slate-900 dark:bg-slate-800" data-cy="popular-repos-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-400 dark:text-sky-300">Popular GitHub Repositories</h2>
          <p className="text-lg text-slate-300 dark:text-stone-300 mt-2 max-w-2xl mx-auto">Explore my most starred open-source projects.</p>
          <div className="mt-4 flex justify-center gap-4">
            <SecondaryButton onClick={() => setSortBy('stars')} selected={sortBy === 'stars'}>Sort by Stars</SecondaryButton>
            <SecondaryButton onClick={() => setSortBy('forks')} selected={sortBy === 'forks'}>Sort by Forks</SecondaryButton>
          </div>
        </div>
        {loading ? <SkeletonLoader type="card" count={3} /> : error ? <div className="text-red-500 dark:text-red-500 text-center">{error}</div> : (
          <div className="flex flex-wrap justify-center gap-6">
            {sorted.map(repo => (
              <Card
                key={repo.url}
                title={repo.name}
                description={`⭐ ${repo.stars} | 🍴 ${repo.forks}`}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View repo: ${repo.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const EXAMPLES = [
  { label: 'Flowchart', code: `graph TD\nA[Start] --> B{Is it working?}\nB -- Yes --> C[Great!]\nB -- No --> D[Debug]\nD --> B` },
  { label: 'Sequence', code: `sequenceDiagram\n    Alice->>+John: Hello John, how are you?\n    Alice->>+John: John, can you hear me?\n    John-->>-Alice: Hi Alice, I can hear you!\n    John-->>-Alice: I feel great!` },
  { label: 'Gantt', code: `gantt\n    dateFormat  YYYY-MM-DD\n    title Adding GANTT diagram functionality to mermaid\n    section A section\n    Completed task :done, des1, 2014-01-06,2014-01-08\n    Active task :active, des2, 2014-01-09, 3d\n    Future task : des3, after des2, 5d` },
];

const EditableMermaidDemoSection = () => {
  const [code, setCode] = React.useState(EXAMPLES[0].code);
  const [svg, setSvg] = React.useState('');
  const [error, setError] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [example, setExample] = React.useState(EXAMPLES[0].label);
  React.useEffect(() => {
    if (!code) return;
    setError(null);
    try {
      mermaid.initialize({ startOnLoad: false, theme: 'dark' });
      mermaid.render('homepage-editable-mermaid', code, (svgCode) => setSvg(svgCode));
    } catch (e) {
      setError('Invalid Mermaid syntax');
      setSvg('');
    }
  }, [code]);
  const handleExample = (label) => {
    const ex = EXAMPLES.find(e => e.label === label);
    if (ex) {
      setExample(label);
      setCode(ex.code);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setToast(null);
    try {
      const res = await fetch('/sparrow-ai-tech/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setToast('Diagram saved!');
    } catch {
      setToast('Failed to save diagram');
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 2000);
    }
  };
  return (
    <section id="editable-mermaid" className="py-20 md:py-32 bg-slate-950 dark:bg-slate-900" data-cy="editable-mermaid-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 dark:text-emerald-300">Live Editable Diagram</h2>
          <p className="text-lg text-slate-300 dark:text-stone-300 mt-2 max-w-2xl mx-auto">Edit the Mermaid code below and see your diagram update instantly.</p>
          <div className="mt-4 flex justify-center gap-4">
            {EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => handleExample(ex.label)} className={`px-4 py-2 rounded ${example === ex.label ? 'bg-emerald-600 text-white dark:bg-emerald-700 dark:text-white' : 'bg-slate-800 text-emerald-300 dark:bg-slate-700 dark:text-emerald-300'}`}>{ex.label}</button>
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <textarea
            className="w-full p-2 rounded border bg-slate-900 dark:bg-slate-800 text-slate-100 dark:text-stone-100 font-mono mb-2"
            rows={6}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            aria-label="Edit Mermaid diagram"
          />
          <div className="flex gap-4 items-center mb-2">
            <PrimaryButton onClick={handleSave} disabled={saving} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 dark:bg-emerald-700 dark:text-white disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Diagram'}
            </PrimaryButton>
            {toast && <span className="text-emerald-400">{toast}</span>}
          </div>
          {error && <div className="text-red-500 dark:text-red-500 mb-2">{error}</div>}
          <div className="mermaid-diagram border rounded bg-slate-800 dark:bg-slate-700 p-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </div>
    </section>
  );
};

const SavedDiagramsGallery = () => {
  const [diagrams, setDiagrams] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [deleting, setDeleting] = React.useState(null);
  const [savingOrder, setSavingOrder] = React.useState(false);
  const [orderToast, setOrderToast] = React.useState(null);
  React.useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/sparrow-ai-tech/api/diagrams')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(setDiagrams)
      .catch(() => setError('Failed to load diagrams'))
      .finally(() => setLoading(false));
  }, [deleting]);
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await fetch(`/sparrow-ai-tech/api/diagrams/${id}`, { method: 'DELETE' });
      setDiagrams(diagrams => diagrams.filter(d => d.id !== id));
    } catch { }
    setDeleting(null);
  };
  const handleSaveOrder = async () => {
    setSavingOrder(true);
    setOrderToast(null);
    try {
      const res = await fetch('/sparrow-ai-tech/api/diagrams/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: diagrams.map(d => d.id) }),
      });
      if (!res.ok) throw new Error('Failed to save order');
      setOrderToast('Order saved!');
    } catch {
      setOrderToast('Failed to save order');
    } finally {
      setSavingOrder(false);
      setTimeout(() => setOrderToast(null), 2000);
    }
  };

  // dnd-kit sortable item
  function DiagramSortableItem({ diagram, idx }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: diagram.id });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : 1,
      opacity: isDragging ? 0.7 : 1,
      boxShadow: isDragging ? '0 0 0 4px #34d399' : undefined,
    };
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`bg-slate-800 dark:bg-slate-700 p-6 rounded-xl shadow-lg relative cursor-move select-none`}
      >
        <button onClick={() => handleDelete(diagram.id)} disabled={deleting === diagram.id} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 dark:bg-red-700 dark:text-white disabled:opacity-50">
          {deleting === diagram.id ? 'Deleting...' : 'Delete'}
        </button>
        <div className="mb-2 text-slate-400 dark:text-stone-300 text-xs">ID: {diagram.id}</div>
        <div className="mermaid-diagram border rounded bg-slate-900 dark:bg-slate-800 p-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: window.mermaid?.render ? window.mermaid.render(`gallery-${diagram.id}`, diagram.code, () => { }) : '' }} />
        <pre className="mt-2 text-xs text-slate-300 dark:text-stone-300 bg-slate-900 dark:bg-slate-800 p-2 rounded">{diagram.code}</pre>
      </div>
    );
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = diagrams.findIndex(d => d.id === active.id);
      const newIndex = diagrams.findIndex(d => d.id === over.id);
      setDiagrams((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <section id="saved-diagrams" className="py-20 md:py-32 bg-slate-900 dark:bg-slate-800" data-cy="saved-diagrams-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 dark:text-emerald-300">Saved Diagrams Gallery</h2>
          <p className="text-lg text-slate-300 dark:text-stone-300 mt-2 max-w-2xl mx-auto">Browse and manage your saved diagrams.</p>
          <div className="mt-4 flex justify-center gap-4">
            <PrimaryButton onClick={handleSaveOrder} disabled={savingOrder} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 dark:bg-emerald-700 dark:text-white disabled:opacity-50">
              {savingOrder ? 'Saving...' : 'Save Order'}
            </PrimaryButton>
            {orderToast && <span className="text-emerald-400">{orderToast}</span>}
          </div>
        </div>
        {loading ? <SkeletonLoader type="card" count={4} /> : error ? <div className="text-red-500 dark:text-red-500 text-center">{error}</div> : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={diagrams.map(d => d.id)} strategy={verticalListSortingStrategy}>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {diagrams.map((diagram, idx) => (
                  <DiagramSortableItem key={diagram.id} diagram={diagram} idx={idx} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </section>
  );
};

// About Section
const AboutSection = ({ translations }) => {
  const steps = [
    translations.process_step1,
    translations.process_step2,
    translations.process_step3,
    translations.process_step4,
  ].filter(Boolean);
  return (
    <section id="about" className="py-20 md:py-32 bg-white dark:bg-slate-900" data-cy="about-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{translations.about_title}</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">{translations.about_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-stone-50 dark:bg-slate-800 p-8 rounded-xl text-center">[{translations.about_benefit1_title}]</div>
          <div className="bg-stone-50 dark:bg-slate-800 p-8 rounded-xl text-center">[{translations.about_benefit2_title}]</div>
          <div className="bg-stone-50 dark:bg-slate-800 p-8 rounded-xl text-center">[{translations.about_benefit3_title}]</div>
        </div>
        {steps.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-sky-700 dark:text-sky-300 mb-6">{translations.process_title}</h3>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-8 h-8 flex items-center justify-center bg-sky-600 text-white rounded-full font-bold mr-4 dark:bg-sky-700 dark:text-white">{i + 1}</span>
                  <span className="text-lg text-stone-700 dark:text-stone-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = ({ translations }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };
  return (
    <section id="contact" className="py-20 md:py-32" data-cy="contact-section">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800 dark:text-stone-100">{translations.contact_title}</h2>
          <p className="text-lg text-stone-600 dark:text-stone-300 mt-2 max-w-2xl mx-auto">{translations.contact_subtitle}</p>
        </div>
        <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-lg">
          {submitted ? (
            <div className="text-green-700 dark:text-green-300 text-lg font-semibold text-center py-8">{translations.contact_success || 'Thank you for your message!'}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-stone-700 dark:text-stone-200 font-bold mb-2" htmlFor="name">{translations.contact_name_label}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={translations.contact_name_placeholder}
                  className="w-full border border-stone-300 dark:border-stone-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-700"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 dark:text-stone-200 font-bold mb-2" htmlFor="email">{translations.contact_email_label}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={translations.contact_email_placeholder}
                  className="w-full border border-stone-300 dark:border-stone-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-700"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 dark:text-stone-200 font-bold mb-2" htmlFor="message">{translations.contact_message_label}</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={translations.contact_message_placeholder}
                  className="w-full border border-stone-300 dark:border-stone-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:focus:ring-sky-700"
                  rows={5}
                  required
                />
              </div>
              <PrimaryButton type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 dark:bg-sky-700 dark:text-white transition-colors text-lg">
                {translations.contact_submit_button}
              </PrimaryButton>
            </form>
          )}
        </div>
        <div className="text-center mt-8 text-stone-600 dark:text-stone-300">{translations.contact_info || '[Contact Info Placeholder]'}</div>
      </div>
    </section>
  );
};

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const html = document.documentElement.outerHTML;
      const res = await fetch('/sparrow-ai-tech/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sparrow-ai-tech.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      setError('PDF download failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PrimaryButton onClick={handleDownload} data-cy="download-pdf-btn" className="fixed bottom-8 right-8 z-50 bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all text-lg print:hidden disabled:opacity-60 dark:bg-sky-700 dark:hover:bg-sky-600" aria-label="Download as PDF" disabled={loading}>
        {loading ? 'Generating PDF…' : 'Download as PDF'}
      </PrimaryButton>
      {error && (
        <div className="fixed bottom-24 right-8 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg dark:bg-red-700">{error}</div>
      )}
    </>
  );
};

const ChatbotButton = ({ onClick }) => (
  <PrimaryButton onClick={onClick} data-cy="open-chatbot-btn" className="fixed bottom-28 right-8 z-50 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all text-lg flex items-center gap-2 print:hidden dark:bg-emerald-700 dark:hover:bg-emerald-600" aria-label="Open Voice Chatbot">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 dark:text-emerald-300">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0a6.75 6.75 0 01-6.75-6.75h1.5A5.25 5.25 0 0012 19.5a5.25 5.25 0 005.25-5.25h1.5A6.75 6.75 0 0112 20.25zm0-15v6.75m0 0a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-4.5 0v1.5a2.25 2.25 0 002.25 2.25z" />
    </svg>
    Voice Chatbot
  </PrimaryButton>
);

// Replace ArticleModal definition with usage of Modal
const ArticleModal = ({ open, onClose, articleUrl, title }) => {
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!open || !articleUrl) return;
    setLoading(true);
    setError(null);
    setContent('');
    fetch(articleUrl)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load article');
        return res.text();
      })
      .then(setContent)
      .catch(() => setError('Failed to load article'))
      .finally(() => setLoading(false));
  }, [open, articleUrl]);

  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {loading && <div className="text-sky-400">Loading…</div>}
      {error && <div className="text-red-400">{error}</div>}
      {!loading && !error && (
        <div className="prose prose-invert max-w-none dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </Modal>
  );
};

// Refactor ChatbotModal to use Modal
const ChatbotModal = ({ open, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    try {
      const res = await fetch("/sparrow-ai-tech/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error("Failed to get reply");
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.reply }]);
      setInput("");
    } catch (e) {
      setError("Chatbot error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <Modal open={open} onClose={onClose} title="Voice Chatbot (ElevenLabs)">
      <div className="flex-1 overflow-y-auto mb-4 max-h-64">
        {messages.length === 0 && <div className="bg-slate-100 dark:bg-slate-700 rounded p-4 text-slate-600 dark:text-stone-300 text-center">Say hello to the ElevenLabs chatbot!</div>}
        {messages.map((msg, i) => (
          <div key={i} className={msg.from === "user" ? "text-right mb-2" : "text-left mb-2"}>
            <span className={msg.from === "user" ? "inline-block bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-100 px-3 py-2 rounded-lg" : "inline-block bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 px-3 py-2 rounded-lg"}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <input
        type="text"
        className="w-full border border-slate-300 dark:border-slate-600 rounded px-4 py-2 mb-2 bg-slate-100 dark:bg-slate-800 text-slate-100 dark:text-stone-100 font-mono"
        placeholder="Type your message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        disabled={loading}
        data-cy="chatbot-input"
        onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
      />
      <PrimaryButton
        className="w-full bg-sky-600 text-white font-bold py-2 rounded-lg mt-2 disabled:opacity-60 dark:bg-sky-700 dark:text-white"
        onClick={handleSend}
        disabled={loading || !input.trim()}
        data-cy="chatbot-send-btn"
      >
        {loading ? "Sending..." : "Send"}
      </PrimaryButton>
      {error && <div className="mt-2 text-red-600 dark:text-red-500 text-sm">{error}</div>}
    </Modal>
  );
};

// Patch: Add default values for props and defensive checks for translations and translations.nav
const HomePage = ({ prompts = [] }) => {
  const { t, language, setLanguage } = useI18n();
  // Defensive: Ensure translations.nav exists and has expected keys
  const nav = t('nav');

  // Helper to get divider by index (cycle if not enough)
  const getDivider = (idx) => {
    const d = decorativeTexts[idx % decorativeTexts.length];
    return <DecorativeDivider key={`divider-${idx}`} text={d.text} rotation={d.rotation} align={d.align} />;
  };

  // Sections with dividers between them
  const sections = [
    <HeroSection key="hero" translations={{ hero_title_html: t('hero.title_html'), hero_subtitle: t('hero.subtitle'), cta_quick_analysis_hero: t('hero.cta_quick_analysis_hero') }} />,
    getDivider(0),
    <ServicesSection key="services" translations={{ services_title: t('services.title'), services_subtitle: t('services.subtitle'), service_tab_ai: t('services.tab.ai'), service_tab_security: t('services.tab.security'), service_tab_linux: t('services.tab.linux'), service_tab_software: t('services.tab.software'), service_tab_modernization: t('services.tab.modernization'), service_tab_ai_content: t('services.tab.ai_content'), service_tab_security_content: t('services.tab.security_content'), service_tab_linux_content: t('services.tab.linux_content'), service_tab_software_content: t('services.tab.software_content'), service_tab_modernization_content: t('services.tab.modernization_content') }} />,
    getDivider(1),
    <ArticlesSection key="articles" translations={{ articles_title: t('articles.title'), articles_subtitle: t('articles.subtitle'), articles: t('articles.articles') }} />,
    <InfographicsSection key="infographics" />,
    getDivider(2),
    <ResearchHighlightsSection key="research" />,
    getDivider(3),
    <PopularReposSection key="repos" />,
    <EditableMermaidDemoSection key="editable-mermaid" />,
    <SavedDiagramsGallery key="saved-diagrams" />,
    getDivider(4),
    <AboutSection key="about" translations={{ about_title: t('about.title'), about_subtitle: t('about.subtitle'), about_benefit1_title: t('about.benefit1_title'), about_benefit2_title: t('about.benefit2_title'), about_benefit3_title: t('about.benefit3_title'), process_title: t('about.process_title'), process_step1: t('about.process_step1'), process_step2: t('about.process_step2'), process_step3: t('about.process_step3'), process_step4: t('about.process_step4') }} />,
    <ContactSection key="contact" translations={{ contact_title: t('contact.title'), contact_subtitle: t('contact.subtitle'), contact_name_label: t('contact.name_label'), contact_name_placeholder: t('contact.name_placeholder'), contact_email_label: t('contact.email_label'), contact_email_placeholder: t('contact.email_placeholder'), contact_message_label: t('contact.message_label'), contact_message_placeholder: t('contact.message_placeholder'), contact_submit_button: t('contact.submit_button'), contact_success: t('contact.success') }} />
  ];

  let content = [];
  let promptIdx = 0;
  for (let i = 0; i < sections.length; i++) {
    content.push(sections[i]);
    if (promptIdx < prompts.length && i < sections.length - 1) {
      content.push(<PauseBlock key={`pause-${promptIdx}`} text={prompts[promptIdx]} />);
      promptIdx++;
    }
  }

  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="bg-stone-50 dark:bg-slate-900 min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-stone-200 dark:bg-slate-800 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-sky-600 dark:text-sky-300">Sparrow AI & Tech</span>
            <span className="hidden sm:inline-block ml-3 text-slate-500 dark:text-slate-400">Strategic Blueprint</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">{nav.services}</a>
            <a href="#services" className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">{nav.services}</a>
            <a href="#articles" className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">{nav.articles}</a>
            <a href="#about" className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">{nav.about}</a>
            <a href="#contact" className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300">{nav.contact}</a>
            <PrimaryButton onClick={() => setLanguage(language === 'en' ? 'cs' : 'en')} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm dark:bg-sky-700 dark:hover:bg-sky-600">
              {language === 'en' ? 'Česky' : 'English'}
            </PrimaryButton>
          </nav>
        </div>
      </header>
      <main className="flex-1 pt-20" role="main" aria-label="Main content">
        {sections.map((section, idx) => (
          <React.Fragment key={idx}>{section}</React.Fragment>
        ))}
      </main>
      <footer className="bg-slate-800 dark:bg-slate-700 text-slate-400 dark:text-slate-300 py-8 text-center mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4">
          <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
          <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Sparrow AI Tech. All rights reserved.</p>
        </div>
      </footer>
      <DownloadPdfButton />
      <ChatbotButton onClick={() => setChatbotOpen(true)} />
      <ChatbotModal open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};

export default HomePage;

PauseBlock.propTypes = { text: PropTypes.string.isRequired };
PauseSeparator.propTypes = {};
PromptBlock.propTypes = { prompt: PropTypes.string.isRequired };
HeroSection.propTypes = { translations: PropTypes.object.isRequired };
ServicesSection.propTypes = { translations: PropTypes.object.isRequired };
ArticlesSection.propTypes = { translations: PropTypes.object.isRequired };
InfographicsSection.propTypes = {};
ResearchHighlightsSection.propTypes = {};
PopularReposSection.propTypes = {};
EditableMermaidDemoSection.propTypes = {};
SavedDiagramsGallery.propTypes = {};
AboutSection.propTypes = { translations: PropTypes.object.isRequired };
ContactSection.propTypes = { translations: PropTypes.object.isRequired };
DownloadPdfButton.propTypes = {};
ChatbotModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired };
ChatbotButton.propTypes = { onClick: PropTypes.func.isRequired };
ArticleModal.propTypes = { open: PropTypes.bool.isRequired, onClose: PropTypes.func.isRequired, articleUrl: PropTypes.string, title: PropTypes.string };
HomePage.propTypes = { prompts: PropTypes.array };
