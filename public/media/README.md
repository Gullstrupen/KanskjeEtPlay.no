# Media

## Einar's record and Dagens play audio

- `Bilder/EinarHode.PNG`: original photo (kept as-is).
- `Bilder/einar-round.webp`: the version the site uses. Cropped to the circle,
  centred so it spins without wobbling, green ring removed (the yellow ring is CSS).
  To swap: save a new square image with transparent corners and the face centred,
  then point `einarAvatar` in `src/content/site.ts` at it.
- `Audio filer/BestilleFoodoratilFlyplassen.m4a`: today's spoken verdict.
  To swap: drop in a new .m4a or .mp3 and set `audio` in `src/content/plays.ts`.

## Hero video

Put the hero cutout video here, then point `heroVideo` in `src/content/site.ts` at it.

Recommended files (transparent background, looping, no audio):

- `einar-ball.webm`: VP9 with alpha. Works in Chrome, Edge, Firefox.
- `einar-ball.mov`: HEVC with alpha. Needed for Safari and iPhone.
- `einar-ball-poster.png`: optional transparent still frame shown while loading.

Keep each file under ~3 MB and the clip short (2–4 seconds) so it loops smoothly on mobile.
