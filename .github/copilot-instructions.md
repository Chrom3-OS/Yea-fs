## Copilot instructions for Yea-fs (Games integration)

Purpose
- This repository hosts small, self-contained, singleplayer web games under `public/games/`.
- Key enforcement: no iframes, singleplayer-only, and only FOSS/free assets (see `instruction.json` for constraints).

Big picture (what to change/where)
- Static-first site: the canonical output is static files under `/public/games/<game>/` and a launcher at `/public/games/index.html`.
 - DOOM integration: preferred is a WASM engine + FreeDoom WAD(s) placed under `/public/games/doom/` (see `instruction.json` "init_example").
   - Alternative (native/server): this repo also supports a native/server-mode integration using `restful-doom` (https://github.com/jeff-1amstudios/restful-doom). A reproducible Docker-based build is provided at `public/games/doom/Dockerfile.build` and a run helper at `public/games/doom/run_restful_doom.sh` — this produces a native binary that exposes an HTTP API (port 6666 by default). Note: native/server mode is not browser-WASM; it runs as a host process.
- Other games (2048, Tetris, Snake, Phaser demos, TIC-80) follow the same pattern: add game files + `LICENSE.txt` and ensure an entry page that mounts a canvas or an element with id `game-root`.

Repository-specific rules and patterns
- Every game folder MUST contain a `LICENSE.txt` file describing provenance.
- Required files per-game are listed inside `instruction.json` under `games[].integration.required_files` — follow that exact layout when adding files.
- DO NOT add proprietary WADs or copyrighted game assets. If a user-provided WAD is required, add clear instructions not to commit it and show how to place it in `/public/games/doom/`.
- WASM files must be served with correct MIME (application/wasm). If adding a small server helper, put it in `/scripts/serve-wasm.js` or document how to configure the host.

Developer workflows (concrete commands)
- Quick static serve for manual testing:
  - Python: `python3 -m http.server --directory public 8000` (serves `/public` at http://localhost:8000)
  - Node (optional): add a tiny `serve` script that sets proper MIME for `.wasm` if needed.
- Build/compile guidance for DOOM WASM (when required): prefer prebuilt `engine.wasm`; if not available add Emscripten-based build instructions in `instruction.json` and a `Dockerfile.build` that documents exact build steps (see `instruction.json` notes). For native/server `restful-doom` builds use `public/games/doom/Dockerfile.build` (it clones the upstream repo and attempts to compile the binary).
- Smoke tests: repository expects headless checks (puppeteer/playwright) that load each game's index page and assert presence of a canvas or an element with id `game-root`.

Integration examples (copy/paste)
- DOOM engine init (from `instruction.json`):
  - `engine.init({canvas: document.getElementById('doom-canvas'), wad: '/games/doom/freedoom.wad'});`
- 2048 or similar: include `index.html` and `game.js` in `/public/games/2048/`. The game should work when loaded directly (no iframe).

What to look for when modifying or adding files
- Keep changes minimal and static-first: prefer prebuilt JS/WASM + assets in `public/` over adding large build pipelines unless necessary.
- Always add or update `README-games.md` (or `README.md`) with licensing and run instructions when adding a new game.
- Run a quick manual verification: start a static server, open `public/games/index.html`, click a game and ensure a canvas or playable UI appears.

If merging with an existing `.github/copilot-instructions.md`
- Preserve any repository-specific policies already present. Insert or update the sections above where applicable and keep any additional guidelines the repo owner added.

Notes & Assumptions
- This repo currently contains `instruction.json` (detailed spec) and a minimal `read.me`. Use `instruction.json` as the source of truth for game-specific required files and constraints.
- If build steps are added later (Emscripten/Docker), prefer adding a `Dockerfile.build` and clear `build_commands[]` in `instruction.json` so automation agents can run them.

When in doubt, ask the maintainer which WADs/assets are allowed before bundling anything not explicitly listed in `instruction.json`.

---
Please review and tell me if you want more explicit serve/build commands, or if you'd like me to add a sample `public/games/index.html` and a minimal puppeteer smoke test next.
