import { useState } from 'react'
import { dagensPlay } from '../content/plays.ts'
import { einarAvatar } from '../content/site.ts'
import AudioAvatar from './AudioAvatar.tsx'

type Choice = 'yes' | 'no'
type Vote = { choice: Choice; replyIndex: number }

const STORAGE_KEY = `kep-vote:${dagensPlay.id}`

const today = new Intl.DateTimeFormat('nb-NO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
}).format(new Date())

/*
 * Demo voting. The vote is NOT sent or counted anywhere. It is only kept in
 * sessionStorage so the same tab can't vote twice. Replace readVote/saveVote
 * with a real vote service when one exists.
 */
function readVote(): Vote | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Vote>
    if (parsed.choice !== 'yes' && parsed.choice !== 'no') return null
    return { choice: parsed.choice, replyIndex: Number(parsed.replyIndex) || 0 }
  } catch {
    return null
  }
}

function saveVote(vote: Vote) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(vote))
  } catch {
    // Private mode or blocked storage: the lock still holds until reload.
  }
}

export default function DagensPlay() {
  const [vote, setVote] = useState<Vote | null>(readVote)
  const [justVoted, setJustVoted] = useState(false)

  function castVote(choice: Choice) {
    if (vote) return // one vote per session
    const pool = dagensPlay.replies[choice]
    const next = { choice, replyIndex: Math.floor(Math.random() * pool.length) }
    saveVote(next)
    setVote(next)
    setJustVoted(true)
  }

  const replies = vote ? dagensPlay.replies[vote.choice] : []
  const reply = vote ? replies[vote.replyIndex % replies.length] : ''

  return (
    <section className="dagens" aria-labelledby="dagens-title">
      {dagensPlay.audio && (
        <AudioAvatar
          className="dagens__einar"
          image={einarAvatar}
          audio={dagensPlay.audio}
          name="Einar"
          label="Trykk på Einar for å høre dagens vurdering"
          playingLabel="Einar vurderer. Trykk igjen for pause."
        />
      )}
      <div className={`dagens__sheet${dagensPlay.audio ? ' has-einar' : ''}`}>
        <div className="dagens__top">
          <h2 id="dagens-title" className="caption dagens__label">
            Dagens play
          </h2>
          <p className="dagens__date">{today}</p>
        </div>

        <p className="play-quote dagens__quote">
          <span className="caption play-quote__idea">{dagensPlay.idea},</span>{' '}
          <span className="caption play-quote__tail">kanskje et play?</span>
        </p>

        <div
          className={`vote${vote ? ' vote--locked' : ''}`}
          role="group"
          aria-label="Stem på dagens play"
        >
          <button
            type="button"
            className="vote__btn vote__btn--yes"
            aria-pressed={vote?.choice === 'yes'}
            disabled={vote !== null}
            onClick={() => castVote('yes')}
          >
            Et play det
          </button>
          <button
            type="button"
            className="vote__btn vote__btn--no"
            aria-pressed={vote?.choice === 'no'}
            disabled={vote !== null}
            onClick={() => castVote('no')}
          >
            Fuck no
          </button>
        </div>

        <div className="ruling" aria-live="polite">
          {vote ? (
            <>
              <p
                className={`ruling__stamp ruling__stamp--${vote.choice}${justVoted ? ' is-new' : ''}`}
              >
                {vote.choice === 'yes' ? 'Godkjent' : 'Underkjent'}
              </p>
              <p className="ruling__from">Playkommisjonen svarer:</p>
              <p className="ruling__text">{reply}</p>
            </>
          ) : (
            <p className="ruling__prompt">Én stemme per person. Tenk deg om.</p>
          )}
        </div>

        <p className="demo-note">
          Demo: stemmen blir ikke lagret eller telt. Den huskes bare i denne fanen, så
          du ikke kan stemme to ganger.
        </p>
      </div>

      <aside className="verdict" aria-labelledby="verdict-title">
        <h3 id="verdict-title" className="verdict__title">
          Kommisjonens begrunnelse
        </h3>
        <p className="verdict__text">{dagensPlay.editorialVerdict}</p>
      </aside>
    </section>
  )
}
