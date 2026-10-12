# kanskjeetplay.no

Norwegian entertainment site for the comedy concept **«Kanskje et play?»**: everyday
ideas that sound ridiculous are presented as possibly brilliant life hacks
("Bestille foodora til flyplassen, kanskje et play?"). Audience: Norwegian, young,
short-form-video native. Language on the site is Norwegian (bokmål with dialect
and slang where it's part of the joke). Keep the jokes and the swearing as written.

## Isolation rules (important)

- Work only inside this directory. This project is completely separate from the
  Glimmer project. Never read, modify, copy from or reference Glimmer files.
- Preserve any Git repository here. Do not create commits, push, or deploy unless
  the owner explicitly asks.
- Never put secrets (form-service keys etc.) in source files; use `.env.local`.

## Stack

- Vite + React + TypeScript, plain CSS. No UI framework, no CSS framework.
- Add a dependency only when it's genuinely necessary.
- Commands: `npm run dev`, `npm run build` (type-check + build), `npm run preview`.

## Where things live

- `src/content/plays.ts`: Dagens play and Ukas play text. Write only the idea; the
  site appends ", kanskje et play?". Each Dagens play has an `id` (change it with
  the play so visitors can vote again) and lists of Playkommisjonen replies.
- `src/content/site.ts`: hero video config (`heroVideo`) and the future form
  endpoint (`submissionEndpoint`).
- `public/media/`: the transparent looping cutout video of Einar tossing a ball
  (WebM VP9 alpha + HEVC .mov alpha for Safari). See `public/media/README.md`.
- `src/components/`: one component per homepage section.
- `src/lib/submitPlay.ts`: the (inactive) client call to the future form service.
- `src/components/AudioAvatar.tsx`: reusable round photo that plays audio on tap
  and spins like a record while playing. Used for Einar in Dagens play.
- `src/content/site.ts` → `einarAvatar`: path to Einar's round photo
  (`public/media/Bilder/einar-round.webp`, cropped from `EinarHode.PNG`).
- `src/content/plays.ts` → `dagensPlay.audio`: path to today's spoken verdict
  (`public/media/Audio filer/…`). Paths may contain spaces; they are URL-encoded.
- `src/content/hilsen.ts`: «Bestill en hilsen» occasions and the future booking URL.
- `src/index.css`: design tokens at the top, then one block per section in page order.

## Design principles

- Warm cream paper (`--paper`) with floating black rounded caption boxes and white
  serif type, like text overlays on Reels/TikTok. The `.caption` class is the core
  building block; reuse it instead of inventing new box styles.
- Type: Libre Caslon Display (big captions, headings) and Libre Caslon Text (body,
  italics). No sans-serif, no monospace.
- One accent only: tennis-ball yellow `--ball`, reserved for the visitor's own
  choice (selected vote), badges and focus. Don't spread it around.
- Asymmetric and playful: slight rotations and offsets, never a centred SaaS grid.
- No gradients as decoration, no card grids, no stock-startup layouts, no clutter.
- Mobile-first. Check at 390px wide before anything else; no horizontal scroll.
- Motion: the hero caption pop-in is the single orchestrated moment. Other motion
  only responds to user actions. Respect `prefers-reduced-motion`.
- Dagens play is the main attraction: the chalk sheet with the heavy black edge
  and hard shadow is reserved for it. Nothing else on the page should compete.
  Ukas play stays quieter (smaller type, framed award card, yellow badge).
- Voice: «Playkommisjonen» is the mock-official body that rules on plays.
- Einar's record: a yellow (`--ball`) ring with a thin black edge and hard shadow,
  no visible player controls beyond the small play/pause badge. It only spins
  while audio plays, and doesn't spin with reduced motion.
- Honesty in the UI: never fake data, vote counts, percentages or success states.
  Demo behaviour is labelled as demo. Voting is one vote per tab session
  (sessionStorage), never sent or counted. The submission form stays disabled
  until a form service is connected, and only says «Sendt» after a real OK.

## Planned sections (not built yet)

Each becomes its own component in `src/components/`, gets added in `src/App.tsx`,
and gets its own block in `src/index.css`:

- **Dagens challenge**: a daily challenge.
- **Kanskje en slurk?**: a party game.
- **Playwear**: T-shirts with funny play statements.

## Not done yet

- Real vote storage for Dagens play.
- Form service for «Send inn ditt play»: set `submissionEndpoint` in
  `src/content/site.ts` and match the request body in `src/lib/submitPlay.ts` to
  the chosen service. The form already has field names, a honeypot spam field,
  and sending/sent/error states.
- Hero cutout video.
- Bookings for «Bestill en hilsen» (set `hilsenBookingUrl` in `src/content/hilsen.ts`).
- Deployment.
