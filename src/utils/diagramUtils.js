import diagramsData from '../data/diagrams.json';

/**
 * Diagram utility functions for managing and filtering diagram data
 */

/**
 * Get all diagrams
 * @returns {Array} All diagrams
 */
export function getAllDiagrams() {
  return diagramsData;
}

/**
 * Get diagrams by category
 * @param {string} category - The category to filter by
 * @returns {Array} Filtered diagrams
 */
export function getDiagramsByCategory(category) {
  return diagramsData.filter(diagram => diagram.category === category);
}

/**
 * Get diagrams by tag
 * @param {string} tag - The tag to search for
 * @returns {Array} Filtered diagrams
 */
export function getDiagramsByTag(tag) {
  return diagramsData.filter(diagram => diagram.tags.includes(tag));
}

/**
 * Search diagrams by name, description, or tags
 * @param {string} query - Search query
 * @returns {Array} Filtered diagrams
 */
export function searchDiagrams(query) {
  const lowerQuery = query.toLowerCase();
  return diagramsData.filter(
    diagram =>
      diagram.name.toLowerCase().includes(lowerQuery) ||
      diagram.description.toLowerCase().includes(lowerQuery) ||
      diagram.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get diagram by ID
 * @param {number} id - Diagram ID
 * @returns {Object|null} Diagram object or null if not found
 */
export function getDiagramById(id) {
  return diagramsData.find(diagram => diagram.id === id) || null;
}

/**
 * Get diagram by usage identifier
 * @param {string} usage - Usage identifier
 * @returns {Object|null} Diagram object or null if not found
 */
export function getDiagramByUsage(usage) {
  return diagramsData.find(diagram => diagram.usage === usage) || null;
}

/**
 * Get all available categories
 * @returns {Array} Array of unique categories
 */
export function getCategories() {
  return [...new Set(diagramsData.map(diagram => diagram.category))];
}

/**
 * Get all available tags
 * @returns {Array} Array of unique tags
 */
export function getTags() {
  const allTags = diagramsData.flatMap(diagram => diagram.tags);
  return [...new Set(allTags)];
}

/**
 * Get diagrams for a specific usage context
 * @param {string} context - Usage context (e.g., 'system-overview', 'auth-flow')
 * @returns {Array} Filtered diagrams
 */
export function getDiagramsForContext(context) {
  return diagramsData.filter(diagram => diagram.usage && diagram.usage.includes(context));
}

/**
 * Get random diagram
 * @returns {Object} Random diagram object
 */
export function getRandomDiagram() {
  const randomIndex = Math.floor(Math.random() * diagramsData.length);
  return diagramsData[randomIndex];
}

/**
 * Get diagrams with pagination
 * @param {number} page - Page number (1-based)
 * @param {number} limit - Items per page
 * @returns {Object} Object with diagrams and pagination info
 */
export function getDiagramsPaginated(page = 1, limit = 10) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const diagrams = diagramsData.slice(startIndex, endIndex);

  return {
    diagrams,
    pagination: {
      page,
      limit,
      total: diagramsData.length,
      totalPages: Math.ceil(diagramsData.length / limit),
      hasNext: endIndex < diagramsData.length,
      hasPrev: page > 1,
    },
  };
}

/**
 * Get diagram statistics
 * @returns {Object} Statistics about diagrams
 */
export function getDiagramStats() {
  const categories = getCategories();
  const tags = getTags();

  const categoryStats = categories.map(category => ({
    category,
    count: getDiagramsByCategory(category).length,
  }));

  const tagStats = tags.map(tag => ({
    tag,
    count: getDiagramsByTag(tag).length,
  }));

  return {
    total: diagramsData.length,
    categories: categoryStats,
    tags: tagStats,
    mostUsedCategory: categoryStats.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    ),
    mostUsedTag: tagStats.reduce((prev, current) => (prev.count > current.count ? prev : current)),
  };
}

/**
 * Validate diagram data structure
 * @param {Object} diagram - Diagram object to validate
 * @returns {Object} Validation result
 */
export function validateDiagram(diagram) {
  const errors = [];

  if (!diagram.name) errors.push('Name is required');
  if (!diagram.description) errors.push('Description is required');
  if (!diagram.code) errors.push('Code is required');
  if (!diagram.category) errors.push('Category is required');
  if (!Array.isArray(diagram.tags)) errors.push('Tags must be an array');

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Export diagram as different formats
 * @param {Object} diagram - Diagram object
 * @param {string} format - Export format ('json', 'markdown', 'mermaid')
 * @returns {string} Exported content
 */
export function exportDiagram(diagram, format = 'json') {
  switch (format) {
    case 'json':
      return JSON.stringify(diagram, null, 2);

    case 'markdown':
      return `# ${diagram.name}

${diagram.description}

**Category:** ${diagram.category}
**Tags:** ${diagram.tags.join(', ')}

\`\`\`mermaid
${diagram.code}
\`\`\`
`;

    case 'mermaid':
      return diagram.code;

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

/**
 * Get diagram template for a specific type
 * @param {string} type - Diagram type (e.g., 'flowchart', 'sequence', 'class')
 * @returns {Object} Template diagram object
 */
export function getDiagramTemplate(type) {
  const templates = {
    flowchart: {
      name: 'New Flowchart',
      description: 'A new flowchart diagram',
      category: 'flowchart',
      tags: ['flowchart', 'process'],
      code: `graph TD
    A[Start] --> B{Decision?};
    B -->|Yes| C[Action 1];
    B -->|No| D[Action 2];
    C --> E[End];
    D --> E;`,
      usage: 'custom-flowchart',
    },
    sequence: {
      name: 'New Sequence Diagram',
      description: 'A new sequence diagram',
      category: 'workflow',
      tags: ['sequence', 'workflow'],
      code: `sequenceDiagram
    participant A as User
    participant B as System
    participant C as Database
    
    A->>B: Request
    B->>C: Query
    C-->>B: Response
    B-->>A: Result`,
      usage: 'custom-sequence',
    },
    class: {
      name: 'New Class Diagram',
      description: 'A new class diagram',
      category: 'class',
      tags: ['class', 'model'],
      code: `classDiagram
    class Example {
        +String name
        +int value
        +method()
    }`,
      usage: 'custom-class',
    },
  };

  return templates[type] || templates.flowchart;
}
