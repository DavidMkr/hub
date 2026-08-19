import { useId, useMemo, useState, type FormEvent } from "react"
import { faq } from "../content/faq"
import { localBackend, type ChatReply } from "../lib/chat"

type Message = {
  id: string
  role: "user" | "assistant"
  text: string
}

let messageSeq = 0

function nextId(): string {
  messageSeq += 1
  return `m-${messageSeq}`
}

export default function ChatDock() {
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      text: "Ask about resume, contact, or what lives on this site. Answers come from local content for now.",
    },
  ])

  const suggestions = useMemo(() => faq.slice(0, 3).map((item) => item.q), [])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || pending) {
      return
    }

    setPending(true)
    setInput("")
    setMessages((current) => [...current, { id: nextId(), role: "user", text: trimmed }])

    const reply: ChatReply = await localBackend.ask(trimmed)
    setMessages((current) => [...current, { id: nextId(), role: "assistant", text: reply.answer }])
    setPending(false)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send(input)
  }

  return (
    <div className="chat-dock" data-chat-dock style={{ viewTransitionName: "chat-dock" }}>
      {open ? (
        <section
          id={panelId}
          className="mb-3 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-paper shadow-lg"
          aria-label="Site chat"
        >
          <header className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-sm font-semibold">Ask this site</p>
            <button
              type="button"
              className="pressable btn-ghost btn-compact text-sm"
              data-pressable
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </header>
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-3" data-chat-log>
            {messages.map((message) => (
              <p
                key={message.id}
                className={
                  message.role === "user"
                    ? "self-end rounded-2xl bg-accent px-3 py-2 text-sm text-accent-ink"
                    : "self-start rounded-2xl bg-wash px-3 py-2 text-sm text-ink"
                }
                data-chat-role={message.role}
              >
                {message.text}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                className="pressable rounded-full border border-line px-3 py-1 text-xs text-muted"
                data-pressable
                data-chat-suggestion
                onClick={() => void send(question)}
              >
                {question}
              </button>
            ))}
          </div>
          <form className="flex gap-2 border-t border-line p-3" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="chat-input">
              Ask this site
            </label>
            <input
              id="chat-input"
              className="min-h-11 flex-1 rounded-full border border-line bg-wash px-4 text-sm text-ink outline-none"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything…"
              autoComplete="off"
            />
            <button type="submit" className="pressable btn-solid" data-pressable data-chat-send disabled={pending}>
              Send
            </button>
          </form>
        </section>
      ) : null}
      <button
        type="button"
        className="pressable btn-solid"
        data-pressable
        data-chat-toggle
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        Chat
      </button>
    </div>
  )
}
