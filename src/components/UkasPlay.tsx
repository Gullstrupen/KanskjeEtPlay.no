import { ukasPlay } from '../content/plays.ts'

export default function UkasPlay() {
  return (
    <section className="ukas" aria-labelledby="ukas-title">
      <div className="ukas__frame">
        <div className="ukas__badge" aria-hidden="true">
          <span className="ukas__badge-week">Uke {ukasPlay.week}</span>
          <span className="ukas__badge-label">Juryens valg</span>
        </div>

        <h2 id="ukas-title" className="ukas__title">
          Ukas play
        </h2>
        <p className="ukas__by">Kåret av Playkommisjonen</p>

        <p className="play-quote play-quote--ukas">
          <span className="caption play-quote__idea">{ukasPlay.idea},</span>{' '}
          <span className="caption play-quote__tail">kanskje et play?</span>
        </p>

        <div className="ukas__citation">
          <h3 className="ukas__citation-title">Juryens begrunnelse</h3>
          <p>{ukasPlay.citation}</p>
        </div>

        <p className="ukas__signature">{ukasPlay.signedBy}</p>
      </div>
    </section>
  )
}
