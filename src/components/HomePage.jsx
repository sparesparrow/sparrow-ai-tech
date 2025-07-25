import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DecorativeDivider from './ui/DecorativeDivider.jsx';
import decorativeTexts from '../data/decorativeTexts.json';
import Modal from './ui/Modal.jsx';
import Card from './ui/Card.jsx';
import PrimaryButton from './ui/PrimaryButton.jsx';
import SecondaryButton from './ui/SecondaryButton.jsx';
import SkeletonLoader from './ui/SkeletonLoader.jsx';
import ReactMarkdown from 'react-markdown';

// Example props:
// translations: { ... } (from cs.json/en.json)
// language: 'en' | 'cs'
// onLanguageChange: (lang) => void
// prompts: [string, ...]

const PauseBlock = ({ text }) => (
  <div className="my-12 flex justify-center">
    <div className="w-full max-w-2xl rounded border-l-4 border-yellow-400 bg-yellow-50 p-6 text-center text-lg italic text-yellow-900 shadow dark:bg-yellow-900 dark:text-yellow-100">
      <span className="mb-2 block font-bold text-yellow-700 dark:text-yellow-300">Pause</span>
      {text}
    </div>
  </div>
);

// Hero Section
const HeroSection = ({ translations }) => (
  <section
    id="hero"
    className="flex min-h-screen w-full items-center bg-white pt-20 transition-colors duration-300 dark:bg-slate-900"
    data-cy="hero-section"
  >
    <div className="container mx-auto px-6 text-center">
      <h1
        className="mb-4 text-4xl font-extrabold leading-tight text-stone-800 dark:text-stone-100 md:text-6xl"
        dangerouslySetInnerHTML={{ __html: translations.hero_title_html }}
      />
      <p className="mx-auto mb-8 max-w-3xl text-lg text-stone-600 dark:text-stone-300 md:text-xl">
        {translations.hero_subtitle}
      </p>
      <img
        src={`/sparrow-ai-tech/assets/images/claude4-system-card-img-003.png`}
        alt="Abstract AI system card visual, suitable for hero section"
        className="mx-auto mb-8 w-full max-w-2xl rounded-lg shadow-lg"
        loading="eager"
      />
      <div className="mt-6 flex gap-4">
        <a
          href={`${import.meta.env.BASE_URL}todo`}
          className="inline-block"
          data-cy="todo-dashboard-cta"
        >
          <button className="rounded bg-green-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-green-700 focus:outline-none">
            View Project TODOs
          </button>
        </a>
        <PrimaryButton onClick={() => {}}>{translations.cta_quick_analysis_hero}</PrimaryButton>
      </div>
      <a
        href="/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.md"
        data-cy="test-article-link"
        className="mt-4 block text-sky-700 hover:underline dark:text-sky-300"
      >
        Test Article
      </a>
      <a
        href="/sparrow-ai-tech/infographics/Infographic1.html"
        data-cy="test-infographic-link"
        className="mt-2 block text-sky-700 hover:underline dark:text-sky-300"
      >
        Test Infographic
      </a>
    </div>
  </section>
);

