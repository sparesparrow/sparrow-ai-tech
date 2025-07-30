import fs from 'node:fs/promises';
import path from 'node:path';

const dataPath = path.resolve(process.cwd(), 'src/data/diagrams.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return new Response(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error reading diagrams', error: error.message }), { status: 500 });
  }
}

export async function POST({ request }) {
  try {
    const newDiagramData = await request.json();
    await fs.writeFile(dataPath, JSON.stringify(newDiagramData, null, 2), 'utf-8');
    return new Response(JSON.stringify({ message: 'Diagrams updated successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating diagrams', error: error.message }), { status: 500 });
  }
}
