import { submissionEndpoint } from '../content/site.ts'

/** What a visitor sends in. Field names match the form's `name` attributes. */
export type PlaySubmission = {
  idea: string
  /** null when the visitor sends anonymously or leaves the name empty */
  name: string | null
  anonymous: boolean
}

export const isSubmissionConnected = submissionEndpoint !== null

/**
 * Sends a play to the form service.
 *
 * Not active yet: `submissionEndpoint` in src/content/site.ts is null, so the
 * form never calls this. When a service is chosen (Formspree, Web3Forms, etc.),
 * set the endpoint, adjust the body to what that service expects, and keep
 * the rule: only resolve when the service answers OK.
 */
export async function submitPlay(submission: PlaySubmission): Promise<void> {
  if (!submissionEndpoint) {
    throw new Error('Innsending er ikke koblet til ennå.')
  }

  const response = await fetch(submissionEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(submission),
  })

  if (!response.ok) {
    throw new Error(`Skjematjenesten svarte ${response.status}.`)
  }
}
