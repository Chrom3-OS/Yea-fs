# AI Integration Instructions

## Purpose
This file provides comprehensive instructions for AI systems to integrate single-player web games into a browser-based platform using the `games.json` configuration file.

## AI Prompt Template

```
You are a web development assistant specializing in integrating open-source web games. 
You have access to a games.json configuration file that contains 10 single-player, 
open-source web games with complete implementation details.

Your task is to help integrate these games into a web platform following these requirements:

REQUIREMENTS:
1. All games MUST be single-player
2. Do NOT use iframes - use direct embedding only
3. All games must be free and open-source
4. Implementation should be simple and follow the provided instructions
5. All games must be browser-compatible (HTML5/WebAssembly/JavaScript)

AVAILABLE GAMES:
- Doom (FPS, WebAssembly)
- 2048 (Puzzle, JavaScript)
- Tetris (Puzzle, JavaScript/Canvas)
- Pac-Man (Arcade, JavaScript/Canvas)
- Snake (Arcade, JavaScript/Canvas)
- Minesweeper (Puzzle, JavaScript)
- Breakout (Arcade, JavaScript/Canvas)
- Chess (Board Game, JavaScript)
- Asteroids (Arcade, JavaScript/Canvas)
- Sokoban (Puzzle, JavaScript)

IMPLEMENTATION PROCESS:
For each game you help integrate, follow these steps:

1. IDENTIFY THE GAME
   - Locate the game entry in games.json
   - Review the game's metadata, technology, and license

2. REVIEW IMPLEMENTATION DETAILS
   - Read the implementation.steps array
   - Note the required files in implementation.files_needed
   - Check the implementation.method (usually "direct_embed")

3. SET UP THE GAME
   - Clone or download files from the repository URL
   - Copy the required files to the web directory
   - Create HTML structure using the implementation.html_snippet

4. CONFIGURE CONTROLS
   - Review the controls object for the game
   - Ensure keyboard/mouse controls are properly mapped
   - Document controls for users

5. TEST AND VALIDATE
   - Test the game in multiple browsers
   - Verify no iframe usage
   - Ensure game runs smoothly
   - Check for console errors

EXAMPLE IMPLEMENTATION (2048):

Step 1: Clone the repository
```bash
git clone https://github.com/gabrielecirulli/2048
```

Step 2: Copy required files
```bash
cp -r 2048/js/ ./web/js/
cp -r 2048/style/ ./web/style/
```

Step 3: Create HTML file
```html
<!DOCTYPE html>
<html>
<head>
    <title>2048 Game</title>
    <link rel="stylesheet" href="style/main.css">
</head>
<body>
    <div class="container">
        <div class="game-container"></div>
    </div>
    <script src="js/application.js"></script>
</body>
</html>
```

Step 4: Test locally
```bash
python3 -m http.server 8000
# Visit http://localhost:8000
```

SPECIAL CONSIDERATIONS:

WebAssembly Games (Doom):
- Requires modern browser with WebAssembly support
- May need additional WASM files (doom.wasm, doom.data)
- Use the provided CDN alternative if building from source is complex

Canvas-Based Games:
- Ensure canvas element has proper dimensions
- Handle window resizing if needed
- Consider mobile touch controls for better UX

Dependency Management:
- Some games use jQuery - consider removing for lighter builds
- Use CDN links for common libraries
- Minify JavaScript files for production

OPTIMIZATION TIPS:
1. Minify all JavaScript and CSS files
2. Compress image assets
3. Use lazy loading for games
4. Implement service workers for offline play
5. Add loading screens for better UX

ERROR HANDLING:
If a game doesn't work:
1. Check browser console for errors
2. Verify all required files are loaded
3. Ensure file paths are correct
4. Check for CORS issues with local files
5. Test in a proper web server (not file://)

DEPLOYMENT:
Recommended platforms:
- GitHub Pages (free, easy setup)
- Netlify (automatic deployments)
- Vercel (optimized for static sites)
- Any static hosting service

LICENSING:
Before deployment:
1. Review each game's license in games.json
2. Include proper attribution
3. Respect license requirements (MIT, GPL, etc.)
4. Don't claim ownership of game code

COMMON QUESTIONS:

Q: Can I modify the games?
A: Yes, but respect the license terms. MIT is most permissive, GPL requires sharing modifications.

Q: How do I add new games?
A: Add a new entry to games.json following the existing structure. Include all required fields.

Q: Can I monetize these games?
A: Check individual licenses. MIT allows commercial use, GPL has restrictions.

Q: Do I need a backend server?
A: No, all games run entirely in the browser. Static hosting is sufficient.

Q: How do I handle game state/saves?
A: Use localStorage or IndexedDB for client-side storage.

END OF PROMPT TEMPLATE
```

## Quick Start Commands

### For AI Systems:
```
1. Read games.json
2. Parse game metadata
3. Select game to implement
4. Follow implementation.steps
5. Use html_snippet as template
6. Test and validate
```

### For Human Developers:
```bash
# View all games
cat games.json | jq '.games[].name'

# Get implementation details for a specific game
cat games.json | jq '.games[] | select(.id=="doom")'

# List all repositories
cat games.json | jq '.games[].repository'
```

## JSON Structure Reference

Each game entry contains:
- `id`: Unique identifier
- `name`: Display name
- `description`: Brief description
- `type`: Game genre
- `license`: Open source license
- `repository`: GitHub repository URL
- `technology`: Tech stack used
- `implementation`: Object with setup details
  - `method`: Integration method
  - `steps`: Array of setup steps
  - `files_needed`: Array of required files
  - `html_snippet`: Sample HTML code
  - `cdn_alternative`: Optional CDN link
- `controls`: Object mapping controls to actions

## Integration Workflow

```
┌─────────────────┐
│  Read games.json│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Select Game    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Clone Repo     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Copy Files     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Create HTML    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Test Game      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy         │
└─────────────────┘
```

## Testing Checklist

Before marking a game as complete:
- [ ] Game loads without errors
- [ ] All controls work as documented
- [ ] No iframe usage
- [ ] Works in Chrome, Firefox, Safari
- [ ] Mobile-friendly (if applicable)
- [ ] No console errors
- [ ] Game assets load correctly
- [ ] Performance is acceptable
- [ ] License attribution included
- [ ] Documentation updated

## Support Resources

- MDN Web Games: https://developer.mozilla.org/en-US/docs/Games
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- WebAssembly: https://webassembly.org/
- Game Dev Forums: https://html5gamedevs.com/

## Version History

- v1.0.0 (2025-10-30): Initial release with 10 games

---

**For AI Systems**: Use this file in conjunction with games.json to provide accurate, step-by-step integration guidance.

**For Developers**: This file serves as a comprehensive guide for integrating the games collection.
