#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- tmux ---
echo "🔗 Linking tmux config..."
ln -sf "$SCRIPT_DIR/tmux/tmux.conf" "$HOME/.tmux.conf"

# --- pi agent config ---
echo "🔗 Linking pi agent config..."
mkdir -p "$HOME/.pi/agent/extensions"
mkdir -p "$HOME/.pi/agent/skills"

ln -sf "$SCRIPT_DIR/pi/agent/settings.json"  "$HOME/.pi/agent/settings.json"
ln -sf "$SCRIPT_DIR/pi/agent/presets.json"    "$HOME/.pi/agent/presets.json"
ln -sf "$SCRIPT_DIR/pi/agent/keybindings.json" "$HOME/.pi/agent/keybindings.json"

# Extensions (real files so pi can import them)
for f in "$SCRIPT_DIR"/pi/agent/extensions/*.ts; do
  ln -sf "$f" "$HOME/.pi/agent/extensions/$(basename "$f")"
done

echo ""
echo "✅ Done. Configs linked into ~/"
echo "   tmux  → ~/.tmux.conf"
echo "   pi    → ~/.pi/agent/"
echo ""
echo "⚠️  Skills are NOT included in this repo (they're installed via pi)."
echo "   Install them separately on the new machine."
