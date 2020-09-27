import Pokemon from '@reactdex/models/Pokemon'
import axios, { AxiosResponse } from 'axios'

export async function getPokemon(): Promise<Pokemon[]> {
    const url = 'https://reactdex-server.herokuapp.com/pokemon'
    const { data } = await axios.get<Pokemon[]>(url)
    return data
}
