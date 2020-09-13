import React, { useState } from 'react'

import PokemonListItem from '../views/pokemon/PokemonListItem'
import Pokemon from '../infra/models/Pokemon'
import Layout from '../components/layouts/Layout'
import PokemonList from '../views/pokemon/PokemonList'
import PokemonSidebarDetails from '../views/pokemon/PokemonSidebarDetails'

import './App.scss'
import pokemon from '../infra/constants/pokemon.json'

const App: React.FC = () => {
    // const isOnline = useIsOnline()
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>(
        undefined
    )
    // const { onMouseMove, elementRef, background } = useGradientBorderEffect('#3acfd5', '#3a4ed5');

    const handlePokemonClickFactory = (pkm: Pokemon) => () => {
        setSelectedPokemon(pkm)
    }

    const clearSelectedPokemon = () => {
        setSelectedPokemon(undefined)
    }
    return (
        <Layout className="app__content">
            <PokemonList>
                {pokemon.map((p: Pokemon) => (
                    <PokemonListItem
                        key={p.number}
                        pokemon={p}
                        hasSelection={selectedPokemon !== undefined}
                        isSelected={p.number === selectedPokemon?.number}
                        onClick={handlePokemonClickFactory(p)}
                    />
                ))}
            </PokemonList>
            <PokemonSidebarDetails
                pokemon={selectedPokemon}
                onClose={clearSelectedPokemon}
            />
        </Layout>
    )
}

export default App
