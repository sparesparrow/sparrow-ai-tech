import fs from 'node:fs/promises';
import path from 'node:path';

const _dataPath = path.resolve(process.cwd(), 'src/data/diagrams.json');

export async function GET() {
  try {
    const _data = await fs.readFile(dataPath, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (_error) {
    return new Response(
      JSON.stringify({ message: 'Error reading diagrams', error: _error.message }),
      { status: 500 }
    );
  }
}

export async function POST({ request }) {
  try {
    const _newDiagramData = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(newDiagramData, null, 2), 'utf-8');
    return new Response(JSON.stringify({ message: 'Diagrams updated successfully' }), {
      status: 200,
    });
  } catch (_error) {
    return new Response(
      JSON.stringify({ message: 'Error updating diagrams', error: _error.message }),
      { status: 500 }
    );
  }
}
