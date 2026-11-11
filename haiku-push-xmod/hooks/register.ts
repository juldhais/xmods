import type { Register } from 'claude-code'

const NOTE = `IMPORTANT: Do not carry out the steps below yourself. Spawn ONE subagent with the Agent tool, setting model to "haiku", and give it the full instructions below as its prompt (include the working directory and any user arguments). Wait for it, then relay its result briefly.\n\n---\n`

export const register: Register = on => {
  on('skill.prompt', { skill: 'xpush' }, ($, e, next) =>
    e.text.startsWith(NOTE) ? next(e) : next({ ...e, text: NOTE + e.text }),
  )
}
