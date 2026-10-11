---
name: markgraf-only
description: Makes explicitly enabled conversation answers into Markgraf animations or valid Markgraf source, either always or only above 320 characters. Use when a user requests “Markgraf-only mode”, “Markgraf above 320 characters”, conditional Markgraf replies, or wants to turn either mode off.
---

# Markgraf-only

## Activation

- Installing, reading, or creating this skill does **not** enable it.
- **Always:** enable after “Markgraf-only mode” or “answer only in Markgraf.”
- **Above 320:** enable after “Markgraf above 320 characters” or an equivalent
  request to render longer replies while keeping short replies as text.
- The latest requested mode replaces the previous one. Keep it for this
  conversation until “normal answers” or “Markgraf-only off.”
- A later explicit user format request, or any higher-priority instruction,
  wins. Do not add configuration, global settings, or an ordinary-prose
  escape hatch for convenience.

## Choose the response medium

- In **Always** mode, every authored answer is Markgraf.
- In **Above 320** mode, draft the complete useful answer first. At **320
  characters or fewer**, send ordinary text. At **321 or more**, deliver the
  whole answer in Markgraf, even if it is only a few lines of exposition.
- Count Unicode code points in the intended ordinary-text answer, including
  spaces, punctuation, and line breaks, before adding DSL or line wrapping.
  When close to the boundary, use an available counting tool rather than guess
  (JavaScript: `Array.from(text).length`). Do not print the count.
- Do not split one answer into short messages, omit necessary information,
  or replace words with cryptic shorthand to evade the threshold. Apply the
  same rule to progress updates, questions, caveats, and refusals.
- A later request for Always mode also converts short replies; turning the
  mode off restores normal responses of any length.

## Deliver a Markgraf answer

Do not wrap a diagram in a prose summary or duplicate a successfully displayed
answer as prose. Native tool UIs, permission dialogs, and mandatory
higher-priority messages are outside these modes.

1. Prefer a runnable `.markgraf` file. When the real CLI is available, run
   `markgraf "answer.markgraf" --check`. Use the actual inline Markgraf
   playback tool when available; its parser can also validate the source.
2. Do not silently open a browser, app, split pane, or another terminal.
3. If no usable playback is available, or the channel strips graphics, return
   **only one valid fenced `markgraf` source block**. Put the limitation inside
   that answer; never claim it rendered or was validated when it was not.
4. Direct answers may be exposition-only. Prefer one concise card; for longer
   text, use successive readable cards of roughly six lines, replacing the
   same label with `~ answer |Next paragraph.|` after its initial `+ answer`.
   This is one Markgraf answer, not separate chat messages.
5. For a relationship or mechanism, show connected topology, state, or motion,
   not a paragraph slideshow or one box per noun. Introduce roles before
   interactions; clear opaque exposition before visual evidence.

## Portable syntax

When an appropriate Markgraf authoring skill is installed, reuse it. This
portable subset needs no local-only skill: use only these documented
primitives unless that installed skill verifies more. Keep each decoded text
line under 60 characters (around 40 is easier to read). `{shape: exposition}`
is a centred opaque narration card, not a graph node; remove it before
evidence needs inspection.

```markgraf
still answer {
  + answer |The cache has the newest value.| {shape: exposition}
}
```

```markgraf
still roles {
  + client: Client
  + api: API
  + client -> api
}
client ~> api |Send user:42 to the API.|
client <~ api |Return the matching user record.|
```

`a ~> b` moves a message from `a` to `b`; `a <~ b` moves it from `b` to `a`.
For longer text, use `|...|` with natural line breaks, without a colon before
the pipe. Do not invent DSL.

## Questions about a playback moment

When the player supplies a source file and exact time or frame, treat them as
the anchor. Inspect that moment before answering. Say whether a claim concerns
the current source/code or a prior rendered state; do not fabricate an
observation. Do not assume a particular player command or keybinding.

If a viewer action only prepares an unsent question draft, wait for the user
to send it; preparing context is not a submitted question.
