import React from 'react'
import BaseButton from '../../components/buttons/BaseButton'
import Pokemon from '../../infra/models/Pokemon'

import './PokemonSidebarDetails.scss'

interface PokemonSidebarDetailsProps {
    pokemon?: Pokemon
    onClose?: Function
}

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
                <BaseButton onClick={handleCloseButton}>X</BaseButton>
                {pokemon?.defaultName}
            </header>
            <article className="pokemon-details-sidebar__content">
                {JSON.stringify(pokemon)}
            </article>
            <footer className="pokemon-details-sidebar__footer">
                <BaseButton>Mais detalhes</BaseButton>
            </footer>
        </aside>
    )
}

export default PokemonSidebarDetails
