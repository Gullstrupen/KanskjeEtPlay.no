import HeroMedia from './HeroMedia.tsx'

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__text">
        <h1 className="hero__title" aria-label="Kanskje et play?">
          <span className="caption hero__word hero__word--kanskje" aria-hidden="true">
            Kanskje
          </span>
          <span className="caption hero__word hero__word--et" aria-hidden="true">
            et
          </span>
          <span className="caption hero__word hero__word--play" aria-hidden="true">
            play?
          </span>
        </h1>
        <p className="hero__sub">
          <span className="caption caption--small">
            Hvis du lesa detta, så er du en early fucker.
          </span>
        </p>
      </div>
      <HeroMedia />
    </header>
  )
}
