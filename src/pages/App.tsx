import React from 'react'
import useIsOnline from '../hooks/network/useIsOnline'
import useGradientBorderEffect from '../hooks/stylesEffect/useGradientBorderEffect'

import './App.scss'

import pokemon from '../constants/pokemon.json'
import PokemonListItem from '../views/pokemon/PokemonListItem'
import Pokemon from '../infra/models/Pokemon'
import Layout from '../components/layouts/Layout'

const App: React.FC = () => {
    const isOnline = useIsOnline()
    // const { onMouseMove, elementRef, background } = useGradientBorderEffect('#3acfd5', '#3a4ed5');

    return (
        <Layout>
            {pokemon.slice(0, 10).map((p: Pokemon) => (
                <PokemonListItem key={p.number} pokemon={p} />
            ))}
        </Layout>
    )
}

export default App
