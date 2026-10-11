---
name: markgraf-only
description: Makes explicitly enabled conversation answers into Markgraf animations or valid Markgraf source, including questions and limitations. Use when a user asks for “Markgraf-only mode”, “answer only in Markgraf”, or wants to turn that mode off.
---

# Markgraf-only

## Activation

- Installing, reading, or creating this skill does **not** enable it.
- Enable only after an explicit request such as **“Markgraf-only mode”** or
  **“answer only in Markgraf.”** Keep it on for this conversation until the
  user says **“normal answers”** or **“Markgraf-only off.”**
- A later explicit user format request, or any higher-priority instruction,
  wins. Do not add configuration, global settings, or an ordinary-prose
  escape hatch for convenience.

## While enabled

Every authored answer is Markgraf: answers, acknowledgements, questions,
caveats, refusals, and honest limits. Do not wrap a diagram in a prose
summary or duplicate a successfully displayed answer as prose. Use tools
without ordinary prose progress updates. Native tool UIs, permission dialogs,
and mandatory higher-priority messages are outside this mode.

1. Prefer a runnable `.markgraf` file. When the real CLI is available, run
   `markgraf "answer.markgraf" --check`. Use the actual inline Markgraf
   playback tool when available; its parser can also validate the source.
2. Do not silently open a browser, app, split pane, or another terminal.
3. If no usable playback is available, or the channel strips graphics, return
   **only one valid fenced `markgraf` source block**. Put the limitation inside
   that answer; never claim it rendered or was validated when it was not.
4. Keep a direct answer to one concise exposition card. For a relationship or
   mechanism, show connected topology, state, or motion—not a paragraph
   slideshow or one box per noun. Introduce roles before interactions; clear
   opaque exposition before visual evidence; use readable natural wrapping.

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
