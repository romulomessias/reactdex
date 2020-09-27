import './PokemonListItem.scss'
import clsx from 'clsx'
import React from 'react'
import useHover from '../../hooks/events/useHover'
import Pokemon from '@reactdex/models/Pokemon'

import typesColors from '../../infra/constants/typesColors.json'
import useGradientBorderEffect from '../../hooks/ui/useGradientBorderEffect'
import Typography from '../../components/typographies/Typography'

interface PokemonListItemProps {
    pokemon: Pokemon
    // isSelected: boolean
    // hasSelection: boolean
    // onClick?: Function
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

const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon }) => {
    const [primary, secondary] = pokemon.types
    //@ts-ignore
    const primaryColor: string = typesColors[primary]
    const secondaryColor: string = secondary
        ? //@ts-ignore
          typesColors[secondary]
        : primaryColor
    const { ref, value: isOnHover } = useHover<HTMLButtonElement>()
    const { elementRef, background: backgroundColor } = useGradientBorderEffect<
        HTMLLIElement
    >(primaryColor, secondaryColor)

    const rootClass = clsx('pokemon-list-item', {})

    const containerClass = clsx('pokemon-list-item__container', {})

    const imgClass = clsx('pokemon-list-item__img')
    const background = isOnHover ? backgroundColor : 'none'
    return (
        <li ref={elementRef} className={containerClass} style={{ background }}>
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
