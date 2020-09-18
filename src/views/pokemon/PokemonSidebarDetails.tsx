import React from 'react'
import BaseButton from '../../components/buttons/BaseButton'
import Pokemon from '../../infra/models/Pokemon'

import './PokemonSidebarDetails.scss'

interface PokemonSidebarDetailsProps {
    pokemon?: Pokemon
    onClose?: Function
}

const url =
    'https://assets.pokemon.com/assets/cms2/img/pokedex/full/:number.png'

type Props = PokemonSidebarDetailsProps & React.HTMLProps<HTMLElement>

const PokemonSidebarDetails: React.FC<Props> = ({
    pokemon,
    onClose,
    style,
}) => {
    const handleCloseButton = () => {
        if (onClose) {
            onClose()
        }
    }
    return (
        <aside className="pokemon-details-sidebar" style={style}>
            <header className="pokemon-details-sidebar__header">
                <BaseButton buttonSize="small" onClick={handleCloseButton}>
                    X
                </BaseButton>
                {pokemon?.defaultName}
            </header>
            <article className="pokemon-details-sidebar__content">
                <img
                    className="pokemon-details-sidebar__img"
                    loading="lazy"
                    alt={`sprite of ${pokemon?.defaultName}`}
                    src={url.replace(':number', `${pokemon?.number}`)}
                />
            </article>
            <footer className="pokemon-details-sidebar__footer">
                <BaseButton>Mais detalhes</BaseButton>
            </footer>
        </aside>
    )
}

export default PokemonSidebarDetails
