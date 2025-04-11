import { join } from "node:path";
import { readFileSync } from "node:fs";
import { EssayMeta, ProjectMeta } from "~/types";

type ResourceAccessor = {
    (sub: 'essay'): EssayMeta[]

    (sub: 'essay', id: string, type: 'metadata'): EssayMeta

    (sub: 'essay', id: string, type: 'content'): string

    (sub: 'project'): ProjectMeta[]

    (sub: 'project', id: string, type: 'metadata'): ProjectMeta

    (sub: 'project', id: string, type: 'content'): string
}

const archiveDir = join(import.meta.dirname, "../../public/archive")

class Resources {
    public get: ResourceAccessor = (sub: 'essay' | 'project', id?: string, type?: 'metadata' | 'content') => {
        if (!id) {
            return JSON.parse(readFileSync(join(archiveDir, `${ sub }/manifest.json`), 'utf8'))
        }

        const raw = readFileSync(join(archiveDir, `${ sub }/${ id }.${ type }`), 'utf8')
        return type === 'metadata' ? JSON.parse(raw) : raw
    }
}

const resources = new Resources()

export {
    resources,
}