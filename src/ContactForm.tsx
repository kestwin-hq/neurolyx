import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle, WarningCircle } from '@phosphor-icons/react'
import { COMPANY } from './company'

// Messages go to the company's API, which stores them and emails COMPANY.email.
const API = import.meta.env.VITE_CONTACT_API || 'https://api.kestwin.com/api/contact'

const TOPICS = [
  { id: 'other', label: 'General question' },
  { id: 'partnership', label: 'Partnership or business' },
  { id: 'support', label: 'Help with Kestwin' },
  { id: 'collaboration', label: 'Kestwin for my company or college' },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    // bots fill the hidden field, people never see it
    if (String(f.get('website') || '')) return setStatus('sent')

    const name = String(f.get('name') || '').trim()
    const email = String(f.get('email') || '').trim()
    const message = String(f.get('message') || '').trim()
    const topic = TOPICS.find((t) => t.id === f.get('topic')) ?? TOPICS[0]

    const next: Errors = {}
    if (!name) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (message.length < 10) next.message = 'Please write a little more, at least 10 characters.'
    setErrors(next)
    if (Object.keys(next).length) return

    setStatus('sending')
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          category: topic.id,
          subject: `${COMPANY.shortName} website: ${topic.label}`,
          message,
          page: COMPANY.website,
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-done" role="status">
        <CheckCircle size={40} weight="duotone" />
        <h3 className="card-title">Thank you, we got your message</h3>
        <p className="body-6 muted">We will reply to the email you gave us.</p>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      <div className="cform__row">
        <Field label="Your name" error={errors.name}>
          <input name="name" autoComplete="name" maxLength={100} aria-invalid={!!errors.name} />
        </Field>
        <Field label="Email" error={errors.email}>
          <input name="email" type="email" autoComplete="email" maxLength={200} aria-invalid={!!errors.email} />
        </Field>
      </div>
      <Field label="Topic">
        <select name="topic" defaultValue="other">
          {TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" error={errors.message}>
        <textarea name="message" rows={5} maxLength={5000} aria-invalid={!!errors.message} />
      </Field>
      <input name="website" tabIndex={-1} autoComplete="off" className="cform__trap" aria-hidden="true" />
      {status === 'error' && (
        <p className="cform__fail body-6" role="alert">
          <WarningCircle size={18} weight="bold" />
          <span>
            Sorry, the message did not send. Please email us at{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          </span>
        </p>
      )}
      <button type="submit" className="btn btn--primary cform__send" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={18} weight="bold" />
      </button>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="body-5">{label}</span>
      {children}
      {error && <span className="field__error caption-2">{error}</span>}
    </label>
  )
}
