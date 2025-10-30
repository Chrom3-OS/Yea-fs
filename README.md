# Yea-fs — Games Integration

A minimalist static website hosting playable singleplayer web games.

## Quick Start

### For Most Games (2048, Tetris, Snake)

```bash
# Start a simple HTTP server
python3 -m http.server --directory public 8000

# Open in browser
# http://localhost:8000/games/
```

### For DOOM (Docker Required)

DOOM requires additional setup with Docker. See **[DOOM-SETUP.md](DOOM-SETUP.md)** for detailed instructions.

**Quick setup:**
1. Download FreeDoom from https://freedoom.github.io/download.html
2. Place WAD file in `public/games/doom/wads/`
3. Run `docker compose up`
4. Start static server (see above)
5. Open http://localhost:8000/games/doom/

## What's Included

- **2048** — Classic sliding-tile puzzle game
- **Tetris** — Canvas-based Tetris with keyboard controls
- **Snake** — Classic snake game with arrow key controls
- **DOOM** — Docker-based restful-doom integration with HTTP API

## Repository Structure

```
.
├── public/
│   └── games/
│       ├── index.html          # Game launcher page
│       ├── 2048/               # 2048 game files
│       ├── tetris/             # Tetris game files
│       ├── snake/              # Snake game files
│       └── doom/               # DOOM integration (Docker)
│           ├── Dockerfile.build
│           ├── docker-compose.yml
│           ├── index.html
│           ├── README.txt
│           ├── LICENSE.txt
│           └── wads/           # Place WAD files here
├── docker-compose.yml          # Docker Compose for DOOM
├── DOOM-SETUP.md               # Detailed DOOM setup guide
├── README-games.md             # Game documentation
├── instruction.json            # Project specifications
└── validate-doom.sh            # DOOM validation script
```

## Key Features

- **Static-first**: All games are self-contained static files
- **No iframes**: Games integrate directly via canvas/DOM
- **Singleplayer only**: All games configured for solo play
- **FOSS/Free assets**: Only open source code and free assets
- **Docker integration**: Easy DOOM setup with Docker

## Development

### Adding a New Game

1. Create `/public/games/<name>/` directory
2. Add required files: `index.html`, game scripts, styles, `LICENSE.txt`
3. Ensure game mounts to canvas or element with id `game-root`
4. Update `/public/games/index.html` to include the new game
5. Document in `README-games.md`

See `instruction.json` for detailed requirements per game type.

### Testing

```bash
# Validate DOOM integration
./validate-doom.sh

# Manual testing
python3 -m http.server --directory public 8000
# Open http://localhost:8000/games/ and test each game
```

## Documentation

- **[README-games.md](README-games.md)** — Game-specific documentation and usage
- **[DOOM-SETUP.md](DOOM-SETUP.md)** — Complete DOOM setup guide
- **[instruction.json](instruction.json)** — Technical specifications and requirements
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — AI agent guidelines

## Requirements

### For Basic Games (2048, Tetris, Snake)
- Python 3 (for static HTTP server)
- Modern web browser

### For DOOM
- Docker and Docker Compose
- Python 3 (for static HTTP server)
- FreeDoom WAD files (download separately)

## License

Each game includes its own `LICENSE.txt` file with attribution and licensing information.

- **2048**: MIT-like license
- **Tetris**: MIT-like license  
- **Snake**: MIT-like license
- **DOOM**: GPL v2.0 (Chocolate Doom/restful-doom) + BSD (FreeDoom assets)

See individual game directories for complete license information.

## Important Notes

- **WAD files are NOT included**: You must download FreeDoom separately
- **No commercial WADs**: Only use FreeDoom or other FOSS WADs
- **Gitignored assets**: WAD files are automatically excluded from git
- **Docker-based DOOM**: DOOM runs as a server, not browser WASM

## Resources

- [FreeDoom Project](https://freedoom.github.io/)
- [restful-doom](https://github.com/jeff-1amstudios/restful-doom)
- [Chocolate Doom](https://github.com/chocolate-doom/chocolate-doom)

## Support

For issues or questions:
1. Check the relevant README file for the game
2. Run `./validate-doom.sh` for DOOM issues
3. Verify Docker and Python are properly installed
4. Review `instruction.json` for technical specifications

---

**Static website • Singleplayer games • Open source • No iframes**
