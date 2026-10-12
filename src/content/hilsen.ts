/**
 * «Bestill en hilsen»: personal greetings from Einar.
 * Edit the occasions here. Bookings are not open yet; see CLAUDE.md.
 */

export type HilsenOccasion = {
  title: string
  /** One short, funny line about what you get. */
  note: string
}

export const hilsenIntro =
  'Få Einar til å si noe personlig til noen du er glad i. Eller noen du skylder en unnskyldning.'

export const hilsenOccasions: HilsenOccasion[] = [
  {
    title: 'Bursdagshilsen',
    note: 'Han synger. Ikke bra, men med innlevelse.',
  },
  {
    title: 'Unnskyldning på dine vegne',
    note: 'Han beklager, så du slipper.',
  },
  {
    title: 'Peptalk før eksamen',
    note: 'Lese pensum dagen før? Kanskje et play.',
  },
  {
    title: 'Utdrikningslag',
    note: 'Ett skreddersydd play for kvelden. Ansvar fraskrives.',
  },
]

/**
 * Where bookings will go when they open (e-mail link, form or shop URL).
 * While null, the button stays disabled and says bookings aren't open.
 */
export const hilsenBookingUrl: string | null = null
