import axios, { AxiosResponse } from 'axios'
import Pokemon from '../infra/models/Pokemon'

const onDownload = (progress: ProgressEvent) => {
    console.log(progress.lengthComputable, progress.total, progress.loaded)
}
export async function getPokemon(): Promise<Pokemon[]> {
    const url = 'https://reactdex-microservice.herokuapp.com/pokemon'
    const response = await axios.get<Pokemon[]>(url, {
        onDownloadProgress: onDownload,
    })

    const { data } = response
    return data
}
