import './PokemonListItem.scss'

import React from 'react'
import clsx from 'clsx'
import Pokemon from '@reactdex/models/Pokemon'
import Typography from '@reactdex/components/typographies/Typography'

import useHover from 'hooks/events/useHover'
import useGradientBorderEffect from 'hooks/ui/useGradientBorderEffect'
import typesColors from 'infra/constants/typesColors.json'


interface PokemonListItemProps {
    pokemon: Pokemon
}

const url =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/:number.png'

const PokemonListItem: React.FC<PokemonListItemProps> = ({ pokemon }) => {
    const {
        backgroundElementRef,
        containerClass,
        background,
        hoverElementRef,
        rootClass,
        imgClass
    } = usePokemonListItemClass(pokemon)
    const { number, defaultName, types } = pokemon
    const [primary, secondary] = types

    return (
        <li
            ref={backgroundElementRef}
            className={containerClass}
            style={{ background }}
        >
            <section
                id="pokemonListItem"
                ref={hoverElementRef}
                className={rootClass}
                data-pokemon={JSON.stringify(pokemon)}
            >
                <img
                    className={imgClass}
                    loading="lazy"
                    alt={`sprite of ${defaultName}`}
                    src={url.replace(':number', `${Number(number)}`)}
                />
                <section className="pokemon-list-item__content">
                    <Typography
                        as="span"
                        variant="caption"
                        className="pokemon-list-item__number"
                    >
                        #{number}
                    </Typography>
                    <Typography as="p" className="pokemon-list-item__name">
                        {defaultName}
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

const usePokemonListItemClass = (pokemon: Pokemon) => {
    const [primary, secondary] = pokemon.types

    //@ts-ignore
    const primaryColor: string = typesColors[primary]
    const secondaryColor: string = secondary
        ? //@ts-ignore
          typesColors[secondary]
        : primaryColor

    const { ref: hoverElementRef, value: isOnHover } = useHover<
        HTMLButtonElement
    >()
    const {
        elementRef: backgroundElementRef,
        background: backgroundColor
    } = useGradientBorderEffect<HTMLLIElement>(primaryColor, secondaryColor)

    const rootClass = clsx('pokemon-list-item', {})

    const containerClass = clsx('pokemon-list-item__container', {})

    const imgClass = clsx('pokemon-list-item__img')
    const background = isOnHover ? backgroundColor : 'none'

    return {
        rootClass,
        containerClass,
        imgClass,
        background,
        hoverElementRef,
        backgroundElementRef
    }
}

export default PokemonListItem
