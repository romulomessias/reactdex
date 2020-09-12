import clsx from 'clsx'
import React, { useRef } from 'react'
import useHover from '../../hooks/events/useHover'
import Pokemon from '../../infra/models/Pokemon'

import './PokemonListItem.scss'

interface PokemonListItemProps {
    pokemon: Pokemon
}

const url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/:number.png'

const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon }) => {
    const [primaryType] = pokemon.types
    const { ref, value: isOnHover } = useHover()

    const rootClass = clsx('pokemon-list-item', {
        
    })

    const imgClas = clsx('pokemon-list-item__img', {
        [`${primaryType}`]: isOnHover,
        'border-color': primaryType && isOnHover,
    })

    return (
        <section ref={ref} className={rootClass}>
            <figure className={imgClas}>
                <img
                    alt={`sprite of ${pokemon.defaultName}`}
                    src={url.replace(':number', `${Number(pokemon.number)}`)}
                />
            </figure>
            <section>{pokemon.defaultName}</section>
        </section>
    )
}

export default PokemonListItem
