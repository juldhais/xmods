import type { Register } from 'claude-code'

const ASKS_DEBUG = /^s*run debugb/i
const MARK = '[haiku-debug-xmod]'

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    if (e.text.startsWith('/') || e.text.includes(MARK) || !ASKS_DEBUG.test(e.text)) return next(e)

    const found = await $.fs.read('docs/DEBUG.md').then(() => true, () => false)
    const note = found
      ? `docs/DEBUG.md exists. Read it, then run the debug steps in it by spawning ONE subagent with the Agent tool, model "haiku", giving it the steps and the working directory. Relay its result briefly.`
      : `docs/DEBUG.md does NOT exist. Tell the user it is missing and do not start debugging; ask how they want to proceed.`
    return next({ ...e, text: `${e.text}\n\n${MARK} ${note}` })
  })
}
