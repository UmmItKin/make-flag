# Make-flag - A CTF Flag Generator

A modern web application for generating CTF-style flags with leetspeak transformations. Built with Astro and shadcn/ui.

> **Live Demo**: https://flag.withkin.me

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`     |

## How to Use

1. **Enter a flag prefix** (e.g., `flag`, `HTB`, `PICO`)
2. **Type your text** in the input field
3. **Click "Generate Flag"** or press Enter
4. **Copy the result** using the copy button
5. **Clear notifications** when needed

## Leetspeak Transformations

The generator applies these character substitutions:

- `a/A → 4`
- `e/E → 3`
- `i/I → 1`
- `l/L → 1`
- `o/O → 0`
- `s/S → 5`
- `t/T → 7`

and more ...

Special characters and non-Latin text (Chinese, Japanese, etc.) are preserved.

## License

Licensed under the [AGPL-3.0 License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request and use conventional commit style made the message more profeossional.
