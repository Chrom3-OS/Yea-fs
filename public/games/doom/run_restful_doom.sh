#!/usr/bin/env bash
set -euo pipefail

WAD_DIR="$(pwd)/wads"
WAD_PATH="${WAD_DIR}/freedoom.wad"

if [ ! -f "$WAD_PATH" ]; then
  echo "Missing WAD: $WAD_PATH"
  echo "Please download FreeDoom (e.g., freedoom.wad) and place it in: $WAD_PATH"
  exit 2
fi

# Build image (if not already built)
IMAGE_NAME="restful-doom-build"
docker build -f "$(dirname "$0")/Dockerfile.build" -t "$IMAGE_NAME" ..

# Run container and pass WAD directory as a volume. The upstream build usually produces src/restful-doom
docker run --rm -v "$WAD_DIR":/wads -p 6666:6666 "$IMAGE_NAME" /opt/restful-doom/src/restful-doom -iwad /wads/freedoom.wad -apiport 6666
