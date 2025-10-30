DOOM Integration — Native/Server Mode (restful-doom)
=====================================================

This folder contains a complete Docker-based integration of restful-doom for local play.

What is restful-doom?
--------------------
restful-doom is a fork of Chocolate Doom that exposes an HTTP/JSON API, allowing you to 
control the game programmatically. It runs as a native server binary (not browser WASM).

Project: https://github.com/jeff-1amstudios/restful-doom


QUICK START (Easiest Way)
=========================

1. Download FreeDoom WAD files:
   Visit: https://freedoom.github.io/download.html
   Download either freedoom1.wad or freedoom2.wad (or both)

2. Place WAD files:
   Copy the downloaded .wad file(s) to: public/games/doom/wads/

3. Start the server:
   From the repository root, run:
   
   docker-compose up

4. Open the game interface:
   Navigate to: http://localhost:8000/games/doom/
   (Requires a static file server running on port 8000)

5. The DOOM API will be available at:
   http://localhost:6666


ALTERNATIVE METHODS
===================

Method 1: Using the helper script
----------------------------------
cd public/games/doom
./run_restful_doom.sh

Method 2: Manual Docker commands
---------------------------------
# From repository root:

# Build the image
docker build -f public/games/doom/Dockerfile.build -t restful-doom-build .

# Run the container
docker run --rm \
  -v "$PWD/public/games/doom/wads":/wads \
  -p 6666:6666 \
  restful-doom-build \
  bash -c "WAD=\$(ls /wads/freedoom*.wad | head -1) && /opt/restful-doom/src/restful-doom -iwad \$WAD -apiport 6666 -window"


FILES IN THIS DIRECTORY
=======================
- Dockerfile.build      → Docker build configuration for restful-doom
- docker-compose.yml    → Docker Compose configuration (at repository root)
- run_restful_doom.sh   → Shell script helper for running the container
- index.html            → Web interface for interacting with the DOOM API
- LICENSE.txt           → License information for all components
- README.txt            → This file
- wads/                 → Place your WAD files here (gitignored)


API ENDPOINTS
=============
Once running, the restful-doom API exposes endpoints like:
- POST http://localhost:6666/new_game
- POST http://localhost:6666/forward
- POST http://localhost:6666/back
- POST http://localhost:6666/left
- POST http://localhost:6666/right
- POST http://localhost:6666/shoot
- And many more...

See the restful-doom documentation for the complete API reference.


IMPORTANT NOTES
===============
- WAD files are gitignored and must be downloaded separately
- Only use FreeDoom or other open source WADs
- Do NOT use or distribute copyrighted commercial DOOM WADs
- The server runs on port 6666 by default
- This is NOT a browser WASM engine - it's a native server with HTTP API


TROUBLESHOOTING
===============
Problem: "No WAD file found"
Solution: Make sure you downloaded FreeDoom and placed it in public/games/doom/wads/

Problem: Docker build fails
Solution: Ensure you have internet connection and sufficient disk space

Problem: Port 6666 already in use
Solution: Stop other services on port 6666 or modify the port in docker-compose.yml

Problem: Cannot connect to API
Solution: Check that Docker container is running with: docker ps


ALTERNATIVE: WASM Browser Integration
======================================
If you prefer a browser-playable WASM DOOM engine instead, that requires a different 
integration approach with Emscripten-compiled binaries. See instruction.json for details 
about WASM engine integration options.
