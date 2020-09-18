import React, { useState } from 'react'

import PokemonListItem from '../views/pokemon/PokemonListItem'
import Pokemon from '../infra/models/Pokemon'
import Layout from '../components/layouts/Layout'
import PokemonList from '../views/pokemon/PokemonList'
import PokemonSidebarDetails from '../views/pokemon/PokemonSidebarDetails'

import './App.scss'
import pokemon from '../infra/constants/pokemon.json'

const App: React.FC = () => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
        undefined
    )

    const handlePokemonClickFactory = (pkm: Pokemon) => () => {
        setSelectedPokemon(pkm)
    }

    const clearSelectedPokemon = () => {
        setSelectedPokemon(undefined)
    }

    return (
        <Layout className="app__content">
            <Layout.Header/>
            <Layout.Content>
                <PokemonList>
                    {pokemon.slice(0, 150).map((p: Pokemon) => (
                        <PokemonListItem
                            key={p.number}
                            pokemon={p}
                            hasSelection={selectedPokemon !== undefined}
                            isSelected={p.number === selectedPokemon?.number}
                            onClick={handlePokemonClickFactory(p)}
                        />
                    ))}
                </PokemonList>
            </Layout.Content>
            <Layout.Sidebar position="left">
                <PokemonSidebarDetails
                    pokemon={selectedPokemon}
                    onClose={clearSelectedPokemon}
                />
            </Layout.Sidebar>
        </Layout>
    )
}

export default App
