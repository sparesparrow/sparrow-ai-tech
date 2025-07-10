import React from 'react';

const projects = [
  {
    name: 'mcp-project-orchestrator',
    tech: 'Python, Poetry, Mermaid, Ruff, mypy',
    purpose: 'MCP server that automates project creation using templates and best practices.',
    significance: 'Practical agentic workflow implementation; automates developer lifecycle; meta-level tool use.',
    repo: 'https://github.com/sparesparrow/mcp-project-orchestrator',
  },
  {
    name: 'mcp-prompts',
    tech: 'TypeScript, Node.js, npm, Docker, PostgreSQL',
    purpose: 'Centralized, versioned, secure prompt management for AI.',
    significance: 'Solves prompt rot; RBAC, versioning, production focus; enterprise AI challenge.',
    repo: 'https://github.com/sparesparrow/mcp-prompts',
  },
  {
    name: 'mcp-prompts-rs',
    tech: 'Rust, Cargo, PostgreSQL, Docker',
    purpose: 'High-performance, memory-safe Rust rewrite of mcp-prompts.',
    significance: 'Security and performance; Rust for foundational infra; proactive architectural hardening.',
    repo: 'https://github.com/sparesparrow/mcp-prompts-rs',
  },
  {
    name: 'mcp-router',
    tech: 'TypeScript, Python, DevContainer',
    purpose: 'Workflow designer and router for agent-based systems.',
    significance: 'Ambitious, distributed system; orchestrates multi-agent workflows; scalable architecture.',
    repo: 'https://github.com/sparesparrow/mcp-router',
  },
  {
    name: 'rust-network-mgr',
    tech: 'Rust, Netlink, nftables',
    purpose: 'Linux network management service for IP/firewall automation.',
    significance: 'Systems-level expertise; memory safety; operational reliability for AI infra.',
    repo: 'https://github.com/sparesparrow/rust-network-mgr',
  },
  {
    name: 'cursor-rules',
    tech: 'Markdown (.mdc)',
    purpose: 'Structured, machine-readable rules for Cursor IDE AI agent.',
    significance: 'Human-AI collaboration; knowledge structuring for AI-assisted development.',
    repo: 'https://github.com/sparesparrow/sparrow-ai-tech/tree/main/.cursor/rules',
  },
];

export default function PortfolioProjectsTable() {
  return (
    <section className="portfolio-projects-table my-12" data-cy="portfolio-projects-table">
      <h2 className="text-2xl font-bold mb-4">Strategic Project Portfolio</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Repository</th>
              <th className="px-4 py-2 text-left font-semibold">Tech Stack</th>
              <th className="px-4 py-2 text-left font-semibold">Purpose</th>
              <th className="px-4 py-2 text-left font-semibold">Strategic Significance</th>
              <th className="px-4 py-2 text-left font-semibold">Links</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, i) => (
              <tr key={p.name} data-cy={`portfolio-row-${i}`}>
                <td className="px-4 py-2 font-mono text-blue-700 dark:text-blue-300">
                  {p.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{p.tech}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{p.purpose}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{p.significance}</td>
                <td className="px-4 py-2">
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" data-cy={`repo-link-${i}`}>GitHub</a>
                  {p.docs && (
                    <>
                      {' | '}
                      <a href={p.docs} target="_blank" rel="noopener noreferrer" data-cy={`docs-link-${i}`}>Docs</a>
                    </>
                  )}
                  {p.demo && (
                    <>
                      {' | '}
                      <a href={p.demo} target="_blank" rel="noopener noreferrer" data-cy={`demo-link-${i}`}>Demo</a>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 