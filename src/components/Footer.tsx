export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__lines">
        <span className="caption footer__line footer__line--1">Kanskje et play?</span>
        <span className="caption footer__line footer__line--2">Heilt kino det.</span>
        <span className="caption footer__line footer__line--3">Kun for steezy fuckers</span>
      </p>
      <p className="footer__small">© {new Date().getFullYear()} kanskjeetplay.no</p>
    </footer>
  )
}
