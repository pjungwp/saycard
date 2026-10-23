# SayCard

Dictate flashcards by voice and send them to Anki. A static PWA: no build step, no server, no accounts.

## Deploy (same as your other Netlify sites)
1. Create a GitHub repo (e.g. `saycard`) and push these files to `main`.
2. In Netlify: Add new site → Import from GitHub → pick the repo. Publish directory: `/` (root). No build command.
3. Open the site on your phone and Add to Home Screen.

On every update, change `VERSION` in `sw.js` so installed copies refresh.

## Getting cards into Anki
- **Download file for Anki** (any device): Anki desktop → File → Import → choose the .txt. Deck, note type and tags are set by the file. AnkiWeb sync then carries the cards to your phone.
- **Add to Anki on this computer**: install the AnkiConnect add-on (code 2055492159) in Anki desktop, keep Anki open, click the button, and approve the permission dialog in Anki the first time.
- **iPhone (AnkiMobile)**: the AnkiMobile button on each card opens AnkiMobile with the card filled in.
- **Android (AnkiDroid)**: Share on a card → AnkiDroid.

If your Anki note types aren't called "Basic" and "Cloze" (e.g. another language), change the names in Settings.

## Voice
Uses the browser's built-in speech recognition (Chrome, Edge, Safari). Firefox has none: use the keyboard's mic key instead.
Speech is processed by the browser vendor's service (Google or Apple). Don't dictate patient information.

Commands: "flip card" / "switch sides" / "go to back" / "go to front" ("flip" on its own), "save card", "scratch that", "clear card", "blank … end blank" (cloze), "add tag …",
"comma / full stop / question mark / colon / new line" ("period" stays a word).
Commands are removed from the text before it reaches the card. The Flip Card button, the voice commands and the F key all use one flipCard() function.

Keyboard (when not typing in a box): F flip · S save · M start/pause dictation.

## Branches
- `preview`: test changes here first (Netlify branch deploy).
- `main`: the live site; updated only on request.