// Services Section
const ServicesSection = ({ translations }) => {
  const tabs = [
    { key: 'ai', label: translations.service_tab_ai, content: translations.service_tab_ai_content },
    {
      key: 'security',
      label: translations.service_tab_security,
      content: translations.service_tab_security_content,
    },
    {
      key: 'linux',
      label: translations.service_tab_linux,
      content: translations.service_tab_linux_content,
    },
    {
      key: 'software',
      label: translations.service_tab_software,
      content: translations.service_tab_software_content,
    },
    {
      key: 'modernization',
      label: translations.service_tab_modernization,
      content: translations.service_tab_modernization_content,
    },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeTab);
  return (
    <section id="services" className="py-20 md:py-32" data-cy="services-section">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 md:text-4xl">
            {translations.services_title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            {translations.services_subtitle}
          </p>
        </div>
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <PrimaryButton
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full border px-6 py-2 font-semibold transition-colors duration-200 ${activeTab === tab.key ? 'border-sky-600 bg-sky-600 text-white dark:border-sky-600 dark:bg-sky-700 dark:text-white' : 'border-sky-300 bg-white text-sky-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-300 dark:hover:bg-slate-700'}`}
            >
              {tab.label}
            </PrimaryButton>
          ))}
        </div>
        <div className="mx-auto min-h-[120px] max-w-3xl rounded-xl bg-white p-8 text-lg text-stone-700 shadow dark:bg-slate-800 dark:text-stone-200">
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
        {
          title: 'MCP Ecosystem Overview',
          url: '/sparrow-ai-tech/articles/mcp-ecosystem-overview.md',
        },
        {
          title: 'Hexagonal Architecture in MCP',
          url: '/sparrow-ai-tech/articles/hexagonal-architecture-in-mcp.md',
        },
      ],
    },
    {
      name: 'Guides',
      articles: [
        {
          title: 'Human Action in AI',
          url: '/sparrow-ai-tech/articles/human-action.md',
        },
        {
          title: 'Liberty',
          url: '/sparrow-ai-tech/articles/liberty.md',
        },
      ],
    },
    {
      name: 'Tutorials',
      articles: [
        {
          title: 'Getting Started with MCP Prompts',
          url: '/sparrow-ai-tech/articles/mcp-prompts.md',
        },
        {
          title: 'MCP in Practice',
          url: '/sparrow-ai-tech/articles/mcp-in-practice.en.md',
        },
      ],
    },
    {
      name: 'Reference',
      articles: [
        {
          title: 'MCP Contributions',
          url: '/sparrow-ai-tech/articles/mcp-contributions.en.md',
        },
        {
          title: 'Cursor Rules',
          url: '/sparrow-ai-tech/articles/cursor-rules.md',
        },
      ],
    },
  ];
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalUrl, setModalUrl] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');
  return (
    <section
      id="articles"
      className="bg-stone-100 py-20 dark:bg-slate-900 md:py-32"
      data-cy="articles-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 md:text-4xl">
            {translations.articles_title || 'Articles & Documentation'}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            {translations.articles_subtitle ||
              'Explore categorized articles, guides, and references.'}
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          {categories.map((cat) => (
            <div key={cat.name} className="mb-10">
              <h3 className="mb-4 text-2xl font-semibold text-sky-700 dark:text-sky-300">
                {cat.name}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {cat.articles.map((article, i) => (
                  <Card
                    key={i}
                    title={article.title}
                    onClick={() => {
                      setModalUrl(article.url);
                      setModalTitle(article.title);
                      setModalOpen(true);
                    }}
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
      <ArticleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        articleUrl={modalUrl}
        title={modalTitle}
      />
    </section>
  );
};

// Infographics Section
const InfographicsSection = () => {
  const infographics = [
    {
      title: 'MCP Ecosystem',
      description:
        'How the sparesparrow open-source toolchain revolutionizes AI agent development.',
      url: '/sparrow-ai-tech/infographics/1.html',
    },
    {
      title: 'Human-in-the-Loop AI',
      description:
        'The indispensable partnership between human intuition and artificial intelligence.',
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
    <section
      id="infographics"
      className="bg-white py-20 dark:bg-slate-900 md:py-32"
      data-cy="infographics-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-sky-700 dark:text-sky-300 md:text-4xl">
            Infographics
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            Explore interactive and visual guides to key concepts and architectures.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
    <section
      id="research-highlights"
      className="bg-stone-50 py-20 dark:bg-slate-900 md:py-32"
      data-cy="research-highlights-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 md:text-4xl">
            Research Highlights
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            Key diagrams and benchmarks from leading AI agent research and MCP experiments.
          </p>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md dark:bg-slate-800"
            >
              <img
                src={
                  img.src.startsWith('http') || img.src.startsWith('/sparrow-ai-tech/')
                    ? img.src
                    : `/sparrow-ai-tech/${img.src.replace(/^\/+/, '')}`
                }
                alt={img.alt}
                className="mb-4 max-h-64 w-auto rounded border object-contain"
                loading="lazy"
              />
              <div className="mb-2 text-center text-sm text-stone-700 dark:text-stone-200">
                {img.caption}
              </div>
              {img.source && (
                <a
                  href={img.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 underline dark:text-blue-300"
                >
                  Source
                </a>
              )}
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
    Promise.all(
      repos.map(async (repo) => {
        try {
          const res = await (typeof globalThis.fetch !== 'undefined'
            ? globalThis.fetch(`https://api.github.com/repos/sparesparrow/${repo.name}`)
            : Promise.reject('Failed to fetch'));
          if (!res.ok) throw new Error('Failed to fetch');
          const data = await res.json();
          return { ...repo, stars: data.stargazers_count, forks: data.forks_count };
        } catch {
          return repo;
        }
      })
    )
      .then((updated) => {
        setRepos(updated);
        setLoading(false);
      })
      .catch(() => setError('Failed to load repo data'));
  }, []);
  const sorted = [...repos].sort((a, b) =>
    sortBy === 'stars' ? b.stars - a.stars : b.forks - a.forks
  );
  return (
    <section
      id="popular-repos"
      className="bg-slate-900 py-20 dark:bg-slate-800 md:py-32"
      data-cy="popular-repos-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-sky-400 dark:text-sky-300 md:text-4xl">
            Popular GitHub Repositories
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-slate-300 dark:text-stone-300">
            Explore my most starred open-source projects.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <SecondaryButton onClick={() => setSortBy('stars')} selected={sortBy === 'stars'}>
              Sort by Stars
            </SecondaryButton>
            <SecondaryButton onClick={() => setSortBy('forks')} selected={sortBy === 'forks'}>
              Sort by Forks
            </SecondaryButton>
          </div>
        </div>
        {loading ? (
          <SkeletonLoader type="card" count={3} />
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-500">{error}</div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {sorted.map((repo) => (
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
  {
    label: 'Flowchart',
    code: `graph TD\nA[Start] --> B{Is it working?}\nB -- Yes --> C[Great!]\nB -- No --> D[Debug]\nD --> B`,
  },
  {
    label: 'Sequence',
    code: `sequenceDiagram\n    Alice->>+John: Hello John, how are you?\n    Alice->>+John: John, can you hear me?\n    John-->>-Alice: Hi Alice, I can hear you!\n    John-->>-Alice: I feel great!`,
  },
  {
    label: 'Gantt',
    code: `gantt\n    dateFormat  YYYY-MM-DD\n    title Adding GANTT diagram functionality to mermaid\n    section A section\n    Completed task :done, des1, 2014-01-06,2014-01-08\n    Active task :active, des2, 2014-01-09, 3d\n    Future task : des3, after des2, 5d`,
  },
];

const EditableMermaidDemoSection = () => {
  const [code, setCode] = React.useState(EXAMPLES[0].code);
  const [svg, setSvg] = React.useState('');
  const [error, setError] = React.useState(null);
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [example, setExample] = React.useState(EXAMPLES[0].label);
  // Polyfills and imports for SSR/browser compatibility

  React.useEffect(() => {
    if (!code) return;
    setError(null);
    try {
      if (typeof globalThis.mermaid !== 'undefined') {
        globalThis.mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
        });
        globalThis.mermaid.render('homepage-editable-mermaid', code, (svgCode) => setSvg(svgCode));
      }
    } catch {
      setError('Invalid Mermaid syntax');
      setSvg('');
    }
  }, [code]);
  const handleExample = (label) => {
    const ex = EXAMPLES.find((e) => e.label === label);
    if (ex) {
      setExample(label);
      setCode(ex.code);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    setToast(null);
    try {
      const res = await (typeof globalThis.fetch !== 'undefined'
        ? globalThis.fetch('/sparrow-ai-tech/api/diagrams', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
          })
        : Promise.reject('Failed to save'));
      if (!res.ok) throw new Error('Failed to save');
      setToast('Diagram saved!');
    } catch {
      setToast('Failed to save diagram');
    } finally {
      setSaving(false);
      if (typeof globalThis.setTimeout !== 'undefined') {
        globalThis.setTimeout(() => setToast(null), 2000);
      }
    }
  };
  return (
    <section
      id="editable-mermaid"
      className="bg-slate-950 py-20 dark:bg-slate-900 md:py-32"
      data-cy="editable-mermaid-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-emerald-400 dark:text-emerald-300 md:text-4xl">
            Live Editable Diagram
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-slate-300 dark:text-stone-300">
            Edit the Mermaid code below and see your diagram update instantly.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.label}
                onClick={() => handleExample(ex.label)}
                className={`rounded px-4 py-2 ${example === ex.label ? 'bg-emerald-600 text-white dark:bg-emerald-700 dark:text-white' : 'bg-slate-800 text-emerald-300 dark:bg-slate-700 dark:text-emerald-300'}`}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mx-auto max-w-2xl">
          <textarea
            className="mb-2 w-full rounded border bg-slate-900 p-2 font-mono text-slate-100 dark:bg-slate-800 dark:text-stone-100"
            rows={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            aria-label="Edit Mermaid diagram"
          />
          <div className="mb-2 flex items-center gap-4">
            <PrimaryButton
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-700 dark:text-white"
            >
              {saving ? 'Saving...' : 'Save Diagram'}
            </PrimaryButton>
            {toast && <span className="text-emerald-400">{toast}</span>}
          </div>
          {error && <div className="mb-2 text-red-500 dark:text-red-500">{error}</div>}
          <div
            className="mermaid-diagram overflow-x-auto rounded border bg-slate-800 p-4 dark:bg-slate-700"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
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
    (typeof globalThis.fetch !== 'undefined'
      ? globalThis.fetch('/sparrow-ai-tech/api/diagrams')
      : Promise.reject('Failed to fetch')
    )
      .then((res) => (res.ok ? res.json() : Promise.reject('Failed to fetch')))
      .then(setDiagrams)
      .catch(() => setError('Failed to load diagrams'))
      .finally(() => setLoading(false));
  }, [deleting]);
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      if (typeof globalThis.fetch !== 'undefined') {
        await globalThis.fetch(`/sparrow-ai-tech/api/diagrams/${id}`, { method: 'DELETE' });
      }
      setDiagrams((diagrams) => diagrams.filter((d) => d.id !== id));
    } catch {
      // handle error if needed
    }
    setDeleting(null);
  };
  const handleSaveOrder = async () => {
    setSavingOrder(true);
    setOrderToast(null);
    try {
      if (typeof globalThis.fetch !== 'undefined') {
        const res = await globalThis.fetch('/sparrow-ai-tech/api/diagrams/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: diagrams.map((d) => d.id) }),
        });
        if (!res.ok) throw new Error('Failed to save order');
        setOrderToast('Order saved!');
      }
    } catch {
      setOrderToast('Failed to save order');
    } finally {
      setSavingOrder(false);
      if (typeof globalThis.setTimeout !== 'undefined') {
        globalThis.setTimeout(() => setOrderToast(null), 2000);
      }
    }
  };

  // dnd-kit sortable item
  function DiagramSortableItem({ diagram }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: diagram.id,
    });
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
        className={`relative cursor-move select-none rounded-xl bg-slate-800 p-6 shadow-lg dark:bg-slate-700`}
      >
        <button
          onClick={() => handleDelete(diagram.id)}
          disabled={deleting === diagram.id}
          className="absolute right-2 top-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700 disabled:opacity-50 dark:bg-red-700 dark:text-white"
        >
          {deleting === diagram.id ? 'Deleting...' : 'Delete'}
        </button>
        <div className="mb-2 text-xs text-slate-400 dark:text-stone-300">ID: {diagram.id}</div>
        <div
          className="mermaid-diagram overflow-x-auto rounded border bg-slate-900 p-4 dark:bg-slate-800"
          dangerouslySetInnerHTML={{
            __html:
              typeof globalThis.mermaid !== 'undefined'
                ? globalThis.mermaid.render(`gallery-${diagram.id}`, diagram.code, () => {})
                : '',
          }}
        />
        <pre className="mt-2 rounded bg-slate-900 p-2 text-xs text-slate-300 dark:bg-slate-800 dark:text-stone-300">
          {diagram.code}
        </pre>
      </div>
    );
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = diagrams.findIndex((d) => d.id === active.id);
      const newIndex = diagrams.findIndex((d) => d.id === over.id);
      setDiagrams((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <section
      id="saved-diagrams"
      className="bg-slate-900 py-20 dark:bg-slate-800 md:py-32"
      data-cy="saved-diagrams-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-emerald-400 dark:text-emerald-300 md:text-4xl">
            Saved Diagrams Gallery
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-slate-300 dark:text-stone-300">
            Browse and manage your saved diagrams.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <PrimaryButton
              onClick={handleSaveOrder}
              disabled={savingOrder}
              className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:opacity-50 dark:bg-emerald-700 dark:text-white"
            >
              {savingOrder ? 'Saving...' : 'Save Order'}
            </PrimaryButton>
            {orderToast && <span className="text-emerald-400">{orderToast}</span>}
          </div>
        </div>
        {loading ? (
          <SkeletonLoader type="card" count={4} />
        ) : error ? (
          <div className="text-center text-red-500 dark:text-red-500">{error}</div>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={diagrams.map((d) => d.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                {diagrams.map((diagram) => (
                  <DiagramSortableItem key={diagram.id} diagram={diagram} />
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
    <section
      id="about"
      className="bg-white py-20 dark:bg-slate-900 md:py-32"
      data-cy="about-section"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 md:text-4xl">
            {translations.about_title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            {translations.about_subtitle}
          </p>
        </div>
        <div className="mx-auto mb-12 grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-stone-50 p-8 text-center dark:bg-slate-800">
            [{translations.about_benefit1_title}]
          </div>
          <div className="rounded-xl bg-stone-50 p-8 text-center dark:bg-slate-800">
            [{translations.about_benefit2_title}]
          </div>
          <div className="rounded-xl bg-stone-50 p-8 text-center dark:bg-slate-800">
            [{translations.about_benefit3_title}]
          </div>
        </div>
        {steps.length > 0 && (
          <div className="mx-auto max-w-3xl">
            <h3 className="mb-6 text-2xl font-bold text-sky-700 dark:text-sky-300">
              {translations.process_title}
            </h3>
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 font-bold text-white dark:bg-sky-700 dark:text-white">
                    {i + 1}
                  </span>
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
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section id="contact" className="py-20 md:py-32" data-cy="contact-section">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-stone-800 dark:text-stone-100 md:text-4xl">
            {translations.contact_title}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-stone-600 dark:text-stone-300">
            {translations.contact_subtitle}
          </p>
        </div>
        <div className="mx-auto max-w-xl rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800 md:p-12">
          {submitted ? (
            <div className="py-8 text-center text-lg font-semibold text-green-700 dark:text-green-300">
              {translations.contact_success || 'Thank you for your message!'}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="mb-2 block font-bold text-stone-700 dark:text-stone-200"
                  htmlFor="name"
                >
                  {translations.contact_name_label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={translations.contact_name_placeholder}
                  className="w-full rounded border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:border-stone-600 dark:focus:ring-sky-700"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-2 block font-bold text-stone-700 dark:text-stone-200"
                  htmlFor="email"
                >
                  {translations.contact_email_label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={translations.contact_email_placeholder}
                  className="w-full rounded border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:border-stone-600 dark:focus:ring-sky-700"
                  required
                />
              </div>
              <div>
                <label
                  className="mb-2 block font-bold text-stone-700 dark:text-stone-200"
                  htmlFor="message"
                >
                  {translations.contact_message_label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={translations.contact_message_placeholder}
                  className="w-full rounded border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-600 dark:border-stone-600 dark:focus:ring-sky-700"
                  rows={5}
                  required
                />
              </div>
              <PrimaryButton
                type="submit"
                className="w-full rounded-lg bg-sky-600 py-3 text-lg font-bold text-white transition-colors hover:bg-sky-700 dark:bg-sky-700 dark:text-white"
              >
                {translations.contact_submit_button}
              </PrimaryButton>
            </form>
          )}
        </div>
        <div className="mt-8 text-center text-stone-600 dark:text-stone-300">
          {translations.contact_info || '[Contact Info Placeholder]'}
        </div>
      </div>
    </section>
  );
};

const DownloadPdfButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Polyfills and imports for SSR/browser compatibility

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const html =
        typeof globalThis.document !== 'undefined'
          ? globalThis.document.documentElement.outerHTML
          : '';
      const res = await (typeof globalThis.fetch !== 'undefined'
        ? globalThis.fetch('/api/pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ html }),
          })
        : Promise.reject('Failed to generate PDF'));
      if (!res.ok) throw new Error('Failed to generate PDF');
      const blob = await res.blob();
      const url = typeof globalThis.URL !== 'undefined' ? globalThis.URL.createObjectURL(blob) : '';
      const a =
        typeof globalThis.document !== 'undefined' ? globalThis.document.createElement('a') : null;
      if (a) {
        a.href = url;
        a.download = 'sparrow-ai-tech.pdf';
        typeof globalThis.document !== 'undefined' ? globalThis.document.body.appendChild(a) : null;
        a.click();
        typeof globalThis.document !== 'undefined' ? globalThis.document.body.removeChild(a) : null;
        typeof globalThis.URL !== 'undefined' ? globalThis.URL.revokeObjectURL(url) : null;
      }
    } catch {
      setError('PDF download failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        data-cy="download-pdf-btn"
        className="fixed bottom-8 right-8 z-50 rounded-full bg-sky-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-sky-700 disabled:opacity-60 print:hidden"
        aria-label="Download as PDF"
        disabled={loading}
      >
        {loading ? 'Generating PDF…' : 'Download as PDF'}
      </button>
      {error && (
        <div className="fixed bottom-24 right-8 z-50 rounded bg-red-600 px-4 py-2 text-white shadow-lg">
          {error}
        </div>
      )}
    </>
  );
};

const ChatbotModal = ({ open, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Polyfills and imports for SSR/browser compatibility

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setMessages((msgs) => [...msgs, { from: 'user', text: input }]);
    try {
      const res = await (typeof globalThis.fetch !== 'undefined'
        ? globalThis.fetch('/api/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: input }),
          })
        : Promise.reject('Failed to get reply'));
      if (!res.ok) throw new Error('Failed to get reply');
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.reply }]);
      setInput('');
    } catch {
      setError('Chatbot error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div
        className="fixed inset-0 bg-black bg-opacity-40"
        onClick={onClose}
        data-cy="chatbot-backdrop"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter') onClose();
        }}
      ></div>
      <div
        className="relative m-8 flex w-full max-w-md flex-col rounded-xl bg-white p-6 shadow-2xl"
        data-cy="chatbot-modal"
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-2xl font-bold text-slate-400 hover:text-slate-700"
          aria-label="Close Chatbot"
          data-cy="chatbot-close-btn"
        >
          ×
        </button>
        <h2 className="mb-4 text-xl font-bold text-sky-700">Voice Chatbot (ElevenLabs)</h2>
        <div className="mb-4 max-h-64 flex-1 overflow-y-auto">
          {messages.length === 0 && (
            <div className="rounded bg-slate-100 p-4 text-center text-slate-600">
              Say hello to the ElevenLabs chatbot!
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={msg.from === 'user' ? 'mb-2 text-right' : 'mb-2 text-left'}>
              <span
                className={
                  msg.from === 'user'
                    ? 'inline-block rounded-lg bg-sky-100 px-3 py-2 text-sky-800'
                    : 'inline-block rounded-lg bg-emerald-100 px-3 py-2 text-emerald-800'
                }
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <input
          type="text"
          className="mb-2 w-full rounded border border-slate-300 px-4 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          data-cy="chatbot-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          className="mt-2 w-full rounded-lg bg-sky-600 py-2 font-bold text-white disabled:opacity-60"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          data-cy="chatbot-send-btn"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
      </div>
    </div>
  );
};

const ChatbotButton = ({ onClick }) => (
  <button
    onClick={onClick}
    data-cy="open-chatbot-btn"
    className="fixed bottom-28 right-8 z-50 flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-700 print:hidden"
    aria-label="Open Voice Chatbot"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75v1.5m0 0a6.75 6.75 0 01-6.75-6.75h1.5A5.25 5.25 0 0012 19.5a5.25 5.25 0 005.25-5.25h1.5A6.75 6.75 0 0112 20.25zm0-15v6.75m0 0a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-4.5 0v1.5a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
    Voice Chatbot
  </button>
);

const ArticleModal = ({ open, onClose, articleUrl, title }) => {
  const [content, setContent] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Polyfills and imports for SSR/browser compatibility

  const isBrowser = typeof globalThis !== 'undefined';

  React.useEffect(() => {
    if (!open || !articleUrl || !isBrowser) return;
    setLoading(true);
    setError(null);
    setContent('');
    (typeof globalThis.fetch !== 'undefined'
      ? globalThis.fetch(articleUrl)
      : Promise.reject('Failed to load article')
    )
      .then((res) => {
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

const HomePage = ({
  translations = {},
  language = 'en',
  onLanguageChange = () => {},
  prompts = [],
}) => {
  // Defensive: Ensure translations.nav exists and has expected keys
  const nav = translations.nav || {
    services: 'Services',
    articles: 'Articles',
    about: 'About',
    contact: 'Contact',
  };

  // Helper to get divider by index (cycle if not enough)
  const getDivider = (idx) => {
    const d = decorativeTexts[idx % decorativeTexts.length];
    return (
      <DecorativeDivider
        key={`divider-${idx}`}
        text={d.text}
        rotation={d.rotation}
        align={d.align}
      />
    );
  };

  // Sections with dividers between them
  const sections = [
    <HeroSection key="hero" translations={translations} />,
    getDivider(0),
    <ServicesSection key="services" translations={translations} />,
    getDivider(1),
    <ArticlesSection key="articles" translations={translations} />,
    <InfographicsSection key="infographics" />,
    getDivider(2),
    <ResearchHighlightsSection key="research" />,
    getDivider(3),
    <PopularReposSection key="repos" />,
    <EditableMermaidDemoSection key="editable-mermaid" />,
    <SavedDiagramsGallery key="saved-diagrams" />,
    getDivider(4),
    <AboutSection key="about" translations={translations} />,
    <ContactSection key="contact" translations={translations} />,
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
    <div className="flex min-h-screen flex-col bg-stone-50 dark:bg-slate-900">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur-lg dark:border-slate-700 dark:bg-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <span className="text-xl font-bold text-sky-600 dark:text-sky-300">
              Sparrow AI & Tech
            </span>
            <span className="ml-3 hidden text-slate-500 dark:text-slate-400 sm:inline-block">
              Strategic Blueprint
            </span>
          </div>
          <nav className="hidden items-center space-x-8 md:flex">
            <a
              href="#hero"
              className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {nav.services}
            </a>
            <a
              href="#services"
              className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {nav.services}
            </a>
            <a
              href="#articles"
              className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {nav.articles}
            </a>
            <a
              href="#about"
              className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {nav.about}
            </a>
            <a
              href="#contact"
              className="nav-link text-slate-600 hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
            >
              {nav.contact}
            </a>
            <PrimaryButton
              onClick={() => onLanguageChange(language === 'en' ? 'cs' : 'en')}
              className="rounded-full bg-sky-600 px-4 py-2 text-sm font-bold text-white transition-colors duration-300 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600"
            >
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
      <footer
        className="mt-12 bg-slate-800 py-8 text-center text-slate-400 dark:bg-slate-700 dark:text-slate-300"
        role="contentinfo"
      >
        <div className="mx-auto max-w-7xl px-4">
          <p>Interactive Strategic Blueprint for Sparrow AI & Tech</p>
          <p className="mt-2 text-sm">
            &copy; {new Date().getFullYear()} Sparrow AI Tech. All rights reserved.
          </p>
        </div>
      </footer>
      <DownloadPdfButton />
      <ChatbotButton onClick={() => setChatbotOpen(true)} />
      <ChatbotModal open={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  );
};

export default HomePage;
