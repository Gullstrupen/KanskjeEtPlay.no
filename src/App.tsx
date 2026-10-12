import Hero from './components/Hero.tsx'
import DagensPlay from './components/DagensPlay.tsx'
import SendInnPlay from './components/SendInnPlay.tsx'
import UkasPlay from './components/UkasPlay.tsx'
import BestillHilsen from './components/BestillHilsen.tsx'
import Footer from './components/Footer.tsx'

/*
 * Homepage sections, top to bottom.
 * Future sections (Dagens challenge, Kanskje en slurk?, Playwear) get their
 * own component in src/components/ and are added here.
 * Order: Hero, Dagens play (with Kommisjonens begrunnelse), Send inn ditt play,
 * Ukas play, Bestill en hilsen, Footer. See CLAUDE.md.
 */
export default function App() {
  return (
    <>
      <main>
        <Hero />
        <DagensPlay />
        <SendInnPlay />
        <UkasPlay />
        <BestillHilsen />
      </main>
      <Footer />
    </>
  )
}
