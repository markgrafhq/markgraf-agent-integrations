# Markgraf agent integrations

## Inline playback in omp

The installable package adds `/markgraf [--background] <path>` and the agent-callable
`markgraf_play` tool to [omp](https://omp.sh). It plays inside omp's normal
terminal layout, keeping the conversation above the player. It does not open
a split, window, or fullscreen terminal player.

Install the prebuilt package from the public
[`markgrafhq/markgraf-agent-integrations`](https://github.com/markgrafhq/markgraf-agent-integrations)
repository, then restart omp:

```sh
omp install github:markgrafhq/markgraf-agent-integrations
```

The package includes its matching native renderer and complete app. No Markgraf
source checkout, PureScript/Rust toolchain, separate CLI installation, or `-e`
argument is required. Installation needs Bun on `PATH`. The default Git branch
is a development snapshot; pin the Git spec to a commit for reproducible installs.

Inside omp:

```text
/markgraf /path/to/animation.markgraf
```

Space pauses/resumes, left/right arrows pause and step by 1/240 second, Home
returns to the beginning, and `q`, Escape, or Ctrl-C closes the player and
restores the editor. Playback loops and fits the available terminal size.
When opened, the player selects Markgraf's light or dark palette from omp's
active theme, including custom themes; it does not copy individual theme colors.
The diagram background is transparent by default. Use `/markgraf --background <path>`
or pass `"background": true` to the tool to paint theme paper instead.
The tool accepts `{ "path": "/path/to/animation.markgraf" }` and stays
active until the player closes; cancelling it also restores the editor.

The distributed package requires Apple Silicon macOS and a local Kitty-compatible
terminal with Unicode placeholders; verified with omp 18.8.7 in Ghostty.
The native CLI renders with Skia and Markgraf's bundled fonts, then transfers
raw RGBA through private POSIX shared memory. No SVG rasterization, PNG compression,
or base64 pixel transfer runs through omp. omp owns placement and controls,
not frame rendering.

Playback targets 240 fps independently of omp's ordinary text repaint cadence.
Absolute deadlines skip late frames instead of slowing the animation or building
a queue. Only one frame is outstanding; its mapping remains alive until Kitty
acknowledges it, including when playback is cancelled. Paused images survive
resize and screen restoration. Actual throughput depends on scene complexity,
native rendering, GPU readback, and the terminal; 240 fps is not guaranteed.
Remote/shared-memory-incompatible terminals fail explicitly rather than silently
falling back to PNG streaming. No FFmpeg process is used for inline playback.

Both agents install the same `@markgrafhq/markgraf-agents` package, but load their
own host entry points. Playback always uses the renderer inside the installed
package, never an unrelated `markgraf` on `PATH`. Updating the integration
therefore updates the matching renderer too.

## Inline playback in OpenCode

OpenCode **2.0.26** supports the same `/markgraf [--background] <path>` command
and `markgraf_play` tool. OpenCode 1.x does not expose the required plugin API;
installing this package does not upgrade your OpenCode executable.

Install with the OpenCode 2 installer, then restart OpenCode:

```sh
opencode plugin add github:markgrafhq/markgraf-agent-integrations
```

Alternatively, merge this entry into `plugins` in your OpenCode 2
`~/.config/opencode/opencode.json`:

```json
{
  "plugins": ["github:markgrafhq/markgraf-agent-integrations"]
}
```

OpenCode loads both the server tool and its terminal UI entry point. No `omp`
process is involved. Playback is docked immediately above the session composer
or in the home footer, not in a split, dialog, or scrolling transcript message.
Controls, transparent backgrounds, the `--background` opt-in, and the native
Metal/shared-memory rendering path are shared with the omp player. The light or
dark palette is selected from OpenCode's active theme when the player opens.

The tool runs on the active local TUI for the requesting session. Claims are
exclusive and scoped to that OpenCode location; closing the player completes
the tool, and cancellation or an expired connection lease releases playback.
An unclaimed request fails after five seconds rather than reporting a play
that never happened.

Verified with OpenCode 2.0.26 in Ghostty on macOS, including registered-tool
completion/cancellation, competing-client ownership, alternate project
locations, and cleanup while RPC is stalled. A sample delivered approximately
238 acknowledged frames per second; this is not a display-refresh guarantee.
The distributed package requires Apple Silicon macOS, local Kitty shared memory,
Unicode placeholders, and true color. SSH, terminal multiplexers, Windows,
and terminals without that graphics path are not supported.

Markgraf-specific adapters are distributed together under `markgrafhq`.
Reusable host bindings remain in
[`rowtype-yoga/purescript-opencode`](https://github.com/rowtype-yoga/purescript-opencode).

### Native licenses and source

The complete app's third-party notices are included under
`native/Markgraf Editor.app/Contents/Resources/licenses/`.
The bundled FFmpeg/x264 [corresponding source archive](https://github.com/i-am-the-slime/purescript-native-encoding/releases/download/v0.0.2/ffmpeg-corresponding-source-v0.0.2.tar.gz)
contains the matching sources, build recipe, and license notices.

## AI skill for native terminal rendering

The portable `markgraf-terminal` skill teaches an agent to validate, render,
and play `.markgraf` files through the CLI. It needs no patched coding agent,
custom renderer plugin, HTTP bridge, or MCP server.

Install it for your coding agent with:

```sh
npx skills add markgrafhq/markgraf-agent-integrations --skill markgraf-terminal
```

The same repository also exposes the skill as a standard Claude Code plugin:

```sh
claude plugin marketplace add markgrafhq/markgraf-agent-integrations
claude plugin install markgraf@markgraf
```

Codex's standard plugin installer can use its marketplace:

```sh
codex plugin marketplace add markgrafhq/markgraf-agent-integrations
codex plugin add markgraf@markgraf
```

These are skill installations, not additions to Claude's or Codex's terminal UI.
Existing omp and OpenCode inline players remain available separately.

The CLI is the rendering interface:

```sh
markgraf animation.markgraf --check
markgraf animation.markgraf --terminal-graphics --fps 240
```

When installed as a plugin, the package includes the matching CLI at
`native/Markgraf Editor.app/Contents/MacOS/markgraf`; leave it beside its sibling
executables. A standalone skill installation can instead use `markgraf` on `PATH`.
The distributed native app requires Apple Silicon macOS.

Graphics playback runs in the foreground of the current terminal and restores
its previous screen on exit. It requires Kitty graphics support, such as local
Kitty or Ghostty. Space pauses/resumes, arrows step, and `q` or Escape exits.
The target is 240 fps, not a throughput guarantee. Backgrounds are transparent;
`--background` opts into theme paper and `--theme light|dark` selects the palette.
`--play` opens the native editor and is not the terminal graphics command.

**A skill cannot add graphics passthrough to an agent's shell tool.** The CLI must
receive terminal protocol replies; allocating a PTY alone is not sufficient.
If an agent captures or strips those bytes, the skill reports the limitation
and gives the command to run directly in your terminal. It does not open a split,
browser, or replacement host, or claim that an exported file was played inline.
