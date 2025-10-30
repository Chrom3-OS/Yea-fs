# README — Games (Yea-fs)

This repository hosts a small static collection of singleplayer web games under `public/games/`.

Quick run (local):

```bash
python3 -m http.server --directory public 8000
# open http://localhost:8000/games/
```

Included demos
- `2048` — sliding-tile puzzle (minimal JS implementation)
- `tetris` — canvas Tetris demo
- `snake` — canvas Snake demo
- `doom` — Docker-based restful-doom integration. See below for setup instructions.

Rules and constraints
- No iframes — games must mount to a canvas or DOM root.
- Only FOSS/free assets may be included. DO NOT bundle proprietary WADs. See `instruction.json` for details.

Adding a new game
- Create `/public/games/<name>/` and include the files listed in `instruction.json` for that game (index.html, script, style.css, LICENSE.txt, assets).
- Add a short description to `public/games/index.html`.

DOOM Setup (Docker Required)
The DOOM integration uses restful-doom, which requires Docker:

1. Download FreeDoom WAD files from https://freedoom.github.io/download.html
2. Place WAD file(s) in `public/games/doom/wads/`
3. From repository root, run: `docker compose up`
4. Open http://localhost:8000/games/doom/ in your browser
5. The DOOM API runs on http://localhost:6666

For detailed instructions, see `DOOM-SETUP.md` and `public/games/doom/README.txt`

Serving WASM
- If you add `.wasm` files, ensure the host serves them with MIME `application/wasm`. Locally, the Python server usually works; some static hosts require extra config.

License
- Each game includes a local `LICENSE.txt`. Verify and keep provenance when importing third-party demos.
