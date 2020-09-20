import './App.scss'
import React, { useEffect, useState } from 'react'

import PokemonListItem from '../views/pokemon/PokemonListItem'
import Pokemon from '../infra/models/Pokemon'
import Layout from '../components/layouts/Layout'
import PokemonList from '../views/pokemon/PokemonList'
import PokemonSidebarDetails from '../views/pokemon/PokemonSidebarDetails'

// import pokemon from '../infra/constants/pokemon.json'
import { getPokemon } from '../services/pokemon'

const App: React.FC = () => {
    const [isLoadind, setIsloading] = useState(false)
    const [pokemon, setPokemon] = useState<Pokemon[]>([])
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
        undefined
    )

    useEffect(() => {
        setIsloading(true)
        getPokemon()
            .then((pokemon) => {
                setPokemon(pokemon)
            })
            .catch((error) => {
                console.error(error)
                alert('ocorreu um erro :(')
            })
            .finally(() => {
                setIsloading(false)
            })
    }, [])

    const handlePokemonClickFactory = (pkm: Pokemon) => () => {
        // setSelectedPokemon(pkm)
    }

    const clearSelectedPokemon = () => {
        setSelectedPokemon(undefined)
    }

    return (
        <Layout className="app__content">
            <Layout.Header />
            <Layout.Content>
                {isLoadind && 'Carregando Pokemon'}
                <PokemonList>
                    {pokemon
                        .filter((it) => it.generation == 1)
                        // .slice(0, 10)
                        .map((p: Pokemon) => (
                            <PokemonListItem
                                key={p.number}
                                pokemon={p}
                                hasSelection={selectedPokemon !== undefined}
                                isSelected={
                                    p.number === selectedPokemon?.number
                                }
                                onClick={handlePokemonClickFactory(p)}
                            />
                        ))}
                </PokemonList>
            </Layout.Content>
            <Layout.Navbar></Layout.Navbar>
        </Layout>
    )
}

export default App
