import React from 'react'

import './PokemonList.scss'

type Props = React.HTMLProps<HTMLLIElement>

const PokemonList: React.FC<Props> = ({ children, style }) => {
    return (
        <ul className="pokemon-list" style={style}>
            {children}
        </ul>
    )
}

export default PokemonList
