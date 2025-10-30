
DOOM integration notes — native/server-mode (restful-doom)

This folder is a placeholder for DOOM integrations. There are two main integration approaches:

- Browser (WASM) engine: place a prebuilt `engine.wasm` + `engine.js` + `freedoom.wad` and expose an `index.html` that mounts the engine to a canvas. See `instruction.json` for the expected file layout.

- Native/server (recommended for `restful-doom`): `restful-doom` is a native C program built on Chocolate Doom that exposes an HTTP/JSON API while running the game. It is not a WASM browser engine and runs as a server binary.

This repository includes a helper Docker build that clones and builds `restful-doom` (https://github.com/jeff-1amstudios/restful-doom) and produces a runnable binary.

Files added:
- `Dockerfile.build` — builds `restful-doom` from upstream inside a Debian container and produces `src/restful-doom`.
- `run_restful_doom.sh` — helper script to run the built binary with a WAD file (mounts/paths shown).

Quick Docker build & run (from repo root):

```bash
# build an image that compiles restful-doom
docker build -f public/games/doom/Dockerfile.build -t restful-doom-build .

# create a container and run the binary with a FreeDoom WAD mounted from ./public/games/doom/wads
# (place freedoom.wad at ./public/games/doom/wads/freedoom.wad)
docker run --rm -v "$PWD/public/games/doom/wads":/wads -p 6666:6666 restful-doom-build /wads/freedoom.wad
```

Notes and warnings
- `restful-doom` is a native server program — it is not playable inside a static-only website. Use the Docker approach above to run a host that communicates over HTTP (port 6666 by default).
- Do NOT commit large or proprietary WAD files. Keep WADs out of the git repo; add `public/games/doom/wads/` to `.gitignore` if you plan to run locally and do not want to commit them.
- Building requires network access and development toolchains; the Dockerfile encapsulates these steps to keep your host environment clean.

If you want a browser-playable WASM DOOM engine instead, I can try to integrate a prebuilt Emscripten-based port (e.g., prboom-wasm or chocolate-doom wasm builds) but that is a separate integration with different build steps and licensing considerations.

