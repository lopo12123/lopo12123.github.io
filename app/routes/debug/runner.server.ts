import { spawn, ChildProcessWithoutNullStreams } from "node:child_process";

const bash_runner = spawn('bash');

export type RunnerResult = { type: 'stdin' | 'stdout' | 'stderr', data: string }

abstract class BashRunner {
    static #items: RunnerResult[] = []

    static #resolver?: (items: RunnerResult[]) => void

    static set #resolve(fn: (items: RunnerResult[]) => void) {
        BashRunner.#resolver = fn
    }

    static get #resolve() {
        const fn = BashRunner.#resolver!
        BashRunner.#resolver = undefined
        return fn
    }

    static get items() {
        return BashRunner.#items
    }

    static init() {
        bash_runner.stdout.on('data', (data) => {
            BashRunner.#items.push({ type: 'stdout', data: data.toString() })
            BashRunner.#resolve(BashRunner.#items)
        })
        bash_runner.stderr.on('data', (data) => {
            BashRunner.#items.push({ type: 'stderr', data: data.toString() })
            BashRunner.#resolve(BashRunner.#items)
        })
    }

    static exec(script: string) {
        return new Promise<RunnerResult[]>(resolve => {
            BashRunner.#resolve = resolve

            bash_runner.stdin.write(`${ script }\n`, (err) => {
                BashRunner.#items.push({ type: 'stdin', data: script })
                if (err) BashRunner.#items.push({ type: 'stdin', data: `${ err }` })
            });
        })
    }

    static clear() {
        BashRunner.#items = []
    }
}

BashRunner.init()

export {
    BashRunner,
}