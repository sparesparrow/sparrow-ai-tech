// ESM-compatible Jest mocking for node-fetch
import { jest } from '@jest/globals';

import handler from './chatbot.js';

// Mock window.matchMedia for JSDOM
global.window = global.window || {};
global.window.matchMedia =
  global.window.matchMedia ||
  function () {
    return {
      matches: false,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => {},
    };
  };

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockImplementation((code) => {
    // // // console.log('res.status called with', code);
    return res;
  });
  res.json = jest.fn().mockImplementation((obj) => {
    // // // console.log('res.json called with', obj);
    return res;
  });
  res.setHeader = jest.fn().mockImplementation((...args) => {
    // // // console.log('res.setHeader called with', ...args);
  });
  res.end = jest.fn();
  res.send = jest.fn();
  return res;
};

describe('POST /api/chatbot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ELEVENLABS_API_KEY = 'test-key';
    global.fetch = jest.fn();
  });

  it('returns 400 if text is missing', async () => {
    const req = { method: 'POST', body: {} };
    const res = mockRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it('returns 500 if API key is missing', async () => {
    delete process.env.ELEVENLABS_API_KEY;
    const req = { method: 'POST', body: { text: 'hello' } };
    const res = mockRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it('returns 405 for non-POST methods', async () => {
    const req = { method: 'GET', body: {} };
    const res = mockRes();
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it('returns audio/mpeg on success', async () => {
    const req = { method: 'POST', body: { text: 'hello', voiceid: 'test' } };
    const res = mockRes();
    // Mock fetch to return a stream
    const mockStream = { pipe: jest.fn() };
    global.fetch.mockResolvedValue({
      ok: true,
      body: mockStream,
      status: 200,
      headers: { get: () => 'audio/mpeg' },
    });
    await handler(req, res);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'audio/mpeg');
    expect(mockStream.pipe).toHaveBeenCalledWith(res);
  });

  it('returns error if ElevenLabs fails', async () => {
    const req = { method: 'POST', body: { text: 'hello' } };
    const res = mockRes();
    global.fetch.mockResolvedValue({
      ok: false,
      text: async () => 'API error',
      status: 502,
    });
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(502); // match the mock's status
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'API error' }));
  });
});
