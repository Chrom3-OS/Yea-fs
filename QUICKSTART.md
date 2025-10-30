# Quick Start Guide

Get started with Yea-fs web games in 3 easy steps!

## Option 1: View the Collection (Fastest)

1. Open `index.html` in your browser
2. Browse all 10 available games
3. Click any game card to see implementation details
4. Click "View Repository" to get the source code

## Option 2: Integrate a Game

### Example: Adding 2048 to Your Website

**Step 1:** Clone the game repository
```bash
git clone https://github.com/gabrielecirulli/2048
```

**Step 2:** Copy required files to your project
```bash
cp -r 2048/js/ ./your-project/js/
cp -r 2048/style/ ./your-project/style/
```

**Step 3:** Create an HTML file
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

**Step 4:** Test locally
```bash
cd your-project
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

That's it! 🎉

## Option 3: Use AI to Help

Send this prompt along with `games.json` to any AI assistant:

```
I have a games.json file with 10 single-player web games. 
Please help me integrate [GAME_NAME] into my website. 
Follow the implementation steps in the JSON file and ensure:
- No iframes are used
- The game works in modern browsers
- All required files are included
```

## Common Commands

**Note:** These commands use `jq` (JSON processor). Install it with:
- Ubuntu/Debian: `sudo apt-get install jq`
- macOS: `brew install jq`
- Windows: Download from [stedolan.github.io/jq](https://stedolan.github.io/jq/)

### View all games in JSON
```bash
cat games.json | jq '.games[].name'
```

### Get implementation details for specific game
```bash
cat games.json | jq '.games[] | select(.id=="doom")'
```

### List all repositories
```bash
cat games.json | jq -r '.games[].repository'
```

### Check game licenses
```bash
cat games.json | jq '.games[] | {name, license}'
```

## File Overview

| File | Purpose |
|------|---------|
| `games.json` | Main configuration with all game data |
| `index.html` | Interactive showcase page |
| `README.md` | Complete documentation |
| `AI_INSTRUCTIONS.md` | AI integration guide |
| `QUICKSTART.md` | This file! |

## Next Steps

1. ✅ Browse games in `index.html`
2. ✅ Read `README.md` for detailed docs
3. ✅ Choose a game from `games.json`
4. ✅ Follow implementation steps
5. ✅ Deploy your game site!

## Need Help?

- Check `README.md` for detailed instructions
- Review `AI_INSTRUCTIONS.md` for AI integration
- Refer to individual game repositories for specific issues
- All games are thoroughly documented in `games.json`

## Tips

💡 **Start Simple**: Begin with games like Snake or 2048 - they have minimal dependencies  
💡 **Test Locally**: Use `python3 -m http.server 8000` or `npx http-server` to test  
💡 **Check Licenses**: Review license requirements in games.json before deploying  
💡 **Mobile Support**: Add touch event listeners to keyboard controls for mobile compatibility  
💡 **Performance**: Minify files using tools like `terser` (JS) and `cssnano` (CSS) for production  

---

Happy gaming! 🎮
