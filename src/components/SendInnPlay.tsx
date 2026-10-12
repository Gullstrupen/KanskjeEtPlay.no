import { useState } from 'react'
import type { FormEvent } from 'react'
import { isSubmissionConnected, submitPlay } from '../lib/submitPlay.ts'

const MAX_LENGTH = 280
const MIN_LENGTH = 10

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function SendInnPlay() {
  const [idea, setIdea] = useState('')
  const [name, setName] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const trimmed = idea.trim()
  const isLongEnough = trimmed.length >= MIN_LENGTH
  const canSubmit = isSubmissionConnected && isLongEnough && status !== 'sending'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit) return

    // Spam trap: real people never see or fill the hidden "website" field.
    const form = event.currentTarget
    const honeypot = new FormData(form).get('website')
    if (honeypot) return

    setStatus('sending')
    setErrorMessage('')
    try {
      await submitPlay({
        idea: trimmed,
        name: anonymous || name.trim() === '' ? null : name.trim(),
        anonymous,
      })
      setStatus('sent')
      setIdea('')
      setName('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Noe gikk galt.')
    }
  }

  return (
    <section className="send-inn" aria-labelledby="send-inn-title">
      <h2 id="send-inn-title" className="caption caption--label send-inn__label">
        Send inn ditt play
      </h2>
      <p className="send-inn__intro">
        Har du en idé som høres helt idiotisk ut, men som kanskje er genial? Send den
        rett til Einar.
      </p>

      {!isSubmissionConnected && (
        <p id="form-status" className="form-status" role="note">
          <strong>Innsending er ikke åpnet ennå.</strong> Du kan skrive, men ingenting
          blir sendt før skjemaet er koblet til.
        </p>
      )}

      <form className="play-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="play-idea" className="field__label">
            Playet ditt
          </label>
          <textarea
            id="play-idea"
            name="idea"
            className="field__input field__input--area"
            rows={4}
            required
            minLength={MIN_LENGTH}
            maxLength={MAX_LENGTH}
            placeholder="Ta med egen stol på stranda, kanskje et play?"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            aria-describedby="play-idea-hint"
          />
          <span id="play-idea-hint" className="field__hint">
            <span>Minst {MIN_LENGTH} tegn.</span>
            <span>
              {idea.length} / {MAX_LENGTH}
            </span>
          </span>
        </div>

        <div className="field">
          <label htmlFor="play-name" className="field__label">
            Navn <span className="field__optional">(valgfritt)</span>
          </label>
          <input
            id="play-name"
            name="name"
            className="field__input"
            type="text"
            autoComplete="given-name"
            maxLength={60}
            placeholder={anonymous ? 'Du sender anonymt' : 'Fornavn holder'}
            value={anonymous ? '' : name}
            disabled={anonymous}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="check">
            <input
              type="checkbox"
              name="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            <span>Send anonymt. Einar får bare selve playet.</span>
          </label>
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="play-website">Ikke fyll ut dette feltet</label>
          <input id="play-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="play-form__actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!canSubmit}
            aria-describedby={isSubmissionConnected ? undefined : 'form-status'}
          >
            {status === 'sending' ? 'Sender …' : 'Send til Einar'}
          </button>
          {!isSubmissionConnected && (
            <span className="submit-note">Åpner når skjemaet er koblet til.</span>
          )}
        </div>

        <div aria-live="polite">
          {status === 'sent' && (
            <p className="form-result">Sendt. Einar har fått playet ditt.</p>
          )}
          {status === 'error' && (
            <p className="form-result form-result--error">
              Playet ble ikke sendt. {errorMessage} Prøv igjen om litt.
            </p>
          )}
        </div>
      </form>
    </section>
  )
}
