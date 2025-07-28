/** @jsx React.createElement */
import React from 'react';
import MermaidLiveEditor from './MermaidLiveEditor';

const diagrams = [
  {
    title: 'Agentic Workflow',
    description:
      'Agentic workflows leverage MCP and secure orchestration to deliver robust, adaptive AI solutions.',
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
    description:
      'An LLM-based cognitive architecture cycles through perception, memory, attention, reasoning, and action.',
    code: `graph TD
    Perception["Perception"] --> WorkingMemory["Working Memory"]
    WorkingMemory --> Attention["Attention"]
    Attention --> Reasoning["Reasoning"]
    Reasoning --> Action["Action"]
    Action --> Perception`,
  },
  {
    title: 'Active Reasoning Feedback Loop',
    description:
      'Active reasoning involves iterative planning, action, feedback, and goal adjustment.',
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

  const handleToggle = (idx) => {
    setShowCode((prev) => prev.map((v, i) => (i === idx ? !v : v)));
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <section
      className="agentic-workflow-showcase mx-auto max-w-4xl px-4 py-8"
      data-cy="agentic-workflow-showcase"
    >
      <h2 className="mb-6 text-3xl font-bold">Agentic Workflows & Cognitive Architectures</h2>
      {diagrams.map((diagram, idx) => (
        <div
          key={diagram.title}
          className="mb-10 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900"
          data-cy={`diagram-block-${idx}`}
        >
          <h3 className="mb-2 text-xl font-semibold">{diagram.title}</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{diagram.description}</p>
          <div className="mb-2 flex items-center gap-4">
            <button
              className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none"
              onClick={() => handleToggle(idx)}
              data-cy={`toggle-code-btn-${idx}`}
              aria-pressed={showCode[idx]}
            >
              {showCode[idx] ? 'Show Diagram' : 'Show Code'}
            </button>
            <button
              className="rounded bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={() => handleCopy(diagram.code)}
              data-cy={`copy-code-btn-${idx}`}
              aria-label="Copy Mermaid code"
            >
              Copy Code
            </button>
          </div>
          <div
            className="overflow-x-auto rounded border bg-gray-50 p-4 dark:bg-gray-800"
            data-cy={`diagram-content-${idx}`}
          >
            {showCode[idx] ? (
              <pre
                className="text-sm text-gray-800 dark:text-gray-100"
                data-cy={`mermaid-code-${idx}`}
              >
                {diagram.code}
              </pre>
            ) : (
              <MermaidLiveEditor
                code={diagram.code}
                readOnly={true}
                data-cy={`mermaid-diagram-${idx}`}
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
