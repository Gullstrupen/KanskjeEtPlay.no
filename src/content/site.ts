/**
 * Site-wide settings.
 */

/**
 * Einar's round photo, used as the tap-to-listen record in Dagens play.
 * Path from /public. Use a square image with transparent corners, with the
 * face centred (it spins). The yellow ring is added by CSS.
 */
export const einarAvatar = '/media/Bilder/einar-round.webp'

export type HeroVideo = {
  /** VP9 WebM with alpha channel (Chrome, Edge, Firefox). Path from /public. */
  webm: string
  /** HEVC .mov with alpha channel (Safari, iPhone). Path from /public. */
  mov?: string
  /** Optional still frame shown while the video loads. */
  poster?: string
}

/**
 * The transparent looping cutout of Einar tossing a ball.
 * Leave as null to show the placeholder. When the files are in public/media/, use:
 *
 * export const heroVideo: HeroVideo | null = {
 *   webm: '/media/einar-ball.webm',
 *   mov: '/media/einar-ball.mov',
 *   poster: '/media/einar-ball-poster.png',
 * }
 */
export const heroVideo: HeroVideo | null = null

/**
 * The form service is not connected yet, so the form stays disabled.
 * When it is, set this to the endpoint URL (for example from Formspree or
 * Web3Forms) and check the request body in src/lib/submitPlay.ts.
 */
export const submissionEndpoint: string | null = null
