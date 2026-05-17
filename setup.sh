#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# --- tmux ---
echo "🔗 Linking tmux config..."
ln -sf "$SCRIPT_DIR/tmux/tmux.conf" "$HOME/.tmux.conf"

# --- zsh ---
echo "🔗 Linking zsh configs..."
ln -sf "$SCRIPT_DIR/zsh/zshrc"      "$HOME/.zshrc"
ln -sf "$SCRIPT_DIR/zsh/zshenv"     "$HOME/.zshenv"
ln -sf "$SCRIPT_DIR/zsh/zprofile"   "$HOME/.zprofile"
ln -sf "$SCRIPT_DIR/zsh/profile"    "$HOME/.profile"
ln -sf "$SCRIPT_DIR/zsh/local-bin-env" "$HOME/.local/bin/env"

# Create secrets file if it doesn't exist
if [ ! -f "$HOME/.zshrc.local" ]; then
  cp "$SCRIPT_DIR/zsh/zshrc.local" "$HOME/.zshrc.local"
  echo "📝 Created ~/.zshrc.local — add your API keys there"
fi

# --- pi agent config ---
echo "🔗 Linking pi agent config..."
mkdir -p "$HOME/.pi/agent/extensions"
mkdir -p "$HOME/.pi/agent/skills"

ln -sf "$SCRIPT_DIR/pi/agent/settings.json"  "$HOME/.pi/agent/settings.json"
ln -sf "$SCRIPT_DIR/pi/agent/presets.json"    "$HOME/.pi/agent/presets.json"
ln -sf "$SCRIPT_DIR/pi/agent/keybindings.json" "$HOME/.pi/agent/keybindings.json"

# Extensions
for f in "$SCRIPT_DIR"/pi/agent/extensions/*.ts; do
  ln -sf "$f" "$HOME/.pi/agent/extensions/$(basename "$f")"
done

# Skills
for d in "$SCRIPT_DIR"/pi/agent/skills/*/; do
  skill_name="$(basename "$d")"
  ln -sf "$d" "$HOME/.pi/agent/skills/$skill_name"
done

echo ""
echo "✅ Done. Configs linked into ~/"
echo "   tmux   → ~/.tmux.conf"
echo "   zsh    → ~/.zshrc, ~/.zshenv, ~/.zprofile"
echo "   pi     → ~/.pi/agent/"
echo "   skills → ~/.pi/agent/skills/"
echo ""
echo "⚠️  Add your API keys to ~/.zshrc.local"
