import './PokemonList.scss'

import React from 'react'

import { View, ViewFactory } from 'infra/models/View'

const PokemonList: View = ({ children }) => {
    return <ul className="pokemon-list">{children}</ul>
}

export default ViewFactory(PokemonList)
