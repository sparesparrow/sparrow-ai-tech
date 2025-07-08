import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Example props:
// translations: { ... } (from cs.json/en.json)
// language: 'en' | 'cs'
// onLanguageChange: (lang) => void
// prompts: [string, ...]

const PauseBlock = ({ text }) => (
  <div className="my-12 flex justify-center">
    <div className="max-w-2xl w-full bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded shadow text-yellow-900 text-center italic text-lg">
      <span className="block mb-2 text-yellow-700 font-bold">Pause</span>
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
  <div className="max-w-2xl mx-auto my-8 p-6 bg-slate-800 border-l-4 border-blue-500 rounded shadow-lg transition-shadow hover:shadow-2xl focus-within:shadow-2xl">
    <p className="text-lg text-slate-100 italic whitespace-pre-line" tabIndex={0}>{prompt}</p>
  </div>
);

// Hero Section
const HeroSection = ({ translations }) => (
  <section id="hero" className="w-full min-h-screen flex items-center bg-white pt-20">
    <div className="container mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-stone-800 leading-tight mb-4" dangerouslySetInnerHTML={{__html: translations.hero_title_html}} />
      <p className="max-w-3xl mx-auto text-lg md:text-xl text-stone-600 mb-8">{translations.hero_subtitle}</p>
      <img
        src="/assets/images/selected/claude4-system-card-img-003.png"
        alt="Abstract AI system card visual, suitable for hero section"
        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
        loading="eager"
      />
      <button className="bg-teal-600 text-white text-lg px-8 py-4 rounded-lg hover:bg-teal-700 transition-all shadow-lg transform hover:scale-105">
        {translations.cta_quick_analysis_hero}
      </button>
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
    <section id="services" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{translations.services_title}</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">{translations.services_subtitle}</p>
        </div>
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`px-6 py-2 rounded-full font-semibold border transition-colors duration-200 ${activeTab === tab.key ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-sky-700 border-sky-300 hover:bg-sky-50'}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow text-lg text-stone-700 min-h-[120px]">
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
        { title: 'MCP Ecosystem Overview', url: '/articles/merged/mcp-ecosystem-overview.md' },
        { title: 'Hexagonal Architecture in MCP', url: '/articles/merged/hexagonal-architecture-in-mcp.md' },
      ]
    },
    {
      name: 'Guides',
      articles: [
        { title: 'Human Action in AI', url: '/articles/human-action.md' },
        { title: 'Liberty', url: '/articles/liberty.md' },
      ]
    },
    {
      name: 'Tutorials',
      articles: [
        { title: 'Getting Started with MCP Prompts', url: '/articles/mcp-prompts.md' },
        { title: 'MCP in Practice', url: '/articles/mcp-in-practice.en.md' },
      ]
    },
    {
      name: 'Reference',
      articles: [
        { title: 'MCP Contributions', url: '/articles/mcp-contributions.en.md' },
        { title: 'Cursor Rules', url: '/articles/cursor-rules.md' },
      ]
    }
  ];
  return (
    <section id="articles" className="py-20 md:py-32 bg-stone-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{translations.articles_title || 'Articles & Documentation'}</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">{translations.articles_subtitle || 'Explore categorized articles, guides, and references.'}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.name} className="mb-10">
              <h3 className="text-2xl font-semibold text-sky-700 mb-4">{cat.name}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {cat.articles.map((article, i) => (
                  <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="block bg-white hover:bg-slate-100 p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                    <span className="text-lg font-semibold text-sky-700">{article.title}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Infographics Section
const InfographicsSection = () => {
  const infographics = [
    {
      title: 'MCP Ecosystem',
      description: 'How the sparesparrow open-source toolchain revolutionizes AI agent development.',
      url: '/infographics/1.html',
    },
    {
      title: 'Human-in-the-Loop AI',
      description: 'The indispensable partnership between human intuition and artificial intelligence.',
      url: '/infographics/2.html',
    },
    {
      title: 'Hexagonal Architecture',
      description: 'How the Ports & Adapters pattern protects your application core.',
      url: '/infographics/3.html',
    },
    {
      title: 'ElevenLabs Widget Demo',
      description: 'Live demo of the ElevenLabs voice widget integration.',
      url: '/infographics/elevenlabs-widget.html',
    },
  ];
  return (
    <section id="infographics" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700">Infographics</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">Explore interactive and visual guides to key concepts and architectures.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {infographics.map((info, idx) => (
            <a key={idx} href={info.url} target="_blank" rel="noopener noreferrer" className="block bg-slate-100 hover:bg-slate-200 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg text-center">
              <h3 className="text-lg font-semibold text-sky-700 mb-2">{info.title}</h3>
              <p className="text-slate-600 mb-2">{info.description}</p>
              <span className="inline-block mt-4 text-sky-600 font-bold">View Infographic &rarr;</span>
            </a>
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
      src: '/assets/images/selected/2212.08073v1-img-002.png',
      alt: 'Diagram showing the hexagonal architecture of the MCP server.',
      caption: 'MCP Server: Hexagonal Architecture Diagram',
      source: '',
    },
    {
      src: '/assets/images/selected/2401.05566v3-img-055.png',
      alt: 'Benchmark results chart from MCP research.',
      caption: 'MCP Research: Benchmark Results',
      source: '',
    },
    {
      src: '/assets/images/selected/claude4-system-card-img-008.png',
      alt: 'Claude 4 System Card: Benchmark Performance',
      caption: 'Claude 4 System Card: Benchmark Performance',
      source: 'https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf',
    },
    {
      src: '/assets/images/selected/2401.05566v3-img-019.png',
      alt: 'Data flow diagram for agentic workflows.',
      caption: 'Agentic Workflow: Data Flow Diagram',
      source: '',
    },
    {
      src: '/assets/images/selected/claude4-system-card-img-007.png',
      alt: 'Claude 4: Agentic Coding Workflow',
      caption: 'Claude 4: Agentic Coding Workflow',
      source: 'https://www-cdn.anthropic.com/6be99a52cb68eb70eb9572b4cafad13df32ed995.pdf',
    },
    {
      src: '/assets/images/selected/2401.05566v3-img-008.jpg',
      alt: 'Abstract conceptual visual from MCP research.',
      caption: 'MCP Research: Conceptual Visual',
      source: '',
    },
  ];
  return (
    <section id="research-highlights" className="py-20 md:py-32 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-700">Research Highlights</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">Key diagrams and benchmarks from leading AI agent research and MCP experiments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {images.map((img, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
              <img src={img.src} alt={img.alt} className="max-h-64 w-auto object-contain mb-4 rounded border" loading="lazy" />
              <div className="text-sm text-stone-700 text-center mb-2">{img.caption}</div>
              {img.source && <a href={img.source} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline">Source</a>}
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
    <section id="popular-repos" className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-400">Popular GitHub Repositories</h2>
          <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto">Explore my most starred open-source projects.</p>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={() => setSortBy('stars')} className={`px-4 py-2 rounded ${sortBy==='stars'?'bg-sky-600 text-white':'bg-slate-800 text-sky-300'}`}>Sort by Stars</button>
            <button onClick={() => setSortBy('forks')} className={`px-4 py-2 rounded ${sortBy==='forks'?'bg-sky-600 text-white':'bg-slate-800 text-sky-300'}`}>Sort by Forks</button>
          </div>
        </div>
        {loading ? <div className="text-sky-300 text-center">Loading...</div> : error ? <div className="text-red-500 text-center">{error}</div> : (
        <div className="flex flex-wrap justify-center gap-6">
          {sorted.map(repo => (
            <div key={repo.url} className="bg-slate-800 rounded-xl shadow p-6 min-w-[220px] max-w-xs text-center">
              <GithubRepoTooltip href={repo.url}>
                <span className="text-lg font-semibold text-sky-300 hover:underline">{repo.name}</span>
              </GithubRepoTooltip>
              <div className="mt-2 text-slate-400">⭐ {repo.stars} | 🍴 {repo.forks}</div>
            </div>
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
      const res = await fetch('/api/diagrams', {
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
    <section id="editable-mermaid" className="py-20 md:py-32 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">Live Editable Diagram</h2>
          <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto">Edit the Mermaid code below and see your diagram update instantly.</p>
          <div className="mt-4 flex justify-center gap-4">
            {EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => handleExample(ex.label)} className={`px-4 py-2 rounded ${example===ex.label?'bg-emerald-600 text-white':'bg-slate-800 text-emerald-300'}`}>{ex.label}</button>
            ))}
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <textarea
            className="w-full p-2 rounded border bg-slate-900 text-slate-100 font-mono mb-2"
            rows={6}
            value={code}
            onChange={e => setCode(e.target.value)}
            spellCheck={false}
            aria-label="Edit Mermaid diagram"
          />
          <div className="flex gap-4 items-center mb-2">
            <button onClick={handleSave} disabled={saving} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save Diagram'}</button>
            {toast && <span className="text-emerald-400">{toast}</span>}
          </div>
          {error && <div className="text-red-500 mb-2">{error}</div>}
          <div className="mermaid-diagram border rounded bg-slate-800 p-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: svg }} />
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
    fetch('/api/diagrams')
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
      .then(setDiagrams)
      .catch(() => setError('Failed to load diagrams'))
      .finally(() => setLoading(false));
  }, [deleting]);
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      setDiagrams(diagrams => diagrams.filter(d => d.id !== id));
    } catch {}
    setDeleting(null);
  };
  const handleSaveOrder = async () => {
    setSavingOrder(true);
    setOrderToast(null);
    try {
      const res = await fetch('/api/diagrams/reorder', {
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
        className={`bg-slate-800 p-6 rounded-xl shadow-lg relative cursor-move select-none`}
      >
        <button onClick={() => handleDelete(diagram.id)} disabled={deleting===diagram.id} className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50">{deleting===diagram.id ? 'Deleting...' : 'Delete'}</button>
        <div className="mb-2 text-slate-400 text-xs">ID: {diagram.id}</div>
        <div className="mermaid-diagram border rounded bg-slate-900 p-4 overflow-x-auto" dangerouslySetInnerHTML={{ __html: window.mermaid?.render ? window.mermaid.render(`gallery-${diagram.id}`, diagram.code, () => {}) : '' }} />
        <pre className="mt-2 text-xs text-slate-300 bg-slate-900 p-2 rounded">{diagram.code}</pre>
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
    <section id="saved-diagrams" className="py-20 md:py-32 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-400">Saved Diagrams Gallery</h2>
          <p className="text-lg text-slate-300 mt-2 max-w-2xl mx-auto">Browse and manage your saved diagrams.</p>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={handleSaveOrder} disabled={savingOrder} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 disabled:opacity-50">{savingOrder ? 'Saving...' : 'Save Order'}</button>
            {orderToast && <span className="text-emerald-400">{orderToast}</span>}
          </div>
        </div>
        {loading ? <div className="text-emerald-300 text-center">Loading...</div> : error ? <div className="text-red-500 text-center">{error}</div> : (
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
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{translations.about_title}</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">{translations.about_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          <div className="bg-stone-50 p-8 rounded-xl text-center">[{translations.about_benefit1_title}]</div>
          <div className="bg-stone-50 p-8 rounded-xl text-center">[{translations.about_benefit2_title}]</div>
          <div className="bg-stone-50 p-8 rounded-xl text-center">[{translations.about_benefit3_title}]</div>
        </div>
        {steps.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-sky-700 mb-6">{translations.process_title}</h3>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-8 h-8 flex items-center justify-center bg-sky-600 text-white rounded-full font-bold mr-4">{i+1}</span>
                  <span className="text-lg text-stone-700">{step}</span>
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
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-800">{translations.contact_title}</h2>
          <p className="text-lg text-stone-600 mt-2 max-w-2xl mx-auto">{translations.contact_subtitle}</p>
        </div>
        <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
          {submitted ? (
            <div className="text-green-700 text-lg font-semibold text-center py-8">{translations.contact_success || 'Thank you for your message!'}</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-stone-700 font-bold mb-2" htmlFor="name">{translations.contact_name_label}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={translations.contact_name_placeholder}
                  className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-bold mb-2" htmlFor="email">{translations.contact_email_label}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={translations.contact_email_placeholder}
                  className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  required
                />
              </div>
              <div>
                <label className="block text-stone-700 font-bold mb-2" htmlFor="message">{translations.contact_message_label}</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={translations.contact_message_placeholder}
                  className="w-full border border-stone-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  rows={5}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 transition-colors text-lg"
              >
                {translations.contact_submit_button}
              </button>
            </form>
          )}
        </div>
        <div className="text-center mt-8 text-stone-600">{translations.contact_info || '[Contact Info Placeholder]'}</div>
      </div>
    </section>
  );
};

// Patch: Add default values for props and defensive checks for translations and translations.nav
const HomePage = ({ translations = {}, language = 'en', onLanguageChange = () => {}, prompts = [] }) => {
  // Defensive: Ensure translations.nav exists and has expected keys
  const nav = translations.nav || { services: 'Services', articles: 'Articles', about: 'About', contact: 'Contact' };
  const sections = [
    <HeroSection key="hero" translations={translations} />,
    <ServicesSection key="services" translations={translations} />,
    <ArticlesSection key="articles" translations={translations} />,
    <InfographicsSection />,
    <ResearchHighlightsSection />,
    <PopularReposSection />,
    <EditableMermaidDemoSection />,
    <SavedDiagramsGallery />,
    <AboutSection key="about" translations={translations} />,
    <ContactSection key="contact" translations={translations} />
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

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-bold text-xl text-sky-600">Sparrow AI & Tech</span>
            <span className="hidden sm:inline-block ml-3 text-slate-500">Strategic Blueprint</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="nav-link text-slate-600 hover:text-sky-600">{nav.services}</a>
            <a href="#services" className="nav-link text-slate-600 hover:text-sky-600">{nav.services}</a>
            <a href="#articles" className="nav-link text-slate-600 hover:text-sky-600">{nav.articles}</a>
            <a href="#about" className="nav-link text-slate-600 hover:text-sky-600">{nav.about}</a>
            <a href="#contact" className="nav-link text-slate-600 hover:text-sky-600">{nav.contact}</a>
            <button onClick={() => onLanguageChange(language === 'en' ? 'cs' : 'en')} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 text-sm">
              {language === 'en' ? 'Česky' : 'English'}
            </button>
          </nav>
        </div>
      </header>
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <HeroSection translations={translations} />
        <PauseSeparator />
        <PromptBlock prompt={translations.prompts?.[0] || 'TODO: Add prompt 0 translation'} />
        <PauseSeparator />
        {/* Services Section */}
        <ServicesSection translations={translations} />
        <PauseSeparator />
        <PromptBlock prompt={translations.prompts?.[1] || 'TODO: Add prompt 1 translation'} />
        <PauseSeparator />
        {/* Articles Section */}
        <ArticlesSection translations={translations} />
        <InfographicsSection />
        <ResearchHighlightsSection />
        <PauseSeparator />
        <PromptBlock prompt={translations.prompts?.[2] || 'TODO: Add prompt 2 translation'} />
        <PauseSeparator />
        <PopularReposSection />
        <EditableMermaidDemoSection />
        <SavedDiagramsGallery />
        {/* About Section */}
        <AboutSection translations={translations} />
        <PauseSeparator />
        <PromptBlock prompt={translations.prompts?.[3] || 'TODO: Add prompt 3 translation'} />
        {/* Contact Section */}
        <ContactSection translations={translations} />
      </main>
      <footer className="bg-slate-800 text-slate-400 py-8 text-center mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
          <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Sparrow AI Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 