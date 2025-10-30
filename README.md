# Yea-fs: Free Single-Player Web Games Collection

A curated collection of free, open-source, single-player web games that can be easily integrated into any website without using iframes.

## 🎮 Features

- **10 Classic Games**: Including Doom, Tetris, Pac-Man, 2048, Snake, and more
- **No iframes**: Direct embedding for better performance and control
- **Open Source**: All games are free and open-source
- **Single-Player**: Perfect for personal gaming experiences
- **Easy Setup**: Comprehensive implementation instructions included
- **AI-Ready**: Structured JSON configuration for AI integration

## 📋 Games Included

1. **Doom** - Classic FPS compiled to WebAssembly
2. **2048** - Popular sliding tile puzzle
3. **Tetris** - Classic falling block puzzle
4. **Pac-Man** - Iconic arcade maze game
5. **Snake** - Timeless snake game
6. **Minesweeper** - Strategic puzzle game
7. **Breakout** - Brick-breaking arcade game
8. **Chess** - Classic chess with AI opponent
9. **Asteroids** - Space shooter arcade game
10. **Sokoban** - Box-pushing puzzle game

## 🚀 Quick Start

### 1. Review the Configuration

The `games.json` file contains all game metadata, implementation instructions, and AI prompts:

```bash
cat games.json
```

### 2. Choose a Game

Each game entry in `games.json` includes:
- Repository URL
- Implementation steps
- Required files
- HTML snippets
- Control schemes

### 3. Basic Implementation

Example for implementing 2048:

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

### 4. For Doom (WebAssembly)

```html
<!DOCTYPE html>
<html>
<head>
    <title>Doom</title>
</head>
<body>
    <canvas id="doomCanvas" width="800" height="600"></canvas>
    <script src="doom.js"></script>
</body>
</html>
```

## 📦 Project Structure

```
Yea-fs/
├── games.json          # Main configuration file with all game details
├── README.md           # This file
└── read.me            # Original project notes
```

## 🤖 AI Integration

The `games.json` file is structured for AI integration and includes:

- **AI Prompt**: Pre-written instructions for AI systems
- **Requirements**: Clear guidelines for game integration
- **Implementation Steps**: Detailed setup instructions for each game
- **Deployment Notes**: Best practices and optimization tips

### Using with AI

Send the `games.json` file to an AI with this prompt:

> "Use the games.json configuration to help me integrate these single-player web games into my website. Follow the implementation instructions for each game and ensure no iframes are used. All games must be single-player and open-source."

## 🛠️ Implementation Guide

### General Steps

1. **Clone the game repository** from the provided GitHub URL
2. **Copy required files** listed in the `files_needed` array
3. **Create HTML structure** using the provided `html_snippet`
4. **Link CSS and JavaScript** files in your HTML
5. **Test the game** in a local web server

### Testing Locally

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📝 Game Technologies

- **JavaScript/Canvas**: Most arcade and puzzle games
- **WebAssembly**: Doom (for better performance)
- **HTML5**: All games are HTML5-compatible
- **No Flash**: All games use modern web technologies

## 🎯 Use Cases

- Personal gaming website
- Educational projects
- Retro gaming portal
- Game development learning
- Browser-based arcade

## 📖 Detailed Implementation

Each game in `games.json` contains:

```json
{
  "id": "game-id",
  "name": "Game Name",
  "description": "Game description",
  "type": "genre",
  "license": "License type",
  "repository": "GitHub URL",
  "technology": "Tech stack",
  "implementation": {
    "method": "direct_embed",
    "steps": ["Step 1", "Step 2", ...],
    "files_needed": ["file1.js", "file2.css", ...],
    "html_snippet": "HTML code"
  },
  "controls": {
    "key": "Action description"
  }
}
```

## 🔧 Customization

You can customize games by:

1. **Styling**: Modify CSS files to match your website theme
2. **Controls**: Remap keyboard controls in JavaScript
3. **Difficulty**: Adjust game parameters (speed, levels, etc.)
4. **Assets**: Replace graphics and sounds (respect licenses)

## 📄 License Information

All games are open-source with various licenses:
- **MIT**: Most permissive, allows commercial use
- **GPL**: Requires derivative works to be open-source
- **Check individual repositories** for specific license terms

## 🌐 Browser Compatibility

All games work on modern browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (limited support, WebAssembly not supported)

## 🚧 Deployment

### GitHub Pages

```bash
# Push your game files to a gh-pages branch
git checkout -b gh-pages
git add .
git commit -m "Deploy games"
git push origin gh-pages
```

### Netlify/Vercel

Simply connect your repository and deploy. Both platforms support static sites out of the box.

## 🤝 Contributing

To add more games to this collection:

1. Ensure the game is **single-player**
2. Verify it's **open-source** and **free**
3. Confirm it works **without iframes**
4. Add game details to `games.json`
5. Update this README

## 📚 Resources

- [MDN Web Games](https://developer.mozilla.org/en-US/docs/Games)
- [HTML5 Game Development](https://html5gamedevs.com/)
- [WebAssembly Documentation](https://webassembly.org/)
- [Canvas API Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

## ⚠️ Important Notes

1. **Respect Licenses**: Always check and comply with game licenses
2. **Test Thoroughly**: Test games across different browsers
3. **Asset Hosting**: Host game assets on your own server or CDN
4. **Performance**: Optimize for mobile devices if needed
5. **Accessibility**: Consider adding keyboard alternatives for better accessibility

## 🎓 Learning Resources

These games are great for learning:
- JavaScript game development
- Canvas API
- WebAssembly basics
- Game physics
- Collision detection
- State management

## 📞 Support

For issues with specific games, refer to their original repositories listed in `games.json`.

For issues with this collection, please open an issue on this repository.

## 🎉 Get Started

1. Clone this repository
2. Open `games.json` to explore available games
3. Choose a game and follow the implementation steps
4. Start playing!

---

**Happy Gaming! 🎮**
