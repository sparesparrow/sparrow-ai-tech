# ElevenLabs Custom LLM Server Example

This directory contains a FastAPI server compatible with ElevenLabs Custom LLM integration, following the official [ElevenLabs Custom LLM guide](https://elevenlabs.io/docs/conversational-ai/customization/custom-llm).

## Features
- OpenAI-compatible `/v1/chat/completions` endpoint
- Supports buffer words for smooth TTS streaming
- Handles `elevenlabs_extra_body` for advanced integrations
- Loads API key from `.env` (see `.env.example`)

## Quickstart

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
2. **Copy and edit environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```
3. **Run the server:**
   ```bash
   python server.py
   # or
   uvicorn server:app --host 0.0.0.0 --port 8013
   ```
4. **Expose your server (optional):**
   Use a tool like ngrok to make your server publicly accessible:
   ```bash
   ngrok http 8013
   ```
5. **Configure ElevenLabs:**
   - In the ElevenLabs dashboard, set your Custom LLM endpoint to your public URL (e.g., from ngrok).
   - Set "Custom LLM extra body" to true if you want to pass extra parameters.

## References
- [ElevenLabs Custom LLM Integration Docs](https://elevenlabs.io/docs/conversational-ai/customization/custom-llm)

---

For advanced features (system tools, function calling, etc.), see the official ElevenLabs documentation.
