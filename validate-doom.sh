#!/usr/bin/env bash
# Validation script for DOOM integration
# This script checks that all required components are in place

set -e

echo "========================================="
echo "DOOM Integration Validation"
echo "========================================="
echo ""

# Check Docker
echo "✓ Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "✗ Docker is not installed"
    exit 1
fi
echo "  Docker version: $(docker --version)"

# Check Docker Compose
echo "✓ Checking Docker Compose..."
if docker compose version &> /dev/null; then
    echo "  Docker Compose version: $(docker compose version)"
elif docker-compose --version &> /dev/null; then
    echo "  Docker Compose version: $(docker-compose --version)"
else
    echo "✗ Docker Compose is not installed"
    exit 1
fi

# Check required files
echo "✓ Checking required files..."
required_files=(
    "docker-compose.yml"
    "public/games/doom/Dockerfile.build"
    "public/games/doom/index.html"
    "public/games/doom/README.txt"
    "public/games/doom/LICENSE.txt"
    "public/games/doom/run_restful_doom.sh"
    "public/games/doom/wads/.gitkeep"
    "DOOM-SETUP.md"
    ".gitignore"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (missing)"
        exit 1
    fi
done

# Check wads directory
echo "✓ Checking wads directory..."
if [ -d "public/games/doom/wads" ]; then
    echo "  ✓ wads directory exists"
    wad_count=$(find public/games/doom/wads -name "*.wad" 2>/dev/null | wc -l)
    if [ "$wad_count" -eq 0 ]; then
        echo "  ⚠ No WAD files found (you'll need to download FreeDoom)"
        echo "    Download from: https://freedoom.github.io/download.html"
    else
        echo "  ✓ Found $wad_count WAD file(s)"
        find public/games/doom/wads -name "*.wad" -exec basename {} \;
    fi
else
    echo "  ✗ wads directory missing"
    exit 1
fi

# Check Python for static server
echo "✓ Checking Python installation..."
if command -v python3 &> /dev/null; then
    echo "  Python version: $(python3 --version)"
else
    echo "  ⚠ Python3 not found (needed for static file server)"
fi

echo ""
echo "========================================="
echo "Validation Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Download FreeDoom WAD files (if not already done)"
echo "2. Place WAD files in public/games/doom/wads/"
echo "3. Run: docker compose up"
echo "4. In another terminal: python3 -m http.server --directory public 8000"
echo "5. Open: http://localhost:8000/games/doom/"
echo ""
echo "See DOOM-SETUP.md for detailed instructions."
