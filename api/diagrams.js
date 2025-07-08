const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, 'diagrams.json');

// Helper to read/write JSON file
function readDiagrams() {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}
function writeDiagrams(diagrams) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(diagrams, null, 2));
}

// GET all diagrams
router.get('/', (req, res) => {
  res.json(readDiagrams());
});

// POST new diagram
router.post('/', (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Missing code' });
  const diagrams = readDiagrams();
  const id = Date.now().toString();
  const newDiagram = { id, code };
  diagrams.push(newDiagram);
  writeDiagrams(diagrams);
  res.status(201).json(newDiagram);
});

// DELETE diagram by id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  let diagrams = readDiagrams();
  const initialLength = diagrams.length;
  diagrams = diagrams.filter(d => d.id !== id);
  if (diagrams.length === initialLength) return res.status(404).json({ error: 'Not found' });
  writeDiagrams(diagrams);
  res.json({ success: true });
});

// POST reorder diagrams
router.post('/reorder', (req, res) => {
  const { order } = req.body; // array of ids
  if (!Array.isArray(order)) return res.status(400).json({ error: 'Order must be array' });
  const diagrams = readDiagrams();
  const idToDiagram = Object.fromEntries(diagrams.map(d => [d.id, d]));
  const newOrder = order.map(id => idToDiagram[id]).filter(Boolean);
  if (newOrder.length !== diagrams.length) return res.status(400).json({ error: 'Invalid order' });
  writeDiagrams(newOrder);
  res.json({ success: true });
});

module.exports = router;
