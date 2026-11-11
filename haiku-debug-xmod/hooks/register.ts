import type { Register } from 'claude-code'

const ASKS_DEBUG = /^\s*(run|stop) debug\b/i
const MARK = '[haiku-debug-xmod]'

export const register: Register = on => {
  on('prompt.submit', async ($, e, next) => {
    const m = ASKS_DEBUG.exec(e.text)
    if (e.text.startsWith('/') || e.text.includes(MARK) || !m) return next(e)

    const action = m[1].toLowerCase()
    const found = await $.fs.read('docs/DEBUG.md').then(() => true, () => false)
    const note = found
      ? `docs/DEBUG.md exists. Read it, then ${action} the debug (${action === 'run' ? 'follow its run steps' : 'follow its stop steps, or stop the processes it starts'}) by spawning ONE subagent with the Agent tool, model "haiku", giving it the steps and the working directory. Relay its result briefly.`
      : `docs/DEBUG.md does NOT exist. Tell the user it is missing and do not ${action} debugging; ask how they want to proceed.`
    return next({ ...e, text: `${e.text}\n\n${MARK} ${note}` })
  })
}
