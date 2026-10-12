import { heroVideo } from '../content/site.ts'

/** Safari needs the HEVC .mov for transparency; everyone else gets WebM. */
function prefersHevc(): boolean {
  if (typeof navigator === 'undefined') return false
  return /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent)
}

export default function HeroMedia() {
  if (heroVideo) {
    const src = prefersHevc() && heroVideo.mov ? heroVideo.mov : heroVideo.webm
    return (
      <div className="hero-media">
        <video
          className="hero-media__video"
          src={src}
          poster={heroVideo.poster}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <figure className="hero-media hero-media--placeholder">
      <span className="hero-media__ball" aria-hidden="true" />
      <figcaption>
        <strong>Plass til video</strong>
        <span className="hero-media__note">Einar kaster ball. Transparent loop kommer.</span>
      </figcaption>
    </figure>
  )
}
