import { ActionFunctionArgs } from "@remix-run/node";
import { writeFileSync } from "node:fs";

export const action = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const file = form.get('file') as File

    const d = new Date(file.lastModified)
    const suffix = file.name.split('.').pop() ?? 'png'

    const filename = `${ d.getFullYear() }${ d.getMonth().toString(10).padStart(2, '0') }${ d.getDate().toString(10).padStart(2, '0') }_${ d.getHours().toString(10).padStart(2, '0') }${ d.getMinutes().toString(10).padStart(2, '0') }.${ suffix }`

    writeFileSync(`./.tmp/${ filename }`, await file.bytes())

    return null
}

export default function UploadPage() {
    return (
        <main className={ 'content-body' }>
            <h1>Upload</h1>
            <p>Upload your photo</p>

            <form method="post" encType="multipart/form-data">
                <input type="file" name="file"/>
                <br/>
                <button type="submit">Upload</button>
            </form>
        </main>
    )
}