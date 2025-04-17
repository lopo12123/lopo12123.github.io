import { cwd } from "node:process";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { useEffect, useState } from "react";
import { BashRunner, RunnerResult } from "~/routes/debug/runner.server";

export const loader = () => {
    return BashRunner.items
}

export const action = async ({ request }: ActionFunctionArgs): Promise<RunnerResult[]> => {
    const body = await request.json()
    const script = body.script.trim()

    if (!script) return []
    if (script === 'clear') {
        BashRunner.clear()
        return []
    }

    return BashRunner.exec(script)
}

export default function () {
    const loaderData = useLoaderData<RunnerResult[]>()

    const [ text, setText ] = useState("")
    const { data, submit } = useFetcher<RunnerResult[]>()

    return (
        <main className="content-body">
            <h1>Debug Page</h1>

            <div className={ 'mb-4' }>
                <input className={ 'outline-none' } type="text" value={ text }
                       onChange={ (e) => setText(e.target.value) }/>
                <button className={ 'px-2' } onClick={ () => {
                    submit({ script: text }, { encType: 'application/json', method: 'POST' })
                } }>RUN
                </button>
                <button className={ 'px-2' } onClick={ () => {
                    submit({ script: 'clear' }, { encType: 'application/json', method: 'POST' })
                } }>CLEAR
                </button>
            </div>

            <div className={ 'w-full h-[400px] p-4 border bg-black text-white overflow-auto' }>
                {
                    (data ?? loaderData)?.map(({ type, data }, index) => {
                        return (
                            <pre key={ index } style={ {
                                borderBottom: type === 'stdin' ? undefined : 'solid 1px #ccc',
                                color: type === 'stdin' ? 'white' : type === 'stderr' ? 'red' : 'grey'
                            } }>
                                { data }
                            </pre>
                        )
                    })
                }
            </div>
        </main>
    )
}