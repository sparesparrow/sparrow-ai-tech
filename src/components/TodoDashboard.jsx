 
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const STATUS_COLORS = {
  ToDo: 'bg-gray-200 text-gray-800',
  InProgress: 'bg-yellow-200 text-yellow-900',
  Implemented: 'bg-blue-200 text-blue-900',
  Tested: 'bg-green-200 text-green-900',
  Done: 'bg-green-600 text-white',
  HelpNeeded: 'bg-red-200 text-red-900',
};

function parseTodoMd(md) {
  // Simple parser for TODO.md structure (sections, tasks, subtasks, status, tags, owners)
  const lines = md.split('\n');
  const sections = [];
  let currentSection = null;
  let currentTask = null;
  const statusRegex = /\[([ x-])\]/;
  const statusMap = {
    ' ': 'ToDo',
    '-': 'HelpNeeded',
    x: 'Done',
  };
  const customStatusMap = {
    '[ToDo]': 'ToDo',
    '[InProgress]': 'InProgress',
    '[Implemented]': 'Implemented',
    '[Tested]': 'Tested',
    '[HelpNeeded]': 'HelpNeeded',
    '[Done]': 'Done',
  }; // Přidána chybějící zavírací závorka

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^##+ /.test(line)) {
      // New section
      if (currentSection) sections.push(currentSection);
      currentSection = { title: line.replace(/^#+ /, ''), tasks: [] };
    } else if (/^- \[.\] /.test(line) || /^- \[\w+\] /.test(line)) {
      // Task line
      let status = 'ToDo';
      let text = line;
      let match = line.match(/^- \[(.|\w+)\] (.*)/);
      if (match) {
        if (statusMap[match[1]]) status = statusMap[match[1]];
        else if (customStatusMap[`[${match[1]}]`]) status = customStatusMap[`[${match[1]}]`];
        text = match[2];
      }
      // Extract tags and owners
      const tags = Array.from(text.matchAll(/#\w+/g)).map((m) => m[0]);
      const owners = Array.from(text.matchAll(/@\w+/g)).map((m) => m[0]);
      // Remove tags/owners from text
      text = text.replace(/#\w+/g, '').replace(/@\w+/g, '').trim();
      currentTask = { text, status, tags, owners, subtasks: [], line: i };
      if (currentSection) currentSection.tasks.push(currentTask);
    } else if (/^ {2}- \[.\] /.test(line) && currentTask) {
      // Subtask (indented)
      let status = 'ToDo';
      let text = line;
      let match = line.match(/^ {2}- \[(.|\w+)\] (.*)/);
      if (match) {
        if (statusMap[match[1]]) status = statusMap[match[1]];
        else if (customStatusMap[`[${match[1]}]`]) status = customStatusMap[`[${match[1]}]`];
        text = match[2];
      }
      // Extract tags and owners
      const tags = Array.from(text.matchAll(/#\w+/g)).map((m) => m[0]);
      const owners = Array.from(text.matchAll(/@\w+/g)).map((m) => m[0]);
      text = text.replace(/#\w+/g, '').replace(/@\w+/g, '').trim();
      currentTask.subtasks.push({ text, status, tags, owners, line: i });
    }
  }
  if (currentSection) sections.push(currentSection);
  return sections;
}

function getAllTags(sections) {
  const tags = new Set();
  sections.forEach((s) => s.tasks.forEach((t) => t.tags.forEach((tag) => tags.add(tag))));
  return Array.from(tags);
}

function getAllOwners(sections) {
  const owners = new Set();
  sections.forEach((s) => s.tasks.forEach((t) => t.owners.forEach((owner) => owners.add(owner))));
  return Array.from(owners);
}

function getAllStatuses(sections) {
  const statuses = new Set();
  sections.forEach((s) => s.tasks.forEach((t) => statuses.add(t.status)));
  return Array.from(statuses);
}

export default function TodoDashboard({ todoMd }) {
  const [sections, setSections] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [tagFilter, setTagFilter] = useState('All');
  const [ownerFilter, setOwnerFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedTasks, setExpandedTasks] = useState({});
  const [localStatus, setLocalStatus] = useState({}); // { 'sectionIdx-taskIdx': 'Done' | 'ToDo' | ... }
  const [draggedTask, setDraggedTask] = useState(null); // {sectionIdx, taskIdx}
  const [dragOverTask, setDragOverTask] = useState(null); // {sectionIdx, taskIdx}
  const [toast, setToast] = useState('');
  const toastTimeout = useRef(null);

  useEffect(() => {
    if (todoMd) setSections(parseTodoMd(todoMd));
  }, [todoMd]);

  if (!todoMd) return <div data-cy="todo-loading">Loading TODO.md...</div>;

  // Helper to get effective status (local override or original)
  const getTaskStatus = (sectionIdx, taskIdx, origStatus) => {
    const key = `${sectionIdx}-${taskIdx}`;
    return localStatus[key] || origStatus;
  };

  const getSubtaskStatus = (parentKey, subIdx, origStatus) => {
    const key = `${parentKey}-sub${subIdx}`;
    return localStatus[key] || origStatus;
  };

  // Handler to toggle status for a task
  const handleToggleTaskStatus = (sectionIdx, taskIdx, currentStatus) => {
    const key = `${sectionIdx}-${taskIdx}`;
    setLocalStatus((prev) => ({
      ...prev,
      [key]: currentStatus === 'Done' ? 'ToDo' : 'Done',
    }));
  };

  // Handler to toggle status for a subtask (recursive)
  const handleToggleSubtaskStatus = (parentKey, subIdx, currentStatus) => {
    const key = `${parentKey}-sub${subIdx}`;
    setLocalStatus((prev) => ({
      ...prev,
      [key]: currentStatus === 'Done' ? 'ToDo' : 'Done',
    }));
  };

  // Drag-and-drop handlers
  const handleDragStart = (sectionIdx, taskIdx) => {
    setDraggedTask({ sectionIdx, taskIdx });
  };

  const handleDragEnter = (sectionIdx, taskIdx) => {
    setDragOverTask({ sectionIdx, taskIdx });
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverTask(null);
  };

  const handleDrop = (sectionIdx, taskIdx) => {
    if (!draggedTask || draggedTask.sectionIdx !== sectionIdx) return;
    setSections((prevSections) => {
      const newSections = [...prevSections];
      const tasks = [...newSections[sectionIdx].tasks];
      const [moved] = tasks.splice(draggedTask.taskIdx, 1);
      tasks.splice(taskIdx, 0, moved);
      newSections[sectionIdx] = { ...newSections[sectionIdx], tasks };
      return newSections;
    });
  };

  // Flatten all tasks for progress and filter controls
  const allTasks = sections.flatMap((s) => s.tasks);
  const allTags = getAllTags(sections);
  const allOwners = getAllOwners(sections);
  const allStatuses = getAllStatuses(sections);
  const total = allTasks.length;
  const completed = allTasks.filter((t) => t.status === 'Done').length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  // Filtering logic
  function taskMatchesFilters(task) {
    if (statusFilter !== 'All' && getTaskStatus(task.line, task.line, task.status) !== statusFilter)
      return false;
    if (tagFilter !== 'All' && !task.tags.includes(tagFilter)) return false;
    if (ownerFilter !== 'All' && !task.owners.includes(ownerFilter)) return false;
    if (search && !task.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }

  const filteredSections = sections
    .map((section) => ({
      ...section,
      tasks: section.tasks.filter(taskMatchesFilters),
    }))
    .filter((section) => section.tasks.length > 0);

  // Toggle expand/collapse for a task by unique id
  const handleToggleExpand = (sectionIdx, taskIdx) => {
    const key = `${sectionIdx}-${taskIdx}`;
    setExpandedTasks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to render subtasks recursively (with checkboxes)
  const renderSubtasks = (subtasks, sectionIdx, parentTaskIdx, parentKey, level = 1) => {
    if (!subtasks || !subtasks.length) return null;
    return (
      <ul className={`ml-${level * 4} border-l-2 border-gray-200 pl-4`}>
        {subtasks.map((sub, subIdx) => {
          const subKey = `${parentKey}-sub${subIdx}`;
          const effectiveStatus = getSubtaskStatus(parentKey, subIdx, sub.status);
          return (
            <li key={subKey} className="mb-2 flex items-start" data-cy={`subtask-${subKey}`}>
              <input
                type="checkbox"
                checked={effectiveStatus === 'Done'}
                onChange={() => handleToggleSubtaskStatus(parentKey, subIdx, effectiveStatus)}
                aria-label={effectiveStatus === 'Done' ? 'Mark as not done' : 'Mark as done'}
                className="mr-2 mt-2"
                data-cy={`subtask-checkbox-${subKey}`}
              />
              <span
                className={`mr-2 mt-2 inline-block h-2 w-2 rounded-full ${STATUS_COLORS[effectiveStatus] || 'bg-gray-300'}`}
              ></span>
              <div className="flex-1">
                <span className="font-medium">{sub.text}</span>
                {effectiveStatus && (
                  <span
                    className={`ml-2 rounded px-2 py-0.5 text-xs ${STATUS_COLORS[effectiveStatus] || 'bg-gray-300'}`}
                  >
                    {effectiveStatus}
                  </span>
                )}
                {/* Recursively render deeper subtasks if present */}
                {sub.subtasks &&
                  sub.subtasks.length > 0 &&
                  renderSubtasks(sub.subtasks, sectionIdx, parentTaskIdx, subKey, level + 1)}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  // Helper to flatten filtered tasks for CSV export
  function flattenTasks(sections) {
    const rows = [];
    sections.forEach((section) => {
      section.tasks.forEach((task) => {
        rows.push({
          section: section.title,
          task: task.text,
          status: task.status,
          tags: task.tags.join(','),
          owner: task.owners.length ? task.owners[0] : '', // Assuming one owner for simplicity
          subtask: '',
        });
        if (task.subtasks && task.subtasks.length) {
          task.subtasks.forEach((sub) => {
            rows.push({
              section: section.title,
              task: task.text,
              status: sub.status,
              tags: sub.tags.join(','),
              owner: sub.owners.length ? sub.owners[0] : '', // Assuming one owner for simplicity
              subtask: sub.text,
            });
          });
        }
      });
    });
    return rows;
  }

  // Export as Markdown
  function exportMarkdown() {
    let md = '';
    filteredSections.forEach((section) => {
      md += `## ${section.title}\n`;
      section.tasks.forEach((task) => {
        const statusBox =
          getTaskStatus(section.line, task.line, task.status) === 'Done' ? '[x]' : '[ ]';
        let line = `- ${statusBox} ${task.text}`;
        if (task.tags.length) line += ` [${task.tags.join(', ')}]`;
        if (task.owners.length) line += ` (owner: ${task.owners.join(', ')})`;
        md += line + '\n';
        if (task.subtasks && task.subtasks.length) {
          task.subtasks.forEach((sub) => {
            const subStatusBox =
              getSubtaskStatus(task.line, sub.line, sub.status) === 'Done' ? '[x]' : '[ ]';
            let subLine = `  - ${subStatusBox} ${sub.text}`;
            if (sub.tags.length) subLine += ` [${sub.tags.join(', ')}]`;
            if (sub.owners.length) subLine += ` (owner: ${sub.owners.join(', ')})`;
            md += subLine + '\n';
          });
        }
      });
      md += '\n';
    });
    triggerDownload(md, `todo-export-${new Date().toISOString().slice(0, 10)}.md`);
    showToast('Exported as Markdown!');
  }

  // Export as CSV
  function exportCSV() {
    const rows = flattenTasks(filteredSections);
    const header = 'Section,Task,Status,Tags,Owner,Subtask';
    const csv = [
      header,
      ...rows.map((r) =>
        [r.section, r.task, r.status, r.tags, r.owner, r.subtask]
          .map((x) => `"${x.replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');
    triggerDownload(csv, `todo-export-${new Date().toISOString().slice(0, 10)}.csv`);
    showToast('Exported as CSV!');
  }

  function triggerDownload(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  function showToast(msg) {
    setToast(msg);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(''), 2000);
  }

  // Helper to get current filtered Markdown (reuse exportMarkdown logic)
  function getCurrentMarkdown() {
    let md = '';
    filteredSections.forEach((section) => {
      md += `## ${section.title}\n`;
      section.tasks.forEach((task) => {
        const statusBox =
          getTaskStatus(section.line, task.line, task.status) === 'Done' ? '[x]' : '[ ]';
        let line = `- ${statusBox} ${task.text}`;
        if (task.tags.length) line += ` [${task.tags.join(', ')}]`;
        if (task.owners.length) line += ` (owner: ${task.owners.join(', ')})`;
        md += line + '\n';
        if (task.subtasks && task.subtasks.length) {
          task.subtasks.forEach((sub) => {
            const subStatusBox =
              getSubtaskStatus(task.line, sub.line, sub.status) === 'Done' ? '[x]' : '[ ]';
            let subLine = `  - ${subStatusBox} ${sub.text}`;
            if (sub.tags.length) subLine += ` [${sub.tags.join(', ')}]`;
            if (sub.owners.length) subLine += ` (owner: ${sub.owners.join(', ')})`;
            md += subLine + '\n';
          });
        }
      });
      md += '\n';
    });
    return md;
  }

  // Share handler using Web Share API or clipboard fallback
  async function handleShare() {
    const title = 'Project TODOs | Sparrow AI Tech';
    const text = 'Check out my current project roadmap!';
    const md = getCurrentMarkdown();
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${text}\n\n${md}`.slice(0, 2000), // Limit for some platforms
        });
        showToast('Shared via native share!');
        return;
      } catch (err) {
        showToast(err);
      }
    }
    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(md);
      showToast('Copied TODOs to clipboard!');
    } catch (err) {
      showToast(err);
    }
  }

  return (
    <div className="todo-dashboard mx-auto max-w-4xl p-4" data-cy="todo-dashboard">
      <div
        className="sticky top-0 z-10 mb-4 flex flex-col items-stretch gap-2 bg-gray-100 pb-2 shadow-sm dark:bg-gray-950 sm:flex-row sm:items-center sm:gap-4"
        role="group"
        aria-label="Export and share controls"
        style={{ borderBottom: '1px solid #e5e7eb' }}
      >
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={exportMarkdown}
            className="rounded bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-all hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            data-cy="export-md-btn"
            aria-label="Export as Markdown"
            tabIndex={0}
          >
            Export as Markdown
          </button>
          <button
            onClick={exportCSV}
            className="rounded bg-gray-200 px-4 py-3 font-medium text-gray-800 transition-all hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            data-cy="export-csv-btn"
            aria-label="Export as CSV"
            tabIndex={0}
          >
            Export as CSV
          </button>
          <button
            onClick={handleShare}
            className="rounded bg-blue-600 px-4 py-3 font-medium text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            data-cy="share-btn"
            aria-label="Share TODOs"
            tabIndex={0}
          >
            Share
          </button>
        </div>
        {/* Add filter/search controls here if not already sticky */}
      </div>

      {toast && (
        <div
          className="fixed right-4 top-4 z-50 rounded bg-green-600 px-4 py-2 text-lg text-white shadow"
          data-cy="export-toast"
          role="status"
        >
          {toast}
        </div>
      )}

      {/* Progress Bar & Stats */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">Progress:</span>
          <span data-cy="todo-progress-label">
            {completed} / {total} tasks complete ({percent}%)
          </span>
        </div>
        <div
          className="h-3 w-full rounded bg-gray-200"
          aria-label="Progress Bar"
          data-cy="todo-progress-bar"
        >
          <div
            className="h-3 rounded bg-green-500 transition-all"
            style={{ width: `${percent}%` }}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      {/* Filter Controls */}
      <form className="mb-6 flex flex-wrap items-end gap-4" role="search" aria-label="Task Filters">
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium">
            Status
          </label>
          <select
            id="status-filter"
            data-cy="status-filter"
            className="rounded border px-2 py-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            {allStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tag-filter" className="block text-sm font-medium">
            Tag
          </label>
          <select
            id="tag-filter"
            data-cy="tag-filter"
            className="rounded border px-2 py-1"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
          >
            <option value="All">All</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="owner-filter" className="block text-sm font-medium">
            Owner
          </label>
          <select
            id="owner-filter"
            data-cy="owner-filter"
            className="rounded border px-2 py-1"
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
          >
            <option value="All">All</option>
            {allOwners.map((owner) => (
              <option key={owner} value={owner}>
                {owner}
              </option>
            ))}
          </select>
        </div>
        <div className="min-w-[180px] flex-1">
          <label htmlFor="todo-search" className="block text-sm font-medium">
            Search
          </label>
          <input
            id="todo-search"
            data-cy="todo-search"
            className="w-full rounded border px-2 py-1"
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />
        </div>
      </form>

      {/* Filtered Sections and Tasks */}
      {filteredSections.length === 0 ? (
        <div className="text-gray-500" data-cy="todo-no-tasks">
          No tasks match the current filters.
        </div>
      ) : (
        filteredSections.map((section, sIdx) => (
          <section key={sIdx} className="mb-8" data-cy={`todo-section-${sIdx}`}>
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            <ul className="space-y-2">
              {section.tasks.map((task, tIdx) => {
                const key = `${sIdx}-${tIdx}`;
                const hasSubtasks = task.subtasks && task.subtasks.length > 0;
                const isExpanded = expandedTasks[key];
                const effectiveStatus = getTaskStatus(sIdx, tIdx, task.status);
                const isDragging =
                  draggedTask && draggedTask.sectionIdx === sIdx && draggedTask.taskIdx === tIdx;
                const isDragOver =
                  dragOverTask && dragOverTask.sectionIdx === sIdx && dragOverTask.taskIdx === tIdx;
                return (
                  <li
                    key={key}
                    className={`mb-4 border-b pb-2 transition-all duration-200 ${isDragOver ? 'bg-blue-100 dark:bg-blue-900' : ''} ${isDragging ? 'opacity-50' : ''}`}
                    data-cy={`task-${key}`}
                    draggable
                    onDragStart={() => handleDragStart(sIdx, tIdx)}
                    onDragEnter={() => handleDragEnter(sIdx, tIdx)}
                    onDragEnd={handleDragEnd}
                    onDrop={() => handleDrop(sIdx, tIdx)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <div className="flex items-center">
                      <span
                        className="mr-2 cursor-move text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        title="Drag to reorder"
                        data-cy={`drag-handle-${key}`}
                        style={{ fontSize: 20 }}
                      >
                        ☰
                      </span>
                      <input
                        type="checkbox"
                        checked={effectiveStatus === 'Done'}
                        onChange={() => handleToggleTaskStatus(sIdx, tIdx, effectiveStatus)}
                        aria-label={
                          effectiveStatus === 'Done' ? 'Mark as not done' : 'Mark as done'
                        }
                        className="mr-2"
                        data-cy={`task-checkbox-${key}`}
                      />
                      {hasSubtasks && (
                        <button
                          onClick={() => handleToggleExpand(sIdx, tIdx)}
                          aria-expanded={!!isExpanded}
                          aria-controls={`subtasks-${key}`}
                          className="mr-2 focus:outline-none"
                          data-cy={`expand-toggle-${key}`}
                          title={isExpanded ? 'Collapse subtasks' : 'Expand subtasks'}
                        >
                          <span
                            className={`inline-block transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                          >
                            ▶
                          </span>
                        </button>
                      )}
                      <span className="text-lg font-semibold">{task.text}</span>
                      {effectiveStatus && (
                        <span
                          className={`ml-2 rounded px-2 py-0.5 text-xs ${STATUS_COLORS[effectiveStatus] || 'bg-gray-300'}`}
                        >
                          {effectiveStatus}
                        </span>
                      )}
                      {task.tags.map((tag) => (
                        <span key={tag} className="ml-2 text-xs text-blue-600" data-cy="todo-tag">
                          {tag}
                        </span>
                      ))}
                      {task.owners.map((owner) => (
                        <span
                          key={owner}
                          className="ml-2 text-xs text-green-700"
                          data-cy="todo-owner"
                        >
                          {owner}
                        </span>
                      ))}
                    </div>
                    {/* Animated expand/collapse for subtasks */}
                    {hasSubtasks && (
                      <div
                        id={`subtasks-${key}`}
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        aria-hidden={!isExpanded}
                      >
                        {isExpanded && renderSubtasks(task.subtasks, sIdx, tIdx, key)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}

TodoDashboard.propTypes = {
  todoMd: PropTypes.string.isRequired,
};
