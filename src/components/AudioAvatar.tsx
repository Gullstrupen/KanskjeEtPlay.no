import { useRef, useState } from 'react'

type Props = {
  /** Round image, path from /public */
  image: string
  /** Audio file, path from /public */
  audio: string
  /** Who is in the picture, e.g. "Einar" */
  name: string
  /** Caption shown when idle */
  label: string
  /** Caption shown while playing */
  playingLabel: string
  className?: string
}

/** Paths in /public may contain spaces (e.g. "Audio filer"); encode them for the browser. */
const toUrl = (path: string) => encodeURI(path)

/**
 * A round photo that plays audio when tapped and spins like a record while
 * it plays. Tap again to pause. No visible player controls by design.
 */
export default function AudioAvatar({
  image,
  audio,
  name,
  label,
  playingLabel,
  className = '',
}: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  // Bumped when the audio ends, so the record turns back upright.
  const [spinKey, setSpinKey] = useState(0)

  async function toggle() {
    const el = audioRef.current
    if (!el) return
    if (!el.paused) {
      el.pause()
      return
    }
    try {
      setHasError(false)
      await el.play()
    } catch {
      setIsPlaying(false)
      setHasError(true)
    }
  }

  function handleEnded() {
    const el = audioRef.current
    if (el) el.currentTime = 0
    setIsPlaying(false)
    setSpinKey((key) => key + 1)
  }

  return (
    <div className={`audio-avatar${isPlaying ? ' is-playing' : ''} ${className}`.trim()}>
      <button
        type="button"
        className="audio-avatar__button"
        onClick={toggle}
        aria-label={isPlaying ? `Pause ${name}` : `Hør ${name}: ${label}`}
      >
        <span className="audio-avatar__disc">
          <img
            key={spinKey}
            className="audio-avatar__img"
            src={toUrl(image)}
            alt=""
            width={640}
            height={640}
            draggable={false}
          />
        </span>
        <span className="audio-avatar__state" aria-hidden="true">
          {isPlaying ? (
            <svg viewBox="0 0 20 20">
              <rect x="5" y="4" width="3.5" height="12" rx="1" />
              <rect x="11.5" y="4" width="3.5" height="12" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20">
              <path d="M6.5 4.2v11.6a.8.8 0 0 0 1.2.7l9.2-5.8a.8.8 0 0 0 0-1.4L7.7 3.5a.8.8 0 0 0-1.2.7Z" />
            </svg>
          )}
        </span>
      </button>

      <p className="audio-avatar__label" aria-live="polite">
        <span className="caption caption--small">
          {hasError ? 'Lyden ville ikke spille. Prøv igjen.' : isPlaying ? playingLabel : label}
        </span>
      </p>

      <audio
        ref={audioRef}
        src={toUrl(audio)}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onError={() => {
          setIsPlaying(false)
          setHasError(true)
        }}
      />
    </div>
  )
}
