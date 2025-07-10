import React, { useState } from 'react';
import MermaidLiveEditor from './MermaidLiveEditor';

const diagrams = [
  {
    title: 'Agentic Workflow',
    description: 'Agentic workflows leverage MCP and secure orchestration to deliver robust, adaptive AI solutions.',
    code: `graph TD
    UserGoal["User Goal"] --> Agent["Agentic Workflow"]
    Agent --> MCP["Model Context Protocol (MCP)"]
    MCP --> Tools["Tools/Resources/Prompts"]
    Agent --> Security["Security & Orchestration"]
    Security --> MCP
    Tools --> Output["Robust AI Solution"]`,
  },
  {
    title: 'LLM-Based Cognitive Architecture',
    description: 'An LLM-based cognitive architecture cycles through perception, memory, attention, reasoning, and action.',
    code: `graph TD
    Perception["Perception"] --> WorkingMemory["Working Memory"]
    WorkingMemory --> Attention["Attention"]
    Attention --> Reasoning["Reasoning"]
    Reasoning --> Action["Action"]
    Action --> Perception`,
  },
  {
    title: 'Active Reasoning Feedback Loop',
    description: 'Active reasoning involves iterative planning, action, feedback, and goal adjustment.',
    code: `graph TD
    Goal["Goal"] --> Plan["Plan"]
    Plan --> Action["Action"]
    Action --> Feedback["Feedback"]
    Feedback --> Adjustment["Adjustment"]
    Adjustment --> NewGoal["New Goal"]
    NewGoal --> Plan`,
  },
];

export default function AgenticWorkflowShowcase() {
  const [showCode, setShowCode] = useState(Array(diagrams.length).fill(false));

  const handleToggle = idx => {
    setShowCode(prev => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section className="agentic-workflow-showcase py-8 px-4 max-w-4xl mx-auto" data-cy="agentic-workflow-showcase">
      <h2 className="text-3xl font-bold mb-6">Agentic Workflows & Cognitive Architectures</h2>
      {diagrams.map((diagram, idx) => (
        <div key={diagram.title} className="mb-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg" data-cy={`diagram-block-${idx}`}>
          <h3 className="text-xl font-semibold mb-2">{diagram.title}</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{diagram.description}</p>
          <div className="flex gap-4 items-center mb-2">
            <button
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
              onClick={() => handleToggle(idx)}
              data-cy={`toggle-code-btn-${idx}`}
              aria-pressed={showCode[idx]}
            >
              {showCode[idx] ? 'Show Diagram' : 'Show Code'}
            </button>
            <button
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              onClick={() => handleCopy(diagram.code)}
              data-cy={`copy-code-btn-${idx}`}
              aria-label="Copy Mermaid code"
            >
              Copy Code
            </button>
          </div>
          <div className="border rounded bg-gray-50 dark:bg-gray-800 p-4 overflow-x-auto" data-cy={`diagram-content-${idx}`}>
            {showCode[idx] ? (
              <pre className="text-sm text-gray-800 dark:text-gray-100" data-cy={`mermaid-code-${idx}`}>{diagram.code}</pre>
            ) : (
              <MermaidLiveEditor code={diagram.code} readOnly={true} data-cy={`mermaid-diagram-${idx}`} />
            )}
          </div>
        </div>
      ))}
    </section>
  );
} 