import Pokemon from '@reactdex/models/Pokemon'
import axios, { AxiosResponse } from 'axios'

const onDownload = (progress: ProgressEvent) => {
    console.log(progress.lengthComputable, progress.total, progress.loaded)
}
export async function getPokemon(): Promise<Pokemon[]> {
    const url = 'https://reactdex-server.herokuapp.com/pokemon'
    const response = await axios.get<Pokemon[]>(url, {
        onDownloadProgress: onDownload
    })

    const { data } = response
    return data
}
