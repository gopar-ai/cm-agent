import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { streamChatWithAgent, Message } from '@/lib/anthropic';
import type { MemoryEntry } from '@/lib/agent-memory';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const {
    messages,
    agentContext,
    memoria,
  }: { messages: Message[]; agentContext?: string; memoria?: MemoryEntry[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Mensajes inválidos' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        await streamChatWithAgent(
          messages,
          (chunk) => {
            controller.enqueue(encoder.encode(chunk));
          },
          agentContext,
          memoria
        );
      } catch {
        controller.enqueue(encoder.encode('\n\nHubo un error al generar la respuesta. Intenta de nuevo.'));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
