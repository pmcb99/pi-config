# pi-config

Portable pi agent + tmux config. Clone on any machine, run `setup.sh`, and you're good.

## What's inside

```
pi/agent/
  settings.json       # pi agent settings (default model, provider, etc.)
  presets.json         # model presets (glm-medium, gpt-low)
  keybindings.json     # custom keybindings
  extensions/
    dev-logs.ts        # capture dev server output from adjacent tmux pane
    blink-cursor.ts    # blinking cursor while pi runs
    read-quiet.ts      # quieter read tool rendering
    model-switcher.ts  # type mm1/mm2 to quick-switch models
  skills/              # all installed skills

zsh/
  zshrc                # main shell config (aliases, PATH, env)
  zshrc.local          # secrets template (API keys) — not tracked
  zshenv               # per-invocation settings (ulimit, PWD fix)
  zprofile             # login shell (brew shellenv)
  profile              # sources .local/bin/env
  local-bin-env        # adds ~/.local/bin to PATH

tmux/
  tmux.conf           # vim-style pane nav, mouse support, alt window nav

setup.sh              # symlinks everything into ~/
```

## Setup

```bash
git clone https://github.com/pmcb99/pi-config.git
cd pi-config
chmod +x setup.sh
./setup.sh
```
