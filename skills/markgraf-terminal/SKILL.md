---
name: markgraf-terminal
description: Plays and renders Markgraf diagrams through the native CLI in Kitty-compatible terminals. Use when asked to play, preview, validate, or export a .markgraf file, including high-frame-rate terminal playback with transparent backgrounds.
---

# Markgraf terminal rendering

Use the native CLI, not an agent-specific renderer or a patched coding agent.

## Locate the CLI

- When this skill is installed as the Markgraf plugin, prefer its bundled executable at `native/Markgraf Editor.app/Contents/MacOS/markgraf` under the plugin root. Resolve the actual installed root; do not guess a cache path.
- With a standalone skill installation, use `markgraf` on `PATH`. Check availability with `command -v markgraf` and inspect `markgraf --help` when capabilities are uncertain.
- Quote executable and input paths. Keep the native executable beside its `ffmpeg` and `markgraf-editor` siblings; do not copy it out of the app.
- If no CLI is installed, report that prerequisite rather than inventing a renderer or installing software without permission.
- The distributed native app requires Apple Silicon macOS. Terminal graphics require Metal and the Kitty graphics protocol; Kitty and Ghostty are suitable terminals. Do not claim this graphics mode works in Windows or iTerm2.

The examples below assume the selected executable is available as `markgraf`.

## Play an animation

Validate the actual file before presenting a newly created or changed diagram:

```sh
markgraf "animation.markgraf" --check
markgraf "animation.markgraf" --terminal-graphics --fps 120
```

- Use a foreground terminal session that passes graphics requests **and replies** unchanged. A PTY alone does not prove graphics support.
- This CLI mode uses the current terminal's fullscreen buffer and restores the previous screen on exit. It does not open another terminal or a browser.
- Space pauses/resumes; Left/Right step a frame; `q` or Escape quits. Ctrl-C cancels.
- The default scheduling target is 120 fps, not a promise of 120 delivered or displayed frames per second. Late frames are skipped rather than queued.
- Backgrounds are transparent by default. Add `--background` only when paper is requested.
- Use `--theme light` or `--theme dark` when the desired palette is known. Do not infer a terminal's palette from the OS theme.
- `--play` opens the native editor: it is **not** the terminal graphics command.
- Prefer file input. For deliberate stdin input, the CLI also accepts `markgraf - --terminal-graphics < "animation.markgraf"`; keyboard input stays on the controlling terminal.

## When the agent cannot forward terminal graphics

Many agents capture shell output instead of forwarding Kitty graphics and replies. If the CLI reports `terminal did not respond to the Kitty graphics protocol query`, redirected stdout, or another unsupported-terminal error:

1. Report that exact limitation; do not describe the attempt as successful playback.
2. Give the fully quoted CLI command and file path for the user to run directly in a compatible terminal.
3. Do not keep retrying through the same captured-output tool, inject bytes into another process's TTY, or steal the agent's keyboard stream.
4. Do not open a split, window, native editor, or browser as a silent fallback.

A skill supplies invocation instructions; it cannot add an inline image surface to an agent's UI. Offer ANSI `--terminal` playback only when the user accepts that different rendering mode.

## Export when requested

```sh
markgraf "animation.markgraf" --frame 0 -o "frame.png"
markgraf "animation.markgraf" --frame 0 -o "frame.svg"
markgraf "animation.markgraf" -o "animation.mp4"
```

PNG/SVG exports retain transparency unless `--background` is requested; MP4 is opaque. Do not substitute an export for playback without saying so. Report the generated path and only the behavior actually observed.
