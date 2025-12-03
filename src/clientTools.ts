function downloadToClientAsJsonFile<T>(data: T, document: Document, filename: string): void {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
}

function openFileDialog(
    document: Document,
    type: string,
    accept: string,
    importFileContentHandler: (content: string) => void,
): void {
    const fileReaderOnLoadHandler = (event: ProgressEvent<FileReader>) => {
        const content = (event.target?.result as string) ?? ''
        importFileContentHandler(content)
    }
    const fileInputOnChangeHandler = (event: Event): void => {
        const target = event.target as HTMLInputElement
        if (target.files && target.files.length === 1 && target.files[0]) {
            const reader = new FileReader()
            reader.onload = fileReaderOnLoadHandler
            reader.readAsText(target.files[0])
        }
    }
    const fileInput = document.createElement('input')
    fileInput.type = type
    fileInput.accept = accept
    fileInput.onchange = fileInputOnChangeHandler
    fileInput.click()
}

type ClientTools = {
    downloadToClientAsJsonFile: <T>(data: T, document: Document, filename: string) => void
    openFileDialog: (
        document: Document,
        type: string,
        accept: string,
        importFileContentHandler: (content: string) => void,
    ) => void
}

const clientTools: ClientTools = {
    downloadToClientAsJsonFile,
    openFileDialog,
}

export default clientTools
