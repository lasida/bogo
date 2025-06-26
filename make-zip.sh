#!/bin/bash

PLUGIN_SLUG="bogo"
BUILD_DIR="dist"
ZIP_FILE="${PLUGIN_SLUG}.zip"

# Clean previous build
rm -rf "$BUILD_DIR" "$ZIP_FILE"

# Create build directory
mkdir "$BUILD_DIR"

# Copy all plugin files except those in .distignore
rsync -av --exclude='.git' --exclude-from='.distignore' ./ "$BUILD_DIR/$PLUGIN_SLUG"

# Create zip archive
cd "$BUILD_DIR"
zip -r "../$ZIP_FILE" "$PLUGIN_SLUG"

# Cleanup
# cd ..
# rm -rf "$BUILD_DIR"

echo "Build complete: $ZIP_FILE"