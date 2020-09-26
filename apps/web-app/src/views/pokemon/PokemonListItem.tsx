import clsx from 'clsx'
import React, { useRef } from 'react'
import useHover from '../../hooks/events/useHover'
import Pokemon from '@reactdex/models/Pokemon'

import './PokemonListItem.scss'
import typesColors from '../../infra/constants/typesColors.json'
import useGradientBorderEffect from '../../hooks/stylesEffect/useGradientBorderEffect'
import Typography from '../../components/typographies/Typography'

interface PokemonListItemProps {
    pokemon: Pokemon
    isSelected: boolean
    hasSelection: boolean
    onClick?: Function
}

const url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/:number.png'

interface TypeProps {
    type: string
}

const Type: React.FC<TypeProps> = ({ type }) => {
    const rootClass = clsx('pokemon-list-item__type', type, 'background')
    return (
        <Typography
            as="span"
            variant="caption"
            weight="normal"
            className={rootClass}
        >
            {type}
        </Typography>
    )
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

    return (
        <li
            ref={elementRef}
            className={containerClass}
            style={{
                background: isOnHover ? background : 'none',
            }}
        >
            <section ref={ref} className={rootClass}>
                <img
                    className={imgClass}
                    loading="lazy"
                    alt={`sprite of ${pokemon.defaultName}`}
                    src={url.replace(':number', `${Number(pokemon.number)}`)}
                />
                <section className="pokemon-list-item__content">
                    <Typography
                        as="span"
                        variant="caption"
                        className="pokemon-list-item__number"
                    >
                        #{pokemon.number}
                    </Typography>
                    <Typography as="p" className="pokemon-list-item__name">
                        {pokemon.defaultName}
                    </Typography>
                    <section className="pokemon-list-item__types">
                        <Type type={primary} />
                        {secondary && <Type type={secondary} />}
                    </section>
                </section>
            </section>
        </li>
    )
}

export default PokemonListItem
