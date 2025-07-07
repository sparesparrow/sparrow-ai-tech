import json
import os
import fastapi
from fastapi.responses import StreamingResponse
from openai import AsyncOpenAI
import uvicorn
import logging
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional

# Load environment variables from .env file
load_dotenv()

# Retrieve API key from environment
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

app = fastapi.FastAPI()
oai_client = AsyncOpenAI(api_key=OPENAI_API_KEY)

class Message(BaseModel):
    role: str
    content: str

class ChatCompletionRequest(BaseModel):
    messages: List[Message]
    model: str
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = None
    stream: Optional[bool] = False
    user_id: Optional[str] = None
    elevenlabs_extra_body: Optional[dict] = None

@app.post("/v1/chat/completions")
async def create_chat_completion(request: ChatCompletionRequest):
    oai_request = request.dict(exclude_none=True)
    if "user_id" in oai_request:
        oai_request["user"] = oai_request.pop("user_id")
    if "elevenlabs_extra_body" in oai_request:
        oai_request.pop("elevenlabs_extra_body")

    chat_completion_coroutine = await oai_client.chat.completions.create(**oai_request)

    async def event_stream():
        try:
            # Buffer words: send initial chunk if needed
            yield f"data: {json.dumps({'id': 'chatcmpl-buffer', 'object': 'chat.completion.chunk', 'created': 1234567890, 'model': oai_request.get('model', ''), 'choices': [{'delta': {'content': 'Let me think about that... '}, 'index': 0, 'finish_reason': None}]})}\n\n"
            async for chunk in chat_completion_coroutine:
                chunk_dict = chunk.model_dump()
                yield f"data: {json.dumps(chunk_dict)}\n\n"
            yield "data: [DONE]\n\n"
        except Exception as e:
            logging.error("An error occurred: %s", str(e))
            yield f"data: {json.dumps({'error': 'Internal error occurred!'})}\n\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8013)
