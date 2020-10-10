import './App.scss'
import React from 'react'

import Pokemon from '@reactdex/models/Pokemon'
import Layout from '@reactdex/components/layouts/Layout'
import Typography from '@reactdex/components/typographies/Typography'
import MenuList from '@reactdex/components/menus/MenuList'
import MenuItem from '@reactdex/components/menus/MenuItem'

import PokemonListItem from 'views/pokemon/PokemonListItem'
import PokemonList from 'views/pokemon/PokemonList'
import useRequest from 'hooks/network/useRequest'
import { getPokemon } from 'services/pokemon'

const App: React.FC = () => {
    const { isLoading, data: pokemon } = useRequest<Pokemon[]>(getPokemon, [])

    return (
        <Layout className="app__content">
            <Layout.Content>
                <section className="toolbar">
                    <Typography>{isLoading && 'Carregando Pokemon'}</Typography>
                </section>
                <PokemonList>
                    {pokemon
                        .filter(it => it.generation == 1)
                        .map((p: Pokemon) => (
                            <PokemonListItem key={p.number} pokemon={p} />
                        ))}
                </PokemonList>
            </Layout.Content>
            <Layout.Navbar>
                <MenuList>
                    <MenuItem isActive>Pokemon</MenuItem>
                </MenuList>
            </Layout.Navbar>
        </Layout>
    )
}

export default App
