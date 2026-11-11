# xmods

Custom Claude Code mods.

- **haiku-push-xmod**: runs the `/xpush` skill (commit and push) through a Haiku subagent.
- **haiku-debug-xmod**: when you ask to debug, checks `docs/DEBUG.md` exists and runs the debug through a Haiku subagent.

## Install

At the prompt of a terminal session:

```
/plugin install haiku-push-xmod --marketplace juldhais/xmods
/plugin install haiku-debug-xmod --marketplace juldhais/xmods
```

From a shell:

```
claude plugin install haiku-push-xmod --marketplace juldhais/xmods
claude plugin install haiku-debug-xmod --marketplace juldhais/xmods
```
