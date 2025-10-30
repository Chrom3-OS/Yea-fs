# DOOM Setup Guide - Quick Start

This guide will help you get DOOM running locally using Docker in the fastest and easiest way possible.

## Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)
- Internet connection to download FreeDoom

## Step-by-Step Setup

### 1. Download FreeDoom

FreeDoom is a free and open source game for the DOOM engine.

1. Visit: https://freedoom.github.io/download.html
2. Download **FreeDoom: Phase 1** (freedoom1.wad) or **FreeDoom: Phase 2** (freedoom2.wad)
   - Phase 1: Based on original DOOM
   - Phase 2: Based on DOOM II
   - You can download both if you want!

### 2. Place the WAD File

1. Navigate to your repository folder
2. Place the downloaded `.wad` file(s) in: `public/games/doom/wads/`

Example:
```
public/games/doom/wads/freedoom1.wad
public/games/doom/wads/freedoom2.wad
```

### 3. Start the Docker Container

From the **repository root directory**, run:

```bash
docker-compose up
```

This will:
- Build the restful-doom Docker image (first time only, takes a few minutes)
- Start the DOOM server on port 6666
- Automatically load your FreeDoom WAD file

### 4. Start the Static File Server

In a **new terminal window**, start a simple HTTP server:

```bash
python3 -m http.server --directory public 8000
```

### 5. Play DOOM!

Open your web browser and navigate to:
```
http://localhost:8000/games/doom/
```

You should see the DOOM interface with instructions and status information.

## Stopping the Server

Press `Ctrl+C` in the terminal where Docker is running, or run:
```bash
docker-compose down
```

## Troubleshooting

### "No WAD file found" error
- Make sure you downloaded FreeDoom and placed it in `public/games/doom/wads/`
- The file should be named `freedoom1.wad` or `freedoom2.wad`

### Docker build fails
- Ensure you have a stable internet connection
- Try running: `docker-compose down` then `docker-compose up --build`

### Port 6666 already in use
- Check what's using the port: `lsof -i :6666` (Mac/Linux) or `netstat -ano | findstr :6666` (Windows)
- Stop that process or change the port in `docker-compose.yml`

### Cannot connect to the game
- Make sure both Docker container AND static file server are running
- Check that the Docker container is running: `docker ps`
- Verify you can access: http://localhost:6666 (should show API response)
- Verify you can access: http://localhost:8000 (should show games list)

## Alternative Setup Methods

### Using the Helper Script

```bash
cd public/games/doom
./run_restful_doom.sh
```

### Manual Docker Commands

```bash
# Build
docker build -f public/games/doom/Dockerfile.build -t restful-doom-build .

# Run
docker run --rm \
  -v "$PWD/public/games/doom/wads":/wads \
  -p 6666:6666 \
  restful-doom-build \
  bash -c "WAD=\$(ls /wads/freedoom*.wad | head -1) && /opt/restful-doom/src/restful-doom -iwad \$WAD -apiport 6666 -window"
```

## What is restful-doom?

restful-doom is a modified version of Chocolate Doom that exposes a RESTful HTTP API. This allows you to control the game programmatically through HTTP requests. The web interface communicates with this API to provide game controls.

**Project:** https://github.com/jeff-1amstudios/restful-doom

## Important Notes

- **DO NOT** commit WAD files to the repository (they're gitignored)
- Only use FreeDoom or other open source WADs
- Commercial DOOM WADs are copyrighted and should not be distributed
- The API runs on port 6666 by default
- This is a server-side implementation, not browser WASM

## For Developers

### API Endpoints

The restful-doom API exposes many endpoints:
- `POST /new_game` - Start a new game
- `POST /forward` - Move forward
- `POST /back` - Move backward  
- `POST /left` - Turn left
- `POST /right` - Turn right
- `POST /shoot` - Fire weapon
- And many more...

Full API documentation: https://github.com/jeff-1amstudios/restful-doom

### Building from Source

The Docker setup automatically builds restful-doom from source. Check `public/games/doom/Dockerfile.build` for build details.

## Need Help?

- Check `public/games/doom/README.txt` for detailed documentation
- Check `README-games.md` for general games information
- Visit the restful-doom repository: https://github.com/jeff-1amstudios/restful-doom
- Visit FreeDoom project: https://freedoom.github.io/
