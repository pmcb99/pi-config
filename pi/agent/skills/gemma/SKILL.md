---
name: gemma
description: "Run Gemma 4 language models via MLX on Apple Silicon. Use when user wants to chat with, query, or generate text with Gemma. Triggers: /gemma, 'run gemma', 'ask gemma', 'use gemma', 'g2b', 'g4b', 'g26b', 'g31b'."
---

# Gemma 4 MLX CLI

Run Gemma 4 language models locally on Apple Silicon using MLX.

## Available Models

```bash
g2b  "prompt"    # Gemma 4 2B (~2.5GB, fastest)
g4b  "prompt"    # Gemma 4 4B (~4GB)
g26b "prompt"    # Gemma 4 26B (~15GB)
g31b "prompt"    # Gemma 4 31B (~18GB)
```

## Options

| Flag | Description | Default |
|------|-------------|---------|
| `-t N` | Max tokens to generate | 500 |
| `-m model` | Override model path | varies |

## Examples

```bash
# Basic usage
g2b "What is machine learning?"

# More tokens
g4b "Write a short story" -t 200

# Override model
g2b "Hello" -m mlx-community/gemma-4-31b-it-4bit
```

## Workflows

### Run a query
1. Pick model size:
   - **2B**: Quick questions, fast responses
   - **4B**: Balanced quality/speed
   - **26B/31B**: Best quality, more RAM
2. Construct prompt
3. Run command
4. Return output to user

### Debugging
- Model not found? Check HF token: `cat ~/.cache/huggingface/token`
- Out of memory? Use smaller model
