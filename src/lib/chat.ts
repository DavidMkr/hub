import { faq, type FaqItem } from "../content/faq"

export type ChatReply = {
  answer: string
  sources?: string[]
}

export type ChatBackend = {
  ask(input: string): Promise<ChatReply>
}

export const CHAT_EMPTY = "Ask a question about this site."
export const CHAT_FALLBACK =
  "I only know what's on this site for now. Try asking about resume, contact, or what I build."

export function tokens(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2)
}

export function scoreFaq(query: string, item: FaqItem): number {
  const queryTokens = new Set(tokens(query))
  const hay = tokens(`${item.q} ${item.a} ${(item.tags ?? []).join(" ")}`)
  let hits = 0
  for (const token of hay) {
    if (queryTokens.has(token)) {
      hits += 1
    }
  }
  return hits
}

export function answerFromFaq(
  query: string,
  items: FaqItem[],
  fallback: string = CHAT_FALLBACK,
): ChatReply {
  const trimmed = query.trim()
  if (!trimmed) {
    return { answer: CHAT_EMPTY }
  }

  const ranked = items
    .map((item) => ({ item, score: scoreFaq(trimmed, item) }))
    .sort((a, b) => b.score - a.score)

  const best = ranked[0]
  if (best && best.score > 0) {
    return { answer: best.item.a, sources: [best.item.q] }
  }

  return { answer: fallback }
}

export const localBackend: ChatBackend = {
  async ask(input: string): Promise<ChatReply> {
    return answerFromFaq(input, faq)
  },
}
