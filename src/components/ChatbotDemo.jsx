import MermaidLiveEditor from './MermaidLiveEditor';

const chatbotWorkflowMermaid = `graph TD
  UserVoice["User Voice Input"] --> STT["Speech-to-Text"]
  STT --> NLU["LLM: NLU/Planning"]
  NLU --> IR["Information Retrieval Tool"]
  IR --> LLMResp["LLM: Response Generation"]
  LLMResp --> TTS["Text-to-Speech (ElevenLabs)"]
  TTS --> UserAudio["User Hears Response"]
`;

export default function ChatbotDemo() {
  const [showCode, setShowCode] = useState(false);
  return (
    <div>
      {/* ...existing chatbot UI... */}
      <section className="mt-8" aria-labelledby="chatbot-workflow-diagram" data-cy="chatbot-workflow-section">
        <h3 id="chatbot-workflow-diagram" className="text-xl font-semibold mb-2">Agentic Workflow Diagram</h3>
        <div className="flex items-center gap-4 mb-2">
          <button onClick={() => setShowCode(c => !c)} data-cy="toggle-diagram-code" className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700">
            {showCode ? 'Show Diagram' : 'Show Code'}
          </button>
          <button onClick={() => navigator.clipboard.writeText(chatbotWorkflowMermaid)} data-cy="copy-diagram-code" className="px-3 py-1 rounded bg-blue-500 text-white">Copy Code</button>
        </div>
        {showCode ? (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded" data-cy="diagram-code-block">
            {chatbotWorkflowMermaid}
          </pre>
        ) : (
          <div data-cy="diagram-preview">
            <MermaidLiveEditor code={chatbotWorkflowMermaid} readOnly={true} />
          </div>
        )}
      </section>
    </div>
  );
} 