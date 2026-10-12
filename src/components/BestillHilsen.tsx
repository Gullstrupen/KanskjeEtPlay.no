import { hilsenBookingUrl, hilsenIntro, hilsenOccasions } from '../content/hilsen.ts'

export default function BestillHilsen() {
  return (
    <section className="hilsen" aria-labelledby="hilsen-title">
      <h2 id="hilsen-title" className="caption caption--label hilsen__label">
        Bestill en hilsen
      </h2>
      <p className="hilsen__intro">{hilsenIntro}</p>

      <ul className="hilsen__list">
        {hilsenOccasions.map((occasion) => (
          <li key={occasion.title} className="hilsen__item">
            <span className="hilsen__title">{occasion.title}</span>
            <span className="hilsen__note">{occasion.note}</span>
          </li>
        ))}
      </ul>

      <div className="hilsen__actions">
        {hilsenBookingUrl ? (
          <a className="submit-btn hilsen__cta" href={hilsenBookingUrl}>
            Bestill en hilsen
          </a>
        ) : (
          <>
            <button
              type="button"
              className="submit-btn hilsen__cta"
              disabled
              aria-describedby="hilsen-status"
            >
              Bestill en hilsen
            </button>
            <span id="hilsen-status" className="submit-note">
              Bestilling åpner snart. Ingenting blir bestilt eller betalt ennå.
            </span>
          </>
        )}
      </div>
    </section>
  )
}
