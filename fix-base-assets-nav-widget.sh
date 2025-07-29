#!/bin/bash
set -e

# Navigate to project root (assuming script is run from anywhere under repo)
PROJECT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo "$(pwd)")
cd "$PROJECT_ROOT"

######################################################################
# 1. Prefix all public/ asset references with `import.meta.env.BASE_URL`.
#    This eliminates router errors like:
#    "Request URLs for public/ assets must also include your base."
######################################################################
# Update only *.astro & *.jsx/tsx that contain hard-coded "/assets/" refs.
ASSET_FILES=$(grep -rlE 'src="/assets/' src 2>/dev/null || true)
for f in $ASSET_FILES; do
  echo "[fix-assets] Patching $f"
  # Each replacement turns src="/assets/..." → src="${import.meta.env.BASE_URL}assets/..."
  sed -Ei "s#src=\"/assets/#src=\"\${import.meta.env.BASE_URL}assets/#g" "$f"
  # Likewise for <source> tags etc.
  sed -Ei "s#href=\"/assets/#href=\"\${import.meta.env.BASE_URL}assets/#g" "$f"
  sed -Ei "s#url\(/assets/#url(\${import.meta.env.BASE_URL}assets/#g" "$f"
done

######################################################################
# 2. Replace <script src="/src/scripts/..."> paths with BASE_URL-aware paths
######################################################################
SCRIPT_FILES=$(grep -rl '/src/scripts/' src/layouts src/pages 2>/dev/null || true)
for f in $SCRIPT_FILES; do
  echo "[fix-scripts] Patching $f"
  sed -Ei "s#src=\"/src/#src=\"\${import.meta.env.BASE_URL}src/#g" "$f"
  sed -Ei "s#src=\"/sparrow-ai-tech/src/#src=\"\${import.meta.env.BASE_URL}src/#g" "$f"
done

######################################################################
# 3. Add Chatbot & Mermaid Editor to the global nav _and_ include BASE_URL
#    Also append the ElevenLabs Convai widget before </body>.
######################################################################
LAYOUT="src/layouts/CyberpunkLayout.astro"
if [[ -f "$LAYOUT" ]]; then
  echo "[nav] Updating $LAYOUT"
  # a) Inject new nav links **if not already present**
  if ! grep -q 'Mermaid Editor' "$LAYOUT"; then
    # Insert after Agentic Workflows link (first occurrence)
    perl -0777 -i -pe "s|(Agentic Workflows</a>)|$1\n          <a href=\"\{\`\${import.meta.env.BASE_URL}\`\}mermaid-editor/\" class=\"cyber-nav-link\">Mermaid Editor</a>\n          <a href=\"\{\`\${import.meta.env.BASE_URL}\`\}chatbot/\" class=\"cyber-nav-link\">Chatbot</a>|" "$LAYOUT"
  fi
  # b) Append Convai widget just before </body> (only once)
  if ! grep -q 'elevenlabs-convai' "$LAYOUT"; then
    sed -Ei '/<\/body>/i\    <!-- ElevenLabs Convai Widget -->\n    <elevenlabs-convai agent-id="agent_01jwpatrdff2dsns5d56n0ardm"></elevenlabs-convai>\n    <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>\n' "$LAYOUT"
  fi
fi

######################################################################
# 4. Enrich contact buttons with Glama & MCPHub links + fix internal URLs
######################################################################
INDEX="src/pages/index.astro"
if [[ -f "$INDEX" ]]; then
  echo "[contact] Updating $INDEX"
  # Add Glama & MCPHub after CV button (only once)
  if ! grep -q 'Glama MCP Server' "$INDEX"; then
    perl -0777 -i -pe "s|(Professional CV</a>)|$1\n            <a href=\"https://glama.ai/mcp/servers/@sparesparrow/mcp-prompts\" class=\"cyber-btn cyber-btn-outline\" target=\"_blank\" rel=\"noopener noreferrer\">🌐 Glama MCP Server</a>\n            <a href=\"https://mcphub.com/mcp-servers/sparesparrow/mcp-prompts\" class=\"cyber-btn cyber-btn-outline\" target=\"_blank\" rel=\"noopener noreferrer\">🛰 MCPHub Server</a>|" "$INDEX"
  fi
  # Fix internal page links inside index if any hard-coded "/mermaid-editor" or "/chatbot"
  sed -Ei "s#href=\"/mermaid-editor#href=\"\${import.meta.env.BASE_URL}mermaid-editor#g" "$INDEX"
  sed -Ei "s#href=\"/chatbot#href=\"\${import.meta.env.BASE_URL}chatbot#g" "$INDEX"
fi

######################################################################
# 5. Commit & push
######################################################################
git add $ASSET_FILES $SCRIPT_FILES "$LAYOUT" "$INDEX" || true
git commit -m "fix: prefix asset paths with BASE_URL, add Chatbot & Mermaid links, embed ElevenLabs Convai widget, add Glama + MCPHub buttons" || true
git push origin main

echo "✅ Patch applied. Run 'npm run dev' and confirm all /assets/* errors are gone and new links/widget render correctly."