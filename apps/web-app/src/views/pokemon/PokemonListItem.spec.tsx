import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PokemonListItem from './PokemonListItem'
import Pokemon from '@reactdex/models/Pokemon'

const mockPokemon: Pokemon = {
    defaultName: 'Bulbassauro',
    generation: 1,
    number: '001',
    types: ['grass', 'poison'],
}

describe('<PokemonListItem />', () => {
    test('renders PokemonListItem component successfully', () => {
        render(
            <PokemonListItem
                pokemon={mockPokemon}
                hasSelection={false}
                isSelected={false}
            />
        )
        expect(screen.getByText(mockPokemon.defaultName)).toHaveTextContent(
            'Bulbassauro'
        )
        expect(
            screen.getByRole('img', {
                name: `sprite of ${mockPokemon.defaultName}`,
            })
        ).toBeInTheDocument()
    })
})
