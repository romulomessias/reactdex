import clsx from 'clsx'
import React, { useRef } from 'react'
import useHover from '../../hooks/events/useHover'
import Pokemon from '../../infra/models/Pokemon'

import './PokemonListItem.scss'
import typesColors from '../../infra/constants/typesColors.json'
import useGradientBorderEffect from '../../hooks/stylesEffect/useGradientBorderEffect'

interface PokemonListItemProps {
    pokemon: Pokemon
    isSelected: boolean
    hasSelection: boolean
    onClick?: Function
}

const url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/:number.png'

const Type: React.FC<{
    type: string
}> = ({ type }) => {
    const rootClass = clsx('pokemon-list-item__type', type, 'background')
    return <span className={rootClass}>{type}</span>
}

const PokemonListItem: React.FC<PokemonListItemProps> = ({
    pokemon,
    isSelected,
    hasSelection,
    onClick,
}) => {
    const [primary, secondary] = pokemon.types
    //@ts-ignore
    const primaryColor: string = typesColors[primary]
    const secondaryColor: string = secondary
        ? //@ts-ignore
          typesColors[secondary]
        : primaryColor
    const { ref, value: isOnHover } = useHover<HTMLButtonElement>()
    const { onMouseMove, elementRef, background } = useGradientBorderEffect<
        HTMLLIElement
    >(primaryColor, secondaryColor)

    const rootClass = clsx('pokemon-list-item', {})

    const containerClass = clsx('pokemon-list-item__container', {
        selected: isSelected,
        disabled: !isSelected && hasSelection,
    })

    const imgClass = clsx('pokemon-list-item__img')

    const handleOnClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <li
            ref={elementRef}
            className={containerClass}
            // onMouseMove={onMouseMove}
            style={{
                background: isOnHover ? background : 'none',
            }}
        >
            <button
                ref={ref}
                type="button"
                onClick={handleOnClick}
                className={rootClass}
            >
                <img
                    className={imgClass}
                    alt={`sprite of ${pokemon.defaultName}`}
                    src={url.replace(':number', `${Number(pokemon.number)}`)}
                />
                <section
                    className="pokemon-list-item__content"
                    pokemon-list-item__name
                >
                    <p className="pokemon-list-item__name">
                        {pokemon.defaultName}
                    </p>
                    <span className="pokemon-list-item__number">
                        #{pokemon.number}
                    </span>
                    <section className="pokemon-list-item__types">
                        <Type type={primary} />
                        {secondary && <Type type={secondary} />}
                    </section>
                </section>
            </button>
        </li>
    )
}

export default PokemonListItem
