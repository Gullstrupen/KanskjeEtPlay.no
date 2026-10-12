/**
 * Featured plays. Edit this file to change what the homepage shows.
 *
 * Write only the idea itself. The site adds ", kanskje et play?" for you.
 */

export type DagensPlay = {
  /**
   * Unique id for this play. Change it whenever you change the play, so
   * visitors get to vote again on the new one.
   */
  id: string
  /** The idea, without "kanskje et play?" */
  idea: string
  /**
   * Einar's spoken verdict for this play. Path from /public, spaces are fine.
   * Set to null if there is no audio for this play.
   */
  audio: string | null
  /** Playkommisjonen's own take. Shown under the vote. */
  editorialVerdict: string
  /**
   * Playkommisjonen's replies after a vote. One is picked at random,
   * so add as many as you like. Keep each to one or two sentences.
   */
  replies: {
    yes: string[]
    no: string[]
  }
}

export type UkasPlay = {
  idea: string
  /** ISO week number, shown on the badge. */
  week: number
  /** The jury's mock-solemn reasoning. */
  citation: string
  /** Who signs the citation. */
  signedBy: string
}

export const dagensPlay: DagensPlay = {
  id: 'foodora-flyplassen',
  idea: 'Bestille foodora til flyplassen',
  audio: '/media/Audio filer/BestilleFoodoratilFlyplassen.m4a',
  editorialVerdict:
    'Du møter budet utenfor avgangshallen, spiser i køen til sikkerhetskontrollen og slipper å betale 189 kroner for en tørr baguette ved gaten.',
  replies: {
    yes: [
      'Enstemmig fra kommisjonen. Terminal 2 er bare en adresse som alle andre, og budet har levert til verre steder.',
      'Du har nettopp spart 189 kroner og en tørr baguette. Vi sees i boardingkøen med pizzaeske.',
      'Kommisjonen noterer at du tenker som en vinner. Skriv «ved Narvesen, avgangshallen» i kommentarfeltet.',
    ],
    no: [
      'Notert. Du betaler flyplasspris for flyplassmat, og det er også et valg.',
      'Kommisjonen respekterer det. Noen vil bare ha en vanlig tur til Gardermoen uten logistikk.',
      'Fair. Men kommisjonen har sett køen til flyplassburgeren klokka sju en fredag.',
    ],
  },
}

export const ukasPlay: UkasPlay = {
  idea: 'Gå på visning som første date',
  week: 42,
  citation:
    'Dere får se hverandres smak i kjøkkenfliser, kan krangle om planløsningen uten at det blir personlig, og har en naturlig exit når megleren takker for i dag. Vafler er inkludert.',
  signedBy: 'Einar, leder av Playkommisjonen',
}
