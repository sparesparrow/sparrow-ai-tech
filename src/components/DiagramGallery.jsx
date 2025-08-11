import { useState, useEffect, useMemo } from 'react';
import {
  getAllDiagrams,
  getDiagramsByCategory,
  getDiagramsByTag,
  searchDiagrams,
  getCategories,
  getTags,
  getDiagramStats,
} from '../utils/diagramUtils.js';
import MermaidLiveEditor from './markdown/MermaidLiveEditor.jsx';

export default function DiagramGallery({
  onSelectDiagram = null,
  showEditor = true,
  className = '',
}) {
  const [diagrams, setDiagrams] = useState([]);
  const [filteredDiagrams, setFilteredDiagrams] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [stats, setStats] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Load diagrams and stats on component mount
  useEffect(() => {
    const allDiagrams = getAllDiagrams();
    setDiagrams(allDiagrams);
    setFilteredDiagrams(allDiagrams);
    setStats(getDiagramStats());
  }, []);

  // Filter diagrams based on selected filters
  useEffect(() => {
    let filtered = diagrams;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = getDiagramsByCategory(selectedCategory);
    }

    // Filter by tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(diagram => diagram.tags.includes(selectedTag));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = searchDiagrams(searchQuery);
    }

    setFilteredDiagrams(filtered);
  }, [diagrams, selectedCategory, selectedTag, searchQuery]);

  const categories = useMemo(() => ['all', ...getCategories()], []);
  const tags = useMemo(() => ['all', ...getTags()], []);

  const handleDiagramSelect = diagram => {
    setSelectedDiagram(diagram);
    if (onSelectDiagram) {
      onSelectDiagram(diagram);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTag('all');
    setSearchQuery('');
  };

  const handleExportDiagram = (diagram, format = 'json') => {
    const content =
      format === 'json'
        ? JSON.stringify(diagram, null, 2)
        : `# ${diagram.name}\n\n${diagram.description}\n\n\`\`\`mermaid\n${diagram.code}\n\`\`\``;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${diagram.name.toLowerCase().replace(/\s+/g, '-')}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`diagram-gallery ${className}`}>
      {/* Header with stats */}
      {stats && (
        <div className="gallery-header">
          <div className="stats-overview">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Diagrams</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.categories.length}</span>
              <span className="stat-label">Categories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.tags.length}</span>
              <span className="stat-label">Tags</span>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="gallery-filters">
        <div className="filter-group">
          <label htmlFor="category-filter">Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all'
                  ? 'All Categories'
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="tag-filter">Tag:</label>
          <select
            id="tag-filter"
            value={selectedTag}
            onChange={e => setSelectedTag(e.target.value)}
            className="filter-select"
          >
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag === 'all' ? 'All Tags' : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-filter">Search:</label>
          <input
            id="search-filter"
            type="text"
            placeholder="Search diagrams..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label>View:</label>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 1h6v6H1V1zm0 8h6v6H1V9zm8-8h6v6H9V1zm0 8h6v6H9V9z" />
              </svg>
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 1h14v2H1V1zm0 6h14v2H1V7zm0 6h14v2H1v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <button
          onClick={handleClearFilters}
          className="clear-filters-btn"
          disabled={selectedCategory === 'all' && selectedTag === 'all' && !searchQuery}
        >
          Clear Filters
        </button>
      </div>

      {/* Results count */}
      <div className="results-info">
        <span>
          Showing {filteredDiagrams.length} of {diagrams.length} diagrams
        </span>
        {(selectedCategory !== 'all' || selectedTag !== 'all' || searchQuery) && (
          <span className="active-filters">(filtered)</span>
        )}
      </div>

      {/* Diagrams Grid/List */}
      <div className={`diagrams-container ${viewMode}`}>
        {filteredDiagrams.length === 0 ? (
          <div className="no-results">
            <p>No diagrams found matching your criteria.</p>
            <button onClick={handleClearFilters} className="clear-filters-btn">
              Clear all filters
            </button>
          </div>
        ) : (
          filteredDiagrams.map(diagram => (
            <div
              key={diagram.id}
              className={`diagram-card ${selectedDiagram?.id === diagram.id ? 'selected' : ''}`}
              onClick={() => handleDiagramSelect(diagram)}
            >
              <div className="diagram-header">
                <h3 className="diagram-title">{diagram.name}</h3>
                <div className="diagram-actions">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleExportDiagram(diagram, 'json');
                    }}
                    className="action-btn"
                    title="Export as JSON"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1v10.5L4.5 8 3 9.5 8 14l5-4.5L11.5 8 8 11.5V1H8z" />
                    </svg>
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleExportDiagram(diagram, 'markdown');
                    }}
                    className="action-btn"
                    title="Export as Markdown"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M2 2h12v12H2V2zm1 1v10h10V3H3zm2 2h6v1H5V5zm0 2h6v1H5V7zm0 2h4v1H5V9z" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="diagram-description">{diagram.description}</p>

              <div className="diagram-meta">
                <span className="diagram-category">{diagram.category}</span>
                <div className="diagram-tags">
                  {diagram.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                  {diagram.tags.length > 3 && (
                    <span className="tag-more">+{diagram.tags.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="diagram-preview">
                <div className="mermaid-preview">
                  <div className="mermaid" data-preview="true">
                    {diagram.code}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Selected Diagram Editor */}
      {showEditor && selectedDiagram && (
        <div className="selected-diagram-editor">
          <div className="editor-header">
            <h3>Editing: {selectedDiagram.name}</h3>
            <button onClick={() => setSelectedDiagram(null)} className="close-btn">
              ×
            </button>
          </div>
          <MermaidLiveEditor
            initialCode={selectedDiagram.code}
            readOnly={false}
            className="gallery-editor"
          />
        </div>
      )}

      <style jsx>{`
        .diagram-gallery {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
        }

        .gallery-header {
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .stats-overview {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: bold;
          color: #007bff;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .gallery-filters {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 500;
          font-size: 0.875rem;
        }

        .filter-select,
        .filter-input {
          padding: 0.5rem;
          border: 1px solid #ced4da;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .view-toggle {
          display: flex;
          border: 1px solid #ced4da;
          border-radius: 4px;
          overflow: hidden;
        }

        .view-btn {
          padding: 0.5rem;
          border: none;
          background: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-btn.active {
          background: #007bff;
          color: #fff;
        }

        .clear-filters-btn {
          padding: 0.5rem 1rem;
          background: #6c757d;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
        }

        .clear-filters-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .results-info {
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #6c757d;
        }

        .active-filters {
          color: #007bff;
          font-weight: 500;
        }

        .diagrams-container {
          display: grid;
          gap: 1.5rem;
        }

        .diagrams-container.grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }

        .diagrams-container.list {
          grid-template-columns: 1fr;
        }

        .diagram-card {
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .diagram-card:hover {
          border-color: #007bff;
          box-shadow: 0 2px 8px rgba(0, 123, 255, 0.1);
        }

        .diagram-card.selected {
          border-color: #007bff;
          background: #f8f9ff;
        }

        .diagram-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .diagram-title {
          margin: 0;
          font-size: 1.125rem;
          font-weight: 600;
          color: #212529;
        }

        .diagram-actions {
          display: flex;
          gap: 0.25rem;
        }

        .action-btn {
          padding: 0.25rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #6c757d;
          border-radius: 4px;
        }

        .action-btn:hover {
          background: #e9ecef;
          color: #495057;
        }

        .diagram-description {
          margin: 0 0 1rem 0;
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.4;
        }

        .diagram-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .diagram-category {
          font-size: 0.75rem;
          font-weight: 500;
          color: #007bff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .diagram-tags {
          display: flex;
          gap: 0.25rem;
        }

        .tag {
          font-size: 0.75rem;
          padding: 0.125rem 0.5rem;
          background: #e9ecef;
          color: #495057;
          border-radius: 12px;
        }

        .tag-more {
          font-size: 0.75rem;
          color: #6c757d;
          font-style: italic;
        }

        .diagram-preview {
          border: 1px solid #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          max-height: 200px;
        }

        .mermaid-preview {
          padding: 0.5rem;
          background: #f8f9fa;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .selected-diagram-editor {
          margin-top: 2rem;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }

        .editor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #e9ecef;
        }

        .editor-header h3 {
          margin: 0;
          font-size: 1.125rem;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #6c757d;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: #dc3545;
        }

        @media (max-width: 768px) {
          .gallery-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-group {
            justify-content: space-between;
          }

          .diagrams-container.grid {
            grid-template-columns: 1fr;
          }

          .stats-overview {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
